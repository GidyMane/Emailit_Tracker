import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Load from env
    // const qstashUrl = process.env.QSTASH_URL || "https://qstash.upstash.io";
    const qstashUrl = "http://127.0.0.1:8080";
    const qstashToken = process.env.QSTASH_TOKEN!;

    if (!qstashToken) {
      throw new Error("QSTASH_TOKEN is missing in env");
    }

    // The endpoint you want QStash to forward messages to
    const targetUrl = "http://localhost:3000/api/test"; // change to your deployed URL

    // Send to QStash
    const res = await axios.post(
      `${qstashUrl}/v2/publish/${targetUrl}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${qstashToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Webhook enqueue result:", res.data);
    const result = res.data?.messageId;

    return NextResponse.json({
      success: true,
      qstashMessageId: result,
    });
  } catch (error: unknown) {
    console.error("Webhook enqueue error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
