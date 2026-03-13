import { Control, UseFormGetValues, UseFormRegister, useFieldArray } from "react-hook-form";

import { DeleteIcon } from "@/components/Icon";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { cn } from "@/utils/cn";
import { viewMode } from "@/utils/project-create-form-helper";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

interface Step6NestedTextFieldProps {
  index: number;
  control: Control<any>;
  register: UseFormRegister<CreateProjectSchema>;
  getValues: UseFormGetValues<CreateProjectSchema>;
}
const Step6NestedTextField = (props: Step6NestedTextFieldProps) => {
  const { index, control, register, getValues } = props;
  const t = useTranslations("common");
  const { fields, append, remove } = useFieldArray({
    control,
    name: `step6.sections.${index}.value`,
  });

  const { viewOnly } = viewMode(getValues());

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      {fields.map((field, i) => {
        return (
          <div className="flex items-center justify-between gap-2" key={field.id}>
            <label className="text-sm text-black">{`${index + 1}.${i + 1}`}</label>
            <input
              disabled={viewOnly}
              className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey p-2")}
              placeholder={""}
              {...register(`step6.sections.${index}.value.${i}.title`)}
            />
            <DeleteIcon className="h-6 w-6 text-smart-cbt-red hover:cursor-pointer" onClick={() => remove(i)} />
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => append({ title: "", benefitDetails: [] })}
        className="flex items-center justify-center gap-2 rounded-md border border-dashed p-2 text-smart-cbt-dark-grey"
      >
        <PlusIcon className="h-6 w-6" />
        {t("global.add")}
      </button>
    </div>
  );
};

export default Step6NestedTextField;
