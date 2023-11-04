import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    confirmpass: z.string(),
  })
  .refine(({ password, confirmpass }) => password === confirmpass, {
    message: "Passwords don't match",
    path: ["confirmpass"],
  });

export const loginFormSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
  })

