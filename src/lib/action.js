"use server";

import {
  clearSessionCookie,
  createSessionToken,
  getSession,
  setSessionCookie,
} from "./services/auth.service";
import { SAMPLE_USERS } from "./constants";
import { loginSchema } from "./schema";

export async function loginAction(email, password) {
  try {
    // Validate input
    const validated = loginSchema.parse({ email, password });

    // Mock authentication: find user by email
    // In production, query database and use bcrypt to verify password
    const user = SAMPLE_USERS.find((u) => u.email === validated.email);

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // In production, verify password with bcrypt
    // For now, any non-empty password works in this demo
    if (!password) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Create session token
    const token = await createSessionToken(user);

    // Set session cookie
    await setSessionCookie(token);

    return {
      success: true,
      user,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function logout() {
  try {
    await clearSessionCookie();
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function getSessionAction() {
  const session = await getSession();
  return session;
}

export async function validateSessionAction() {
  const session = await getSession();
  return session !== null;
}
