import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the hostname from the request headers
  const hostname = request.headers.get("host") || "";

  // Define your root domain and development domain
  const DEVELOPMENT_DOMAIN = "localhost:3000";
  const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "example.com";

  // Check if we're in development or production
  const isDevelopment = process.env.NODE_ENV === "development";
  const currentHost = isDevelopment
    ? hostname.replace(`.${DEVELOPMENT_DOMAIN}`, "")
    : hostname.replace(`.${ROOT_DOMAIN}`, "");

  // Get the pathname from the request
  const path = request.nextUrl.pathname;

  // Handle root domain requests
  if (hostname === ROOT_DOMAIN || hostname === DEVELOPMENT_DOMAIN) {
    return NextResponse.next();
  }

  // Special case for www - redirect to root domain
  if (hostname === `www.${ROOT_DOMAIN}`) {
    const url = request.nextUrl.clone();
    url.hostname = ROOT_DOMAIN;
    return NextResponse.redirect(url);
  }

  // Handle dashboard subdomain
  if (currentHost === "dashboard") {
    const url = request.nextUrl.clone();
    // Rewrite to the dashboard folder in app directory
    url.pathname = `/dashboard${path}`;
    return NextResponse.rewrite(url);
  }

  // Handle other subdomains
  const subdomain = isDevelopment ? currentHost : hostname.split(".")[0];

  // Skip rewrite for static files and api routes
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/static") ||
    path.includes(".") // This covers files like favicon.ico, manifest.json, etc.
  ) {
    return NextResponse.next();
  }

  // Rewrite the URL for subdomain handling
  const url = request.nextUrl.clone();
  url.pathname = `/sites/${subdomain}${path}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
