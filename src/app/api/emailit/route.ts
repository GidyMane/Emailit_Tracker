import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Push this request to QStash
    const response = await fetch(`${process.env.QSTASH_URL}/v2/publish/${process.env.NEXT_PUBLIC_BASE_URL}/api/qstash/emailit`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.QSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("QStash enqueue failed:", error);
      return NextResponse.json({ error: "Failed to enqueue" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook enqueue error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
