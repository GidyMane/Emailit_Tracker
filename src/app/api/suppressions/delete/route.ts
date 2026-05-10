import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function DELETE(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Any authenticated user can delete a suppression
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Suppression ID is required" },
        { status: 400 }
      );
    }

    if (!process.env.EMAILIT_API_KEY) {
      return NextResponse.json({ error: "EmailIt API key not configured" }, { status: 500 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    // Fixed: v1 → v2
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
        { error: `EmailIt API error: ${response.status}`, details: error },
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
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
