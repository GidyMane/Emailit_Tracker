import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/api/auth/[kindeAuth]",
  "/api/auth/kindecallback",
  "/api/emailit/webhook" 
]

const apiAuthPrefix = "/api/auth"

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Skip auth for API auth routes
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicPaths.some(path => {
    if (path.includes('[') && path.includes(']')) {
      // Handle dynamic routes like /api/auth/[kindeAuth]
      const pathPattern = path.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(nextUrl.pathname);
    }
    return nextUrl.pathname === path;
  });

  if (isApiAuthRoute || isPublicRoute) {
    return null;
  }

  // Apply auth to all other routes
  return withAuth(req, {
    isReturnToCurrentPage: true
  });
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/dashboard',
  ],
}
