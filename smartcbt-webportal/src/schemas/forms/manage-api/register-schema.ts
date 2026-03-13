import { PASSWORD_MIN_LENGTH } from "@/constants/configuration";
import { z } from "zod";

export const manageApiRegisterSchema = z
  .object({
    email: z.string().min(1).email(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    confirmPassword: z.string().trim().min(PASSWORD_MIN_LENGTH),
    organization: z.string().trim(),
    consent: z.boolean(),
  })
  .refine((form) => form.password === form.confirmPassword, {
    path: ["confirmPassword"],
    params: { i18n: "password_not_match" },
  });

export type ManageApiRegisterSchema = z.infer<typeof manageApiRegisterSchema>;
