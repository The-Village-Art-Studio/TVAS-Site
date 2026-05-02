import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Check if it's an admin route
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/admin')) {
    if (!pathname.startsWith('/admin/login')) {
      const authCookie = request.cookies.get('tvas_admin_auth');
      if (!authCookie || authCookie.value !== 'authenticated') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    // Return NextResponse.next() to bypass intlMiddleware for admin routes
    return NextResponse.next();
  }

  // Handle i18n for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/',
    '/(en|fr)/:path*'
  ]
};
