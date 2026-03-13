import { z } from "zod";

export const projectOverviewSearchSchema = z.object({
  q: z.string().nullish(),
  // status: z.nativeEnum(ProjectStatus).optional(),
  programOwner: z
    .object({
      id: z.number(),
      organization_id: z.string(),
      province_title: z.string(),
      title: z.string(),
    })
    .nullish(),
  province: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .nullish(),
});

export type ProjectOverviewSearchSchema = z.infer<typeof projectOverviewSearchSchema>;
