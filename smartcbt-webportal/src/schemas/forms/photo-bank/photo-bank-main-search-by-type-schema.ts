import { z } from "zod";

export const photoBankMainSearchByTypeSchema = z
  .object({
    province: z.object({ id: z.number(), title: z.string() }).optional(),
    community: z.object({ id: z.number(), title: z.string() }).optional(),
  })
  .superRefine((form, ctx) => {
    const { province, community } = form;
    if (province == null && community == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["province"],
        params: { i18n: "errors.customRequired" },
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["community"],
        params: { i18n: "errors.customRequired" },
      });
    }
  });

export type PhotoBankMainSearchByTypeSchema = z.infer<typeof photoBankMainSearchByTypeSchema>;
