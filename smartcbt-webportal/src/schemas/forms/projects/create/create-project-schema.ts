import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { z } from "zod";
import { referenceDocumentsSchema, step1Schema } from "./step1-schema";
import { step2SchemaValidated } from "./step2-schema";
import { step4Schema } from "./step4-schema";
import { step6Schema } from "./step6-schema";
import { step61Schema } from "./step6.1-schema";
import { step7Schema } from "./step7-schema";
import { step8Schema } from "./step8-schema";

export const createProjectSchema = z.object({
  id: z.string().optional(),
  user_created: z.string().optional(),
  remark: z.string().optional().nullish(),
  referenceDocuments: z.array(referenceDocumentsSchema).optional().nullish(),
  status: z.nativeEnum(PROJECT_STATUS).optional(),
  step1: step1Schema,
  step2: step2SchemaValidated,
  step3: z.undefined(),
  step4: step4Schema,
  step5: z.undefined(),
  step6: step8Schema,
});

const allStepValidation = {
  step1: step1Schema,
  step2: step2SchemaValidated,
  step3: z.undefined(),
  step4: step4Schema,
  step5: z.undefined(),
  step6: step6Schema,
  step61: step61Schema,
  step7: step7Schema,
  step8: step8Schema,
};

export const createProjectSchemaValidation = (realStep: string, stepValidated: keyof typeof allStepValidation) =>
  z.object({ [realStep]: allStepValidation[stepValidated] });

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
