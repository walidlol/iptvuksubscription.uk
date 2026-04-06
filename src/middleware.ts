import { NextResponse, type NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

// Routes that require authentication
const GATED_ROUTES = ["/channels", "/setup-guide"];

function isGatedRoute(pathname: string): boolean {
  return GATED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Only check gated routes
  if (!isGatedRoute(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  // No cookie → redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Invalid/expired token → clear cookie and redirect
  const session = await verifySession(token);
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/channels/:path*", "/setup-guide/:path*"],
};
