import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { error: "Password must be at least 6 characters" })
    .min(1, { error: "Password is required" }),
});

export const uploadSchema = z
  .object({
    title: z
      .string()
      .min(1, { error: "Title is required" })
      .max(200, { error: "Title must be less than 200 characters" }),
    subject: z.string().min(1, { error: "Subject is required" }),
    description: z
      .string()
      .max(1000, { error: "Description must be less than 1000 characters" }),
    startTime: z.string().min(1, { error: "Start time is required" }),
    endTime: z.string().min(1, { error: "End time is required" }),
    rotationDuration: z
      .number({
        error: "Rotation duration must be a number",
      })
      .min(5, { error: "Rotation duration must be at least 5 minutes" })
      .max(480, { error: "Rotation duration must be less than 8 hours" }),
    file: z
      .file({ error: "File is required." })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
        "Only JPG, PNG, and GIF files are allowed",
      )
      .refine(
        (file) => file.size <= 10 * 1024 * 1024,
        "File size must be less than 10MB",
      ),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime).getTime();
      const end = new Date(data.endTime).getTime();
      return end > start;
    },
    {
      message: "End time must be after the start time",
      path: ["endTime"], // This sets the error message to the 'endTime' field
    },
  );
