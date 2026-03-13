import { isEmpty } from "lodash";
import { z } from "zod";
import { financialProxyCreateSchema } from "../../financial-proxies/financial-proxy-create-schema";
import { file } from "../../shard-schema";

const additionalInfoSchema = z
  .object({
    hasAdditionalInfo: z.boolean().default(false),
    details: z.string().optional(),
    benefitPercentage: z.number().default(100),
    percentage: z.number().default(0),
  })
  .refine(
    (form) => {
      return (form.hasAdditionalInfo && !isEmpty(form.details)) || !form.hasAdditionalInfo;
    },
    {
      path: ["details"],
    }
  );

const financialProxy = z.object({
  id: z.string(),
  title: z.string(),
});

const benefitDetailsSchema = z.object({
  year: z.string().optional(),
  amount: z.number().optional(),
  attribution: additionalInfoSchema.nullish().optional(),
  deadweight: additionalInfoSchema.nullish().optional(),
  displacement: additionalInfoSchema.nullish().optional(),
  isFilled: z.boolean().nullish(),
  unitPerYear: z.string().optional(),
  proxy: financialProxyCreateSchema.nullish(),
  isCreatedProxy: z.boolean().default(false),
  totalAmount: z.number().optional(), // amount * value
  variableCost: z.number().optional(),
  netBenefit: z.number().optional(),
  netBenefitExPost: z.number().optional(),
  nonVariableCost: z.number().optional(),
  maximumPercentage: z.number().optional(),
  minimumPercentage: z.number().optional(),
  proxies: z.array(financialProxy).default([]),
});

const detailsSchema = z.object({
  title: z.string(),
  benefitDetails: z.array(benefitDetailsSchema),
});

export const step8QuestionSchema = z.object({
  title: z.string(),
  value: z.array(detailsSchema),
  referenceDocuments: z.array(file).min(0).optional().nullish(),
});

export const step8Schema = z.object({
  sensitivityAnalysis: z.boolean().default(false),
  sections: z.array(step8QuestionSchema),
  proxyCreated: z.array(financialProxyCreateSchema).default([]),
});

export type AdditionalInfoSchema = z.infer<typeof additionalInfoSchema>;

export type BenefitDetailsSchema = z.infer<typeof benefitDetailsSchema>;

export type Step8DetailsSchema = z.infer<typeof detailsSchema>;

export type Step8Schema = z.infer<typeof step8Schema>;
