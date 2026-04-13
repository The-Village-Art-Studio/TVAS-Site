import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: Request) {
  return intlMiddleware(request as any);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|fr)/:path*']
};
