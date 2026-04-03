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

    console.log(`[GET /api/suppressions] Search term: "${searchTerm}"`);
    console.log(`[GET /api/suppressions] API Key configured: ${!!process.env.EMAILIT_API_KEY}`);

    // If searching, first try direct lookup using the suppression ID endpoint
    // This is much faster than fetching all suppressions, especially with 10k+
    if (searchTerm) {
      console.log(`[GET /api/suppressions] Attempting direct lookup for: "${searchTerm}"`);
      const directLookupResult = await attemptDirectLookup(searchTerm);
      if (directLookupResult) {
        console.log(`[GET /api/suppressions] Direct lookup succeeded!`);
        suppressions = [directLookupResult];
      } else {
        // Direct lookup failed - email might be partial match
        // For performance, only fetch first page instead of all 10k+ suppressions
        console.log(`[GET /api/suppressions] Direct lookup failed, fetching first page for partial matches`);
        suppressions = await listAndFilterSuppressions(searchTerm, true); // limit to first page
      }
    } else {
      // No search term, list first page only
      suppressions = await listAndFilterSuppressions("", true);
    }

    console.log(`[GET /api/suppressions] Response: ${suppressions.length} suppressions found`);

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
    const url = `https://api.emailit.com/v1/suppressions/${encodedSearchTerm}`;

    console.log(`[Direct Lookup] Searching for: "${searchTerm}" -> URL: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log(`[Direct Lookup] Response status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`[Direct Lookup] Success! Found suppression:`, data);
      // The API returns the suppression object directly based on the docs
      // It should have an "object" field with value "suppression"
      return data;
    } else if (response.status === 404) {
      // Not found - return null to fall back to list
      console.log(`[Direct Lookup] Email/ID not found (404)`);
      return null;
    } else {
      // Other error - log it and fall back
      const errorText = await response.text();
      console.log(`[Direct Lookup] API error ${response.status}:`, errorText);
      return null;
    }
  } catch (error) {
    // Timeout or network error, fall back to list
    console.warn("[Direct Lookup] Error:", error);
    return null;
  }
}

// List suppressions with optional filtering and pagination
// limitToFirstPage: if true, only fetch the first page for performance (useful with 10k+ items)
async function listAndFilterSuppressions(searchTerm: string, limitToFirstPage: boolean = false): Promise<EmailItSuppression[]> {
  try {
    let allSuppressions: EmailItSuppression[] = [];
    let nextPageUrl: string | null = `https://api.emailit.com/v1/suppressions?limit=100`;
    let pageCount = 0;
    const maxPages = limitToFirstPage ? 1 : 999; // Limit to 1 page if limitToFirstPage is true

    console.log(`[List & Filter] Starting fetch${limitToFirstPage ? " (first page only)" : " (all pages)"}${searchTerm ? ` (will filter for: "${searchTerm}")` : ""}`);

    // Fetch pages of suppressions
    while (nextPageUrl && pageCount < maxPages) {
      pageCount++;
      console.log(`[List & Filter] Fetching page ${pageCount} from: ${nextPageUrl}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(nextPageUrl, {
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
        console.error(`[List & Filter] API error on page ${pageCount}:`, response.status, error);
        break; // Stop fetching if we hit an error
      }

      const data = await response.json();

      // Extract suppressions from the response
      let pageSuppressions: EmailItSuppression[] = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.results)
            ? data.results
            : [];

      console.log(`[List & Filter] Page ${pageCount}: Got ${pageSuppressions.length} suppressions`);
      allSuppressions = [...allSuppressions, ...pageSuppressions];

      // Stop if we've hit the page limit
      if (pageCount >= maxPages) {
        console.log(`[List & Filter] Reached page limit, stopping fetch`);
        break;
      }

      // Check if there's a next page
      nextPageUrl = data.next_page_url || null;

      // Handle relative URLs (convert to absolute if needed)
      if (nextPageUrl && !nextPageUrl.startsWith("http")) {
        nextPageUrl = `https://api.emailit.com${nextPageUrl.startsWith("/") ? "" : "/"}${nextPageUrl}`;
      }
    }

    console.log(`[List & Filter] Total suppressions fetched: ${allSuppressions.length} across ${pageCount} pages`);

    // Filter suppressions based on search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const beforeFilter = allSuppressions.length;
      allSuppressions = allSuppressions.filter((suppression) => {
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
      console.log(`[List & Filter] After filtering: ${allSuppressions.length}/${beforeFilter} suppressions match`);
    }

    return allSuppressions;
  } catch (error) {
    console.error("[List & Filter] Error:", error);
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
    // Support both old field names (for backward compatibility) and new ones
    const email = body.email || body.name;
    const reason = body.reason || body.description || "manual";
    const type = body.type || "recipient";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
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

    console.log(`[POST /api/suppressions] Creating suppression for: ${email}`);

    // Call EmailIt API to create suppression
    const response = await callEmailItAPI(
      "/suppressions",
      "POST",
      {
        email,
        type,
        reason
      }
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
    console.log(`[POST /api/suppressions] Successfully created suppression:`, data);
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
