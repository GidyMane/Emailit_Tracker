import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { prisma } from "@/lib/prisma";

async function handler(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { event_id, type, object } = body;
    const emailObj = object;

    if (!emailObj || !emailObj.from) {
      return NextResponse.json(
        { error: "Invalid payload: missing email object" },
        { status: 400 }
      );
    }

    const domainName = emailObj.from.includes("@")
      ? emailObj.from.split("@")[1]
      : "unknown";

    await prisma.$transaction(async (tx) => {
      // Upsert email
      const email = await tx.email.upsert({
        where: { messageId: emailObj.message_id },
        update: {
          to: emailObj.to,
          from: emailObj.from,
          subject: emailObj.subject,
          spamStatus: emailObj.spam_status,
        },
        create: {
          emailId: emailObj.id,
          token: emailObj.token,
          messageId: emailObj.message_id,
          to: emailObj.to,
          from: emailObj.from,
          subject: emailObj.subject,
          spamStatus: emailObj.spam_status,
          domain: {
            connectOrCreate: {
              where: { name: domainName },
              create: { name: domainName },
            },
          },
        },
      });

      // Insert event
      await tx.emailEvent.create({
        data: {
          eventId: event_id,
          type,
          status: object.status ?? null,
          occurredAt: object.timestamp
            ? new Date(object.timestamp * 1000)
            : new Date(),
          emailId: email.id,
          ipAddress: object.ip_address ?? null,
          country: object.country ?? null,
          city: object.city ?? null,
          userAgent: object.user_agent ?? null,
          linkId: object.link?.id ? String(object.link.id) : null,
          linkUrl: object.link?.url ?? null,
          rawPayload: body,
        },
      });

      // Update domain summary
      const domain = await tx.domain.findUnique({
        where: { name: domainName },
      });

      if (domain) {
        await tx.emailSummary.upsert({
          where: { domainId: domain.id },
          create: {
            domainId: domain.id,
            totalSent: type === "sent" ? 1 : 0,
            totalHardFail: type === "hardfail" ? 1 : 0,
            totalSoftFail: type === "softfail" ? 1 : 0,
            totalBounce: type === "bounce" ? 1 : 0,
            totalError: type === "error" ? 1 : 0,
            totalHeld: type === "held" ? 1 : 0,
            totalDelayed: type === "delayed" ? 1 : 0,
            totalLoaded: type === "email.loaded" ? 1 : 0,
            totalClicked: type === "email.link.clicked" ? 1 : 0,
          },
          update: {
            totalSent: type === "sent" ? { increment: 1 } : undefined,
            totalHardFail: type === "hardfail" ? { increment: 1 } : undefined,
            totalSoftFail: type === "softfail" ? { increment: 1 } : undefined,
            totalBounce: type === "bounce" ? { increment: 1 } : undefined,
            totalError: type === "error" ? { increment: 1 } : undefined,
            totalHeld: type === "held" ? { increment: 1 } : undefined,
            totalDelayed: type === "delayed" ? { increment: 1 } : undefined,
            totalLoaded: type === "email.loaded" ? { increment: 1 } : undefined,
            totalClicked: type === "email.link.clicked" ? { increment: 1 } : undefined,
          },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(" QStash consumer error:", error);
    return NextResponse.json(
      { error: "Failed to process event" },
      { status: 500 }
    );
  }
}


export const POST = verifySignatureAppRouter(handler);
