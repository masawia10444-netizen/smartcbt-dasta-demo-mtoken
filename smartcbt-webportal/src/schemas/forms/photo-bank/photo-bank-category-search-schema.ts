import { z } from "zod";

export const photoBankCategorySearchSchema = z.object({
  q: z.string().optional(),
  page: z.number().optional(),
});

export type PhotoBankCategorySearchSchema = z.infer<typeof photoBankCategorySearchSchema>;
