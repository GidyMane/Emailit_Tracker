import { NextRequest, NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

const client = new Client({ token: process.env.QSTASH_TOKEN! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    
    const result = await client.publishJSON({
      url: `https://emailit-tracker.vercel.app/api/emailit`, // the processor route
      body,
    });

    return NextResponse.json({
      success: true,
      qstashMessageId: result.messageId,
    });
  } catch (error) {
    console.error("Webhook enqueue error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
