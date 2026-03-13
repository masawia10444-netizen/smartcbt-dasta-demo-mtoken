import { z } from "zod";

export const photoBankDetailSearchSchema = z.object({
  q: z.string().optional(),
});

export type PhotoBankDetailSearchSchema = z.infer<typeof photoBankDetailSearchSchema>;
