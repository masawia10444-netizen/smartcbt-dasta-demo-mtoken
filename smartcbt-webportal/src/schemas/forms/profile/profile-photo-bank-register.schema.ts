import { z } from "zod";
import { file } from "../shard-schema";

export const profilePhotoBankRegisterSchema = z.object({
  profilePicture: file,
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  phoneNumber: z.string().trim(),
  organization: z.string().trim(),
  consents: z.array(z.object({ checked: z.boolean(), id: z.number(), detail: z.string(), refLink: z.string() })),
  files: z.array(file),
});

export type ProfilePhotoBankRegisterSchema = z.infer<typeof profilePhotoBankRegisterSchema>;
