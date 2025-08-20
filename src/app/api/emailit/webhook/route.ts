import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const EmailObjectSchema = z.object({
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
});

// Define the base webhook payload schema
const EmailitPayloadSchema = z.array(
  z.object({
    webhook_request_id: z.string(),
    event_id: z.string(),
    type: z.string(),
    object: z.object({
      email: EmailObjectSchema,
      status: z.string().optional(),
      details: z.string().optional(),
      sent_with_ssl: z.union([z.boolean(), z.string(), z.number()]).nullable().optional(),
      timestamp: z.number(),
      time: z.number().optional(),
      // For engagement events
      ip_address: z.string().optional(),
      country: z.string().optional(), 
      city: z.string().optional(),
      user_agent: z.string().optional(),
      // For click events
      link: z.object({
        id: z.number(),
        url: z.string(),
      }).optional(),
    }),
  })
);

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const events = EmailitPayloadSchema.parse(payload);

    for (const parsed of events) {
      const email = parsed.object.email;
      const domainName = email.from.split("@")[1]?.toLowerCase();

      if (!domainName) {
        console.warn("Invalid email format, skipping event");
        continue;
      }

      const domain = await prisma.domain.findUnique({
        where: { name: domainName },
      });

      if (!domain) {
        console.warn(`Unknown domain: ${domainName}. Event ignored.`);
        continue;
      }

      // Avoid duplicate entries by messageId
      if (email.message_id) {
        const existingEvent = await prisma.emailEvent.findFirst({
          where: { messageId: email.message_id },
        });
        if (existingEvent) continue;
      }

      // Save raw event
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

      // Update summary based on event type
      const incrementData: Record<string, { increment: number }> = {};

      // Handle delivery events
      if (parsed.type.startsWith("email.delivery.")) {
        incrementData.totalSent = { increment: 1 };

        switch (parsed.type) {
          case "email.delivery.sent":
            // Just count as sent
            break;
          case "email.delivery.hardfail":
            incrementData.totalHardFail = { increment: 1 };
            break;
          case "email.delivery.softfail":
            incrementData.totalSoftFail = { increment: 1 };
            break;
          case "email.delivery.bounce":
            incrementData.totalBounce = { increment: 1 };
            break;
          case "email.delivery.error":
            incrementData.totalError = { increment: 1 };
            break;
          case "email.delivery.held":
            incrementData.totalHeld = { increment: 1 };
            break;
          case "email.delivery.delayed":
            incrementData.totalDelayed = { increment: 1 };
            break;
        }
      }

      // Handle engagement events
      if (parsed.type === "email.loaded") {
        incrementData.totalLoaded = { increment: 1 };
      }

      if (parsed.type === "email.link.clicked") {
        incrementData.totalClicked = { increment: 1 };
      }

      // Update summary if we have data to increment
      if (Object.keys(incrementData).length > 0) {
        await prisma.emailSummary.upsert({
          where: { domainId: domain.id },
          update: incrementData,
          create: {
            domainId: domain.id,
            totalSent: incrementData.totalSent?.increment ?? 0,
            totalHardFail: incrementData.totalHardFail?.increment ?? 0,
            totalSoftFail: incrementData.totalSoftFail?.increment ?? 0,
            totalBounce: incrementData.totalBounce?.increment ?? 0,
            totalError: incrementData.totalError?.increment ?? 0,
            totalHeld: incrementData.totalHeld?.increment ?? 0,
            totalDelayed: incrementData.totalDelayed?.increment ?? 0,
            totalLoaded: incrementData.totalLoaded?.increment ?? 0,
            totalClicked: incrementData.totalClicked?.increment ?? 0,
          },
        });
      }
    }

    return NextResponse.json({ message: "All events processed successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
