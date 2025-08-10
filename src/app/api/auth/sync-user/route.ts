import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user exists in database
    let dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id }
    });

    // If user doesn't exist, create them
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          kindeId: user.id,
          email: user.email,
          name: user.given_name && user.family_name 
            ? `${user.given_name} ${user.family_name}` 
            : user.given_name || user.email.split('@')[0]
        }
      });
    } else {
      // Update user information if it has changed
      dbUser = await prisma.user.update({
        where: { kindeId: user.id },
        data: {
          email: user.email,
          name: user.given_name && user.family_name 
            ? `${user.given_name} ${user.family_name}` 
            : user.given_name || user.email.split('@')[0]
        }
      });
    }

    // Extract domain from user's email
    const userEmailDomain = user.email.split('@')[1];

    // Check if this domain exists in the database
    const domain = await prisma.domain.findUnique({
      where: { name: userEmailDomain }
    });

    return NextResponse.json({
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name
      },
      domain: domain ? {
        id: domain.id,
        name: domain.name,
        hasData: true
      } : {
        name: userEmailDomain,
        hasData: false
      }
    });

  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
