import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { QuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import { FormFieldError } from "../FormFieldError";
import FormCollapsibleCheckboxQuestion from "./FormCollapsibleCheckboxQuestion";
import FormRadioQuestion from "./FormRadioQuestion";
import FormTextQuestion from "./FormTextFieldQuestion";

type FormSubQuestionProps<T extends FieldValues> = {} & UseControllerProps<T>;

const FormSubQuestion = <T extends FieldValues>(props: FormSubQuestionProps<T>) => {
  const { ...controller } = props;

  const {
    field,
    fieldState: { error },
  } = useController(controller);

  const fieldValue = field.value as QuestionSchema;

  const renderChildren = () => {
    switch (fieldValue.type) {
      case "radio":
        return <FormRadioQuestion {...controller} />;
      case "checkbox":
        return <FormCollapsibleCheckboxQuestion {...controller} />;
      case "checkboxWithTextField":
        return <FormCollapsibleCheckboxQuestion {...controller} showTextField />;
      case "textField":
        return <FormTextQuestion {...controller} isSubQuestion />;
      default:
        break;
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 rounded-lg bg-white p-4 text-sm font-medium")}>
      <label className="flex cursor-pointer text-left font-medium ">
        {fieldValue.label} <FormFieldError error={error?.message} />
      </label>
      <div className="ml-6">{renderChildren()}</div>
    </div>
  );
};

export default FormSubQuestion;
