import { TriangleUpIcon } from "@/components/Icon";
import { FormFieldError } from "@/components/form/FormFieldError";
import { cn } from "@/utils/cn";
import { formatError } from "@/utils/helper";
import { Disclosure } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type QuestionSectionProps<T extends FieldValues> = {
  label: string;
  description?: string;
  className?: string;
  shadow?: boolean;
} & UseControllerProps<T>;

const QuestionSection = <T extends FieldValues>(props: PropsWithChildren<QuestionSectionProps<T>>) => {
  const { className, label, children, shadow, description, ...controller } = props;

  const {
    field,
    fieldState: { error },
  } = useController(controller);
  return (
    <div
      className={cn(
        "my-2 h-full rounded-lg bg-white p-4 font-prompt text-sm font-medium",
        className,
        shadow ? "shadow" : ""
      )}
    >
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="bg-white hover:cursor-pointer">
              <div className="flex items-center gap-2 hover:cursor-pointer">
                <TriangleUpIcon
                  className={cn(
                    "h-3 w-3 rotate-90 transform text-smart-cbt-dark-green",
                    open ? "rotate-180 transform" : ""
                  )}
                />
                <label className="flex cursor-pointer text-left font-medium ">{label}</label>
                <FormFieldError error={formatError(error)} />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="flex h-full flex-col pl-6">
              {description && <label className="font-medium">{description}</label>}
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default QuestionSection;
