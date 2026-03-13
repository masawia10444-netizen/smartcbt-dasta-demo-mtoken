import { z } from "zod";

export const photoBankSearchSchema = z.object({
  q: z.string().optional(),
  provinceId: z.number().optional(),
  communityId: z.number().optional(),
});

export type PhotoBankSearchSchema = z.infer<typeof photoBankSearchSchema>;
