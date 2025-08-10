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

    // Extract domain from user's email (e.g., gmane@gidy.com -> gidy.com)
    const userEmailDomain = user.email.split('@')[1];

    if (!userEmailDomain) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Find the domain in the database that matches the user's email domain
    const domain = await prisma.domain.findUnique({
      where: {
        name: userEmailDomain
      },
      include: {
        summary: true,
        _count: {
          select: {
            emails: true
          }
        }
      }
    });

    if (!domain) {
      return NextResponse.json({ 
        error: "No domain data found",
        userDomain: userEmailDomain,
        message: "No email data exists for your domain" 
      }, { status: 404 });
    }

    return NextResponse.json({
      domain: {
        id: domain.id,
        name: domain.name,
        emailCount: domain._count.emails,
        summary: domain.summary,
        createdAt: domain.createdAt,
        updatedAt: domain.updatedAt
      },
      userEmail: user.email,
      userDomain: userEmailDomain
    });

  } catch (error) {
    console.error("Error fetching domain data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
