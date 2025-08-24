import { prisma } from "@/lib/prisma";

// Types for webhook payload
interface EmailitWebhookPayload {
  event_id?: string;
  type: string;
  object?: {
    email?: {
      message_id?: string;
      id?: number;
      token?: string;
      from?: string;
      to?: string;
      subject?: string;
      spam_status?: string;
    };
    timestamp?: number;
    status?: string;
    ip_address?: string;
    country?: string;
    city?: string;
    user_agent?: string;
    link?: {
      id?: string;
      url?: string;
    };
  };
}

// Interface for EmailSummary fields
interface EmailSummaryFields {
  totalSent: number;
  totalHardFail: number;
  totalSoftFail: number;
  totalBounce: number;
  totalError: number;
  totalHeld: number;
  totalDelayed: number;
  totalLoaded: number;
  totalClicked: number;
}

// Type for email update fields
type EmailUpdateFields = {
  deliveryStatus?: string;
  sentAt?: Date;
  firstOpenAt?: Date;
  firstClickAt?: Date;
};

const DELIVERY_STATUS_MAP: Record<string, string> = {
  "email.delivery.sent": "sent",
  "email.delivery.hardfail": "hardfail",
  "email.delivery.softfail": "softfail",
  "email.delivery.bounce": "bounce",
  "email.delivery.error": "error",
  "email.delivery.held": "held",
  "email.delivery.delayed": "delayed",
};

const SUMMARY_FIELD_MAP: Record<string, keyof EmailSummaryFields> = {
  sent: "totalSent",
  hardfail: "totalHardFail",
  softfail: "totalSoftFail",
  bounce: "totalBounce",
  error: "totalError",
  held: "totalHeld",
  delayed: "totalDelayed",
};

export async function processEmailitEvent(payload: EmailitWebhookPayload) {
  const eventId = String(payload.event_id ?? crypto.randomUUID());
  const type = payload.type;
  const obj = payload.object ?? {};

  // Email details
  const emailObj = obj.email ?? {};
  if (!emailObj.message_id) {
    throw new Error("Webhook payload missing email.message_id");
  }

  const messageId = String(emailObj.message_id);
  const providerEmailId = Number(emailObj.id ?? 0);
  const token = emailObj.token ?? "unknown-token";
  const domainName = emailObj.from?.split("@")[1]?.toLowerCase() ?? "unknown";

  // Convert timestamp to JS Date
  const occurredAt = obj.timestamp ? new Date(obj.timestamp * 1000) : new Date();

  // Engagement / metadata
  const ipAddress = obj.ip_address ?? null;
  const country = obj.country ?? null;
  const city = obj.city ?? null;
  const userAgent = obj.user_agent ?? null;
  const linkId = obj.link?.id ? String(obj.link.id) : null;
  const linkUrl = obj.link?.url ?? null;

  return await prisma.$transaction(async (tx) => {
    // 1) Ensure domain exists
    const domain = await tx.domain.upsert({
      where: { name: domainName },
      update: {},
      create: { name: domainName },
      select: { id: true },
    });

    // 2) Ensure email exists
    const email = await tx.email.upsert({
      where: { messageId },
      update: { domainId: domain.id },
      create: {
        emailId: providerEmailId,
        token,
        messageId,
        to: emailObj.to,
        from: emailObj.from,
        subject: emailObj.subject,
        spamStatus: emailObj.spam_status ? parseInt(emailObj.spam_status, 10) : null,
        domainId: domain.id,
      },
      select: {
        id: true,
        deliveryStatus: true,
        sentAt: true,
        firstOpenAt: true,
        firstClickAt: true,
      },
    });

    // 3) Always create event (no duplicate checks)
    await tx.emailEvent.create({
      data: {
        eventId,
        type,
        status: obj.status ?? null,
        occurredAt,
        emailId: email.id,
        ipAddress,
        country,
        city,
        userAgent,
        linkId,
        linkUrl,
        rawPayload: payload as any,
      },
    });

    // 4) Update email state
    const updates: EmailUpdateFields = {};
    let newStatus: string | null = null;

    if (type.startsWith("email.delivery.")) {
      newStatus = DELIVERY_STATUS_MAP[type];
      updates.deliveryStatus = newStatus;
      if (type === "email.delivery.sent" && !email.sentAt) {
        updates.sentAt = occurredAt;
      }
    }

    if (type === "email.loaded" && !email.firstOpenAt) {
      updates.firstOpenAt = occurredAt;
    }
    if (type === "email.link.clicked" && !email.firstClickAt) {
      updates.firstClickAt = occurredAt;
    }

    if (Object.keys(updates).length > 0) {
      await tx.email.update({
        where: { id: email.id },
        data: updates,
      });
    }

    // 5) Update EmailSummary counters
    if (newStatus && SUMMARY_FIELD_MAP[newStatus]) {
      await tx.emailSummary.upsert({
        where: { domainId: domain.id },
        update: { [SUMMARY_FIELD_MAP[newStatus]]: { increment: 1 } },
        create: {
          domainId: domain.id,
          totalSent: newStatus === "sent" ? 1 : 0,
          totalHardFail: newStatus === "hardfail" ? 1 : 0,
          totalSoftFail: newStatus === "softfail" ? 1 : 0,
          totalBounce: newStatus === "bounce" ? 1 : 0,
          totalError: newStatus === "error" ? 1 : 0,
          totalHeld: newStatus === "held" ? 1 : 0,
          totalDelayed: newStatus === "delayed" ? 1 : 0,
        },
      });
    }

    if (type === "email.loaded") {
      await tx.emailSummary.upsert({
        where: { domainId: domain.id },
        update: { totalLoaded: { increment: 1 } },
        create: { domainId: domain.id, totalLoaded: 1 },
      });
    }

    if (type === "email.link.clicked") {
      await tx.emailSummary.upsert({
        where: { domainId: domain.id },
        update: { totalClicked: { increment: 1 } },
        create: { domainId: domain.id, totalClicked: 1 },
      });
    }

    return { eventId, type, messageId };
  });
}
