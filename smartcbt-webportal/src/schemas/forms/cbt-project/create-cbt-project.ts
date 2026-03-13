import { z } from "zod";

export const organizations = z.object({
  district_id: z.number(),
  district_title: z.string().nonempty(),
  id: z.union([z.number(), z.string()]),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  province_id: z.number(),
  region_id: z.number().optional(),
  region_title: z.string().optional(),
  province_title: z.string().nonempty(),
  subdistrict_id: z.number(),
  subdistrict_title: z.string().nonempty(),
  title: z.string().nonempty(),
});

export const createCbtProjectSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  title: z.string().nonempty(),
  organizations: organizations,
  createdOrganizations: organizations.nullish(),
  isCreateOrganizations: z.boolean().default(false),
});

export type CreateCbtProjectSchema = z.infer<typeof createCbtProjectSchema>;
export type OrganizationSchema = z.infer<typeof organizations>;
