import { z } from "zod";

export const photoBankMainSearchByKeywordSchema = z.object({
  keyword: z.string().trim().nonempty(),
});

export type PhotoBankMainSearchByKeywordSchema = z.infer<typeof photoBankMainSearchByKeywordSchema>;
