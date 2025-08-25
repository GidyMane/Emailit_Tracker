import { processEmailitEvent } from "@/app/lib/emailit-processor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Webhook received:", body);

  const events = Array.isArray(body) ? body : [body];
  const results: Array<{ ok: boolean; eventId?: string; type?: string; error?: string }> = [];

  for (const evt of events) {
    try {
      const r = await processEmailitEvent(evt);
      results.push({ ok: true, eventId: r.eventId, type: r.type });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error processing event:", err.message);
        results.push({ ok: false, error: err.message });
      } else {
        console.error("Error processing event (unknown):", err);
        results.push({ ok: false, error: "Unknown error" });
      }
    }
  }

  return NextResponse.json({ results });
}
