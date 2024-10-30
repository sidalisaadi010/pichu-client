import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const { hostname, pathname } = url;

  // Check if we're on localhost and skip subdomain logic
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return NextResponse.next();
  }

  // Split the hostname to get the subdomain
  const hostnameparts = hostname.split(".");
  const isSubdomain = hostnameparts.length > 2;

  if (isSubdomain) {
    const subdomain = hostnameparts[0];

    // Special case for dashboard subdomain
    if (subdomain === "dashboard") {
      return NextResponse.rewrite(new URL("/dashboard", url.pathname));
    }

    // For other subdomains, rewrite the URL

    return NextResponse.rewrite(new URL(url.pathname, `/${subdomain}`));
  }

  // If no subdomain, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
