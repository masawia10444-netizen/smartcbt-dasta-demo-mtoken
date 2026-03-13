import { Fragment, useEffect, useRef } from "react"; // Import useRef
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { QuestionWithSubQuestionSchema, SelectionQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

type FormRadioGroupedQuestionProps<T extends FieldValues> = {
  disabled?: boolean;
} & UseControllerProps<T>;

const FormRadioGroupedQuestion = <T extends FieldValues>(props: FormRadioGroupedQuestionProps<T>) => {
  const { disabled, ...controller } = props;

  const { field } = useController(controller);

  const groupFieldValue = field.value as QuestionWithSubQuestionSchema;
  const radioRef = useRef<HTMLInputElement>(null);
  const otherTextFieldRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("common");

  useEffect(() => {
    if (groupFieldValue.value?.["other"]) {
      radioRef.current?.click();
    }
  }, [groupFieldValue]);

  return (
    <div className="flex flex-col gap-4">
      {groupFieldValue.subQuestions.map((subQuestion, index) => {
        const fieldValue = subQuestion as SelectionQuestionSchema;
        return (
          <Fragment key={index}>
            <label className="flex cursor-pointer text-left font-medium">{fieldValue.label}</label>
            {fieldValue.options.map((option, index) => (
              <span className="ml-6 flex items-center gap-2" key={index}>
                {option.key.includes("other") ? (
                  <>
                    <input
                      id={`${groupFieldValue.key}-${option.key}-${option.value}`}
                      ref={radioRef}
                      className="form-radio checked:bg-smart-cbt-green hover:cursor-pointer"
                      type="radio"
                      value={option.value}
                      checked={groupFieldValue.value?.[option.key] !== undefined}
                      onChange={(e) => {
                        groupFieldValue.value = {};
                        groupFieldValue.value[option.key] = { value: e.target.value, customText: undefined };
                        field.onChange({ ...groupFieldValue });
                        otherTextFieldRef.current?.focus();
                      }}
                      {...controller}
                    />
                    <input
                      ref={otherTextFieldRef}
                      className={cn(
                        "h-10 rounded-md border border-smart-cbt-medium-grey bg-white p-2"
                        // groupFieldValue.value?.[option.key]?.customText ? "bg-white" : "bg-smart-cbt-light-grey"
                      )}
                      placeholder={t("global.other")}
                      value={groupFieldValue.value?.[option.key]?.customText ?? ""}
                      onFocus={(e) => {
                        radioRef.current?.click();
                        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
                      }}
                      onChange={(e) => {
                        groupFieldValue.value[option.key] = { value: option.value, customText: e.target.value };
                        field.onChange({ ...groupFieldValue });
                      }}
                      {...controller}
                    />
                  </>
                ) : (
                  <>
                    <input
                      id={`${groupFieldValue.key}-${option.key}-${option.value}`}
                      className="form-radio checked:bg-smart-cbt-green hover:cursor-pointer"
                      type="radio"
                      value={option.value}
                      checked={groupFieldValue.value?.[option.key] !== undefined}
                      onChange={(e) => {
                        groupFieldValue.value = {};
                        groupFieldValue.value[option.key] = { value: e.target.value, customText: undefined };
                        field.onChange({ ...groupFieldValue });
                      }}
                      {...controller}
                    />
                    <label
                      htmlFor={`${groupFieldValue.key}-${option.key}-${option.value}`}
                      className="hover:cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </>
                )}
              </span>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
};

export default FormRadioGroupedQuestion;
