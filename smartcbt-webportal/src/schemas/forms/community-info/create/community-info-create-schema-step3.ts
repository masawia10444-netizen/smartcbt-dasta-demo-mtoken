import { z } from "zod";
import { selectionQuestionSchema } from "../../projects/question-schema";

// Schema for step 3 data
export const step3Schema = z.object({
  "1": selectionQuestionSchema,
  "2-1": selectionQuestionSchema,
  "2-2": selectionQuestionSchema,
  "2-3": selectionQuestionSchema,
});

export type Step3Schema = z.infer<typeof step3Schema>;
