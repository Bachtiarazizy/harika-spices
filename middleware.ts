import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// Supported locales - these should match what's in your app/[locale]/layout.tsx
export const supportedLocales = ["en", "id"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "en";

// Get the preferred locale from the request headers
function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to convert headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, supportedLocales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname has a locale prefix
  const pathnameHasLocale = supportedLocales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Match all paths except those starting with:
  // - a locale prefix
  // - static files (underscore-prefixed)
  // - API routes
  // - Public files like favicon, robots.txt, etc
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
