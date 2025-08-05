import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { kindeId: user.id },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        kindeId: user.id,
        email: user.email || "",
        name: user.given_name || "",
      },
    });
  }

  return NextResponse.json({ success: true });
}
