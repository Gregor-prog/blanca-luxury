import { NextRequest, NextResponse } from "next/server";

const LOGIN_PATH = "/admin/login";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const hasSession = req.cookies.has("bl_auth");
  const isLoginPage = pathname === LOGIN_PATH;
  const isRegisterPage = pathname === "/admin/register";
  const isPublicAdminPage = isLoginPage || isRegisterPage;

  // Unauthenticated user trying to access protected route
  if (!hasSession && !isPublicAdminPage) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Authenticated user hitting login/register page — send them home
  if (hasSession && isPublicAdminPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.searchParams.delete("from");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
