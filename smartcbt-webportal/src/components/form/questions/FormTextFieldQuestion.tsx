import { FieldValues, UseControllerProps, useController, useFormContext } from "react-hook-form";

import { TextQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import { useEffect } from "react";

type FormTextQuestionProps<T extends FieldValues> = {
  disabled?: boolean;
  isSubQuestion?: boolean;
} & UseControllerProps<T>;

const FormTextQuestion = <T extends FieldValues>(props: FormTextQuestionProps<T>) => {
  const { disabled, isSubQuestion, ...controller } = props;
  const { field } = useController(controller);
  const fieldValue = field.value as TextQuestionSchema;

  const { watch, getValues, setValue } = useFormContext<any>();

  useEffect(() => {
    if (!fieldValue.displayCondition) return;
    const watchedKeys = fieldValue.displayCondition.keys.map((d) => d.key);
    const subscription = watch((value, { name, type }) => {
      if (name && type == "change" && watchedKeys.includes(name)) {
        const computeValue = () => {
          const action = fieldValue.displayCondition?.action;
          const values = fieldValue.displayCondition?.keys.map((k) => ({
            ...k,
            fetchedValue: Number(getValues(k.key).value),
          }));
          return values?.reduce((acc, value) => {
            let computedValue = acc;
            if (action == "plus") computedValue += value.fetchedValue;
            if (action == "minus") computedValue -= value.fetchedValue;
            if (action == "equal") computedValue = value.fetchedValue;
            if (!value.action) return computedValue;
            if (value.action == "plus" && value.value) return computedValue + value.value;
            if (value.action == "minus" && value.value) return computedValue - value.value;
            return computedValue;
          }, 0);
        };
        field.onChange({ ...fieldValue, value: computeValue() });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="flex gap-4">
      <span className="mb-2 flex flex-col items-start lg:mb-2 lg:flex-row lg:items-center lg:gap-2">
        <div className="flex flex-col gap-5 lg:flex-row">
          {isSubQuestion && <label className="text-sm text-black">{fieldValue.label}</label>}
          <input
            disabled={fieldValue.disabled}
            className={cn(
              "h-10 rounded-md border border-smart-cbt-medium-grey bg-white p-2 disabled:bg-smart-cbt-light-grey disabled:text-smart-cbt-medium-grey"
            )}
            placeholder={fieldValue.placeholder}
            onFocus={(e) => {
              e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
            }}
            name={controller.name}
            onChange={(e) => {
              field.onChange({ ...fieldValue, value: e.target.value });
            }}
            value={field.value.value}
          />
        </div>
      </span>
    </div>
  );
};

export default FormTextQuestion;
