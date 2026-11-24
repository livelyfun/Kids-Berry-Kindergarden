import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, users } from "@/db";
import {
  ADMIN_COOKIE_NAME,
  ensureInitialAdminUser,
  getAdminBasePath,
  signAdminToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username =
      typeof body?.username === "string" ? body.username.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 },
      );
    }

    await ensureInitialAdminUser();

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 },
      );
    }

    const token = await signAdminToken({
      userId: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      ok: true,
      redirectTo: getAdminBasePath(),
      user: {
        username: user.username,
        name: user.name,
      },
    });

    const isHttps =
      request.headers.get("x-forwarded-proto") === "https" ||
      request.url.startsWith("https://");

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: isHttps,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Unable to complete login. Check server configuration." },
      { status: 500 },
    );
  }
}
