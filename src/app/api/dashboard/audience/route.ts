import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

interface Domain {
  id: string;
  name: string;
}

/**
 * Convert nested BigInt values to Numbers (shallow/recursive).
 * NOTE: we explicitly convert BigInt -> Number here; if counts exceed
 * Number.MAX_SAFE_INTEGER you'll need a different approach.
 */
function convertBigIntToNumber(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToNumber);
  } else if (obj && typeof obj === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = convertBigIntToNumber(v);
    }
    return out;
  } else if (typeof obj === "bigint") {
    return Number(obj);
  }
  return obj;
}

export async function GET() {
  console.log("📥 Incoming GET /api/dashboard/audience request");

  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("👤 Kinde user:", user?.email ?? "(no user)");

    if (!user || !user.email) {
      console.warn("⚠️ Unauthorized - no user/email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = user.email === "muragegideon2000@gmail.com";
    console.log("🔐 isAdmin:", isAdmin);

    let domains: Domain[] = [];
    let domainFilterId: string | null = null;

    if (isAdmin) {
      console.log("📡 Admin: fetching all domains");
      domains = await prisma.domain.findMany();
      console.log("✅ Domains count:", domains.length);
    } else {
      const userEmailDomain = (user.email.split("@")[1] || "").toLowerCase();
      console.log("📧 userEmailDomain:", userEmailDomain);

      if (!userEmailDomain) {
        console.warn("⚠️ Invalid user email format:", user.email);
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

      const domain = await prisma.domain.findUnique({ where: { name: userEmailDomain } });
      console.log("🔎 matched domain:", domain ?? "NOT FOUND");

      if (!domain) {
        return NextResponse.json(
          { error: "Domain not found", message: "No email data exists for your domain" },
          { status: 404 }
        );
      }

      domains = [domain];
      domainFilterId = domain.id;
    }

    // ---------- Audience query ----------
    console.log("📊 Running audience query...");
    const audienceSqlBase = `
      SELECT
        "to" AS email,
        SPLIT_PART("to", '@', 2) AS recipient_domain,
        COUNT(*) AS total_emails,
        MAX("timestamp") AS last_seen,
        COUNT(CASE WHEN "eventType" = 'email.delivery.sent' THEN 1 END) AS delivered_count,
        COUNT(CASE WHEN "eventType" IN (
          'email.delivery.hardfail', 'email.delivery.softfail',
          'email.delivery.bounce', 'email.delivery.error'
        ) THEN 1 END) AS failed_count,
        COUNT(CASE WHEN "eventType" = 'email.loaded' THEN 1 END) AS opens,
        COUNT(CASE WHEN "eventType" = 'email.link.clicked' THEN 1 END) AS clicks,
        CASE
          WHEN COUNT(CASE WHEN "eventType" = 'email.delivery.bounce' THEN 1 END) > 0 THEN 'bounced'
          WHEN MAX("timestamp") > NOW() - INTERVAL '7 days' THEN 'active'
          ELSE 'inactive'
        END AS status
      FROM "EmailEvent"
    `;

    let audienceQueryResult: any[];
    if (isAdmin) {
      const sql = `${audienceSqlBase} GROUP BY "to" ORDER BY MAX("timestamp") DESC LIMIT 100`;
      console.log("SQL (admin) ->", sql);
      audienceQueryResult = (await prisma.$queryRawUnsafe(sql)) as any[]; // safe: we built SQL ourselves for admin path
    } else {
      const sql = `${audienceSqlBase} WHERE "domainId" = $1 GROUP BY "to" ORDER BY MAX("timestamp") DESC LIMIT 100`;
      console.log("SQL (user) ->", sql, "params:", domainFilterId);
      audienceQueryResult = (await prisma.$queryRawUnsafe(sql, domainFilterId)) as any[];
    }
    console.log("✅ audience rows:", audienceQueryResult.length);

    // ---------- Domain distribution ----------
    console.log("📊 Running domain distribution query...");
    let domainDistributionRaw: any[];
    if (isAdmin) {
      domainDistributionRaw = (await prisma.$queryRaw`
        SELECT SPLIT_PART("to", '@', 2) AS recipient_domain,
               COUNT(DISTINCT "to") AS unique_recipients,
               COUNT(*) AS total_emails
        FROM "EmailEvent"
        GROUP BY SPLIT_PART("to", '@', 2)
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `) as any[];
    } else {
      domainDistributionRaw = (await prisma.$queryRaw`
        SELECT SPLIT_PART("to", '@', 2) AS recipient_domain,
               COUNT(DISTINCT "to") AS unique_recipients,
               COUNT(*) AS total_emails
        FROM "EmailEvent"
        WHERE "domainId" = ${domainFilterId}
        GROUP BY SPLIT_PART("to", '@', 2)
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `) as any[];
    }
    console.log("✅ domainDistribution rows:", domainDistributionRaw.length);

    // ---------- Overview stats ----------
    console.log("📊 Running overview query...");
    const overviewStats = isAdmin
      ? (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT "to") AS total_recipients,
          COUNT(DISTINCT CASE WHEN "timestamp" > NOW() - INTERVAL '7 days' THEN "to" END) AS active_recipients,
          COUNT(DISTINCT CASE WHEN "timestamp" <= NOW() - INTERVAL '7 days' THEN "to" END) AS inactive_recipients,
          COUNT(DISTINCT CASE WHEN "eventType" = 'email.delivery.bounce' THEN "to" END) AS bounced_recipients
        FROM "EmailEvent"
      `) as any[]
      : (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT "to") AS total_recipients,
          COUNT(DISTINCT CASE WHEN "timestamp" > NOW() - INTERVAL '7 days' THEN "to" END) AS active_recipients,
          COUNT(DISTINCT CASE WHEN "timestamp" <= NOW() - INTERVAL '7 days' THEN "to" END) AS inactive_recipients,
          COUNT(DISTINCT CASE WHEN "eventType" = 'email.delivery.bounce' THEN "to" END) AS bounced_recipients
        FROM "EmailEvent"
        WHERE "domainId" = ${domainFilterId}
      `) as any[];
    console.log("✅ overviewStats:", overviewStats);

    // ---------- Engagement rates ----------
    console.log("📊 Running engagement rates query...");
    const engagementRatesRaw = isAdmin
      ? (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT CASE WHEN "eventType" = 'email.loaded' THEN "to" END) AS users_who_opened,
          COUNT(DISTINCT CASE WHEN "eventType" = 'email.link.clicked' THEN "to" END) AS users_who_clicked,
          COUNT(DISTINCT "to") AS total_recipients
        FROM "EmailEvent"
      `) as any[]
      : (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT CASE WHEN "eventType" = 'email.loaded' THEN "to" END) AS users_who_opened,
          COUNT(DISTINCT CASE WHEN "eventType" = 'email.link.clicked' THEN "to" END) AS users_who_clicked,
          COUNT(DISTINCT "to") AS total_recipients
        FROM "EmailEvent"
        WHERE "domainId" = ${domainFilterId}
      `) as any[];

    console.log("✅ engagementRates:", engagementRatesRaw);

    // Convert bigints -> numbers for all query outputs
    const audienceSafe = convertBigIntToNumber(audienceQueryResult);
    const domainDistributionSafe = convertBigIntToNumber(domainDistributionRaw);
    const overviewSafeObj = convertBigIntToNumber((overviewStats && overviewStats[0]) || {});
    const engagementRawObj = convertBigIntToNumber((engagementRatesRaw && engagementRatesRaw[0]) || {
      users_who_opened: 0,
      users_who_clicked: 0,
      total_recipients: 0,
    });

    // compute rates with numbers (safe)
    const totalRecipientsNum = Number(engagementRawObj.total_recipients || 0);
    const usersOpenedNum = Number(engagementRawObj.users_who_opened || 0);
    const usersClickedNum = Number(engagementRawObj.users_who_clicked || 0);

    const openRate = totalRecipientsNum > 0 ? Math.round((usersOpenedNum / totalRecipientsNum) * 100) : 0;
    const clickRate = totalRecipientsNum > 0 ? Math.round((usersClickedNum / totalRecipientsNum) * 100) : 0;

    console.log("📦 Returning response (audience rows):", audienceSafe.length);

    return NextResponse.json({
      audience: audienceSafe,
      domainDistribution: domainDistributionSafe,
      overview: {
        totalRecipients: Number(overviewSafeObj.total_recipients || 0),
        activeRecipients: Number(overviewSafeObj.active_recipients || 0),
        inactiveRecipients: Number(overviewSafeObj.inactive_recipients || 0),
        bouncedRecipients: Number(overviewSafeObj.bounced_recipients || 0),
      },
      engagement: {
        openRate,
        clickRate,
      },
      domainName: isAdmin ? "All Domains" : domains[0].name,
      isAdmin,
    });
  } catch (err) {
    console.error("❌ Error fetching audience data:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
