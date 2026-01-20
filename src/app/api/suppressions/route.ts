import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];
    const isAdmin = adminEmails.includes(user.email);

    // Get domain from query params or derive from user email
    const url = new URL(request.url);
    const domainParam = url.searchParams.get("domain");

    let userDomain: string;

    if (isAdmin && domainParam) {
      // Admin can query any domain
      userDomain = domainParam;
    } else {
      // Non-admin users can only access their own domain
      const userEmailDomain = user.email.split("@")[1];
      if (!userEmailDomain) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
      userDomain = userEmailDomain;
    }

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
    const suppressions = Array.isArray(data) ? data : data.data || [];

    // Filter suppressions by domain
    const filteredSuppressions = suppressions.filter((s: any) => {
      // Extract domain from email if the suppression has an email field
      // or match against the userDomain if there's a domain field
      const suppressionDomain = s.domain || s.email?.split("@")[1];
      return suppressionDomain === userDomain;
    });

    return NextResponse.json({
      suppressions: filteredSuppressions,
      domain: userDomain,
      isAdmin,
      count: filteredSuppressions.length,
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
