import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

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
          domainId: domain.id,
        },
      });

      // Update EmailSummary based on new schema structure
      const incrementData: Record<string, { increment: number }> = {};

      // Handle delivery events with new schema fields
      if (parsed.type.startsWith("email.delivery.")) {
        incrementData.totalSent = { increment: 1 };

        // Map event types to new schema fields
        switch (parsed.type) {
          case "email.delivery.sent":
            // Don't increment anything extra for sent, just totalSent
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

      // Update email summary with new schema
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
