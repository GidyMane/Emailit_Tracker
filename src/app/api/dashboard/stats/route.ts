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
      // Admin sees all domains
      domains = await prisma.domain.findMany();
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
    }

    // Prepare domain filter for queries
    const domainIds = domains.map(d => d.id);
    const domainFilter = isAdmin ? { domainId: { in: domainIds } } : { domainId: domains[0]?.id };

    if (!isAdmin && (!domains[0] || !domains[0].id)) {
      return NextResponse.json({
        error: "Domain not found",
        message: "No email data exists for your domain"
      }, { status: 404 });
    }

    // Get summary statistics using new schema
    const summaries = await prisma.emailSummary.findMany({
      where: isAdmin ? { domainId: { in: domainIds } } : { domainId: domains[0].id }
    });

    // Get total email count
    const totalEmails = await prisma.emailEvent.count({
      where: domainFilter
    });

    // Get engagement stats
    const engagementStats = await prisma.emailEvent.groupBy({
      by: ['eventType'],
      where: {
        ...domainFilter,
        eventType: {
          in: ['email.loaded', 'email.link.clicked']
        }
      },
      _count: {
        eventType: true
      }
    });

    const opens = engagementStats.find(stat => stat.eventType === 'email.loaded')?._count.eventType || 0;
    const clicks = engagementStats.find(stat => stat.eventType === 'email.link.clicked')?._count.eventType || 0;

    // Aggregate summary data using new schema fields
    const aggregatedSummary = summaries.reduce((acc, summary) => ({
      totalSent: acc.totalSent + (summary?.totalSent || 0),
      totalHardFail: acc.totalHardFail + (summary?.totalHardFail || 0),
      totalSoftFail: acc.totalSoftFail + (summary?.totalSoftFail || 0),
      totalBounce: acc.totalBounce + (summary?.totalBounce || 0),
      totalError: acc.totalError + (summary?.totalError || 0),
      totalHeld: acc.totalHeld + (summary?.totalHeld || 0),
      totalDelayed: acc.totalDelayed + (summary?.totalDelayed || 0),
      totalLoaded: acc.totalLoaded + (summary?.totalLoaded || 0),
      totalClicked: acc.totalClicked + (summary?.totalClicked || 0)
    }), {
      totalSent: 0,
      totalHardFail: 0,
      totalSoftFail: 0,
      totalBounce: 0,
      totalError: 0,
      totalHeld: 0,
      totalDelayed: 0,
      totalLoaded: 0,
      totalClicked: 0
    });

    // Calculate derived stats
    const totalDelivered = aggregatedSummary.totalSent - (
      aggregatedSummary.totalHardFail + 
      aggregatedSummary.totalSoftFail + 
      aggregatedSummary.totalBounce + 
      aggregatedSummary.totalError
    );
    
    const totalFailed = aggregatedSummary.totalHardFail + 
                       aggregatedSummary.totalSoftFail + 
                       aggregatedSummary.totalBounce + 
                       aggregatedSummary.totalError;

    const deliveryRate = aggregatedSummary.totalSent > 0 ? 
      ((totalDelivered / aggregatedSummary.totalSent) * 100) : 0;

    return NextResponse.json({
      stats: {
        totalSent: aggregatedSummary.totalSent,
        delivered: totalDelivered,
        failed: totalFailed,
        opens: aggregatedSummary.totalLoaded,
        clicks: aggregatedSummary.totalClicked,
        pending: aggregatedSummary.totalHeld + aggregatedSummary.totalDelayed,
        deliveryRate: Math.round(deliveryRate * 100) / 100,
        // Detailed breakdown using new schema
        detailedStatus: {
          sent: totalDelivered,
          hardfail: aggregatedSummary.totalHardFail,
          softfail: aggregatedSummary.totalSoftFail,
          bounce: aggregatedSummary.totalBounce,
          error: aggregatedSummary.totalError,
          held: aggregatedSummary.totalHeld,
          delayed: aggregatedSummary.totalDelayed
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
