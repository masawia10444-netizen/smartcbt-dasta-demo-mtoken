import { z } from "zod";

export const manageApiOnboardingSchema = z.object({
  firstName: z.string().nullable().default(""),
  lastName: z.string().nullable().default(""),
  organization: z.string(),
});

export type ManageApiOnboardingSchema = z.infer<typeof manageApiOnboardingSchema>;
