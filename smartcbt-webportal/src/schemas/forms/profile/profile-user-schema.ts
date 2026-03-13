import { z } from "zod";

export const profileUserSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  phoneNumber: z.string().trim(),
  password: z.string().trim(),
  email: z.string().trim(),
  organization: z.string().trim(),
});

export type ProfileUserSchema = z.infer<typeof profileUserSchema>;
