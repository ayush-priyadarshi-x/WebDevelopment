import { NextResponse } from "next/server";

// Middleware function to intercept requests
export function middleware(request) {
  const { pathname } = request.nextUrl; // Extract the pathname from the request URL

  // Check if the path starts with "/about" or "/contact"
  if (pathname.startsWith("/about") || pathname.startsWith("/contact")) {
    // Rewrite the request to the home page
    return NextResponse.rewrite(new URL("/", request.url));
  }
}
