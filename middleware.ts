import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Define your public routes here
  const publicPaths = ['/', '/login', '/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    // Not authenticated, trying to access private route
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isPublicPath) {
    // Authenticated, trying to access public route
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Otherwise, allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};