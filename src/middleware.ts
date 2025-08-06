import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import type { NextRequest } from "next/server";
import axios from "axios";
import { BASE_URL, ROUTES } from "@/app/utils/constants";


export default withAuth(
  async function middleware(req: NextRequest) {
    try {
      await axios.get(`${BASE_URL}${ROUTES.SAVE_USER}`, {
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to sync user:", error.message);
      } else {
        console.error("Unknown error occurred during user sync.");
      }
    }
  },
  {
    publicPaths: ["/blog"],
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
