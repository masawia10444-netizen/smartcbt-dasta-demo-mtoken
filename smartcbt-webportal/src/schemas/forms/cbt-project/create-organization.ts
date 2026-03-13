import { z } from "zod";
import { district, province, subdistrict } from "../shard-schema";

export const createOrganizationSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty(),
  province: province,
  district: district,
  subdistrict: subdistrict,
  postCode: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
