import { FinancialProxyCategory, FinancialProxyStatus } from "@/models/financial-proxy";
import { z } from "zod";
import { file } from "../shard-schema";

export const financialProxyCreateSchema = z.object({
  id: z.string().optional(),
  discountRate: z.number(),
  status: z.nativeEnum(FinancialProxyStatus),
  proxyId: z.string().optional(),
  internalId: z.string().optional(),
  title: z.string().nonempty(),
  titleEn: z.string().nullish().optional(),
  category: z.nativeEnum(FinancialProxyCategory),
  type: z.object({ key: z.string(), value: z.string(), label: z.string() }),
  startingYear: z.number(),
  endingYear: z.number(),
  value: z.number(),
  unit: z.string().nonempty(),
  province: z.object({ id: z.number().nullish().optional(), title: z.string().nullish() }).nullable(),
  note: z.string().optional(),
  files: z.array(file).min(0),
  createdBy: z.string().nullish().optional(),
});

export type FinancialProxyCreateSchema = z.infer<typeof financialProxyCreateSchema>;
