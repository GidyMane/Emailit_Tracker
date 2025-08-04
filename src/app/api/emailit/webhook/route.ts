import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const EmailitPayloadSchema = z.object({
      webhook_request_id: z.string(),
      event_id: z.string(),
      type: z.string(),
      object: z.object({
        email: z.object({
          id: z.number(),
          token: z.string(),
          type: z.string(),
          message_id: z.string(),
          to: z.string(),
          from: z.string(),
          subject: z.string(),
          timestamp: z.string(),
          spam_status: z.number(),
          tag: z.string().nullable(),
        }),
        status: z.string(),
        details: z.string().optional(),
        sent_with_ssl: z.boolean().optional(),
        timestamp: z.number(),
        time: z.number().optional(),
      }),
    });

    const parsed = EmailitPayloadSchema.parse(payload);
    const domainName = parsed.object.email.from.split("@")[1].toLowerCase();

    const domain = await prisma.domain.findUnique({
      where: { name: domainName },
      include: { summary: true },
    });

    if (!domain) {
      return NextResponse.json(
        { message: "Unrecognised domain. Event ignored." },
        { status: 403 }
      );
    }

    // Prevent duplicate events
    const existingEvent = await prisma.emailEvent.findFirst({
      where: { messageId: parsed.object.email.message_id },
    });

    if (existingEvent) {
      console.log("Duplicate email event. Skipping...");
      return NextResponse.json({ message: "Duplicate event ignored" });
    }

    // Save the email event
    await prisma.emailEvent.create({
      data: {
        emailId: parsed.object.email.id,
        token: parsed.object.email.token,
        messageId: parsed.object.email.message_id,
        to: parsed.object.email.to,
        from: parsed.object.email.from,
        subject: parsed.object.email.subject,
        eventType: parsed.type,
        status: parsed.object.status,
        spamStatus: parsed.object.email.spam_status,
        timestamp: new Date(Number(parsed.object.email.timestamp) * 1000),
        domainId: domain.id,
      },
    });

    // Update or create the summary stats
    const incrementData: any = { totalSent: { increment: 1 } };
    if (parsed.type.includes("delivered")) incrementData.totalDelivered = { increment: 1 };
    if (parsed.type.includes("failed")) incrementData.totalFailed = { increment: 1 };

    await prisma.emailSummary.upsert({
      where: { domainId: domain.id },
      update: incrementData,
      create: {
        domainId: domain.id,
        totalSent: 1,
        totalDelivered: parsed.type.includes("delivered") ? 1 : 0,
        totalFailed: parsed.type.includes("failed") ? 1 : 0,
      },
    });

    return NextResponse.json({ message: "Event stored successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
