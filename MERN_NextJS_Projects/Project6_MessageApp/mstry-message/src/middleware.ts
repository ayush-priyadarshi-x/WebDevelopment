import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If no token is found, redirect to /sign-up
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If token is found, redirect to /dashboard
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Only match the root path
};
