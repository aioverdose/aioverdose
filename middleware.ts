import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { AdminSession } from '@/lib/admin-auth';

const sessionConfig = {
  password: process.env.ADMIN_SESSION_SECRET || 'default-insecure-password-change-this',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const,
    maxAge: 24 * 60 * 60,
  },
};

export async function middleware(request: NextRequest) {
  // Protect /admin/* and /api/admin/* routes (except /admin/login)
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');
  const isLoginPage = pathname === '/admin/login';
  const isAuthEndpoint = pathname === '/api/admin/auth';

  if ((isAdminRoute || isAdminApiRoute) && !isLoginPage && !isAuthEndpoint) {
    const session = await getIronSession<AdminSession>(request.cookies, sessionConfig);

    if (!session.isAdmin) {
      // Redirect to login for non-API routes
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
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
