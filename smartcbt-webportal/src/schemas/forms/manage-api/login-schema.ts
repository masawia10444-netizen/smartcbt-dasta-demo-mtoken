import { PASSWORD_MIN_LENGTH } from "@/constants/configuration";
import { z } from "zod";

export const manageApiLoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  remember: z.boolean(),
});

export type ManageApiLoginSchema = z.infer<typeof manageApiLoginSchema>;
