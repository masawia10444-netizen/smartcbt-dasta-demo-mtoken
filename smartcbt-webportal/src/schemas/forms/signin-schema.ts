import { PASSWORD_MIN_LENGTH } from "@/constants/configuration";
import { z } from "zod";

export const signInWithEmailSchema = z.object({
  input: z.string().min(1),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  remember: z.boolean(),
});

export type SignInWithEmailSchema = z.infer<typeof signInWithEmailSchema>;
