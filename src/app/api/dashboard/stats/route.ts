import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

interface Domain {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];
    const isAdmin = adminEmails.includes(user.email);

    let domains: Domain[] = [];

    if (isAdmin) {
      domains = await prisma.domain.findMany();
    } else {
      const userEmailDomain = user.email.split('@')[1];
      if (!userEmailDomain) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

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
    }

    const domainIds = domains.map(d => d.id);
    const domainFilter = isAdmin ? { domainId: { in: domainIds } } : { domainId: domains[0]?.id };

    if (!isAdmin && (!domains[0] || !domains[0].id)) {
      return NextResponse.json({
        error: "Domain not found",
        message: "No email data exists for your domain"
      }, { status: 404 });
    }

    // 🔹 New summary fields from updated model
    const summaries = await prisma.emailSummary.findMany({
      where: isAdmin ? { domainId: { in: domainIds } } : { domainId: domains[0].id }
    });

    // Stats for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const eventStats = await prisma.emailEvent.groupBy({
      by: ["status"],
      where: {
        ...domainFilter,
        createdAt: { gte: thirtyDaysAgo }
      },
      _count: { status: true }
    });

<<<<<<< HEAD
    // Get detailed delivery event types
    const deliveryEventStats = await prisma.emailEvent.groupBy({
      by: ['eventType'],
      where: {
        ...domainFilter,
        eventType: {
          in: [
            'email.delivery.sent',
            'email.delivery.hardfail',
            'email.delivery.softfail',
            'email.delivery.bounce',
            'email.delivery.error',
            'email.delivery.held',
            'email.delivery.delayed'
          ]
        },
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: {
        eventType: true
      }
    });

    // Get engagement stats (opens and clicks)
=======
>>>>>>> cf3f5bd8b3647fd3b1662b2312e6f7a2b6d66311
    const engagementStats = await prisma.emailEvent.groupBy({
      by: ["eventType"],
      where: {
        ...domainFilter,
        eventType: { in: ["email.loaded", "email.link.clicked", "open", "click"] },
        createdAt: { gte: thirtyDaysAgo }
      },
      _count: { eventType: true }
    });

    const totalEmails = await prisma.emailEvent.count({
      where: { ...domainFilter, createdAt: { gte: thirtyDaysAgo } }
    });

    const pendingEmails = await prisma.emailEvent.count({
      where: { ...domainFilter, status: "pending", createdAt: { gte: thirtyDaysAgo } }
    });

    const delivered = eventStats.find(stat => stat.status === "delivered")?._count.status || 0;
    const failed = eventStats.find(stat => stat.status === "failed")?._count.status || 0;
    const bounced = eventStats.find(stat => stat.status === "bounced")?._count.status || 0;

    const opens = engagementStats
      .filter(stat => stat.eventType === "open" || stat.eventType === "email.loaded")
      .reduce((sum, stat) => sum + stat._count.eventType, 0);

    const clicks = engagementStats
      .filter(stat => stat.eventType === "click" || stat.eventType === "email.link.clicked")
      .reduce((sum, stat) => sum + stat._count.eventType, 0);

    const deliveryRate = totalEmails > 0 ? (delivered / totalEmails) * 100 : 0;

    // 🔹 Aggregate new summary fields
    const aggregatedSummary = summaries.reduce(
      (acc, summary) => ({
        totalSent: acc.totalSent + (summary?.totalSent || 0),
        totalHardFail: acc.totalHardFail + (summary?.totalHardFail || 0),
        totalSoftFail: acc.totalSoftFail + (summary?.totalSoftFail || 0),
        totalBounce: acc.totalBounce + (summary?.totalBounce || 0),
        totalError: acc.totalError + (summary?.totalError || 0),
        totalHeld: acc.totalHeld + (summary?.totalHeld || 0),
        totalDelayed: acc.totalDelayed + (summary?.totalDelayed || 0),
        totalLoaded: acc.totalLoaded + (summary?.totalLoaded || 0),
        totalClicked: acc.totalClicked + (summary?.totalClicked || 0)
      }),
      {
        totalSent: 0,
        totalHardFail: 0,
        totalSoftFail: 0,
        totalBounce: 0,
        totalError: 0,
        totalHeld: 0,
        totalDelayed: 0,
        totalLoaded: 0,
        totalClicked: 0
      }
<<<<<<< HEAD
    });

    // Process the detailed delivery event data
    const sentCount = deliveryEventStats.find(stat => stat.eventType === 'email.delivery.sent')?._count.eventType || 0;
    const hardfailCount = deliveryEventStats.find(stat => stat.eventType === 'email.delivery.hardfail')?._count.eventType || 0;
    const softfailCount = deliveryEventStats.find(stat => stat.eventType === 'email.delivery.softfail')?._count.eventType || 0;
    const bounceCount = deliveryEventStats.find(stat => stat.eventType === 'email.delivery.bounce')?._count.eventType || 0;
    const errorCount = deliveryEventStats.find(stat => stat.eventType === 'email.delivery.error')?._count.eventType || 0;
    const heldCount = deliveryEventStats.find(stat => stat.eventType === 'email.delivery.held')?._count.eventType || 0;
    const delayedCount = deliveryEventStats.find(stat => stat.eventType === 'email.delivery.delayed')?._count.eventType || 0;

    // Process the data into the expected format
    const delivered = eventStats.find(stat => stat.status === 'sent')?._count.status || sentCount;
    const failed = hardfailCount + softfailCount + bounceCount + errorCount;

    const opens = engagementStats.filter(stat =>
      stat.eventType === 'opened' || stat.eventType === 'email.loaded'
    ).reduce((sum, stat) => sum + stat._count.eventType, 0);

    const clicks = engagementStats.filter(stat =>
      stat.eventType === 'clicked' || stat.eventType === 'email.link.clicked'
    ).reduce((sum, stat) => sum + stat._count.eventType, 0);

    // Calculate delivery rate
    const totalDeliveryAttempts = sentCount + failed + heldCount + delayedCount;
    const deliveryRate = totalDeliveryAttempts > 0 ? ((sentCount / totalDeliveryAttempts) * 100) : 0;

    // Aggregate summary data
    const aggregatedSummary = summaries.reduce((acc, summary) => ({
      totalSent: acc.totalSent + (summary?.totalSent || 0),
      totalDelivered: acc.totalDelivered + (summary?.totalDelivered || 0),
      totalFailed: acc.totalFailed + (summary?.totalFailed || 0),
      totalOpens: acc.totalOpens + (summary?.totalOpens || 0),
      totalClicks: acc.totalClicks + (summary?.totalClicks || 0),
      sentCount: acc.sentCount + (summary?.sentCount || 0),
      hardfailCount: acc.hardfailCount + (summary?.hardfailCount || 0),
      softfailCount: acc.softfailCount + (summary?.softfailCount || 0),
      bounceCount: acc.bounceCount + (summary?.bounceCount || 0),
      errorCount: acc.errorCount + (summary?.errorCount || 0),
      heldCount: acc.heldCount + (summary?.heldCount || 0),
      delayedCount: acc.delayedCount + (summary?.delayedCount || 0)
    }), {
      totalSent: 0,
      totalDelivered: 0,
      totalFailed: 0,
      totalOpens: 0,
      totalClicks: 0,
      sentCount: 0,
      hardfailCount: 0,
      softfailCount: 0,
      bounceCount: 0,
      errorCount: 0,
      heldCount: 0,
      delayedCount: 0
    });
=======
    );
>>>>>>> cf3f5bd8b3647fd3b1662b2312e6f7a2b6d66311

    return NextResponse.json({
      stats: {
        totalSent: totalEmails,
        delivered: sentCount,
        failed,
        opens,
        clicks,
        pending: pendingEmails,
        deliveryRate: Math.round(deliveryRate * 100) / 100,
        // Detailed delivery statuses
        detailedStatus: {
          sent: sentCount,
          hardfail: hardfailCount,
          softfail: softfailCount,
          bounce: bounceCount,
          error: errorCount,
          held: heldCount,
          delayed: delayedCount
        }
      },
      summary: aggregatedSummary, 
      domainName: isAdmin ? "All Domains" : domains[0].name,
      isAdmin,
      domainsCount: domains.length
    });

  } catch (error) {
    console.error("Error fetching email statistics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
