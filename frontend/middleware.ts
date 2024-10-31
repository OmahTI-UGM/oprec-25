import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't need authentication
const PUBLIC_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip token validation for public routes
  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If they're trying to access login/register while having a token
  if (isPublicRoute && accessToken) {
    try {
      const response = await fetch("http://localhost:5050/auth/validate", {
        headers: {
          Cookie: `accessToken=${accessToken};`,
        },
        credentials: 'include'
      });

      if (response.ok) {
        const { isAuthenticated } = await response.json();
        if (isAuthenticated) {
          // If they're authenticated, redirect them to dashboard
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch (error) {
      // If validation fails, let them access the login page
      return NextResponse.next();
    }
  }

  // If they're accessing a public route without a token, allow it
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, validate the token
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // First try to validate the access token
    let response = await fetch("http://localhost:5050/auth/validate", {
      headers: {
        Cookie: `accessToken=${accessToken};`,
      },
      credentials: 'include'
    });

    // If access token is invalid but we have a refresh token, try to refresh
    if (response.status === 401 && refreshToken) {
      try {
        const refreshResponse = await fetch("http://localhost:5050/auth/refresh", {
          headers: {
            Cookie: `refreshToken=${refreshToken};`,
          },
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          const { accessToken: newAccessToken } = await refreshResponse.json();
          
          // Create response with new access token and continue
          const newResponse = NextResponse.next();
          newResponse.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          });

          return newResponse;
        } else {
          // If refresh fails, clear both tokens and redirect to login
          const loginResponse = NextResponse.redirect(new URL("/auth/login", request.url));
          loginResponse.cookies.delete("accessToken");
          loginResponse.cookies.delete("refreshToken");
          return loginResponse;
        }
      } catch (error) {
        // If refresh request fails, redirect to error page
        return NextResponse.redirect(new URL("/error", request.url));
      }
    }

    // Handle other validation response cases
    if (!response.ok) {
      if (response.status === 401) {
        // If we get here, it means both tokens are invalid or refresh failed
        const loginResponse = NextResponse.redirect(new URL("/auth/login", request.url));
        loginResponse.cookies.delete("accessToken");
        loginResponse.cookies.delete("refreshToken");
        return loginResponse;
      }
      return NextResponse.redirect(new URL("/error", request.url));
    }

    const { isAuthenticated } = await response.json();
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};