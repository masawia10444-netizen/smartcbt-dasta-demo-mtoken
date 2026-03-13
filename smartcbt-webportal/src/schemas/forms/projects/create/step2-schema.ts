import {
  questionWithSubQuestionSchema,
  questionWithSubQuestionSchemaValidated,
  sectionSchema,
  sectionSchemaValidated,
  selectionQuestionSchema,
  selectionQuestionSchemaValidated,
  step2Question10Schema,
  step2Question10SchemaValidated,
  step2Question4Schema,
  step2Question4SchemaValidated,
  step2Question5Schema,
  step2Question5SchemaValidated,
  step2Question7Schema,
  step2Question7SchemaValidated,
  textArrayQuestionSchema,
  textArrayQuestionSchemaValidated,
} from "../question-schema";

import Step2WithValues from "@/config/create-project-step-2-with-values.json";
import Step2 from "@/config/create-project-step-2.json";
import { z } from "zod";

export const step2Schema = z.object({
  label: z.string(),
  "1": sectionSchema,
  "2": selectionQuestionSchema,
  "3": selectionQuestionSchema,
  "4": step2Question4Schema,
  "5": step2Question5Schema,
  "6": questionWithSubQuestionSchema,
  "7": step2Question7Schema,
  "8": sectionSchema,
  "9": sectionSchema,
  "10": step2Question10Schema,
  "11": textArrayQuestionSchema,
  "12": textArrayQuestionSchema,
  "13": textArrayQuestionSchema,
  "14": textArrayQuestionSchema,
  "15": textArrayQuestionSchema,
  "16": selectionQuestionSchema,
})

export const step2SchemaValidated = z.object({
  label: z.string(),
  "1": sectionSchemaValidated,
  "2": selectionQuestionSchemaValidated,
  "3": selectionQuestionSchemaValidated,
  "4": step2Question4SchemaValidated,
  "5": step2Question5SchemaValidated,
  "6": questionWithSubQuestionSchemaValidated,
  "7": step2Question7SchemaValidated,
  "8": sectionSchemaValidated,
  "9": sectionSchemaValidated,
  "10": step2Question10SchemaValidated,
  "11": textArrayQuestionSchemaValidated,
  "12": textArrayQuestionSchemaValidated,
  "13": textArrayQuestionSchemaValidated,
  "14": textArrayQuestionSchemaValidated,
  "15": textArrayQuestionSchemaValidated,
  "16": selectionQuestionSchemaValidated,
});

export type Step2Schema = z.infer<typeof step2Schema>;

export const step2DefaultValues = step2Schema.parse(Step2);
export const step2DefaultValuesMocked = step2Schema.parse(Step2WithValues);
