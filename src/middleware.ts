// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
// import type { NextRequest } from "next/server";
// import axios from "axios";
// import { BASE_URL, ROUTES } from "@/app/utils/constants";


// export default withAuth(
//   async function middleware(req: NextRequest) {
//     try {
//       await axios.get(`${BASE_URL}${ROUTES.SAVE_USER}`, {
//         headers: {
//           Cookie: req.headers.get("cookie") || "",
//         },
//       });
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error("Failed to sync user:", error.message);
//       } else {
//         console.error("Unknown error occurred during user sync.");
//       }
//     }
//     console.log("Middleware triggered for path:", req.nextUrl.pathname);
//   },
  
//   {
//     publicPaths: ["/blog", "/api/auth/kindecallback", "/api/auth/[kindeAuth]"],
//   }
// );

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//   ],
// };

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

const publicPaths = [
  // Add any public paths that do not require authentication
  "/",
]

const apiAuthPrefix="/api"





export default function middleware(req:NextRequest) {
  const { nextUrl } = req;

  // for debugging purposes, you can log the current path
  // Uncomment the line below to see the path in the console
  // console.log("Middleware triggered for path:", nextUrl.pathname);


  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicPaths.includes(nextUrl.pathname);


  if (isApiAuthRoute) {
    // If the route is an API auth route, we skip authentication
    // for debugging purposes
    // Uncomment the line below to see the path in the console
    // console.log("Skipping authentication for API auth route:", nextUrl.pathname);
    return null;
  }

  if (isPublicRoute) {
    // If the route is public, we skip authentication
    // for debugging purposes
    // Uncomment the line below to see the path in the console
    // console.log("Skipping authentication for public route:", nextUrl.pathname);
    return null;
  }

  // after checking if a route is public or an API auth route,
  // we can proceed with authentication for all other routes
  // here you can do somelogic before calling withAuth
  // !req.auth  - you can use this to check if the user is authenticated
  // eg const isAuthenticated = !!req.auth;
  // if (isAuthenticated) {
  
  //   console.log("User is authenticated");
  // } else {
  //   console.log("User is not authenticated");
  // }
  // You can add more conditions here to skip authentication for specific paths


  return withAuth(req, {
    isReturnToCurrentPage: true
  });
}



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/dashboard',
    // feel free to add more paths that you want to protect
  ],
}