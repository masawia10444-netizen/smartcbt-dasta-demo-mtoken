import { EmissionFactorProxyStatus } from "@/models/emission-factor-proxy";
import { z } from "zod";
import { file } from "../../shard-schema";

export const emissionProxyCreateSchema = z
  .object({
    id: z.union([z.number(), z.string()]).optional(),
    status: z.nativeEnum(EmissionFactorProxyStatus),
    name: z.string().nonempty(),
    unit: z.string(),
    approvedBy: z.string().optional(),
    pcr_type: z.object({ id: z.number(), label: z.string() }),
    emission_factor_value: z.number(),
    emission_factor_unit: z.object({ id: z.number(), label: z.string() }),
    hasControlVariable: z.boolean().default(false),
    controlVariableValue: z.number().nullish(),
    controlVariableUnit: z.string().nullish(),
    files: z.array(file).min(0),
    isTooltipEnabled: z.boolean().default(false),
    tooltip: z.string().default(""),
  })
  .refine((form) => !form.hasControlVariable || form.controlVariableValue || form.controlVariableUnit, {
    params: { i18n: "customRequired" },
    path: ["controlVariableValue"],
  })
  .refine((form) => !form.isTooltipEnabled || form.tooltip.length > 0, {
    params: { i18n: "customRequired" },
    path: ["tooltip"],
  });

export type EmissionProxyCreateSchema = z.infer<typeof emissionProxyCreateSchema>;
