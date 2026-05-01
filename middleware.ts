import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect /admin/* and /api/admin/* routes (except /login)
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');
  const isLoginPage = pathname === '/login';
  const isAuthEndpoint = pathname === '/api/admin/auth';

  if ((isAdminRoute || isAdminApiRoute) && !isLoginPage && !isAuthEndpoint) {
    // Check for admin session cookie
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      // Redirect to login for non-API routes
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      // Return 401 for API routes
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
