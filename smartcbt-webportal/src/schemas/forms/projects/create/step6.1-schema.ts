import { z } from "zod";
import { financialProxyCreateSchema } from "../../financial-proxies/financial-proxy-create-schema";

export const step61Question = z.object({
  title: z.string(),
  value: z.array(
    z.object({
      title: z.string(),
      benefitDetails: z.array(
        z.object({
          year: z.string().optional(),
          amount: z.number().optional(),
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
        })
      ),
    })
  ),
});

export const step61Schema = z.object({
  sensitivityAnalysis: z.boolean().default(false),
  sections: z.array(step61Question),
});
export type Step61Schema = z.infer<typeof step61Schema>;
