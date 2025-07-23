import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ROUTES, ROUTES } from "@/configs/routes";
import { SessionKey } from "./configs";

const isAuthenticated = async (req: NextRequest): Promise<boolean> => {
  const token = req.cookies.get(SessionKey)?.value;
  return Boolean(token);
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const auth = await isAuthenticated(req);

  if (!auth) {
    const isDashboard = pathname.startsWith(ROUTES.user.root);
    if (isDashboard) {
      return NextResponse.redirect(new URL(ROUTES.login, req.url));
    }
  }

  if (auth && AUTH_ROUTES.has(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.user.dashboard, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude internal paths, assets, and API routes
    "/((?!api/|_next/|static/|.*\\.[^/]+$).*)",
  ],
};
