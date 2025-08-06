import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRouteType } from "./app/route.config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Allow static files and internal Next.js paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const routeType = getRouteType(pathname);

  if ((routeType === "private" || routeType === "admin") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (routeType === "public" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Exclude static files and public assets from middleware
      Only run middleware on routes other than /api, /_next/static, /_next/image, favicon.ico, etc.
    */
    "/((?!api|_next/static|_next/image|favicon.ico|static).*)",
  ],
};
