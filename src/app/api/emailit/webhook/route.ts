
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function extractDomain(email: string): string {
  return email.split("@")[1].toLowerCase();
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    console.log("📥 Incoming Webhook Payload:", JSON.stringify(payload, null, 2));

    const { webhook_request_id, event_id, type, object } = payload;

    const {
      email,
      status,
      details,
      sent_with_ssl,
      timestamp,
      time
    } = object;

    const sendingDomainName = extractDomain(email.from);
    console.log("🔍 Extracted domain:", sendingDomainName);

    // 1. Upsert SendingDomain
    // const sendingDomain = await prisma.sendingDomain.upsert({
    //   where: { name: sendingDomainName },
    //   update: {},
    //   create: {
    //     name: sendingDomainName,
    //     approved: true
    //   }
    // });

    // console.log("✅ Upserted sending domain:", sendingDomain.name);
    

    // 2. Create EmailEvent
    // const emailEvent = await prisma.emailEvent.create({
    //   data: {
    //     eventId: event_id,
    //     type,
    //     status,
    //     details,
    //     sentWithSSL: sent_with_ssl,
    //     eventTimestamp: new Date(timestamp * 1000),
    //     time: time,
    //     sendingDomainId: sendingDomain.id,
    //     emailId: String(email.id),
    //     messageId: email.message_id,
    //     token: email.token,
    //     to: email.to,
    //     from: email.from,
    //     subject: email.subject,
    //     spamStatus: email.spam_status
    //   }
    // });

    // console.log("📨 Email event stored:", emailEvent.id);

    // 3. Update SummaryStats
    // const stats = await prisma.summaryStats.upsert({
    //   where: { sendingDomainId: sendingDomain.id },
    //   update: { totalSent: { increment: 1 } },
    //   create: {
    //     sendingDomainId: sendingDomain.id,
    //     totalSent: 1
    //   }
    // });

    // console.log("📊 Summary stats updated for domain:", sendingDomain.name);

    return NextResponse.json(
      { message: "Webhook processed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
