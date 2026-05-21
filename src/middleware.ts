import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Redirect www to non-www
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    url.hostname = newHostname;
    return NextResponse.redirect(url, 301);
  }

  // Handle og-image route redirect if needed 
  // (e.g. if someone visits /og-image, send them to the API route)
  if (url.pathname === '/og-image') {
    url.pathname = '/api/og';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
