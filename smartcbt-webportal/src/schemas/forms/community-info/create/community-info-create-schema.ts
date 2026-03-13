import { z } from "zod";
import { step1Schema } from "./community-info-create-schema-step1";
import { step2Schema } from "./community-info-create-schema-step2";
import { step3Schema } from "./community-info-create-schema-step3";

export const communityInfoCreateSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  dataDissemination: z.boolean(),
  consent: z.boolean(),
});

export type CommunityInfoCreateSchema = z.infer<typeof communityInfoCreateSchema>;
