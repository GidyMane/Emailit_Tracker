import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Relaxed Zod schema
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

      // --- Stats update ---
      const incrementData: Record<string, { increment: number }> = {};

      switch (parsed.type) {
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
        default:
          console.warn(`Unhandled event type: ${parsed.type}`);
      }

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

    return NextResponse.json({ message: "Events processed successfully" });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
