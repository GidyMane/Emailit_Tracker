import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //  Check if user is admin
    const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];
    const isAdmin = adminEmails.includes(user.email);

    if (!isAdmin) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    //  Fetch domains with summary + email count
    const domains = await prisma.domain.findMany({
      include: {
        summary: true,
        _count: {
          select: {
            emails: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const domainStats = await Promise.all(
      domains.map(async (domain) => {
        // Count all events for emails under this domain
        const totalEmails = await prisma.emailEvent.count({
          where: {
            email: {
              domainId: domain.id,
            },
          },
        });

        // Get last email event for this domain
        const lastEmail = await prisma.emailEvent.findFirst({
          where: {
            email: {
              domainId: domain.id,
            },
          },
          orderBy: { occurredAt: "desc" },
          select: { occurredAt: true },
        });

        // Count unique recipients (`to`) for emails in this domain
        const uniqueRecipients = await prisma.email.groupBy({
          by: ["to"],
          where: {
            domainId: domain.id,
            to: { not: null },
          },
        });

        return {
          id: domain.id,
          name: domain.name,
          createdAt: domain.createdAt,
          updatedAt: domain.updatedAt,
          totalEmails,
          uniqueRecipients: uniqueRecipients.length,
          lastEmailSent: lastEmail?.occurredAt || null,
          summary: domain.summary
            ? {
                totalSent: domain.summary.totalSent,
                totalHardFail: domain.summary.totalHardFail,
                totalSoftFail: domain.summary.totalSoftFail,
                totalBounce: domain.summary.totalBounce,
                totalError: domain.summary.totalError,
                totalHeld: domain.summary.totalHeld,
                totalDelayed: domain.summary.totalDelayed,
                totalLoaded: domain.summary.totalLoaded,
                totalClicked: domain.summary.totalClicked,
              }
            : null,
        };
      })
    );

    return NextResponse.json({
      domains: domainStats,
      totalDomains: domains.length,
      isAdmin,
    });
  } catch (error) {
    console.error("Error fetching domains:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
