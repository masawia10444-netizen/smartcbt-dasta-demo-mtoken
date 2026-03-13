import { cn } from "@/utils/cn";
import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | JSX.Element;
  hideCheckbox: boolean;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { id, checked, onChange, disabled, label, inputClassName, labelClassName, hideCheckbox, className } = props;
  return (
    <div className={cn("flex w-fit items-center gap-2 px-2", className)}>
      {!hideCheckbox && (
        <input
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "form-checkbox rounded-sm border border-smart-cbt-medium-grey bg-white checked:border-0 checked:bg-smart-cbt-green",
            inputClassName,
            disabled && "bg-smart-cbt-light-grey"
          )}
          type="checkbox"
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "block cursor-pointer items-center overflow-hidden truncate break-all text-base font-medium",
          labelClassName
        )}
      >
        {label}
      </label>
    </div>
  );
};
