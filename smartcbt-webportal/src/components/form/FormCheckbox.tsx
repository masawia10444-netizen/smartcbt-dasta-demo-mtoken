import { cn } from "@/utils/cn";
import React from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { Checkbox } from "../Checkbox";

type FormCheckboxProps<T extends FieldValues> = React.InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<T> & {
    label: string | JSX.Element;
    inputClassName?: string;
    labelClassName?: string;
    checkboxClassName?: string;
    disabled?: boolean;
    checkboxRef?: React.Ref<HTMLInputElement>;
  };

const FormCheckbox = <T extends FieldValues>(props: FormCheckboxProps<T>) => {
  const {
    id,
    className,
    label,
    inputClassName,
    labelClassName,
    checkboxClassName,
    disabled,
    checkboxRef,
    ...controller
  } = props;
  const {
    field: { value, onChange },
  } = useController(controller);

  return (
    <div className={cn("w-full p-2", className)}>
      <Checkbox
        id={id}
        hideCheckbox={false}
        label={label}
        checked={value}
        onChange={onChange}
        disabled={disabled}
        labelClassName={labelClassName}
        inputClassName={inputClassName}
        className={checkboxClassName}
        {...controller}
      />
    </div>
  );
};

FormCheckbox.displayName = "FormCheckbox";
export default FormCheckbox;
