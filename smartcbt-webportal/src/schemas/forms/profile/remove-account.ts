import { PASSWORD_MIN_LENGTH } from "@/constants/configuration";
import { z } from "zod";

export const removeAccountSchema = z.object({
  id: z.string(),
  email: z.string().min(1).email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  confirm: z.boolean(),
});

export type RemoveAccountSchema = z.infer<typeof removeAccountSchema>;
