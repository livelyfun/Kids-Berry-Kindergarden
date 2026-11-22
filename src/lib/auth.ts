import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const ADMIN_COOKIE_NAME = "kb_admin_session";

export interface AdminTokenPayload {
  userId: string;
  username: string;
  name: string;
  role: string;
}

export function getAdminPathSlug(): string {
  const raw = process.env.ADMIN_PATH || "classic-admin";
  return raw.replace(/^\/+|\/+$/g, "");
}

export function getAdminBasePath(): string {
  return `/${getAdminPathSlug()}`;
}

export function verifyAdminPath(paramPath: string): boolean {
  return paramPath === getAdminPathSlug();
}

function getJwtSecret(): Uint8Array {
  const secret =
    process.env.ADMIN_JWT_SECRET || "kids-berry-default-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(
  payload: AdminTokenPayload,
): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    username: payload.username,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (!payload.userId || !payload.username) {
      return null;
    }
    return {
      userId: String(payload.userId),
      username: String(payload.username),
      name: String(payload.name || "Administrator"),
      role: String(payload.role || "ADMIN"),
    };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminTokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function ensureInitialAdminUser(): Promise<void> {
  const count = await prisma.user.count();
  if (count > 0) return;

  const username = (process.env.ADMIN_INITIAL_USERNAME || "kidsadmin").trim();
  const password = process.env.ADMIN_INITIAL_PASSWORD || "kidsadmin@123";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      username,
      passwordHash,
      name: "Kids Berry Administrator",
      role: "ADMIN",
    },
  });
}
