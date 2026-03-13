import { sortValues } from "@/components/form/FormSortToggleButton";
import { ProjectStatus } from "@/models/project";
import { z } from "zod";

export const projectOverviewSearchSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
  dastaWorkingArea: z
    .object({
      key: z.string(),
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  projectLocations: z
    .object({
      id: z.number(),
      organization_id: z.string(),
      province_title: z.string(),
      title: z.string(),
    })
    .optional(),
  province: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
  npvSort: z.object({
    npv: z.object({ title: z.string(), value: z.string() }).default(sortValues[0]),
  }),
  year: z
    .object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    })
    .optional(),
});

export type ProjectOverviewSearchSchema = z.infer<typeof projectOverviewSearchSchema>;
