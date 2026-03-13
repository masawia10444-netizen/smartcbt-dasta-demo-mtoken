import { z } from "zod";

export const profileTravelMartSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  phoneNumber: z.string().trim(),
  password: z.string().trim(),
  email: z.string().trim(),
  organizationName: z.string().trim(),
  address: z.string().trim(),
  no: z.string().trim(),
  communityName: z.string().trim(),
  soi: z.string().trim(),
  mooNo: z.string().trim(),
  road: z.string().trim(),
  province: z.string().trim(),
  district: z.string().trim(),
  subdistrict: z.string().trim(),
  postCode: z.string().trim(),
  moo: z.string().trim(),
  dataDissemination: z.boolean(),
  consent: z.boolean(),
});

export type ProfileTravelMartSchema = z.infer<typeof profileTravelMartSchema>;
