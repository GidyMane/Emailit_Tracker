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

    // Get query parameters for filtering
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const eventType = url.searchParams.get('eventType');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Build date filter
    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate);
    }

    // If no date filter provided, default to last 30 days
    if (!startDate && !endDate) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      dateFilter.gte = thirtyDaysAgo;
    }

    // Build where clause
    const whereClause: {
      domainId: string;
      timestamp: { gte?: Date; lte?: Date };
      eventType?: string;
    } = {
      domainId: domain.id,
      timestamp: dateFilter
    };

    if (eventType && eventType !== 'all') {
      whereClause.eventType = eventType;
    }

    // Get recent email events
    const events = await prisma.emailEvent.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'desc'
      },
      take: limit,
      skip: offset
    });

    // Get total count for pagination
    const totalCount = await prisma.emailEvent.count({
      where: whereClause
    });

    // Get volume data by day for charts (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const volumeData = await prisma.$queryRaw`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered,
        COUNT(CASE WHEN status = 'failed' OR status = 'bounced' THEN 1 END) as failed,
        COUNT(CASE WHEN event_type = 'open' THEN 1 END) as opens,
        COUNT(CASE WHEN event_type = 'click' THEN 1 END) as clicks
      FROM "EmailEvent"
      WHERE domain_id = ${domain.id}
        AND timestamp >= ${thirtyDaysAgo}
      GROUP BY DATE(timestamp)
      ORDER BY DATE(timestamp)
    `;

    // Get engagement data by day of week
    const engagementData = await prisma.$queryRaw`
      SELECT 
        EXTRACT(DOW FROM timestamp) as day_of_week,
        TO_CHAR(timestamp, 'Day') as day_name,
        COUNT(CASE WHEN event_type = 'open' THEN 1 END) as opens,
        COUNT(CASE WHEN event_type = 'click' THEN 1 END) as clicks
      FROM "EmailEvent"
      WHERE domain_id = ${domain.id}
        AND timestamp >= ${thirtyDaysAgo}
        AND event_type IN ('open', 'click')
      GROUP BY EXTRACT(DOW FROM timestamp), TO_CHAR(timestamp, 'Day')
      ORDER BY EXTRACT(DOW FROM timestamp)
    `;

    return NextResponse.json({
      events: events.map(event => ({
        id: event.id,
        emailId: event.emailId,
        to: event.to,
        from: event.from,
        subject: event.subject,
        eventType: event.eventType,
        status: event.status,
        timestamp: event.timestamp,
        createdAt: event.createdAt
      })),
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: totalCount > offset + limit
      },
      charts: {
        volume: volumeData,
        engagement: engagementData
      },
      domainName: domain.name
    });

  } catch (error) {
    console.error("Error fetching email events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
