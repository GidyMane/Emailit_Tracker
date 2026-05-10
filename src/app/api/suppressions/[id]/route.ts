import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];

// FIX 1: Correct field names matching the Emailit v2 API response schema
interface EmailItSuppression {
  id: string;
  object?: string;
  email: string;
  type?: string;
  reason?: string;
  timestamp?: string;
  keep_until?: string | null;
}

// FIX 1: Use v2 (docs show next_page_url pointing to /v2/suppressions)
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


// Fix 2: shared helper — adds Cache-Control header to successful responses
function cachedResponse(data: unknown, maxAge: number): NextResponse {
  const res = NextResponse.json(data)
  res.headers.set(
    "Cache-Control",
    `private, max-age=${maxAge}, stale-while-revalidate=${maxAge * 2}`
  )
  return res
}
export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = adminEmails.includes(user.email);

    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("search") || "";
    const selectedDomainId = searchParams.get("domainId");

    // FIX 2: Read page/limit from query params so the UI can paginate properly
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "25", 10)));

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

    if (!process.env.EMAILIT_API_KEY) {
      console.error("EMAILIT_API_KEY not configured");
      return NextResponse.json(
        { error: "EmailIt API key not configured" },
        { status: 500 }
      );
    }

    console.log(`[GET /api/suppressions] search="${searchTerm}" page=${page} limit=${limit}`);

    if (searchTerm) {
      // FIX 2: Direct lookup first (fast exact match by email), then fall back to page scan
      console.log(`[GET /api/suppressions] Direct lookup for: "${searchTerm}"`);
      const directResult = await attemptDirectLookup(searchTerm);
      if (directResult) {
        console.log(`[GET /api/suppressions] Direct lookup succeeded`);
        // Fix 2: search results are not cached (user expects live data)
        return NextResponse.json({
          suppressions: [directResult],
          domain: responseDomain,
          isAdmin,
          count: 1,
          totalCount: 1,
          page: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        });
      }

      console.log(`[GET /api/suppressions] Direct lookup miss, scanning pages`);
      const matched = await searchAcrossAllPages(searchTerm);
      // Fix 2: search results not cached
      return NextResponse.json({
        suppressions: matched,
        domain: responseDomain,
        isAdmin,
        count: matched.length,
        totalCount: matched.length,
        page: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    }

    // FIX 2: No search — fetch only the requested page from Emailit (server-side pagination)
    const { suppressions, hasNextPage, hasPreviousPage, totalCount } =
      await fetchSinglePage(page, limit);

    const totalPages = totalCount !== null ? Math.ceil(totalCount / limit) : null;

    console.log(`[GET /api/suppressions] Page ${page}: ${suppressions.length} suppressions`);

    // Fix 2: cache the paginated browse (no search) for 60 s — suppression list changes rarely
    return cachedResponse({
      suppressions,
      domain: responseDomain,
      isAdmin,
      count: suppressions.length,
      totalCount,
      page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    }, 60);
  } catch (error) {
    console.error("Error fetching suppressions:", error);
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** FIX 1: v2 direct lookup by email or suppression ID */
async function attemptDirectLookup(searchTerm: string): Promise<EmailItSuppression | null> {
  try {
    const trimmed = searchTerm.trim();
    const encoded = encodeURIComponent(trimmed);
    const url = `https://api.emailit.com/v2/suppressions/${encoded}`;
    console.log(`[Direct Lookup] GET ${url}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log(`[Direct Lookup] Status: ${response.status}`);

    if (response.ok) {
      return (await response.json()) as EmailItSuppression;
    }
    if (response.status === 404) return null;
    console.error(`[Direct Lookup] Unexpected status ${response.status}`);
    return null;
  } catch (error) {
    console.error("[Direct Lookup] Error:", error instanceof Error ? error.message : String(error));
    return null;
  }
}

/** FIX 2: Fetch a single page from Emailit using their native page/limit params */
async function fetchSinglePage(
  page: number,
  limit: number
): Promise<{
  suppressions: EmailItSuppression[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number | null;
}> {
  const url = `https://api.emailit.com/v2/suppressions?page=${page}&limit=${limit}`;
  console.log(`[fetchSinglePage] GET ${url}`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.EMAILIT_API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    const err = await response.text();
    console.error(`[fetchSinglePage] API error ${response.status}:`, err);
    return { suppressions: [], hasNextPage: false, hasPreviousPage: false, totalCount: null };
  }

  const data = await response.json() as Record<string, unknown>;

  const rawList: Record<string, unknown>[] = Array.isArray(data.data)
    ? (data.data as Record<string, unknown>[])
    : Array.isArray(data)
      ? (data as Record<string, unknown>[])
      : [];

  // Log raw fields on first item so we can see exact Emailit response shape
  if (rawList.length > 0) {
    console.log("[fetchSinglePage] Raw fields:", Object.keys(rawList[0]));
    console.log("[fetchSinglePage] Sample:", JSON.stringify(rawList[0]));
  }

  const suppressions: EmailItSuppression[] = rawList.map((s) => ({
    id:         (s.id as string)        || (s.email as string),
    object:     s.object as string      | undefined,
    email:      s.email as string,
    type:       s.type as string        | undefined,
    reason:     s.reason as string      | undefined,
    // Normalise timestamp — docs say "timestamp" but real API may differ
    timestamp:  (s.timestamp as string) || (s.created_at as string) || (s.suppressed_at as string) || undefined,
    keep_until: (s.keep_until as string | null),
  }));

  const hasNextPage = !!data.next_page_url;
  const hasPreviousPage = !!data.previous_page_url;
  const totalCount: number | null = typeof data.total === "number" ? data.total : null;

  return { suppressions, hasNextPage, hasPreviousPage, totalCount };
}

/** Iterate all pages and return every record matching the search term */
async function searchAcrossAllPages(searchTerm: string): Promise<EmailItSuppression[]> {
  const results: EmailItSuppression[] = [];
  const searchLower = searchTerm.toLowerCase();
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    console.log(`[searchAcrossAllPages] Fetching page ${page}`);
    const { suppressions, hasNextPage } = await fetchSinglePage(page, limit);

    for (const s of suppressions) {
      if (
        s.email?.toLowerCase().includes(searchLower) ||
        s.reason?.toLowerCase().includes(searchLower) ||
        s.type?.toLowerCase().includes(searchLower)
      ) {
        results.push(s);
      }
    }

    hasMore = hasNextPage;
    page++;
    if (page > 200) {
      console.warn("[searchAcrossAllPages] Reached 200-page safety limit");
      break;
    }
  }

  console.log(`[searchAcrossAllPages] Found ${results.length} matches`);
  return results;
}

// ─── POST (create suppression) ───────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = adminEmails.includes(user.email);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admins can create suppressions" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // FIX 3: Accept the correct Emailit field names; keep legacy fallbacks for safety
    const email = body.email || body.name;
    const reason = body.reason || body.description || "manual";
    const type = body.type || "recipient";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!process.env.EMAILIT_API_KEY) {
      return NextResponse.json({ error: "EmailIt API key not configured" }, { status: 500 });
    }

    console.log(`[POST /api/suppressions] Creating suppression for: ${email}`);

    const response = await callEmailItAPI("/suppressions", "POST", { email, type, reason });

    if (!response.ok) {
      const error = await response.text();
      console.error("EmailIt API error:", response.status, error);
      return NextResponse.json(
        { error: `EmailIt API error: ${response.status}`, details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating suppression:", error);
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
