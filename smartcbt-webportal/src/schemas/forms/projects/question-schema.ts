import { z } from "zod";

export const questionOptionsSchema = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  value: z.string(),
});

export const questionOptionsSchemaValidated = questionOptionsSchema.refine(
  (schema) => schema.value && schema.value.length > 0,
  {
    params: { i18n: "customRequired" },
  }
);

export const questionAnswerSchema = z.object({
  value: z.union([z.string(), z.array(z.string()).min(1)]),
  customText: z.string().optional(),
});

export const questionType = z.enum([
  "textField",
  "radio",
  "radioWithoutRequired",
  "checkbox",
  "checkboxWithoutRequired",
  "checkboxWithTextField",
  "textFieldArray",
  "customComponent",
]);

const baseSelectionQuestionSchema = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string().optional(),
  placeholder: z.string().default(""),
  type: questionType,
  value: z.record(z.string(), questionAnswerSchema).default({}),
});

export const selectionQuestionSchema = baseSelectionQuestionSchema.merge(
  z.object({
    options: z.array(questionOptionsSchema),
  })
);

export const selectionQuestionSchemaValidated = baseSelectionQuestionSchema
  .merge(
    z.object({
      options: z.array(questionOptionsSchemaValidated),
    })
  )
  .refine(
    (schema) => {
      if (schema.type == "radioWithoutRequired") return true;
      if (schema.type == "checkboxWithoutRequired") return true;
      if (Object.keys(schema.value).length == 0) return false;
      if (schema.type == "checkboxWithTextField" && schema.options.some((item) => item.label == "อื่นๆ")) {
        const value = schema.options.find((item: { label: string }) => item.label == "อื่นๆ")?.value;
        if (!value) return false;
        if (value && Object.values(schema.value).find((item) => item.value == value)) {
          return !!Object.values(schema.value).find((item) => item.value == value)?.customText;
        }
      } else if (schema.type == "checkboxWithTextField") {
        return Object.values(schema.value).every((item) => !!item.customText);
      } else if (schema.type == "radio") {
        const value = Object.values(schema.value).at(0);
        if (!value) return false;
        if (value.value == "other") {
          return value.customText && value.customText != "";
        }
      }
      return true;
    },
    {
      params: { i18n: "customRequired" },
    }
  );

export const selectionQuestionOptionalSchemaValidated = baseSelectionQuestionSchema
  .merge(
    z.object({
      options: z.array(questionOptionsSchemaValidated),
    })
  )
  .refine(
    (schema) => {
      if (Object.keys(schema.value).length == 0) return true;
      if (schema.type == "checkboxWithTextField") {
        return Object.values(schema.value).every((item) => !!item.customText);
      } else if (schema.type == "radioWithoutRequired") {
        return true;
      } else if (schema.type == "checkboxWithoutRequired") {
        return true;
      } else if (schema.type == "radio") {
        const value = Object.values(schema.value).at(0);
        if (!value) return false;
        if (value.value == "other") {
          return value.customText && value.customText != "";
        }
      }
      return true;
    },
    {
      params: { i18n: "customRequired" },
    }
  );

export const displayConditionAction = z.enum(["plus", "minus", "equal"]);

export const textQuestionSchema = z.object({
  key: z.string().default(""),
  label: z.string().default(""),
  description: z.string().optional(),
  placeholder: z.string().default(""),
  value: z.string().or(z.number()).optional(),
  type: z.literal("textField"),
  disabled: z.boolean().default(false),
  displayCondition: z
    .object({
      action: displayConditionAction,
      keys: z.array(
        z.object({
          key: z.string(),
          action: displayConditionAction.nullish(),
          value: z.number().nullish(),
        })
      ),
    })
    .nullish(),
});

export const textQuestionSchemaValidated = textQuestionSchema.refine(
  (schema) =>
    schema.disabled
      ? true
      : schema.value &&
        ((typeof schema.value == "string" && schema.value.length > 0) || typeof schema.value == "number"),
  {
    params: { i18n: "customRequired" },
  }
);

export const textArrayQuestionSchema = z.object({
  key: z.string().default(""),
  label: z.string().default(""),
  description: z.string().optional(),
  placeholder: z.string().default(""),
  value: z.array(z.string()).default([]),
  type: questionType,
  disabled: z.boolean().default(false),
});

export const textArrayQuestionSchemaValidated = textArrayQuestionSchema.refine(
  (schema) => (schema.disabled ? true : schema.value.length > 0),
  {
    params: { i18n: "customRequired" },
  }
);

export const questionSchema = z.union([selectionQuestionSchema, textQuestionSchema, textArrayQuestionSchema]);

export const questionSchemaValidated = z.union([
  selectionQuestionSchemaValidated,
  textQuestionSchemaValidated,
  textArrayQuestionSchemaValidated,
]);

const baseQuestionWithSubQuestionSchema = z.object({
  key: z.string(),
  label: z.string(),
  subQuestionType: questionType,
  value: z.record(z.string(), questionAnswerSchema).default({}),
});

export const questionWithSubQuestionSchema = baseQuestionWithSubQuestionSchema.merge(
  z.object({
    subQuestions: z.array(questionSchema),
  })
);

