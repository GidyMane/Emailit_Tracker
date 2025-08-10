import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = user.email === "muragegideon2000@gmail.com";
    let domains: any[] = [];
    let domainFilter: string | string[];

    if (isAdmin) {
      // Admin sees all domains
      domains = await prisma.domain.findMany();
      domainFilter = domains.map(d => d.id);
    } else {
      // Extract domain from user's email
      const userEmailDomain = user.email.split('@')[1];

      if (!userEmailDomain) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

      // Find the domain
      const domain = await prisma.domain.findUnique({
        where: { name: userEmailDomain }
      });

      if (!domain) {
        return NextResponse.json({
          error: "Domain not found",
          message: "No email data exists for your domain"
        }, { status: 404 });
      }

      domains = [domain];
      domainFilter = domain.id;
    }

    // Get unique recipients and their engagement stats
    const audienceStats = isAdmin ? await prisma.$queryRaw`
      SELECT
        "to" as email,
        SPLIT_PART("to", '@', 2) as recipient_domain,
        COUNT(*) as total_emails,
        MAX(timestamp) as last_seen,
        COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_count,
        COUNT(CASE WHEN status = 'failed' OR status = 'bounced' THEN 1 END) as failed_count,
        COUNT(CASE WHEN event_type = 'open' THEN 1 END) as opens,
        COUNT(CASE WHEN event_type = 'click' THEN 1 END) as clicks,
        CASE
          WHEN COUNT(CASE WHEN status = 'bounced' THEN 1 END) > 0 THEN 'bounced'
          WHEN MAX(timestamp) > NOW() - INTERVAL '7 days' THEN 'active'
          ELSE 'inactive'
        END as status
      FROM "EmailEvent"
      WHERE domain_id = ANY(${domainFilter}::text[])
      GROUP BY "to"
      ORDER BY MAX(timestamp) DESC
      LIMIT 100
    ` : await prisma.$queryRaw`
      SELECT
        "to" as email,
        SPLIT_PART("to", '@', 2) as recipient_domain,
        COUNT(*) as total_emails,
        MAX(timestamp) as last_seen,
        COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_count,
        COUNT(CASE WHEN status = 'failed' OR status = 'bounced' THEN 1 END) as failed_count,
        COUNT(CASE WHEN event_type = 'open' THEN 1 END) as opens,
        COUNT(CASE WHEN event_type = 'click' THEN 1 END) as clicks,
        CASE
          WHEN COUNT(CASE WHEN status = 'bounced' THEN 1 END) > 0 THEN 'bounced'
          WHEN MAX(timestamp) > NOW() - INTERVAL '7 days' THEN 'active'
          ELSE 'inactive'
        END as status
      FROM "EmailEvent"
      WHERE domain_id = ${domainFilter}
      GROUP BY "to"
      ORDER BY MAX(timestamp) DESC
      LIMIT 100
    `;

    // Get domain distribution of recipients
    const domainDistribution = isAdmin ? await prisma.$queryRaw`
      SELECT
        SPLIT_PART("to", '@', 2) as recipient_domain,
        COUNT(DISTINCT "to") as unique_recipients,
        COUNT(*) as total_emails
      FROM "EmailEvent"
      WHERE domain_id = ANY(${domainFilter}::text[])
      GROUP BY SPLIT_PART("to", '@', 2)
      ORDER BY COUNT(*) DESC
      LIMIT 10
    ` : await prisma.$queryRaw`
      SELECT
        SPLIT_PART("to", '@', 2) as recipient_domain,
        COUNT(DISTINCT "to") as unique_recipients,
        COUNT(*) as total_emails
      FROM "EmailEvent"
      WHERE domain_id = ${domainFilter}
      GROUP BY SPLIT_PART("to", '@', 2)
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `;

    // Get audience overview stats
    const overviewStats = isAdmin ? await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT "to") as total_recipients,
        COUNT(DISTINCT CASE WHEN timestamp > NOW() - INTERVAL '7 days' THEN "to" END) as active_recipients,
        COUNT(DISTINCT CASE WHEN timestamp <= NOW() - INTERVAL '7 days' THEN "to" END) as inactive_recipients,
        COUNT(DISTINCT CASE WHEN status = 'bounced' THEN "to" END) as bounced_recipients
      FROM "EmailEvent"
      WHERE domain_id = ANY(${domainFilter}::text[])
    ` : await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT "to") as total_recipients,
        COUNT(DISTINCT CASE WHEN timestamp > NOW() - INTERVAL '7 days' THEN "to" END) as active_recipients,
        COUNT(DISTINCT CASE WHEN timestamp <= NOW() - INTERVAL '7 days' THEN "to" END) as inactive_recipients,
        COUNT(DISTINCT CASE WHEN status = 'bounced' THEN "to" END) as bounced_recipients
      FROM "EmailEvent"
      WHERE domain_id = ${domainFilter}
    `;

    // Calculate engagement rates
    const engagementRates = isAdmin ? await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT CASE WHEN event_type = 'open' THEN "to" END) as users_who_opened,
        COUNT(DISTINCT CASE WHEN event_type = 'click' THEN "to" END) as users_who_clicked,
        COUNT(DISTINCT "to") as total_recipients
      FROM "EmailEvent"
      WHERE domain_id = ANY(${domainFilter}::text[])
    ` : await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT CASE WHEN event_type = 'open' THEN "to" END) as users_who_opened,
        COUNT(DISTINCT CASE WHEN event_type = 'click' THEN "to" END) as users_who_clicked,
        COUNT(DISTINCT "to") as total_recipients
      FROM "EmailEvent"
      WHERE domain_id = ${domainFilter}
    `;

    interface OverviewResult {
      total_recipients: string | number;
      active_recipients: string | number;
      inactive_recipients: string | number;
      bounced_recipients: string | number;
    }

    interface EngagementResult {
      users_who_opened: string | number;
      users_who_clicked: string | number;
      total_recipients: string | number;
    }

    const overview = Array.isArray(overviewStats) ? (overviewStats[0] as OverviewResult) : {} as OverviewResult;
    const engagement = Array.isArray(engagementRates) ? (engagementRates[0] as EngagementResult) : {} as EngagementResult;

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
    console.error("Error fetching audience data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
