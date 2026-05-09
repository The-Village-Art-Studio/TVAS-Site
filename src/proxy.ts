import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Check if it's an admin route
  const pathname = request.nextUrl.pathname;
  console.log(`Proxy: Handling ${request.method} ${pathname}`);

  // If the locale was accidentally prepended to admin routes, strip it and redirect
  if (pathname.startsWith('/en/admin') || pathname.startsWith('/fr/admin')) {
    const newPath = pathname.replace(/^\/(en|fr)/, '');
    console.log(`Proxy: Localized admin route detected. Redirecting ${pathname} -> ${newPath}`);
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    console.log(`Proxy: Admin route detected: ${pathname}`);
    if (!pathname.startsWith('/admin/login')) {
      const authCookie = request.cookies.get('tvas_admin_auth');
      if (!authCookie || authCookie.value !== 'authenticated') {
        console.log(`Proxy: Not authenticated. Redirecting to /admin/login`);
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    console.log(`Proxy: Bypassing i18n for admin.`);
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
