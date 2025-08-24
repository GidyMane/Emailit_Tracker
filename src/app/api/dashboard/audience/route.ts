import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

interface Domain {
  id: string;
  name: string;
}

interface AudienceRow {
  email: string;
  recipient_domain: string;
  total_emails: number;
  last_seen: Date | null;
  delivered_count: number;
  failed_count: number;
  opens: number;
  clicks: number;
  status: string;
}

interface DomainDistributionRow {
  recipient_domain: string;
  unique_recipients: number;
  total_emails: number;
}

interface OverviewStatsRow {
  total_recipients: number;
  active_recipients: number;
  inactive_recipients: number;
  bounced_recipients: number;
}

interface EngagementRatesRow {
  users_who_opened: number;
  users_who_clicked: number;
  total_recipients: number;
}


function convertBigIntToNumber<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToNumber) as unknown as T;
  } else if (obj && typeof obj === "object") {
    const out = {} as Record<string, unknown>;
    for (const [k, v] of Object.entries(obj)) {
      out[k] = convertBigIntToNumber(v);
    }
    return out as T;
  } else if (typeof obj === "bigint") {
    return Number(obj) as unknown as T;
  }
  return obj;
}

export async function GET() {
  console.log("📥 Incoming GET /api/dashboard/audience request");

  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("👤 Kinde user:", user?.email ?? "(no user)");

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmails = [
      "info@websoftdevelopment.com",
      "muragegideon2000@gmail.com",
    ];

    const isAdmin = adminEmails.includes(user.email);
    let domains: Domain[] = [];
    let domainFilterId: string | null = null;

    if (isAdmin) {
      domains = await prisma.domain.findMany();
    } else {
      const userEmailDomain =
        user.email.split("@")[1]?.toLowerCase() || "";
      const domain = await prisma.domain.findUnique({
        where: { name: userEmailDomain },
      });
      if (!domain) {
        return NextResponse.json(
          {
            error: "Domain not found",
            message: "No email data exists for your domain",
          },
          { status: 404 }
        );
      }
      domains = [domain];
      domainFilterId = domain.id;
    }

    const audienceSqlBase = `
      SELECT
        em."to" AS email,
        SPLIT_PART(em."to", '@', 2) AS recipient_domain,
        COUNT(*) AS total_emails,
        MAX(e."occurredAt") AS last_seen,
        COUNT(CASE WHEN e."type" = 'email.delivery.sent' THEN 1 END) AS delivered_count,
        COUNT(CASE WHEN e."type" IN (
          'email.delivery.hardfail', 'email.delivery.softfail',
          'email.delivery.bounce', 'email.delivery.error'
        ) THEN 1 END) AS failed_count,
        COUNT(CASE WHEN e."type" = 'email.loaded' THEN 1 END) AS opens,
        COUNT(CASE WHEN e."type" = 'email.link.clicked' THEN 1 END) AS clicks,
        CASE
          WHEN COUNT(CASE WHEN e."type" = 'email.delivery.bounce' THEN 1 END) > 0 THEN 'bounced'
          WHEN MAX(e."occurredAt") > NOW() - INTERVAL '7 days' THEN 'active'
          ELSE 'inactive'
        END AS status
      FROM "EmailEvent" e
      JOIN "Email" em ON e."emailId" = em."id"
    `;

    const audienceQueryResult = isAdmin
      ? (await prisma.$queryRawUnsafe(
          `${audienceSqlBase} GROUP BY em."to" ORDER BY MAX(e."occurredAt") DESC LIMIT 100`
        )) as AudienceRow[]
      : (await prisma.$queryRawUnsafe(
          `${audienceSqlBase} WHERE em."domainId" = $1 GROUP BY em."to" ORDER BY MAX(e."occurredAt") DESC LIMIT 100`,
          domainFilterId
        )) as AudienceRow[];

    
    const domainDistributionRaw = isAdmin
      ? (await prisma.$queryRaw`
        SELECT SPLIT_PART(em."to", '@', 2) AS recipient_domain,
               COUNT(DISTINCT em."to") AS unique_recipients,
               COUNT(*) AS total_emails
        FROM "EmailEvent" e
        JOIN "Email" em ON e."emailId" = em."id"
        GROUP BY SPLIT_PART(em."to", '@', 2)
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `) as DomainDistributionRow[]
      : (await prisma.$queryRaw`
        SELECT SPLIT_PART(em."to", '@', 2) AS recipient_domain,
               COUNT(DISTINCT em."to") AS unique_recipients,
               COUNT(*) AS total_emails
        FROM "EmailEvent" e
        JOIN "Email" em ON e."emailId" = em."id"
        WHERE em."domainId" = ${domainFilterId}
        GROUP BY SPLIT_PART(em."to", '@', 2)
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `) as DomainDistributionRow[];

 
    const overviewStats = isAdmin
      ? (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT em."to") AS total_recipients,
          COUNT(DISTINCT CASE WHEN e."occurredAt" > NOW() - INTERVAL '7 days' THEN em."to" END) AS active_recipients,
          COUNT(DISTINCT CASE WHEN e."occurredAt" <= NOW() - INTERVAL '7 days' THEN em."to" END) AS inactive_recipients,
          COUNT(DISTINCT CASE WHEN e."type" = 'email.delivery.bounce' THEN em."to" END) AS bounced_recipients
        FROM "EmailEvent" e
        JOIN "Email" em ON e."emailId" = em."id"
      `) as OverviewStatsRow[]
      : (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT em."to") AS total_recipients,
          COUNT(DISTINCT CASE WHEN e."occurredAt" > NOW() - INTERVAL '7 days' THEN em."to" END) AS active_recipients,
          COUNT(DISTINCT CASE WHEN e."occurredAt" <= NOW() - INTERVAL '7 days' THEN em."to" END) AS inactive_recipients,
          COUNT(DISTINCT CASE WHEN e."type" = 'email.delivery.bounce' THEN em."to" END) AS bounced_recipients
        FROM "EmailEvent" e
        JOIN "Email" em ON e."emailId" = em."id"
        WHERE em."domainId" = ${domainFilterId}
      `) as OverviewStatsRow[];

 
    const engagementRatesRaw = isAdmin
      ? (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT CASE WHEN e."type" = 'email.loaded' THEN em."to" END) AS users_who_opened,
          COUNT(DISTINCT CASE WHEN e."type" = 'email.link.clicked' THEN em."to" END) AS users_who_clicked,
          COUNT(DISTINCT em."to") AS total_recipients
        FROM "EmailEvent" e
        JOIN "Email" em ON e."emailId" = em."id"
      `) as EngagementRatesRow[]
      : (await prisma.$queryRaw`
        SELECT
          COUNT(DISTINCT CASE WHEN e."type" = 'email.loaded' THEN em."to" END) AS users_who_opened,
          COUNT(DISTINCT CASE WHEN e."type" = 'email.link.clicked' THEN em."to" END) AS users_who_clicked,
          COUNT(DISTINCT em."to") AS total_recipients
        FROM "EmailEvent" e
        JOIN "Email" em ON e."emailId" = em."id"
        WHERE em."domainId" = ${domainFilterId}
      `) as EngagementRatesRow[];

    
    const audienceSafe = convertBigIntToNumber(audienceQueryResult);
    const domainDistributionSafe = convertBigIntToNumber(domainDistributionRaw);
    const overviewSafe = convertBigIntToNumber(overviewStats[0] || {
      total_recipients: 0,
      active_recipients: 0,
      inactive_recipients: 0,
      bounced_recipients: 0,
    });
    const engagementSafe = convertBigIntToNumber(engagementRatesRaw[0] || {
      users_who_opened: 0,
      users_who_clicked: 0,
      total_recipients: 0,
    });

    const openRate =
      engagementSafe.total_recipients > 0
        ? Math.round(
            (engagementSafe.users_who_opened /
              engagementSafe.total_recipients) *
              100
          )
        : 0;

    const clickRate =
      engagementSafe.total_recipients > 0
        ? Math.round(
            (engagementSafe.users_who_clicked /
              engagementSafe.total_recipients) *
              100
          )
        : 0;

    return NextResponse.json({
      audience: audienceSafe,
      domainDistribution: domainDistributionSafe,
      overview: {
        totalRecipients: overviewSafe.total_recipients,
        activeRecipients: overviewSafe.active_recipients,
        inactiveRecipients: overviewSafe.inactive_recipients,
        bouncedRecipients: overviewSafe.bounced_recipients,
      },
      engagement: { openRate, clickRate },
      domainName: isAdmin ? "All Domains" : domains[0].name,
      isAdmin,
    });
  } catch (err) {
    console.error(" Error fetching audience data:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
