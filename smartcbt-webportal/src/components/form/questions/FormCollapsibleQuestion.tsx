import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { TriangleUpIcon } from "@/components/Icon";
import { QuestionSchema } from "@/schemas/forms/projects/question-schema";
import { cn } from "@/utils/cn";
import { Disclosure } from "@headlessui/react";
import { FormFieldError } from "../FormFieldError";
import FormCollapsibleCheckboxQuestion from "./FormCollapsibleCheckboxQuestion";
import FormRadioQuestion from "./FormRadioQuestion";
import FormTextFieldArrayQuestion from "./FormTextFieldArrayQuestion";
import FormTextQuestion from "./FormTextFieldQuestion";

type FormCollapsibleQuestionProps<T extends FieldValues> = {
  shadow?: boolean;
  isSubQuestion?: boolean;
} & UseControllerProps<T>;

const FormCollapsibleQuestion = <T extends FieldValues>(props: FormCollapsibleQuestionProps<T>) => {
  const { shadow, ...controller } = props;

  const {
    field,
    fieldState: { error },
  } = useController(controller);

  const fieldValue = field.value as QuestionSchema;

  const renderChildren = () => {
    switch (fieldValue.type) {
      case "radio":
        return <FormRadioQuestion {...controller} />;
      case "radioWithoutRequired":
        return <FormRadioQuestion {...controller} />;
      case "checkbox":
        return <FormCollapsibleCheckboxQuestion {...controller} />;
      case "checkboxWithoutRequired":
        return <FormCollapsibleCheckboxQuestion {...controller} />;
      case "checkboxWithTextField":
        return <FormCollapsibleCheckboxQuestion {...controller} showTextField />;
      case "textField":
        return <FormTextQuestion {...controller} isSubQuestion={false} />;
      case "textFieldArray":
        return <FormTextFieldArrayQuestion {...controller} />;
      default:
        break;
    }
  };

  return (
    <div className={cn("my-2 rounded-lg bg-white p-4 text-sm font-medium", shadow ? "shadow" : "")}>
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="flex flex-col gap-2">
            <Disclosure.Button className="bg-white hover:cursor-pointer">
              <div className="flex items-center gap-2 hover:cursor-pointer">
                <TriangleUpIcon
                  className={cn(
                    "h-3 w-3 rotate-90 transform text-smart-cbt-dark-green",
                    open ? "rotate-180 transform" : ""
                  )}
                />
                <label className="flex cursor-pointer text-left font-medium ">{fieldValue?.label} </label>
                <FormFieldError error={error?.message} />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col gap-2 pl-6 ">{renderChildren()}</Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default FormCollapsibleQuestion;
