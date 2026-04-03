import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function DELETE(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const adminEmails = ["info@websoftdevelopment.com", "muragegideon2000@gmail.com"];
    const isAdmin = adminEmails.includes(user.email);

    // Get suppression ID and domain from request body
    const body = await request.json();
    const { id, domain } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Suppression ID is required" },
        { status: 400 }
      );
    }

    // For non-admin users, verify the domain matches their email domain
    if (!isAdmin) {
      const userEmailDomain = user.email.split("@")[1];
      if (!userEmailDomain) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
      if (domain && domain !== userEmailDomain) {
        return NextResponse.json(
          { error: "Unauthorized to delete suppressions for this domain" },
          { status: 403 }
        );
      }
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

    // Call EmailIt API to delete suppression (v2)
    const response = await fetch(`https://api.emailit.com/v2/suppressions/${id}`, {
      method: "DELETE",
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
