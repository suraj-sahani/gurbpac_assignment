import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "auth_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-use-env-variable-in-production",
);
const ALG = "HS256";

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60,
};

export async function createSessionToken(user) {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);

  return token;
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: [ALG],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    // verifySessionToken is now async
    const decoded = await verifySessionToken(token);
    if (!decoded) {
      return null;
    }

    const session = {
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded?.name ?? "",
        role: decoded.role,
      },
      token,

      expiresAt: decoded.exp * 1000,
    };

    return session;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated() {
  const session = await getSession();
  return session !== null;
}

export async function getUserRole() {
  const session = await getSession();
  return session?.user.role ?? null;
}
