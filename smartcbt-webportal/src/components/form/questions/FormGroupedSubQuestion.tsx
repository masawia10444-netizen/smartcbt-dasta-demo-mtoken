import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { QuestionWithSubQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import FormGroupedCollapsibleCheckboxQuestion from "./FormGroupedCollapsibleCheckboxQuestion";
import FormRadioGroupedQuestion from "./FormRadioGroupedQuestion";

type FormGroupedSubQuestionProps<T extends FieldValues> = {} & UseControllerProps<T>;

const FormGroupedSubQuestion = <T extends FieldValues>(props: FormGroupedSubQuestionProps<T>) => {
  const { ...controller } = props;

  const { field } = useController(controller);

  const fieldValue = field.value as QuestionWithSubQuestionSchema;

  const renderChildren = () => {
    switch (fieldValue.subQuestionType) {
      case "radio":
        return <FormRadioGroupedQuestion {...controller} />;
      case "checkbox":
        return <FormGroupedCollapsibleCheckboxQuestion {...controller} />;
      case "checkboxWithTextField":
        return <FormGroupedCollapsibleCheckboxQuestion {...controller} showTextField />;
      default:
        break;
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 rounded-lg bg-white p-4 text-sm font-medium")}>{renderChildren()}</div>
  );
};

export default FormGroupedSubQuestion;
