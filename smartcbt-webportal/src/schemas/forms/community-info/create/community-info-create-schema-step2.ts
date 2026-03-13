import { z } from "zod";

// Utility function to add custom issues
function addIssue(ctx: z.RefinementCtx, path: string[], error: string) {
  return ctx.addIssue({
    code: z.ZodIssueCode.custom,
    path: path,
    message: error,
  });
}

const facilityOptionSchema = z.object({
  id: z.number(),
  isEnabled: z.boolean(),
  title: z.string().optional(),
  unit: z.string().optional(),
  isQuantityEnabled: z.boolean(),
  isSizeEnabled: z.boolean(),
  quantity: z.number().optional(),
  size: z.number().optional(),
});

const facilityOptionType = z.enum(["none", "group"]);

// Schema for step 2 data
export const step2Schema = z.array(
  z
    .object({
      type: facilityOptionType,
      facility: facilityOptionSchema.optional(), // Non-group
      title: z.string().optional(), // Group
      facilities: z.array(facilityOptionSchema).optional(), // Group
      isEnabled: z.boolean().optional(), // Group
    })
    .superRefine((form, ctx) => {
      const { type, isEnabled, facilities } = form;
      if (type === "group" && isEnabled) {
        const enabledFacilities = facilities?.filter((value) => value.isEnabled === true) || [];
        if (enabledFacilities.length === 0) {
          addIssue(ctx, ["isEnabled"], "Required");
        }
      }
    })
);

export type Step2Schema = z.infer<typeof step2Schema>;
export type FacilityOptionSchema = z.infer<typeof facilityOptionSchema>;
