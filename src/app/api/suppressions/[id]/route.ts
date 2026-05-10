import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface SuppressionResponse {
  id: string;
  object?: string;
  email: string;
  type?: string;
  reason?: string;
  timestamp?: string;
  keep_until?: string | null;
}

const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];

async function callEmailItAPI(
  endpoint: string,
  method: string,
  body?: Record<string, unknown>
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`https://api.emailit.com/v2${endpoint}`, options);
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// GET /api/suppressions/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!adminEmails.includes(user.email)) {
      return NextResponse.json(
        { error: "Only admins can retrieve suppression details" },
        { status: 403 }
      );
    }

    if (!process.env.EMAILIT_API_KEY) {
      return NextResponse.json({ error: "EmailIt API key not configured" }, { status: 500 });
    }

    const { id } = await params;
    // Encode so email addresses work as lookup keys
    const encodedId = encodeURIComponent(id);
    const response = await callEmailItAPI(`/suppressions/${encodedId}`, "GET");

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `EmailIt API error: ${response.status}`, details: error },
        { status: response.status }
      );
    }

    const data: SuppressionResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/suppressions/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!adminEmails.includes(user.email)) {
      return NextResponse.json({ error: "Only admins can update suppressions" }, { status: 403 });
    }

    const body = await request.json();

    const email = body.email;
    const reason = body.reason || body.description;
    const type = body.type;
    const keep_until = body.keep_until;

    if (!email && !reason && !type && keep_until === undefined) {
      return NextResponse.json(
        { error: "At least one field (email, reason, type, keep_until) is required" },
        { status: 400 }
      );
    }

    if (!process.env.EMAILIT_API_KEY) {
      return NextResponse.json({ error: "EmailIt API key not configured" }, { status: 500 });
    }

    const updatePayload: Record<string, unknown> = {};
    if (email) updatePayload.email = email;
    if (reason) updatePayload.reason = reason;
    if (type) updatePayload.type = type;
    if (keep_until !== undefined) updatePayload.keep_until = keep_until;

    const { id } = await params;
    const encodedId = encodeURIComponent(id);
    const response = await callEmailItAPI(`/suppressions/${encodedId}`, "POST", updatePayload);

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `EmailIt API error: ${response.status}`, details: error },
        { status: response.status }
      );
    }

    const data: SuppressionResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/suppressions/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.EMAILIT_API_KEY) {
      return NextResponse.json({ error: "EmailIt API key not configured" }, { status: 500 });
    }

    const { id } = await params;

    console.log(`[DELETE] Raw id from Next.js params: "${id}" (type: ${typeof id})`);

    if (!id || id === "undefined" || id === "null") {
      return NextResponse.json(
        { error: "Suppression ID is missing or invalid" },
        { status: 400 }
      );
    }

    const encodedId = encodeURIComponent(id);
    const url = `https://api.emailit.com/v2/suppressions/${encodedId}`;
    console.log(`[DELETE] Calling Emailit: DELETE ${url}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    // Do NOT send Content-Type: application/json on a bodyless DELETE.
    // Emailit uses Fastify which tries to parse a JSON body when that header
    // is present — an empty body causes a FastifyError 400.
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
        // No Content-Type header — no body to describe
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log(`[DELETE] Emailit responded with status: ${response.status}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[DELETE] Emailit error body:`, errorBody);
      return NextResponse.json(
        { error: `EmailIt API error: ${response.status}`, details: errorBody },
        { status: response.status }
      );
    }

    // Emailit may return empty body or JSON — handle both
    const rawText = await response.text();
    let data: Record<string, unknown> = {};
    try { if (rawText.trim()) data = JSON.parse(rawText); } catch { /* empty body is fine */ }
    console.log(`[DELETE] Success:`, data);

    return NextResponse.json({
      success: true,
      deleted: true,
      id,
      message: "Suppression deleted successfully",
      ...data,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }
    console.error("[DELETE] Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
