/* eslint-disable  @typescript-eslint/no-explicit-any */

import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createIntlMiddleware(routing);

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const adminPathnameRegex = /^\/(en|br)?\/admin\/dashboard(\/.*)?$/;
  const isAdminPage = adminPathnameRegex.test(pathname);

  if (isAdminPage && !req.auth) {
    const locale = pathname.startsWith('/en') ? 'en' : 'br';
    const newUrl = new URL(`/${locale}/admin`, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  // Skip all internal paths and static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};