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

    // Get summary statistics
    const summary = await prisma.emailSummary.findUnique({
      where: { domainId: domain.id }
    });

    // Get event counts by status for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const eventStats = await prisma.emailEvent.groupBy({
      by: ['status'],
      where: {
        domainId: domain.id,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: {
        status: true
      }
    });

    // Get engagement stats (opens and clicks)
    const engagementStats = await prisma.emailEvent.groupBy({
      by: ['eventType'],
      where: {
        domainId: domain.id,
        eventType: {
          in: ['open', 'click']
        },
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: {
        eventType: true
      }
    });

    // Get total email count
    const totalEmails = await prisma.emailEvent.count({
      where: {
        domainId: domain.id,
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get pending emails (recent emails without delivery status)
    const pendingEmails = await prisma.emailEvent.count({
      where: {
        domainId: domain.id,
        status: 'pending',
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Process the data into the expected format
    const delivered = eventStats.find(stat => stat.status === 'delivered')?._count.status || 0;
    const failed = eventStats.find(stat => stat.status === 'failed')?._count.status || 0;
    const bounced = eventStats.find(stat => stat.status === 'bounced')?._count.status || 0;
    
    const opens = engagementStats.find(stat => stat.eventType === 'open')?._count.eventType || 0;
    const clicks = engagementStats.find(stat => stat.eventType === 'click')?._count.eventType || 0;

    // Calculate delivery rate
    const deliveryRate = totalEmails > 0 ? ((delivered / totalEmails) * 100) : 0;

    return NextResponse.json({
      stats: {
        totalSent: totalEmails,
        delivered,
        failed: failed + bounced,
        opens,
        clicks,
        pending: pendingEmails,
        deliveryRate: Math.round(deliveryRate * 100) / 100
      },
      summary: summary || {
        totalSent: 0,
        totalDelivered: 0,
        totalFailed: 0,
        totalOpens: 0,
        totalClicks: 0
      },
      domainName: domain.name
    });

  } catch (error) {
    console.error("Error fetching email statistics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
