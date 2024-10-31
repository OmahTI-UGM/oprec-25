import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Send request to validate the token
  const response = await fetch("http://localhost:5050/auth/validate", {
    headers: {
      Cookie: `accessToken=${accessToken};`,
    },
    credentials: 'include'
  });

  // If not authenticated or there's an issue with validation
  if (response.status === 401) {
    if (path !== "/auth/login" && path !== "/auth/register") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } else if (!response.ok) {
    return NextResponse.redirect(new URL("/error", request.url));
  }

  const { isAuthenticated } = await response.json();

  // Redirect authenticated users from login/register to dashboard
  if (isAuthenticated && (path === "/auth/login" || path === "/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For unauthenticated users trying to access protected pages, redirect to login
  if (!isAuthenticated && path !== "/auth/login" && path !== "/auth/register") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
