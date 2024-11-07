import { NextResponse, NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/himakom", "/omahti", "/auth/login", "/auth/register", "/forgot-password"];
const ADMIN_ROUTES = ["/admin"];

async function validateToken(PUBLIC_API_URL: string, token: string) {
  return await fetch(`${PUBLIC_API_URL}/auth/validate`, {
    headers: { Cookie: `accessToken=${token};` },
    credentials: "include",
  });
}

async function refreshTokenValidation(PUBLIC_API_URL: string, refreshToken: string) {
  return await fetch(`${PUBLIC_API_URL}/auth/refresh`, {
    headers: { Cookie: `refreshToken=${refreshToken};` },
    credentials: "include",
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));

  if (pathname === "/") {
    if (accessToken) {
      const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
      if (validationResponse.ok) {
        const { user } = await validationResponse.json();
        const nextResponse = NextResponse.next();
        attachUserHeaders(nextResponse, user);
        return nextResponse;
      } else if (validationResponse.status === 401 && refreshToken) {
        return await handleRefreshToken(PUBLIC_API_URL, request, refreshToken);
      }
    }
    return NextResponse.next();
  }

  if (isPublicRoute && accessToken) {
    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (validationResponse.status === 401 && refreshToken) {
      return await handleRefreshToken(PUBLIC_API_URL, request, refreshToken);
    }
    return redirectToLogin(request);
  }

  if (isAdminRoute) {
    if (!accessToken) return redirectToLogin(request);

    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      const { user } = await validationResponse.json();
      if (user.isAdmin) {
        const nextResponse = NextResponse.next();
        attachUserHeaders(nextResponse, user);
        return nextResponse;
      }
      return NextResponse.redirect(new URL("/divisi", request.url));
    } else if (validationResponse.status === 401 && refreshToken) {
      return await handleRefreshToken(PUBLIC_API_URL, request, refreshToken);
    }
    return redirectToLogin(request);
  }

  if (!isPublicRoute && !accessToken) return redirectToLogin(request);

  if (!isPublicRoute && accessToken) {
    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      const { user } = await validationResponse.json();
      const nextResponse = NextResponse.next();
      attachUserHeaders(nextResponse, user);
      return nextResponse;
    } else if (validationResponse.status === 401 && refreshToken) {
      return await handleRefreshToken(PUBLIC_API_URL, request, refreshToken);
    }
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

function attachUserHeaders(response: NextResponse, user: any) {
  response.headers.set("x-user-id", user.userId);
  response.headers.set("x-user-NIM", user.NIM);
  response.headers.set("x-user-username", user.username || "");
  response.headers.set("x-user-isAdmin", user.isAdmin || false);
  response.headers.set("x-user-enrolledSlugHima", user.enrolledSlugHima || "");
  response.headers.set("x-user-enrolledSlugOti", user.enrolledSlugOti || "");
}

async function handleRefreshToken(PUBLIC_API_URL: string, request: NextRequest, refreshToken: string) {
  const refreshResponse = await refreshTokenValidation(PUBLIC_API_URL, refreshToken);
  if (refreshResponse.ok) {
    const response = NextResponse.redirect(request.url);
    const setCookieHeader = refreshResponse.headers.get("set-cookie");
    if (setCookieHeader) {
      response.headers.set("set-cookie", setCookieHeader);
    }
    return response;
  } else {
    const response = redirectToLogin(request);
    response.cookies.set("refreshToken", "", { maxAge: -1 });
    response.cookies.set("accessToken", "", { maxAge: -1 });
    return response;
  }
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
