import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { error: "Password must be at least 6 characters" })
    .min(1, { error: "Password is required" }),
});
