import { CarbonProjectStatus } from "@/models/carbon-project";
import { EmissionFactorProxyPCRs } from "@/models/emission-factor-proxy";
import { z } from "zod";
import { createCbtProjectSchema, organizations } from "../../cbt-project/create-cbt-project";
import { PictureSchema, pictureSchema } from "../../shard-schema";
import { emissionProxyCreateSchema } from "../emission-proxies/emission-proxy-create-schema";

const MB_BYTES = 1000000; // Number of bytes in a megabyte.
const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];

const image = z.object({
  id: z.string(),
  url: z.string(),
  type: z.string(),
  title: z.string(),
});

const images = z.array(image).default([]);

const createImages = z
  .array(
    z.instanceof(File).superRefine((f, ctx) => {
      // First, add an issue if the mime type is wrong.
      if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File must be one of [${ACCEPTED_MIME_TYPES.join(", ")}] but was ${f.type}`,
        });
      }
      // Next add an issue if the file size is too large.
      if (f.size > 3 * MB_BYTES) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          type: "array",
          message: `The file must not be larger than ${3 * MB_BYTES} bytes: ${f.size}`,
          maximum: 3 * MB_BYTES,
          inclusive: true,
        });
      }
    })
  )
  .default([]);

export const carbonFootprintActivitySchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  name: z.string().nullish(),
  emissionProxy: emissionProxyCreateSchema.nullish(),
  multiplier: z.number().nullish(),
  pcr_type: EmissionFactorProxyPCRs.nullish(),
  isCreatedProxy: z.boolean().default(false),
  cfp: z.number().nullish(),
  isTooltipEnabled: z.boolean().default(false),
  tooltip: z.string().default(""),
});

export const travelActivitySchema = z
  .object({
    id: z.number().nullish(),
    details: z.string().nonempty(),
    noTime: z.boolean(),
    startTime: z.string().nullish(),
    endTime: z.string().nullish(),
    carbonFootprintActivities: z.array(carbonFootprintActivitySchema).default([]),
    // .refine((data) => data.length != 0, {
    //   params: { i18n: "customRequired" },
    // }),
  })
  .refine(
    (data) => {
      if (!data.noTime) {
        return data.startTime !== null && data.endTime !== null;
      }
      return true;
    },
    {
      params: { i18n: "customRequired" },
      path: ["startTime"],
    }
  );

export const photographicSchema = z.object({
  isCover: z.string().optional(),
  cover: z.union([image, pictureSchema]).nullish(),
  travel: z.union([images, createImages]),
  accommodation: z.union([images, createImages]),
  foods: z.union([images, createImages]),
  wastes: z.union([images, createImages]),
  documents: z.union([images, createImages]),
});

export const travelPlanSchema = z.object({
  activities: z
    .array(travelActivitySchema)
    .default([])
    .refine((data) => data.length != 0, {
      params: { i18n: "customRequired" },
    }),
});

export const cbtProject = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  title: z.string().nonempty(),
  organizations: organizations,
  isCreateOrganizations: z.boolean().default(false),
});

export const travelProgramSchema = z.object({
  name: z.string().optional(),
  cbtProject: cbtProject,
  createdCBTProject: createCbtProjectSchema.nullish(),
  createdOrganizations: organizations.nullish(),
  // isCreateOrganizations: z.boolean().default(false),
  isCreateCBTProject: z.boolean().default(false),
  createdProxy: z.array(emissionProxyCreateSchema).default([]),
  company: z.string().optional(),
  status: z.nativeEnum(CarbonProjectStatus).optional(),
  numberOfTourist: z.number(),
  scopeOfAssessment: z.object({ id: z.number(), title: z.string() }),
  registrationDate: z.date(),
  travelPlans: z
    .array(travelPlanSchema)
    .default([])
    .refine((data) => data.length != 0, {
      params: { i18n: "customRequired" },
    }),
  photographic: photographicSchema,
  unit: z.object({ id: z.number(), title: z.string() }),
  remark: z.string().optional(),
});

export const roundSchema = z.object({
  name: z.string(),
  id: z.union([z.number(), z.string()]).optional(),
  cbtProject: cbtProject,
  company: z.string(),
  unit: z.object({ id: z.number(), title: z.string() }),
  status: z.nativeEnum(CarbonProjectStatus).optional(),
  createdProxy: z.array(emissionProxyCreateSchema).default([]),
  numberOfTourist: z.number().nullish(),
  scopeOfAssessment: z.object({ id: z.number(), title: z.string() }),
  registrationDate: z.date(),
  dates: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  mode: z.string().default("view").nullish(),
  travelPlans: z.array(travelPlanSchema).default([]),
  photographic: photographicSchema,
});

export const roundsSchema = z.array(roundSchema);

export const travelProgramRoundsSchema = z.object({
  rounds: roundsSchema,
});

export type ImageView = z.infer<typeof image>;
export type CreateImages = z.infer<typeof createImages>;
export type TravelActivitySchema = z.infer<typeof travelActivitySchema>;
export type TravelProgramSchema = z.infer<typeof travelProgramSchema>;
export type TravelPlanSchema = z.infer<typeof travelPlanSchema>;
export type CbtProjectSchema = z.infer<typeof cbtProject>;
export type TravelProgramRoundsSchema = z.infer<typeof travelProgramRoundsSchema>;
export type RoundsSchema = z.infer<typeof roundsSchema>;
export type RoundSchema = z.infer<typeof roundSchema>;

export function isImageView(value: any): value is ImageView {
  return value !== null && typeof value === "object" && "id" in value;
}

export function isPictureSchema(value: any): value is PictureSchema {
  return value !== null && typeof value === "object" && "file" in value;
}
