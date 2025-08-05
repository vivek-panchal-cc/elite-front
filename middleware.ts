import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  const token = request.cookies.get("token")?.value;

  // Define your public routes here
  const publicPaths = ["/"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // API routes check
  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!token && !request.nextUrl.pathname.startsWith("/api/auth")) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return response;
  }

  if (!token && !isPublicPath) {
    // Not authenticated, trying to access private route
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isPublicPath) {
    // Authenticated, trying to access public route
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
