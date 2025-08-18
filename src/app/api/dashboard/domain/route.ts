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

   // List of admin emails
const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];

// Check if logged-in user is admin
const isAdmin = user && adminEmails.includes(user.email);

    if (isAdmin) {
      // Admin sees all domains
      const domains = await prisma.domain.findMany({
        include: {
          summary: true,
          _count: {
            select: { emails: true }
          }
        },
        orderBy: { createdAt: "desc" }
      });

      // Aggregate data from all domains
      const aggregatedData = domains.reduce(
        (acc, domain) => ({
          emailCount: acc.emailCount + (domain._count.emails || 0),
          summaryData: {
            totalSent: acc.summaryData.totalSent + (domain.summary?.totalSent || 0),
            totalHardFail: acc.summaryData.totalHardFail + (domain.summary?.totalHardFail || 0),
            totalSoftFail: acc.summaryData.totalSoftFail + (domain.summary?.totalSoftFail || 0),
            totalBounce: acc.summaryData.totalBounce + (domain.summary?.totalBounce || 0),
            totalError: acc.summaryData.totalError + (domain.summary?.totalError || 0),
            totalHeld: acc.summaryData.totalHeld + (domain.summary?.totalHeld || 0),
            totalDelayed: acc.summaryData.totalDelayed + (domain.summary?.totalDelayed || 0),
            totalLoaded: acc.summaryData.totalLoaded + (domain.summary?.totalLoaded || 0),
            totalClicked: acc.summaryData.totalClicked + (domain.summary?.totalClicked || 0),
          },
        }),
        {
          emailCount: 0,
          summaryData: {
            totalSent: 0,
            totalHardFail: 0,
            totalSoftFail: 0,
            totalBounce: 0,
            totalError: 0,
            totalHeld: 0,
            totalDelayed: 0,
            totalLoaded: 0,
            totalClicked: 0,
          },
        }
      );

      return NextResponse.json({
        domain: {
          id: "admin-all",
          name: "All Domains",
          emailCount: aggregatedData.emailCount,
          summary: aggregatedData.summaryData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        userEmail: user.email,
        userDomain: "All Domains",
        isAdmin: true,
        allDomains: domains.map((d) => ({
          id: d.id,
          name: d.name,
          emailCount: d._count.emails,
          summary: d.summary,
        })),
      });
    } else {
      // Extract domain from user's email (e.g., gmane@gidy.com -> gidy.com)
      const userEmailDomain = user.email.split("@")[1];

      if (!userEmailDomain) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

      // Find the domain in the database that matches the user's email domain
      const domain = await prisma.domain.findUnique({
        where: { name: userEmailDomain },
        include: {
          summary: true,
          _count: { select: { emails: true } },
        },
      });

      if (!domain) {
        return NextResponse.json(
          {
            error: "No domain data found",
            userDomain: userEmailDomain,
            message: "No email data exists for your domain",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        domain: {
          id: domain.id,
          name: domain.name,
          emailCount: domain._count.emails,
          summary: domain.summary,
          createdAt: domain.createdAt,
          updatedAt: domain.updatedAt,
        },
        userEmail: user.email,
        userDomain: userEmailDomain,
        isAdmin: false,
      });
    }
  } catch (error) {
    console.error("Error fetching domain data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
