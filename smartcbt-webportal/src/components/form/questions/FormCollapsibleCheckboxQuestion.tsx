import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { SelectionQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";

type FormCollapsibleCheckboxQuestionProps<T extends FieldValues> = {
  disabled?: boolean;
  showTextField?: boolean;
} & UseControllerProps<T>;

const FormCollapsibleCheckboxQuestion = <T extends FieldValues>(props: FormCollapsibleCheckboxQuestionProps<T>) => {
  const { disabled, showTextField, ...controller } = props;
  const { field } = useController(controller);

  // TODO: edit this one later

  const fieldValue = field.value as SelectionQuestionSchema;

  const handleCheckboxChange = (option: { key: string; label: string; value: string }) => {
    if (fieldValue.value?.[option.key]) {
      delete fieldValue.value?.[option.key];
      field.onChange({
        ...fieldValue,
      });
    } else {
      fieldValue.value[option.key] = { value: option.value };
      field.onChange({
        ...fieldValue,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {fieldValue.options.map((option, index) => (
        <span className="flex items-start gap-2 md:items-center" key={index}>
          <input
            id={`${fieldValue.key}-${option.key}-${option.value}`}
            className="form-checkbox checked:bg-smart-cbt-green hover:cursor-pointer"
            type="checkbox"
            value={option.value}
            disabled={disabled}
            checked={fieldValue.value?.[option.key] !== undefined}
            onChange={() => handleCheckboxChange(option)}
            {...controller}
          />
          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-2">
            <label
              htmlFor={`${fieldValue.key}-${option.key}-${option.value}`}
              className="mb-2 hover:cursor-pointer lg:mb-0 "
            >
              {option.label}
              {option.description && option.description}
            </label>
            {showTextField &&
              (option.label === "อื่นๆ" ? (
                <input
                  id={`${fieldValue.key}-${option.key}-${option.value}`}
                  className={cn(
                    "h-10 rounded-md border border-smart-cbt-medium-grey p-2",
                    fieldValue.value?.[option.key] ? "bg-white" : "bg-smart-cbt-light-grey"
                  )}
                  placeholder={option?.placeholder}
                  disabled={!fieldValue.value?.[option.key]}
                  value={fieldValue.value?.[option.key]?.customText ?? ""}
                  onChange={(e) => {
                    fieldValue.value[option.key] = { value: option.value, customText: e.target.value };
                    field.onChange({ ...fieldValue });
                  }}
                  {...controller}
                />
              ) : null)}
          </div>
        </span>
      ))}
    </div>
  );
};

export default FormCollapsibleCheckboxQuestion;
