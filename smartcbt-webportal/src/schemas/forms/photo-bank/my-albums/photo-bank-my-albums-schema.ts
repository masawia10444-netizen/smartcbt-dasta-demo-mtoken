import { z } from "zod";
import { file } from "../../shard-schema";

const filesSchema = z.array(file);

export const photoBankMyAlbumsSchema = z
  .object({
    name: z.string().trim().nonempty(),
    files: filesSchema.nonempty(),
    description: z.string().trim().nonempty(),
    categories: z.array(z.object({ id: z.number(), title: z.string(), value: z.boolean() })),
    community: z.object({ id: z.number(), title: z.string() }),
    region: z.object({ id: z.number(), title: z.string() }),
    organization: z.string().trim().nonempty(),
    tags: z.array(z.string().trim()).nonempty(),
  })
  .superRefine((form, ctx) => {
    const { categories } = form;
    const selectedCategories = categories.filter((value) => value.value == true);
    if (selectedCategories.length == 0) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["categories"],
        params: { i18n: "errors.customRequired" },
      });
    }
  });

export type FilesSchema = z.infer<typeof filesSchema>;
export type PhotoBankMyAlbumsSchema = z.infer<typeof photoBankMyAlbumsSchema>;
