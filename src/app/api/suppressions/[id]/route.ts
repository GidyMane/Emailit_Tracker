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

// FIX 1: Use v2
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
    const response = await callEmailItAPI(`/suppressions/${id}`, "GET");

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

// FIX 3: PATCH — send the correct Emailit field names (reason, type, keep_until)
// The old code sent { name, description } which are not valid Emailit suppression fields.
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

    // Accept correct Emailit field names; keep legacy aliases for safety
    const email = body.email;
    const reason = body.reason || body.description;
    const type = body.type;
    const keep_until = body.keep_until;

    // At least one field must be provided
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
    const response = await callEmailItAPI(`/suppressions/${id}`, "POST", updatePayload);

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

    // Any authenticated user can delete a suppression (no admin restriction)
    if (!process.env.EMAILIT_API_KEY) {
      return NextResponse.json({ error: "EmailIt API key not configured" }, { status: 500 });
    }

    const { id } = await params;

    // URL-encode the id in case it is an email address (@ must be %40)
    const encodedId = encodeURIComponent(id);
    console.log(`[DELETE /api/suppressions/${id}] Calling Emailit DELETE /suppressions/${encodedId}`);

    const response = await callEmailItAPI(`/suppressions/${encodedId}`, "DELETE");

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[DELETE suppression] Emailit returned ${response.status}:`, errorBody);
      return NextResponse.json(
        { error: `EmailIt API error: ${response.status}`, details: errorBody },
        { status: response.status }
      );
    }

    // Emailit docs show a JSON body but the real API may return an empty 200/204
    const rawText = await response.text();
    let data: Record<string, unknown> = {};
    try { if (rawText.trim()) data = JSON.parse(rawText); } catch { /* empty body */ }
    console.log(`[DELETE suppression] Success (status ${response.status}):`, data);

    return NextResponse.json({
      success: true,
      deleted: true,
      id,
      message: `Suppression deleted successfully`,
      ...data,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
