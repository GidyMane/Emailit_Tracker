import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface SuppressionResponse {
  id: string;
  name?: string;
  email?: string;
  status?: string;
  description?: string;
  created_at?: string;
  [key: string]: any;
}

const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];

async function checkAdminStatus(user: any): Promise<boolean> {
  return adminEmails.includes(user?.email);
}

function isEmail(str: string): boolean {
  // Simple email validation - checks for @ symbol
  // Suppression IDs start with 'sup_' while emails contain @
  return !str.startsWith('sup_') && str.includes('@');
}

async function callEmailItAPI(
  endpoint: string,
  method: string,
  body?: Record<string, any>
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
    const response = await fetch(`https://api.emailit.com/v1${endpoint}`, options);
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// GET /api/suppressions/:id - Retrieve a specific suppression
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

    if (!process.env.EMAILIT_API_KEY) {
      console.error("EMAILIT_API_KEY not configured");
      return NextResponse.json(
        { error: "EmailIt API key not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;

    // Allow email-based lookups for all authenticated users
    // Only restrict suppression ID lookups to admins
    const isEmail_lookup = isEmail(id);
    if (!isEmail_lookup) {
      const isAdmin = await checkAdminStatus(user);
      if (!isAdmin) {
        return NextResponse.json(
          { error: "Only admins can retrieve suppression details by ID" },
          { status: 403 }
        );
      }
    }

    // Handle both ID (sup_xxx) and email address lookups
    // If it's an email, ensure it's properly URL-encoded for the EmailIt API
    const encodedId = isEmail_lookup ? encodeURIComponent(id) : id;
    const response = await callEmailItAPI(`/suppressions/${encodedId}`, "GET");

    if (!response.ok) {
      const error = await response.text();
      console.error("EmailIt API error:", response.status, error);
      return NextResponse.json(
        {
          error: `EmailIt API error: ${response.status}`,
          details: error,
        },
        { status: response.status }
      );
    }

    const data: SuppressionResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error retrieving suppression:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timeout" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/suppressions/:id - Update a suppression
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

    const isAdmin = await checkAdminStatus(user);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admins can update suppressions" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!process.env.EMAILIT_API_KEY) {
      console.error("EMAILIT_API_KEY not configured");
      return NextResponse.json(
        { error: "EmailIt API key not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;
    // Handle both ID (sup_xxx) and email address lookups
    // If it's an email, ensure it's properly URL-encoded for the EmailIt API
    const encodedId = isEmail(id) ? encodeURIComponent(id) : id;
    const response = await callEmailItAPI(
      `/suppressions/${encodedId}`,
      "PATCH",
      { name, ...(description && { description }) }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("EmailIt API error:", response.status, error);
      return NextResponse.json(
        {
          error: `EmailIt API error: ${response.status}`,
          details: error,
        },
        { status: response.status }
      );
    }

    const data: SuppressionResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating suppression:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timeout" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/suppressions/:id - Delete a suppression
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
      console.error("EMAILIT_API_KEY not configured");
      return NextResponse.json(
        { error: "EmailIt API key not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;
    // Handle both ID (sup_xxx) and email address lookups
    // If it's an email, ensure it's properly URL-encoded for the EmailIt API
    const encodedId = isEmail(id) ? encodeURIComponent(id) : id;
    const response = await callEmailItAPI(`/suppressions/${encodedId}`, "DELETE");

    if (!response.ok) {
      const error = await response.text();
      console.error("EmailIt API error:", response.status, error);
      return NextResponse.json(
        {
          error: `EmailIt API error: ${response.status}`,
          details: error,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Suppression ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting suppression:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timeout" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
