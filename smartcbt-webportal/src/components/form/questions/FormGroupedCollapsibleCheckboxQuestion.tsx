import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { QuestionWithSubQuestionSchema, SelectionQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import { Fragment } from "react";

type FormGroupedCollapsibleCheckboxQuestionProps<T extends FieldValues> = {
  disabled?: boolean;
  showTextField?: boolean;
} & UseControllerProps<T>;

const FormGroupedCollapsibleCheckboxQuestion = <T extends FieldValues>(
  props: FormGroupedCollapsibleCheckboxQuestionProps<T>
) => {
  const { disabled, showTextField, ...controller } = props;

  const { field } = useController(controller);

  // TODO: edit this one later

  const groupFieldValue = field.value as QuestionWithSubQuestionSchema;

  const handleCheckboxChange = (option: { key: string; label: string; value: string }) => {
    if (groupFieldValue.value?.[option.key]) {
      delete groupFieldValue.value?.[option.key];
      field.onChange({
        ...groupFieldValue,
      });
    } else {
      groupFieldValue.value[option.key] = { value: option.value };
      field.onChange({
        ...groupFieldValue,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {groupFieldValue.subQuestions.map((subQuestion, index) => {
        const fieldValue = subQuestion as SelectionQuestionSchema;

        return (
          <Fragment key={index}>
            <label className="flex cursor-pointer text-left font-medium">{fieldValue.label}</label>
            {fieldValue.options.map((option, index) => (
              <span className="ml-6 flex items-center gap-2" key={index}>
                <input
                  id={`${groupFieldValue.key}-${option.key}-${option.value}`}
                  className="form-checkbox checked:bg-smart-cbt-green hover:cursor-pointer"
                  type="checkbox"
                  value={option.value}
                  disabled={disabled}
                  checked={groupFieldValue.value?.[option.key] !== undefined}
                  onChange={() => handleCheckboxChange(option)}
                  {...controller}
                />
                <label
                  htmlFor={`${groupFieldValue.key}-${option.key}-${option.value}`}
                  className="hover:cursor-pointer"
                >
                  {option.label}
                </label>
                {showTextField && (
                  <input
                    id={`${groupFieldValue.key}-${option.key}-${option.value}`}
                    className={cn(
                      "h-10 rounded-md border border-smart-cbt-medium-grey p-2",
                      groupFieldValue.value?.[option.key] ? "bg-white" : "bg-smart-cbt-light-grey"
                    )}
                    disabled={!groupFieldValue.value?.[option.key]}
                    value={groupFieldValue.value?.[option.key]?.customText ?? ""}
                    onChange={(e) => {
                      groupFieldValue.value[option.key] = { value: option.value, customText: e.target.value };
                      field.onChange({ ...groupFieldValue });
                    }}
                    {...controller}
                  />
                )}
              </span>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
};

export default FormGroupedCollapsibleCheckboxQuestion;
