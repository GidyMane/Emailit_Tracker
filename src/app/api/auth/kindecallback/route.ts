// import { NextRequest, NextResponse } from "next/server";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: NextRequest) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user || !user.id) {
//     return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
//   }

//   const existingUser = await prisma.user.findUnique({
//     where: { kindeId: user.id },
//   });

//   if (!existingUser) {
//     await prisma.user.create({
//       data: {
//         kindeId: user.id,
//         email: user.email || "",
//         name: user.given_name || "",
//       },
//     });
//   }

//   return NextResponse.json({ success: true });
// }


import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  // 1. Check if user exists in DB
  let existingUser = await prisma.user.findUnique({
    where: { kindeId: user.id },
  });

  // 2. If not, create the user
  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        kindeId: user.id,
        email: user.email || "",
        name: user.given_name || "",
      },
    });
  }

  // 3. Extract domain from user email
  const emailDomain = user.email?.split("@")[1];
  if (!emailDomain) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // 4. Check if that domain exists in DB
  const matchingDomain = await prisma.domain.findUnique({
    where: { name: emailDomain },
  });

  if (matchingDomain && !matchingDomain.userId) {
    // 5. Link domain to user
    await prisma.domain.update({
      where: { name: emailDomain },
      data: { userId: existingUser.id },
    });
  }

  return NextResponse.json({ success: true });
}
