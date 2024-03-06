import { JwtPayload, jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { TOKEN } from "./helpers/cookie";
import "core-js/stable/atob";
import { dashboardNavigation } from "./navigation";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get(TOKEN);

  if (!session?.value) {
    request.cookies.delete(TOKEN);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userDecode = session?.value
    ? jwtDecode<JwtPayload>(session?.value ?? "")
    : "";
  const userRole = (userDecode as any)?.role;

  if (!session?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if user try access "/"
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check protected route by route
  const checkProtectRoute =
    dashboardNavigation.find((link) => link.url === request.nextUrl.pathname)
      ?.roles ?? [];

  if (
    checkProtectRoute &&
    checkProtectRoute?.length &&
    checkProtectRoute?.some((role) => role !== userRole)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("authorization", `Bearer ${session?.value}`);

  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
}

//Add your protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
