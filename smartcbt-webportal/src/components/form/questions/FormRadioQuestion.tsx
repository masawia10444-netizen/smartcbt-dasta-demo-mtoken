import { useEffect, useRef } from "react"; // Import useRef
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { SelectionQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

type FormRadioQuestionProps<T extends FieldValues> = {
  disabled?: boolean;
} & UseControllerProps<T>;

const FormRadioQuestion = <T extends FieldValues>(props: FormRadioQuestionProps<T>) => {
  const { disabled, ...controller } = props;

  const { field } = useController(controller);

  const fieldValue = field.value as SelectionQuestionSchema;
  const radioRef = useRef<HTMLInputElement>(null);
  const otherTextFieldRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("common");
  useEffect(() => {
    if (fieldValue.value?.["other"]) {
      radioRef.current?.click();
    }
  }, [fieldValue]);

  return (
    <div className="flex flex-col gap-4">
      {fieldValue.options.map((option, index) => (
        <span className="flex items-center gap-2" key={index}>
          {option.key.includes("other") ? (
            <>
              <input
                id={`${fieldValue.key}-${option.key}-${option.value}`}
                ref={radioRef}
                className="form-radio checked:bg-smart-cbt-green hover:cursor-pointer"
                type="radio"
                value={option.value}
                disabled={disabled}
                checked={fieldValue.value?.[option.key] !== undefined}
                onChange={(e) => {
                  fieldValue.value = {};
                  fieldValue.value[option.key] = { value: e.target.value, customText: undefined };
                  field.onChange({ ...fieldValue });
                  otherTextFieldRef.current?.focus();
                }}
                {...controller}
              />
              <input
                ref={otherTextFieldRef}
                className={cn(
                  "h-10 rounded-md border border-smart-cbt-medium-grey bg-white p-2"
                  // fieldValue.value?.[option.key]?.customText ? "bg-white" : "bg-smart-cbt-light-grey"
                )}
                placeholder={t("global.other")}
                disabled={!fieldValue.value?.[option.key]}
                value={fieldValue.value?.[option.key]?.customText ?? ""}
                onFocus={(e) => {
                  radioRef.current?.click();
                  e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
                }}
                onChange={(e) => {
                  fieldValue.value[option.key] = { value: option.value, customText: e.target.value };
                  field.onChange({ ...fieldValue });
                }}
                {...controller}
              />
            </>
          ) : (
            <>
              <input
                id={`${fieldValue.key}-${option.key}-${option.value}`}
                className="form-radio checked:bg-smart-cbt-green hover:cursor-pointer"
                type="radio"
                value={option.value}
                disabled={disabled}
                checked={fieldValue.value?.[option.key] !== undefined}
                onChange={(e) => {
                  fieldValue.value = {};
                  fieldValue.value[option.key] = { value: e.target.value, customText: undefined };
                  field.onChange({ ...fieldValue });
                }}
                {...controller}
              />
              <label htmlFor={`${fieldValue.key}-${option.key}-${option.value}`} className="hover:cursor-pointer">
                {option.label}
              </label>
            </>
          )}
        </span>
      ))}
    </div>
  );
};

export default FormRadioQuestion;
