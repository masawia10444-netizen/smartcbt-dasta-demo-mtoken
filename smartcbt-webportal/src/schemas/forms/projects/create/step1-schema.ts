import { z } from "zod";
import { district, file, province, subdistrict } from "../../shard-schema";

export const pictureSchema = z.object({
  file: file,
});

export const createOrganizationSchema = z.object({
  title: z.string().nonempty(),
  province: province,
  district: district,
  subdistrict: subdistrict,
  postCode: z.string().nonempty(),
  lat: z.string(),
  lng: z.string(),
});

export const createOrganizationListFormSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  title: z.string().nonempty(),
  province_title: z.string().nonempty(),
  district_title: z.string().nonempty(),
  subdistrict_title: z.string().nonempty(),
  province_id: z.number(),
  district_id: z.number(),
  subdistrict_id: z.number(),
  postal_code: z.string().nonempty(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
});

export const createCbtProjectSchema = z.object({
  id: z.number(),
  title: z.string().nonempty(),
  organizations: createOrganizationListFormSchema,
});

export const cbtProjectSchema = z.object({
  id: z.number().optional(),
  status: z.string().optional(),
  title: z.string().nonempty(),
  // organizations: createOrganizationListFormSchema.nullish(),
  organizations: createOrganizationListFormSchema.nullish(),
});

export const step1Schema = z.object({
  coverPicture: pictureSchema.optional().nullable(),
  name: z.string().optional(),
  createdCBTProject: z.array(cbtProjectSchema).default([]),
  createdOrganization: z.array(createOrganizationListFormSchema).default([]),
  cbtProject: cbtProjectSchema.nullable(),
  album: z.array(pictureSchema),
});

export const referenceDocumentsSchema = z.object({
    type: z.string(),
    id: z.string(),
    url: z.string(),
    title: z.string().optional().nullable(),
});

export type PictureSchema = z.infer<typeof pictureSchema>;
export const step1ForCreateProjectSchema = z.object({
  coverPicture: pictureSchema.nullable().default(null),
  name: z.string().optional(),
  createdCBTProject: z.array(cbtProjectSchema).default([]),
  createdOrganization: z.array(createOrganizationListFormSchema).default([]),
  cbtProject: cbtProjectSchema,
  album: z.array(pictureSchema).default([]),
});

export type CbtProjectSchema = z.infer<typeof cbtProjectSchema>;
export type CreateCbtProjectSchema = z.infer<typeof createCbtProjectSchema>;
export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
export type CreateOrganizationListFormSchema = z.infer<typeof createOrganizationListFormSchema>;
export type Step1ForCreateProjectSchema = z.infer<typeof step1ForCreateProjectSchema>;
export type Step1Schema = z.infer<typeof step1Schema>;
