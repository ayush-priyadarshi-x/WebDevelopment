import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token) {
    // Allow unauthenticated access to auth pages only
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify")
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect authenticated users away from auth pages to the dashboard
  if (
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname.startsWith("/verify")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/verify/:path*", "/home", "/sign-in"],
};
