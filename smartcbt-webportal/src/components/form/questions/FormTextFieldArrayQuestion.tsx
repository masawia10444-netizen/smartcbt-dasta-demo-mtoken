import { DeleteIcon } from "@/components/Icon";
import { TextArrayQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type FormTextFieldArrayQuestionProps<T extends FieldValues> = {} & UseControllerProps<T>;

const FormTextFieldArrayQuestion = <T extends FieldValues>(props: FormTextFieldArrayQuestionProps<T>) => {
  const { ...controller } = props;
  const t = useTranslations("common");
  const { field } = useController(controller);

  const fieldValue = field.value as TextArrayQuestionSchema;

  return (
    <div className="flex flex-col gap-4">
      {fieldValue.value.map((text, i) => (
        <div className="flex items-center justify-between gap-2" key={i}>
          <input
            className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2")}
            placeholder={fieldValue.placeholder}
            disabled={fieldValue.disabled}
            value={text}
            onFocus={(e) => {
              e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
            }}
            onChange={(e) => {
              const newValue = [...fieldValue.value];
              newValue[i] = e.target.value;
              field.onChange({ ...fieldValue, value: newValue });
            }}
            {...controller}
          />
          <DeleteIcon
            className="text-smart-cbt-red hover:cursor-pointer"
            onClick={() => {
              const newValue = [...fieldValue.value];
              newValue.splice(i, 1);
              field.onChange({ ...fieldValue, value: newValue });
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newValue = [...fieldValue.value];
          newValue.push("");
          field.onChange({ ...fieldValue, value: newValue });
        }}
        className="flex items-center justify-center gap-2 rounded-md border border-dashed p-2 text-smart-cbt-dark-grey"
      >
        <PlusIcon className="h-6 w-6" />
        {t("global.add")}
      </button>
    </div>
  );
};

export default FormTextFieldArrayQuestion;
