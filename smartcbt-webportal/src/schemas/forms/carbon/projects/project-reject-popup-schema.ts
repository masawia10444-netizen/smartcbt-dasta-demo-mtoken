import z from "zod";

const projectRejectPopupSchema = z.object({
  reason: z.string(),
});

export type ProjectRejectPopupSchema = z.infer<typeof projectRejectPopupSchema>;
