import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// More relaxed Zod schema
const EmailitPayloadSchema = z.array(
  z.object({
    webhook_request_id: z.string().optional(),
    event_id: z.string().optional(),
    type: z.string().optional(),
    object: z
      .object({
        email: z
          .object({
            id: z.number().optional(),
            token: z.string().optional(),
            type: z.string().optional(),
            message_id: z.string().optional(),
            to: z.string().optional(),
            from: z.string().optional(),
            subject: z.string().optional(),
            timestamp: z.union([z.string(), z.number()]).optional(),
            spam_status: z.number().optional(),
            tag: z.string().nullable().optional(),
          })
          .optional(),
        status: z.string().optional(),
        details: z.string().optional(),
        sent_with_ssl: z.boolean().nullable().optional(),
        timestamp: z.union([z.string(), z.number()]).optional(),
        time: z.union([z.string(), z.number()]).optional(),
      })
      .passthrough(), // allow extra fields
  })
);

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const events = EmailitPayloadSchema.parse(payload);

    for (const parsed of events) {
      const email = parsed.object?.email;
      if (!email?.from) {
        console.warn("Missing 'from' field. Skipping event.");
        continue;
      }

      const domainName = email.from.split("@")[1]?.toLowerCase();
      if (!domainName) {
        console.warn("Invalid 'from' email format. Skipping event.");
        continue;
      }

      const domain = await prisma.domain.findUnique({
        where: { name: domainName },
        include: { summary: true },
      });
      if (!domain) {
        console.warn(`Unknown domain: ${domainName}. Event ignored.`);
        continue;
      }

      // Avoid duplicate entries
      if (email.message_id) {
        const existingEvent = await prisma.emailEvent.findFirst({
          where: { messageId: email.message_id },
        });
        if (existingEvent) continue;
      }

      // Save event
      await prisma.emailEvent.create({
        data: {
          emailId: email.id ?? 0,
          token: email.token ?? "",
          messageId: email.message_id ?? "",
          to: email.to ?? "",
          from: email.from ?? "",
          subject: email.subject ?? "",
          eventType: parsed.type ?? "unknown",
          status: parsed.object.status ?? "unknown",
          spamStatus: email.spam_status ?? 0,
          timestamp: email.timestamp
            ? new Date(Number(email.timestamp) * 1000)
            : new Date(),
          domainId: domain.id,
        },
      });

      // Stats update
      const deliveryEvents = [
        "email.delivery.sent",
        "email.delivery.hardfail",
        "email.delivery.softfail",
        "email.delivery.bounce",
        "email.delivery.error",
        "email.delivery.held",
        "email.delivery.delayed",
      ];

      const engagementEvents: Record<string, string> = {
        "email.loaded": "totalOpens",
        "email.link.clicked": "totalClicks",
      };

      const incrementData: Record<string, { increment: number }> = {};

      if (parsed.type && deliveryEvents.includes(parsed.type)) {
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

      if (parsed.type && parsed.type in engagementEvents) {
        const field = engagementEvents[parsed.type];
        incrementData[field] = { increment: 1 };
      }

      // Update email summary
      if (Object.keys(incrementData).length > 0) {
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
            sentCount: incrementData.sentCount?.increment ?? 0,
            hardfailCount: incrementData.hardfailCount?.increment ?? 0,
            softfailCount: incrementData.softfailCount?.increment ?? 0,
            bounceCount: incrementData.bounceCount?.increment ?? 0,
            errorCount: incrementData.errorCount?.increment ?? 0,
            heldCount: incrementData.heldCount?.increment ?? 0,
            delayedCount: incrementData.delayedCount?.increment ?? 0,
          },
        });
      }
    }

    return NextResponse.json({ message: "Events processed successfully" });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
