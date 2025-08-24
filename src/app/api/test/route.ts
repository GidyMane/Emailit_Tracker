import { processEmailitEvent } from "@/app/lib/emailit-processor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Webhook received:", body);

  const events = Array.isArray(body) ? body : [body];
  const results = [];

  for (const evt of events) {
    try {
      const r = await processEmailitEvent(evt);
      results.push({ ok: true, eventId: r.eventId, type: r.type });
    } catch (err: any) {
      console.error("Error processing event:", err);
      results.push({ ok: false, error: err.message });
    }
  }

  return NextResponse.json({ results });
}
