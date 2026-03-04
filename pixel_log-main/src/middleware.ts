import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const ALLOWED_EMAIL = 'postpr0727@gmail.com';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect admin board routes
  if (pathname.startsWith('/admin_board')) {
    const isAuthenticated = !!req.auth;
    const isAuthorized = req.auth?.user?.email === ALLOWED_EMAIL;

    console.log('Middleware check:', {
      pathname,
      isAuthenticated,
      userEmail: req.auth?.user?.email,
      isAuthorized
    });

    if (!isAuthenticated || !isAuthorized) {
      const loginUrl = new URL('/admin_login87865678798', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin')) {
    if (!req.auth || req.auth.user?.email !== ALLOWED_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/admin_board/:path*',
    '/api/admin/:path*'
  ]
};
