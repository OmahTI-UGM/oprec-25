import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import next from "next/types";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register", "/forgot-password"];

async function validateToken(PUBLIC_API_URL: string, token: string) {
  const response = await fetch(`${PUBLIC_API_URL}/auth/validate`, {
    headers: { Cookie: `accessToken=${token};` },
    credentials: "include",
  });
  return response;
}

async function refreshTokenValidation(
  PUBLIC_API_URL: string,
  refreshToken: string,
) {
  const response = await fetch(`${PUBLIC_API_URL}/auth/refresh`, {
    headers: { Cookie: `refreshToken=${refreshToken};` },
    credentials: "include",
  });
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // always allow access to root route
  if (pathname === '/') {
    // If there's an access token, validate it
    if (accessToken) {
      const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
      if (validationResponse.ok) {
        const { user } = await validationResponse.json();
        const nextResponse = NextResponse.next();
        // Attach user data to request headers
        nextResponse.headers.set("x-user-id", user.userId);
        nextResponse.headers.set("x-user-NIM", user.NIM);
        nextResponse.headers.set("x-user-username", user.username || "");
        nextResponse.headers.set("x-user-isAdmin", user.isAdmin || false);
        nextResponse.headers.set("x-user-enrolledSlugHima", user.enrolledSlugHima || "");
        nextResponse.headers.set("x-user-enrolledSlugOti", user.enrolledSlugOti || "");
        return nextResponse;
      }
    }
    return NextResponse.next();
  }

  // Handle other public routes
  if (isPublicRoute && accessToken) {
    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      return NextResponse.redirect(new URL("/", request.url)); // Changed from "/"
    } else if (validationResponse.status === 401 && refreshToken) {
      const refreshResponse = await refreshTokenValidation(
        PUBLIC_API_URL,
        refreshToken,
      );
      if (refreshResponse.ok) {
        const response = NextResponse.next();
        const setCookieHeader = refreshResponse.headers.get("set-cookie");
        if (setCookieHeader) {
          response.headers.set("set-cookie", setCookieHeader);
        }
        return response;
      }
    }
    // If validation fails, proceed to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Protect other routes
  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Validate token for protected routes
  if (!isPublicRoute && accessToken) {
    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      const { user } = await validationResponse.json();
      const nextResponse = NextResponse.next();
      // Attach user data to request headers
      nextResponse.headers.set("x-user-id", user.userId);
      nextResponse.headers.set("x-user-NIM", user.NIM);
      nextResponse.headers.set("x-user-username", user.username || "");
      nextResponse.headers.set("x-user-isAdmin", user.isAdmin || false);
      nextResponse.headers.set("x-user-enrolledSlugHima", user.enrolledSlugHima || "");
      nextResponse.headers.set("x-user-enrolledSlugOti", user.enrolledSlugOti || "");
      return nextResponse;
    } else if (validationResponse.status === 401 && refreshToken) {
      const refreshResponse = await refreshTokenValidation(
        PUBLIC_API_URL,
        refreshToken,
      );
      if (refreshResponse.ok) {
        const response = NextResponse.next();
        const setCookieHeader = refreshResponse.headers.get("set-cookie");
        if (setCookieHeader) {
          response.headers.set("set-cookie", setCookieHeader);
        }
        return response;
      }
    }
    // If both validation and refresh fail, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};