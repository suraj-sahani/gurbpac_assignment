import { NextResponse } from "next/server";
import { getSession } from "./lib/services/auth.service";

const ROLE_ROUTES = {
  principal: {
    prefix: "/principal",
    home: "/principal",
    allowed: [
      "/principal",
      "/principal/all-content",
      "/principal/pending-approval",
    ],
  },
  teacher: {
    prefix: "/teacher",
    home: "/teacher",
    allowed: ["/teacher", "/teacher/upload-content", "/teacher/my-content"],
  },
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = await getSession();

  const userRole = session?.user?.role;

  if (
    !userRole &&
    (pathname.startsWith("/principal") || pathname.startsWith("/teacher"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userRole && pathname === "/login") {
    const redirectUrl = ROLE_ROUTES[userRole]["home"] || "/";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (userRole) {
    const isPrincipalRoute = pathname.startsWith("/principal");
    const isTeacherRoute = pathname.startsWith("/teacher");

    // Principal trying to access Teacher routes
    if (userRole === "principal" && isTeacherRoute) {
      return NextResponse.redirect(
        new URL(ROLE_ROUTES.principal.home, request.url),
      );
    }

    // Teacher trying to access Principal routes
    if (userRole === "teacher" && isPrincipalRoute) {
      return NextResponse.redirect(
        new URL(ROLE_ROUTES.teacher.home, request.url),
      );
    }
  }

  return NextResponse.next();
}
