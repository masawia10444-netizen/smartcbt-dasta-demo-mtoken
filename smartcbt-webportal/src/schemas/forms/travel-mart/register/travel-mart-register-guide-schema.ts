import { z } from "zod";
import { district, file, province, subdistrict } from "../../shard-schema";

const addressGuide = z.object({
  addressDetail: z.string(),
  postCode: z.string(),
  province: province,
  district: district,
  subdistrict: subdistrict,
});

export const travelMartRegisterGuideSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  identification: z.string(),
  nationality: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  line: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  affiliatedWith: z.string(),
  lengthOfGuide: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  lengthOfGuideMonth: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  files: file,
  language: z.array(z.object({ name: z.object({ id: z.string(), title: z.string() }) })),
  expiateDate: z.date(),
  licenseNumber: z.string(),
  companyWork: z.string(),
  languageAbility: z.union([z.string(), z.number()]),
  provinceGuide: province,
  guideAddress: addressGuide,
  haveOtherSocial: z.boolean(),
  otherSocial: z.string().optional(),
  dataDissemination: z.boolean(),
  consent: z.boolean(),
});

export type TravelMartRegisterGuideSchema = z.infer<typeof travelMartRegisterGuideSchema>;
