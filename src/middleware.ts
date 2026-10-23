import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Request routing pipeline
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/category/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};