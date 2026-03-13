import { EmissionFactorProxyStatus } from "@/models/emission-factor-proxy";
import { z } from "zod";

export const emissionProxyStatusUpdateSchema = z.object({
  status: z.nativeEnum(EmissionFactorProxyStatus),
});

export type EmissionProxyStatusUpdateSchema = z.infer<typeof emissionProxyStatusUpdateSchema>;
