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
<<<<<<< HEAD

    // Base email object schema
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

    // Schema for email delivery events
    const EmailDeliverySchema = z.object({
      webhook_request_id: z.string(),
      event_id: z.string(),
      type: z.enum([
        "email.delivery.sent",
        "email.delivery.hardfail",
        "email.delivery.softfail",
        "email.delivery.bounce",
        "email.delivery.error",
        "email.delivery.held",
        "email.delivery.delayed"
      ]),
      object: z.object({
        email: EmailObjectSchema,
        status: z.string(),
        details: z.string().optional(),
        sent_with_ssl: z.boolean().optional(),
        timestamp: z.number(),
        time: z.number().optional(),
      }),
    });

    // Schema for email opens
    const EmailOpenSchema = z.object({
      webhook_request_id: z.string(),
      event_id: z.string(),
      type: z.literal("email.loaded"),
      object: z.object({
        email: EmailObjectSchema,
        ip_address: z.string(),
        country: z.string().optional(),
        city: z.string().optional(),
        user_agent: z.string().optional(),
        timestamp: z.number(),
      }),
    });

    // Schema for email link clicks
    const EmailClickSchema = z.object({
      webhook_request_id: z.string(),
      event_id: z.string(),
      type: z.literal("email.link.clicked"),
      object: z.object({
        email: EmailObjectSchema,
        link: z.object({
          id: z.number(),
          url: z.string(),
        }),
        ip_address: z.string(),
        country: z.string().optional(),
        city: z.string().optional(),
        user_agent: z.string().optional(),
        timestamp: z.number(),
      }),
    });

    // Union schema for all event types
    const EmailitPayloadSchema = z.array(
      z.union([EmailDeliverySchema, EmailOpenSchema, EmailClickSchema])
    );

=======
>>>>>>> cf3f5bd8b3647fd3b1662b2312e6f7a2b6d66311
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

<<<<<<< HEAD
      // Check for duplicate events based on event_id and message_id combination
      const existingEvent = await prisma.emailEvent.findFirst({
        where: {
          OR: [
            { messageId: parsed.object.email.message_id, eventType: parsed.type },
            { token: parsed.object.email.token, eventType: parsed.type }
          ]
        },
      });

      if (existingEvent) {
        console.log(`Duplicate email event ${parsed.type} for ${parsed.object.email.message_id}. Skipping...`);
        continue;
      }

      // Determine status based on event type
      let status = "";
      if (parsed.type.startsWith("email.delivery.")) {
        // Extract status from delivery event type
        status = parsed.type.replace("email.delivery.", "");
      } else if (parsed.type === "email.loaded") {
        status = "opened";
      } else if (parsed.type === "email.link.clicked") {
        status = "clicked";
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
          status: status,
          spamStatus: parsed.object.email.spam_status,
          timestamp: new Date(Number(parsed.object.email.timestamp) * 1000),
=======
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
>>>>>>> cf3f5bd8b3647fd3b1662b2312e6f7a2b6d66311
          domainId: domain.id,
        },
      });

<<<<<<< HEAD
      // Define all delivery event types
      const deliveryEvents = [
        "email.delivery.sent",
        "email.delivery.hardfail",
        "email.delivery.softfail",
        "email.delivery.bounce",
        "email.delivery.error",
        "email.delivery.held",
        "email.delivery.delayed",
      ];

      const successfulDeliveryEvents = ["email.delivery.sent"];
      const failedDeliveryEvents = [
        "email.delivery.hardfail",
        "email.delivery.softfail",
        "email.delivery.bounce",
        "email.delivery.error"
      ];

      const incrementData: Record<string, { increment: number }> = {};

      // Handle delivery events
      if (deliveryEvents.includes(parsed.type)) {
        incrementData.totalSent = { increment: 1 };

        // Track detailed delivery statuses
        switch (parsed.type) {
          case "email.delivery.sent":
            incrementData.totalDelivered = { increment: 1 };
            incrementData.sentCount = { increment: 1 };
            break;
          case "email.delivery.hardfail":
            incrementData.totalFailed = { increment: 1 };
            incrementData.hardfailCount = { increment: 1 };
            break;
          case "email.delivery.softfail":
            incrementData.totalFailed = { increment: 1 };
            incrementData.softfailCount = { increment: 1 };
            break;
          case "email.delivery.bounce":
            incrementData.totalFailed = { increment: 1 };
            incrementData.bounceCount = { increment: 1 };
            break;
          case "email.delivery.error":
            incrementData.totalFailed = { increment: 1 };
            incrementData.errorCount = { increment: 1 };
            break;
          case "email.delivery.held":
            incrementData.heldCount = { increment: 1 };
            break;
          case "email.delivery.delayed":
            incrementData.delayedCount = { increment: 1 };
            break;
        }
      }

      // Handle engagement events
      if (parsed.type === "email.loaded") {
        incrementData.totalOpens = { increment: 1 };
      }

      if (parsed.type === "email.link.clicked") {
        incrementData.totalClicks = { increment: 1 };
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
=======
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
>>>>>>> cf3f5bd8b3647fd3b1662b2312e6f7a2b6d66311
    }

    return NextResponse.json({ message: "Events processed successfully" });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
