import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const TaskSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  id: z.string().optional(),
  // description: z.string().min(1),
});
