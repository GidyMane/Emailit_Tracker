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

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];
    const isAdmin = adminEmails.includes(user.email);
    let domains: Domain[] = [];

    if (isAdmin) {
      // Admin: fetch all domains
      domains = await prisma.domain.findMany();
    } else {
      // Non-admin: only their domain
      const userEmailDomain = user.email.split("@")[1];
      if (!userEmailDomain) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

      const domain = await prisma.domain.findUnique({
        where: { name: userEmailDomain },
      });

      if (!domain) {
        return NextResponse.json(
          { error: "Domain not found", message: "No email data exists for your domain" },
          { status: 404 }
        );
      }

      domains = [domain];
    }

    if (domains.length === 0) {
      return NextResponse.json(
        { error: "No domains found", message: "No email data available" },
        { status: 404 }
      );
    }

    const domainIds = domains.map((d) => d.id);
    const domainFilter = isAdmin
      ? { domainId: { in: domainIds } }
      : { domainId: domains[0].id };

    // Pull summaries
    const summaries = await prisma.emailSummary.findMany({
      where: domainFilter,
    });

    // Aggregate summary fields
    const aggregatedSummary = summaries.reduce(
      (acc, s) => ({
        totalSent: acc.totalSent + (s?.totalSent || 0),
        totalHardFail: acc.totalHardFail + (s?.totalHardFail || 0),
        totalSoftFail: acc.totalSoftFail + (s?.totalSoftFail || 0),
        totalBounce: acc.totalBounce + (s?.totalBounce || 0),
        totalError: acc.totalError + (s?.totalError || 0),
        totalHeld: acc.totalHeld + (s?.totalHeld || 0),
        totalDelayed: acc.totalDelayed + (s?.totalDelayed || 0),
        totalLoaded: acc.totalLoaded + (s?.totalLoaded || 0),
        totalClicked: acc.totalClicked + (s?.totalClicked || 0),
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
        totalClicked: 0,
      }
    );

    // Derived stats
    const totalDelivered =
      aggregatedSummary.totalSent -
      (aggregatedSummary.totalHardFail +
        aggregatedSummary.totalSoftFail +
        aggregatedSummary.totalBounce +
        aggregatedSummary.totalError);

    const totalFailed =
      aggregatedSummary.totalHardFail +
      aggregatedSummary.totalSoftFail +
      aggregatedSummary.totalBounce +
      aggregatedSummary.totalError;

    const deliveryRate =
      aggregatedSummary.totalSent > 0
        ? (totalDelivered / aggregatedSummary.totalSent) * 100
        : 0;

    return NextResponse.json({
      stats: {
        totalSent: aggregatedSummary.totalSent,
        delivered: totalDelivered,
        failed: totalFailed,
        opens: aggregatedSummary.totalLoaded,
        clicks: aggregatedSummary.totalClicked,
        pending: aggregatedSummary.totalHeld + aggregatedSummary.totalDelayed,
        deliveryRate: Math.round(deliveryRate * 100) / 100,
        detailedStatus: {
          sent: totalDelivered,
          hardfail: aggregatedSummary.totalHardFail,
          softfail: aggregatedSummary.totalSoftFail,
          bounce: aggregatedSummary.totalBounce,
          error: aggregatedSummary.totalError,
          held: aggregatedSummary.totalHeld,
          delayed: aggregatedSummary.totalDelayed,
        },
      },
      summary: aggregatedSummary,
      domainName: isAdmin ? "All Domains" : domains[0].name,
      isAdmin,
      domainsCount: domains.length,
    });
  } catch (error) {
    console.error("Error fetching email statistics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
