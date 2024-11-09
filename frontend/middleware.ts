import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = new Set([
  "/himakom",
  "/omahti",
  "/auth/login",
  "/auth/register",
  "/forgot-password",
]);

const ADMIN_ROUTES = new Set(["/admin"]);

// Cache for token validation responses
const tokenValidationCache = new Map();
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

async function validateToken(PUBLIC_API_URL: string, token: string) {
  const cacheKey = `${PUBLIC_API_URL}:${token}`;
  const cachedResponse = tokenValidationCache.get(cacheKey);
  
  if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
    return cachedResponse.response;
  }

  const response = await fetch(`${PUBLIC_API_URL}/auth/validate`, {
    headers: { Cookie: `accessToken=${token}` },
    credentials: "include",
  });

  // Cache the response
  tokenValidationCache.set(cacheKey, {
    response: response.clone(),
    timestamp: Date.now(),
  });

  return response;
}

async function refreshTokenValidation(PUBLIC_API_URL: string, refreshToken: string) {
  return fetch(`${PUBLIC_API_URL}/auth/refresh`, {
    headers: { Cookie: `refreshToken=${refreshToken}` },
    credentials: "include",
  });
}

function setUserHeaders(response: NextResponse, user: any, pathname: string) {
  response.headers.set("x-user-id", user.userId);
  response.headers.set("x-user-NIM", user.NIM);
  response.headers.set("x-user-username", user.username || "");
  response.headers.set("x-user-isAdmin", user.isAdmin || false);
  response.headers.set("x-user-enrolledSlugHima", user.enrolledSlugHima || "");
  response.headers.set("x-user-enrolledSlugOti", user.enrolledSlugOti || "");
  response.headers.set("x-url", pathname);
  return response;
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.set("refreshToken", "", { maxAge: -1 });
  response.cookies.set("accessToken", "", { maxAge: -1 });
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const isAdminRoute = ADMIN_ROUTES.has(pathname);

  // Root route handling
  if (pathname === "/") {
    if (!accessToken) return NextResponse.next();
    
    try {
      const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
      
      if (validationResponse.ok) {
        const { user } = await validationResponse.json();
        const redirectUrl = user.isAdmin ? "/admin" : "/divisi";
        const nextResponse = NextResponse.redirect(new URL(redirectUrl, request.url));
        return setUserHeaders(nextResponse, user, pathname);
      }
      
      if (validationResponse.status === 401 && refreshToken) {
        const refreshResponse = await refreshTokenValidation(PUBLIC_API_URL, refreshToken);
        if (refreshResponse.ok) {
          const response = NextResponse.redirect(new URL("/divisi", request.url));
          const setCookieHeader = refreshResponse.headers.get("set-cookie");
          if (setCookieHeader) response.headers.set("set-cookie", setCookieHeader);
          return response;
        }
        return clearAuthCookies(NextResponse.redirect(new URL("/auth/login", request.url)));
      }
    } catch (error) {
      return clearAuthCookies(NextResponse.redirect(new URL("/auth/login", request.url)));
    }
  }

  // Public route handling with auth token
  if (isPublicRoute && accessToken) {
    try {
      const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
      if (validationResponse.ok) {
        return NextResponse.redirect(new URL("/divisi", request.url));
      }
      return clearAuthCookies(NextResponse.next());
    } catch (error) {
      return clearAuthCookies(NextResponse.next());
    }
  }

  // Admin route handling
  if (isAdminRoute) {
    if (!accessToken) return NextResponse.redirect(new URL("/auth/login", request.url));
    
    try {
      const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
      if (validationResponse.ok) {
        const { user } = await validationResponse.json();
        if (!user.isAdmin) return NextResponse.redirect(new URL("/divisi", request.url));
        return setUserHeaders(NextResponse.next(), user, pathname);
      }
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Protected route handling
  if (!isPublicRoute) {
    if (!accessToken) return NextResponse.redirect(new URL("/auth/login", request.url));
    
    try {
      const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
      if (validationResponse.ok) {
        const { user } = await validationResponse.json();
        if (user.isAdmin) return NextResponse.redirect(new URL("/admin", request.url));
        return setUserHeaders(NextResponse.next(), user, pathname);
      }
      
      if (validationResponse.status === 401 && refreshToken) {
        const refreshResponse = await refreshTokenValidation(PUBLIC_API_URL, refreshToken);
        if (refreshResponse.ok) {
          const response = NextResponse.redirect(request.url);
          const setCookieHeader = refreshResponse.headers.get("set-cookie");
          if (setCookieHeader) response.headers.set("set-cookie", setCookieHeader);
          return response;
        }
      }
      return clearAuthCookies(NextResponse.redirect(new URL("/auth/login", request.url)));
    } catch (error) {
      return clearAuthCookies(NextResponse.redirect(new URL("/auth/login", request.url)));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};