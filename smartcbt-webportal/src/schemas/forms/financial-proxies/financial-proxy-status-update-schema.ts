import { FinancialProxyStatus } from "@/models/financial-proxy";
import { z } from "zod";

export const financialProxyStatusUpdateSchema = z.object({
  status: z.nativeEnum(FinancialProxyStatus),
});

export type FinancialProxyStatusUpdateSchema = z.infer<typeof financialProxyStatusUpdateSchema>;
