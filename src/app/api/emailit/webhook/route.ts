import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

 
    const EmailitPayloadSchema = z.array(
      z.object({
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
          status: z.coerce.string(),
          details: z.string().optional(),
          sent_with_ssl: z.boolean().nullable().optional(),
          timestamp: z.coerce.number(),
          time: z.coerce.number().optional(),
        }),
      })
    );

    const events = EmailitPayloadSchema.parse(payload);

    for (const parsed of events) {
      const domainName = parsed.object.email.from.split("@")[1].toLowerCase();

      const domain = await prisma.domain.findUnique({
        where: { name: domainName },
        include: { summary: true },
      });

      if (!domain) {
        console.warn(`Unknown domain: ${domainName}. Event ignored.`);
        continue;
      }

      const existingEvent = await prisma.emailEvent.findFirst({
        where: { messageId: parsed.object.email.message_id },
      });

      if (existingEvent) {
        console.log("Duplicate email event. Skipping...");
        continue;
      }

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

      const deliveryEvents = [
        "email.delivery.sent",
        "email.delivery.hardfail",
        "email.delivery.softfail",
        "email.delivery.bounce",
        "email.delivery.error",
        "email.delivery.held",
        "email.delivery.delayed",
      ];

      const engagementEvents: { [key: string]: string } = {
        "email.loaded": "totalOpens",
        "email.link.clicked": "totalClicks",
      };

      const incrementData: Record<string, { increment: number }> = {};

      if (deliveryEvents.includes(parsed.type)) {
        incrementData.totalSent = { increment: 1 };

        if (parsed.type === "email.delivery.sent") {
          incrementData.totalDelivered = { increment: 1 };
        }

        if (
          [
            "email.delivery.hardfail",
            "email.delivery.softfail",
            "email.delivery.bounce",
            "email.delivery.error",
          ].includes(parsed.type)
        ) {
          incrementData.totalFailed = { increment: 1 };
        }
      }

      if (parsed.type in engagementEvents) {
        const field = engagementEvents[parsed.type];
        incrementData[field] = { increment: 1 };
      }

      await prisma.emailSummary.upsert({
        where: { domainId: domain.id },
        update: incrementData,
        create: {
          domainId: domain.id,
          totalSent: incrementData.totalSent?.increment ?? 0,
          totalDelivered: incrementData.totalDelivered?.increment ?? 0,
          totalFailed: incrementData.totalFailed?.increment ?? 0,
          totalOpens: incrementData.totalOpens?.increment ?? 0,
          totalClicks: incrementData.totalClicks?.increment ?? 0,
        },
      });
    }

    return NextResponse.json({ message: "All events processed successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing  failed" },
      { status: 500 }
    );
  }
}