export const questionWithSubQuestionSchemaValidated = questionWithSubQuestionSchema.refine((schema) => {
  if (Object.keys(schema.value).length == 0) return false;
  if (schema.subQuestionType == "checkboxWithTextField") {
    return Object.values(schema.value).every((item) => !!item.customText);
  } else if (schema.subQuestionType == "radioWithoutRequired") {
    return true;
  } else if (schema.subQuestionType == "checkboxWithoutRequired") {
    return true;
  } else if (schema.subQuestionType == "radio") {
    const value = Object.values(schema.value).at(0);
    if (!value) return false;
    if (value.value == "other") {
      return value.customText && value.customText != "";
    }
  }
  return true;
});

const baseSectionSchema = z.object({
  label: z.string(),
  key: z.string(),
  category: z.enum(["section", "question"]),
});

export const sectionSchema = baseSectionSchema.merge(
  z.object({
    questions: z.array(z.union([questionWithSubQuestionSchema, questionSchema])).default([]),
  })
);

export const sectionSchemaValidated = baseSectionSchema.merge(
  z.object({
    questions: z.array(z.union([questionWithSubQuestionSchemaValidated, questionSchemaValidated])).default([]),
  })
);

const step2Question4Answer = z.enum(["new", "continue"]);

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const step2Question4Schema = z.object({
  key: z.string(),
  label: z.string().default(""),
  options: z.array(questionOptionsSchema),
  value: step2Question4Answer.default("new"),
  project: projectSchema.nullish().default(null),
  type: questionType,
  disabled: z.boolean().default(false),
});

export const step2Question4SchemaValidated = step2Question4Schema.refine(
  (schema) => schema.value == "new" || (schema.value == "continue" && schema.project != null),
  {
    path: ["project"],
    params: { i18n: "customRequired" },
  }
);

// TODO : fix this later

export const step2Question5Schema = z.object({
  key: z.string(),
  label: z.string().default(""),
  location: z.string().default("").optional(),
  province: z.object({ id: z.number().optional(), title: z.string().nullish() }).nullish(),
  district: z.object({ id: z.number().optional(), title: z.string().nullish() }).nullish(),
  subDistrict: z.object({ id: z.number().optional(), title: z.string().nullish() }).nullish(),
  postcode: z.string().default(""),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  type: questionType,
  disabled: z.boolean().default(false),
});

// Disable required for now
export const step2Question5SchemaValidated = step2Question5Schema;
// .refine((data) => !!data.location, {
//   params: { i18n: "customRequired" },
//   path: ["location"],
// })
// .refine((data) => !!data.province, {
//   params: { i18n: "customRequired" },
//   path: ["province"],
// })
// .refine((data) => !!data.district, {
//   params: { i18n: "customRequired" },
//   path: ["district"],
// })
// .refine((data) => !!data.subDistrict, {
//   params: { i18n: "customRequired" },
//   path: ["subDistrict"],
// })
// .refine((data) => !!data.postcode, {
//   params: { i18n: "customRequired" },
//   path: ["postcode"],
// });

export const step2Question7Schema = z.object({
  key: z.string(),
  label: z.string().default(""),
  projectAgency: z.object({ id: z.string(), title: z.string().nullish(), value: z.string().nullable() }).nullish(),
  organization: z.string().default(""),
  type: questionType,
});

export const step2Question7SchemaValidated = step2Question7Schema
  .refine((data) => !!data.projectAgency, {
    params: { i18n: "customRequired" },
    path: ["projectAgency"],
  })
  .refine((data) => !!data.organization, {
    params: { i18n: "customRequired" },
    path: ["organization"],
  });

export const budgetSchemaYearInfo = z.object({
  description: z.string().nonempty(),
  amount: z.number().min(0),
  unit: z.string().default(""),
});

export const budgetSchema = z.object({
  year: z.string(),
  values: z.array(budgetSchemaYearInfo).default([]),
});

export const step2Question10Schema = z.object({
  key: z.string(),
  label: z.string().default(""),
  value: z.array(budgetSchema).default([]),
  type: questionType,
  disabled: z.boolean().default(false),
});

export const step2Question10SchemaValidated = step2Question10Schema.refine(
  (schema) => {
    return schema.value.length > 0;
  },
  {
    path: ["value"],
    params: { i18n: "customRequired" },
  }
);

export type ProjectSchema = z.infer<typeof projectSchema>;
export type Step2Question4Schema = z.infer<typeof step2Question4Schema>;
export type Step2Question5Schema = z.infer<typeof step2Question5Schema>;
export type BudgetSchema = z.infer<typeof budgetSchema>;
export type BudgetSchemaYearInfo = z.infer<typeof budgetSchemaYearInfo>;
export type Step2Question10Schema = z.infer<typeof step2Question10Schema>;
export type TextArrayQuestionSchema = z.infer<typeof textArrayQuestionSchema>;
export type TextQuestionSchema = z.infer<typeof textQuestionSchema>;
export type SelectionQuestionSchema = z.infer<typeof selectionQuestionSchema>;
export type QuestionSchema = z.infer<typeof questionSchema>;
export type QuestionWithSubQuestionSchema = z.infer<typeof questionWithSubQuestionSchema>;
export type SectionSchema = z.infer<typeof sectionSchema>;
export type QuestionType = z.infer<typeof questionType>;
export type QuestionAnswerSchema = z.infer<typeof questionAnswerSchema>;
