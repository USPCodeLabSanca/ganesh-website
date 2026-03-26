/* eslint-disable  @typescript-eslint/no-explicit-any */

import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

// Create middleware functions for each feature.
const { auth } = NextAuth(authConfig)
const intlMiddleware = createIntlMiddleware(routing);

const authMiddleware = auth((req: any) => {
  if (!req.auth) {
    const newUrl = new URL("/admin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const adminPathnameRegex = /^\/(en|br)?\/admin\/dashboard(\/.*)?$/;
  const isAdminPage = adminPathnameRegex.test(pathname);

  if (!isAdminPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
