import { PASSWORD_MIN_LENGTH } from "@/constants/configuration";
import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(PASSWORD_MIN_LENGTH),
    confirmPassword: z.string().trim().min(PASSWORD_MIN_LENGTH),
  })
  .refine((form) => form.password === form.confirmPassword, {
    params: { i18n: "password_not_match" },
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
