import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma"; // updated import

interface Domain {
  id: string;
  name: string;
}

export async function GET() {
  console.log("📥 Incoming GET /audience request");

  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("👤 User object:", user);

    if (!user || !user.email) {
      console.warn("⚠️ Unauthorized request - no user or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = user.email === "muragegideon2000@gmail.com";
    console.log("🔐 Is admin:", isAdmin);

    let domains: Domain[] = [];
    let domainFilter: string | string[];

    if (isAdmin) {
      console.log("📡 Fetching all domains...");
      domains = await prisma.domain.findMany();
      console.log("✅ Domains fetched:", domains);
      domainFilter = domains.map(d => d.id);
    } else {
      const userEmailDomain = user.email.split('@')[1];
      console.log("📧 User email domain:", userEmailDomain);

      if (!userEmailDomain) {
        console.warn("⚠️ Invalid email format:", user.email);
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

      const domain = await prisma.domain.findUnique({
        where: { name: userEmailDomain }
      });
      console.log("🔍 Domain found:", domain);

      if (!domain) {
        console.warn("⚠️ Domain not found for:", userEmailDomain);
        return NextResponse.json({
          error: "Domain not found",
          message: "No email data exists for your domain"
        }, { status: 404 });
      }

      domains = [domain];
      domainFilter = domain.id;
    }

    console.log("📝 domainFilter:", domainFilter);

    // Audience list & engagement stats
    console.log("📊 Fetching audienceStats...");
    const audienceStats = isAdmin ? await prisma.$queryRaw`
      SELECT
        "to" AS email,
        SPLIT_PART("to", '@', 2) AS recipient_domain,
        COUNT(*) AS total_emails,
        MAX(timestamp) AS last_seen,
        COUNT(CASE WHEN "eventType" = 'delivered' THEN 1 END) AS delivered_count,
        COUNT(CASE WHEN "eventType" IN ('failed', 'bounced') THEN 1 END) AS failed_count,
        COUNT(CASE WHEN "eventType" = 'open' THEN 1 END) AS opens,
        COUNT(CASE WHEN "eventType" = 'click' THEN 1 END) AS clicks,
        CASE
          WHEN COUNT(CASE WHEN "eventType" = 'bounced' THEN 1 END) > 0 THEN 'bounced'
          WHEN MAX(timestamp) > NOW() - INTERVAL '7 days' THEN 'active'
          ELSE 'inactive'
        END AS status
      FROM "EmailEvent"
      WHERE "domainId" = ANY(${domainFilter}::text[])
      GROUP BY "to"
      ORDER BY MAX(timestamp) DESC
      LIMIT 100
    ` : await prisma.$queryRaw`
      SELECT
        "to" AS email,
        SPLIT_PART("to", '@', 2) AS recipient_domain,
        COUNT(*) AS total_emails,
        MAX(timestamp) AS last_seen,
        COUNT(CASE WHEN "eventType" = 'delivered' THEN 1 END) AS delivered_count,
        COUNT(CASE WHEN "eventType" IN ('failed', 'bounced') THEN 1 END) AS failed_count,
        COUNT(CASE WHEN "eventType" = 'open' THEN 1 END) AS opens,
        COUNT(CASE WHEN "eventType" = 'click' THEN 1 END) AS clicks,
        CASE
          WHEN COUNT(CASE WHEN "eventType" = 'bounced' THEN 1 END) > 0 THEN 'bounced'
          WHEN MAX(timestamp) > NOW() - INTERVAL '7 days' THEN 'active'
          ELSE 'inactive'
        END AS status
      FROM "EmailEvent"
      WHERE "domainId" = ${domainFilter}
      GROUP BY "to"
      ORDER BY MAX(timestamp) DESC
      LIMIT 100
    `;
    console.log("✅ audienceStats count:", Array.isArray(audienceStats) ? audienceStats.length : 0);

    // Domain distribution
    console.log("📊 Fetching domainDistribution...");
    const domainDistribution = isAdmin ? await prisma.$queryRaw`
      SELECT
        SPLIT_PART("to", '@', 2) AS recipient_domain,
        COUNT(DISTINCT "to") AS unique_recipients,
        COUNT(*) AS total_emails
      FROM "EmailEvent"
      WHERE "domainId" = ANY(${domainFilter}::text[])
      GROUP BY SPLIT_PART("to", '@', 2)
      ORDER BY COUNT(*) DESC
      LIMIT 10
    ` : await prisma.$queryRaw`
      SELECT
        SPLIT_PART("to", '@', 2) AS recipient_domain,
        COUNT(DISTINCT "to") AS unique_recipients,
        COUNT(*) AS total_emails
      FROM "EmailEvent"
      WHERE "domainId" = ${domainFilter}
      GROUP BY SPLIT_PART("to", '@', 2)
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `;
    console.log("✅ domainDistribution:", domainDistribution);

    // Overview stats
    console.log("📊 Fetching overviewStats...");
    const overviewStats = isAdmin ? await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT "to") AS total_recipients,
        COUNT(DISTINCT CASE WHEN timestamp > NOW() - INTERVAL '7 days' THEN "to" END) AS active_recipients,
        COUNT(DISTINCT CASE WHEN timestamp <= NOW() - INTERVAL '7 days' THEN "to" END) AS inactive_recipients,
        COUNT(DISTINCT CASE WHEN "eventType" = 'bounced' THEN "to" END) AS bounced_recipients
      FROM "EmailEvent"
      WHERE "domainId" = ANY(${domainFilter}::text[])
    ` : await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT "to") AS total_recipients,
        COUNT(DISTINCT CASE WHEN timestamp > NOW() - INTERVAL '7 days' THEN "to" END) AS active_recipients,
        COUNT(DISTINCT CASE WHEN timestamp <= NOW() - INTERVAL '7 days' THEN "to" END) AS inactive_recipients,
        COUNT(DISTINCT CASE WHEN "eventType" = 'bounced' THEN "to" END) AS bounced_recipients
      FROM "EmailEvent"
      WHERE "domainId" = ${domainFilter}
    `;
    console.log("✅ overviewStats:", overviewStats);

    // Engagement rates
    console.log("📊 Fetching engagementRates...");
    const engagementRates = isAdmin ? await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT CASE WHEN "eventType" = 'open' THEN "to" END) AS users_who_opened,
        COUNT(DISTINCT CASE WHEN "eventType" = 'click' THEN "to" END) AS users_who_clicked,
        COUNT(DISTINCT "to") AS total_recipients
      FROM "EmailEvent"
      WHERE "domainId" = ANY(${domainFilter}::text[])
    ` : await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT CASE WHEN "eventType" = 'open' THEN "to" END) AS users_who_opened,
        COUNT(DISTINCT CASE WHEN "eventType" = 'click' THEN "to" END) AS users_who_clicked,
        COUNT(DISTINCT "to") AS total_recipients
      FROM "EmailEvent"
      WHERE "domainId" = ${domainFilter}
    `;
    console.log("✅ engagementRates:", engagementRates);

    const overview = Array.isArray(overviewStats) ? overviewStats[0] : {};
    const engagement = Array.isArray(engagementRates) ? engagementRates[0] : {};

    console.log("📦 Returning final response");
    return NextResponse.json({
      audience: audienceStats,
      domainDistribution,
      overview: {
        totalRecipients: Number(overview.total_recipients) || 0,
        activeRecipients: Number(overview.active_recipients) || 0,
        inactiveRecipients: Number(overview.inactive_recipients) || 0,
        bouncedRecipients: Number(overview.bounced_recipients) || 0
      },
      engagement: {
        openRate: Number(engagement.total_recipients) > 0
          ? Math.round((Number(engagement.users_who_opened) / Number(engagement.total_recipients)) * 100)
          : 0,
        clickRate: Number(engagement.total_recipients) > 0
          ? Math.round((Number(engagement.users_who_clicked) / Number(engagement.total_recipients)) * 100)
          : 0
      },
      domainName: isAdmin ? "All Domains" : domains[0].name,
      isAdmin
    });

  } catch (error) {
    console.error("❌ Error fetching audience data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
