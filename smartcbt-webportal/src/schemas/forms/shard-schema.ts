import { z } from "zod";

//TODO: wait api to change this shape
export const province = z.object({
  id: z.number(),
  title: z.string().nonempty(),
});
export const district = z.object({
  id: z.number(),
  title: z.string().nonempty(),
});
export const subdistrict = z.object({
  id: z.number(),
  title: z.string(),
  postal: z.string().optional(),
});
export const file = z.object({
  id: z.string(),
  url: z.string(),
  type: z.string(),
  title: z.string().optional().nullable(),
});
export const pictureSchema = z.object({ file: z.instanceof(File) });
export type FileSchema = z.infer<typeof file>;
export type PictureSchema = z.infer<typeof pictureSchema>;
