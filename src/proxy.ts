import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PREFIXES = ["/verify-age", "/api", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const verified = request.cookies.get("cl_age_verified")?.value === "true";
  if (verified) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/verify-age";
  url.searchParams.set("next", pathname + request.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
