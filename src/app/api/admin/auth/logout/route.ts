import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminBasePath } from "@/lib/auth";

export async function POST(request: Request) {
  const isHttps =
    request.headers.get("x-forwarded-proto") === "https" ||
    request.url.startsWith("https://");

  const response = NextResponse.json({
    ok: true,
    redirectTo: `${getAdminBasePath()}/login`,
  });

  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isHttps,
    path: "/",
    maxAge: 0,
  });

  return response;
}
