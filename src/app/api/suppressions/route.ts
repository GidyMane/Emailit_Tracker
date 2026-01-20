import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];

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

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const isAdmin = adminEmails.includes(user.email);

    // Derive domain from user email
    const userEmailDomain = user.email.split("@")[1];
    if (!userEmailDomain) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    const userDomain = userEmailDomain;

    // Get search parameter
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("search") || "";

    // Validate API key
    if (!process.env.EMAILIT_API_KEY) {
      console.error("EMAILIT_API_KEY not configured");
      return NextResponse.json(
        { error: "EmailIt API key not configured" },
        { status: 500 }
      );
    }

    // Create AbortController for 30-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    // Call EmailIt API to get suppressions
    const response = await fetch("https://api.emailit.com/v1/suppressions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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

    const data = await response.json();

    // If API returns array directly, use it; otherwise check for data property
    let suppressions = Array.isArray(data) ? data : data.data || [];

    // Filter suppressions based on search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      suppressions = suppressions.filter((suppression: any) => {
        const name = suppression.name?.toLowerCase() || "";
        const email = suppression.email?.toLowerCase() || "";
        const description = suppression.description?.toLowerCase() || "";

        return (
          name.includes(searchLower) ||
          email.includes(searchLower) ||
          description.includes(searchLower)
        );
      });
    }

    return NextResponse.json({
      suppressions: suppressions,
      domain: userDomain,
      isAdmin,
      count: suppressions.length,
    });
  } catch (error) {
    console.error("Error fetching suppressions:", error);

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

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const isAdmin = adminEmails.includes(user.email);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admins can create suppressions" },
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

    // Validate API key
    if (!process.env.EMAILIT_API_KEY) {
      console.error("EMAILIT_API_KEY not configured");
      return NextResponse.json(
        { error: "EmailIt API key not configured" },
        { status: 500 }
      );
    }

    // Call EmailIt API to create suppression
    const response = await callEmailItAPI(
      "/suppressions",
      "POST",
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

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating suppression:", error);

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
