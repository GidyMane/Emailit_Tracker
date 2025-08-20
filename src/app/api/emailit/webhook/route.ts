import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Flexible email object
const EmailObjectSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  token: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  message_id: z.string().optional().nullable(),
  to: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  timestamp: z.union([z.string(), z.number()]).optional(),
  spam_status: z.union([z.string(), z.number()]).optional().nullable(),
  tag: z.string().optional().nullable(),
}).passthrough(); // allow extra keys

// Flexible event object
const EventObjectSchema = z.object({
  email: EmailObjectSchema.optional(),
  status: z.string().optional(),
  details: z.string().optional(),
  sent_with_ssl: z.union([z.boolean(), z.string(), z.number()]).optional().nullable(),
  timestamp: z.union([z.number(), z.string()]).optional(),
  time: z.union([z.string(), z.number()]).optional(),
  ip_address: z.string().optional(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  user_agent: z.string().optional(),
  link: z.object({
    id: z.union([z.string(), z.number()]).optional(),
    url: z.string().optional(),
  }).optional(),
}).passthrough();

// Flexible payload schema
const EmailitPayloadSchema = z.array(
  z.object({
    webhook_request_id: z.string().optional(),
    event_id: z.string().optional(),
    type: z.string().optional(),
    object: EventObjectSchema,
  }).passthrough()
);

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const events = EmailitPayloadSchema.parse(payload);

    for (const event of events) {
      const email = event.object.email;

      if (!email?.from) {
        console.warn("Event skipped: missing email.from");
        continue;
      }

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

      // Avoid duplicates
      if (email.message_id) {
        const existingEvent = await prisma.emailEvent.findFirst({
          where: { messageId: email.message_id },
        });
        if (existingEvent) continue;
      }

      // Save raw event
      await prisma.emailEvent.create({
        data: {
          emailId: Number(email.id) || 0,
          token: email.token ?? "",
          messageId: email.message_id ?? "",
          to: email.to ?? "",
          from: email.from ?? "",
          subject: email.subject ?? "",
          eventType: event.type ?? "unknown",
          status: event.object.status ?? "unknown",
          spamStatus: Number(email.spam_status) || 0,
          timestamp: email.timestamp
            ? new Date(Number(email.timestamp) * 1000)
            : new Date(),
          domainId: domain.id,
        },
      });

      // Update summary counts
      const incrementData: Record<string, { increment: number }> = {};

      switch (event.type) {
        case "email.delivery.sent":
          incrementData.totalSent = { increment: 1 };
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
        case "email.loaded":
          incrementData.totalLoaded = { increment: 1 };
          break;
        case "email.link.clicked":
          incrementData.totalClicked = { increment: 1 };
          break;
      }

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
