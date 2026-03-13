import { z } from "zod";
import { district, province, subdistrict } from "../../shard-schema";

const addressCommunity = z.object({
  addressDetail: z.string(),
  no: z.string().optional(),
  villageName: z.string().optional(),
  moo: z.string().optional(),
  soi: z.string().optional(),
  road: z.string().optional(),
  postCode: z.string(),
  province: province,
  district: district,
  subdistrict: subdistrict,
});

export const travelMartRegisterCommunitySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  // password: z.string().min(PASSWORD_MIN_LENGTH),
  // communityName: z.string(),
  communityAddress: addressCommunity,
  dataDissemination: z.boolean(),
  consent: z.boolean(),
});

export type TravelMartRegisterCommunitySchema = z.infer<typeof travelMartRegisterCommunitySchema>;
