import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "auth_session";
const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60,
};

export function createSessionToken(user) {
  const tokenData = {
    userId: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };
  return Buffer.from(JSON.stringify(tokenData)).toString("base64");
}

export function verifySessionToken(token) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const data = JSON.parse(decoded);

    // Check expiration
    if (data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return data;
  } catch {
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

    const decoded = verifySessionToken(token);
    if (!decoded) {
      return null;
    }

    const session = {
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: "",
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
