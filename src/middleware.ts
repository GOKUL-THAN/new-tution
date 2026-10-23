import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware — Route Protection
 *
 * Strategy: check for auth_token cookie presence only (edge-compatible, no Prisma).
 * Full role-based checks are performed inside the layout server components via getCurrentUser().
 *
 * Protected prefixes: /student, /teacher, /parent, /admin
 * Redirect: /login?next=<original path> when cookie is absent.
 */

const PROTECTED_PREFIXES = ['/student', '/teacher', '/parent', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/student/:path*',
    '/teacher/:path*',
    '/parent/:path*',
    '/admin/:path*',
  ],
};
