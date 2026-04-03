import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];

interface EmailItSuppression {
  name?: string;
  email?: string;
  description?: string;
  reason?: string;
  address?: string;
  type?: string;
}

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

    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("search") || "";
    const selectedDomainId = searchParams.get("domainId");

    let responseDomain = "All Domains";

    if (isAdmin) {
      if (selectedDomainId && selectedDomainId !== "all") {
        const selectedDomain = await prisma.domain.findUnique({
          where: { id: selectedDomainId },
          select: { name: true },
        });

        if (selectedDomain) {
          responseDomain = selectedDomain.name;
        }
      }
    } else {
      const userEmailDomain = user.email.split("@")[1];
      if (!userEmailDomain) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
      responseDomain = userEmailDomain;
    }

    // Validate API key
    if (!process.env.EMAILIT_API_KEY) {
      console.error("EMAILIT_API_KEY not configured");
      return NextResponse.json(
        { error: "EmailIt API key not configured" },
        { status: 500 }
      );
    }

    let suppressions: EmailItSuppression[] = [];

    // If searching, first try direct lookup using the suppression ID endpoint
    // This supports both suppression IDs (sup_xxx) and URL-encoded email addresses
    if (searchTerm) {
      const directLookupResult = await attemptDirectLookup(searchTerm);
      if (directLookupResult) {
        suppressions = [directLookupResult];
      } else {
        // Fall back to listing all suppressions and filtering
        suppressions = await listAndFilterSuppressions(searchTerm);
      }
    } else {
      // No search term, list all suppressions
      suppressions = await listAndFilterSuppressions("");
    }

    return NextResponse.json({
      suppressions: suppressions,
      domain: responseDomain,
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

// Attempt direct lookup using the GET /suppressions/:id endpoint
// Supports both suppression IDs (sup_xxx) and email addresses (URL-encoded)
async function attemptDirectLookup(searchTerm: string): Promise<EmailItSuppression | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // URL-encode the search term in case it's an email address
    // The @ symbol needs to be encoded as %40
    const encodedSearchTerm = encodeURIComponent(searchTerm);

    const response = await fetch(
      `https://api.emailit.com/v1/suppressions/${encodedSearchTerm}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      // Handle both direct object response and wrapped response
      return data.object === "suppression" ? data : data.data || null;
    }

    // If not found (404) or other error, return null to fall back to list
    return null;
  } catch (error) {
    // Timeout or network error, fall back to list
    console.warn("Direct lookup failed, falling back to list:", error);
    return null;
  }
}

// List all suppressions with optional filtering
async function listAndFilterSuppressions(searchTerm: string): Promise<EmailItSuppression[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const emailitParams = new URLSearchParams();
    emailitParams.append("per_page", "1000");

    const response = await fetch(
      `https://api.emailit.com/v1/suppressions?${emailitParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.text();
      console.error("EmailIt API error:", response.status, error);
      return [];
    }

    const data = await response.json();

    // If API returns array directly, use it; otherwise check for data or results property
    let suppressions: EmailItSuppression[] = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.results)
          ? data.results
          : [];

    // Filter suppressions based on search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      suppressions = suppressions.filter((suppression) => {
        const name = suppression.name?.toLowerCase() || "";
        const email = suppression.email?.toLowerCase() || "";
        const description = suppression.description?.toLowerCase() || "";
        const reason = suppression.reason?.toLowerCase() || "";
        const address = suppression.address?.toLowerCase() || "";
        const type = suppression.type?.toLowerCase() || "";

        return (
          name.includes(searchLower) ||
          email.includes(searchLower) ||
          description.includes(searchLower) ||
          reason.includes(searchLower) ||
          address.includes(searchLower) ||
          type.includes(searchLower)
        );
      });
    }

    return suppressions;
  } catch (error) {
    console.error("Error listing suppressions:", error);
    return [];
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
