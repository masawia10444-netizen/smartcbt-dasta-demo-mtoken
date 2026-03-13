import { z } from "zod";
import {
  selectionQuestionOptionalSchemaValidated,
  selectionQuestionSchema,
  selectionQuestionSchemaValidated,
} from "../../projects/question-schema";
import { district, province, subdistrict } from "../../shard-schema";

const addressEntrepreneur = z.object({
  addressDetail: z.string().optional(),
  no: z.string().optional(),
  villageName: z.string().optional(),
  moo: z.string().optional(),
  soi: z.string().optional(),
  road: z.string().optional(),
  lat: z.string().optional(),
  googleMapUrl: z.string().optional(),
  long: z.string().optional(),
  postCode: z.string(),
  province: province,
  district: district,
  subdistrict: subdistrict,
});

const association = z.object({
  id: z.number(),
  title: z.string(),
});

const typeOfEstablishment = z.object({
  id: z.number(),
  title: z.string(),
});

export const travelMartRegisterEntrepreneurSchema = z.object({
  companyName: z.string(),
  companyLicenseNumber: z.string(),
  lengthOfBusiness: z.number(),
  files: z.array(z.any()),
  phoneNumber: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  line: z.string().optional(),
  address: addressEntrepreneur,
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tikTok: z.string().optional(),
  haveOther: z.boolean(),
  other: z.string().optional(),
  association: association,
  typeOfEstablishment: typeOfEstablishment,
  step3Other: z.string().optional(),
  step4Other: z.string().optional(),
  step5Have: z.array(z.object({ name: z.string() })),
  step6Other: z.string().optional(),
  step8Other: z.string().optional(),
  step9Other: z.string().optional(),
  step3: selectionQuestionSchemaValidated.refine((s) => s),
  step4: selectionQuestionSchemaValidated,
  step5: selectionQuestionOptionalSchemaValidated,
  step6: selectionQuestionSchemaValidated,
  step7: selectionQuestionSchemaValidated,
  step8: selectionQuestionSchemaValidated,
  step9: selectionQuestionSchemaValidated,
  step10: selectionQuestionSchemaValidated,
  step11: selectionQuestionSchemaValidated,
  dataDissemination: z.boolean(),
  consent: z.boolean(),
});
// .refine(({ files }) => files?.length === 0, "File is required.");

const stepSchema = z.object({
  "3": selectionQuestionSchema,
  "4": selectionQuestionSchema,
  "5": selectionQuestionSchema,
  "6": selectionQuestionSchema,
  "7": selectionQuestionSchema,
  "8": selectionQuestionSchema,
  "9": selectionQuestionSchema,
  "10": selectionQuestionSchema,
  "11": selectionQuestionSchema,
});

export const stepEntrepreneurFormSchema = z.object({
  step: stepSchema,
});

export type TravelMartRegisterEntrepreneurSchema = z.infer<typeof travelMartRegisterEntrepreneurSchema>;
