import { cn } from "@/utils/cn";
import * as React from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "../Icon";
import { FormFieldError } from "./FormFieldError";

type InputProps<T extends FieldValues> = React.InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<T> & {
    placeholder: string;
    length?: number;
    errorMessage?: string;
    isRequired?: boolean;
    useMessage?: boolean;
    showClearButton?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
  };

const FormFloatingLabelTextInput = <T extends FieldValues>({
  className,
  type,
  placeholder,
  errorMessage,
  isRequired,
  useMessage,
  showClearButton,
  inputRef,
  maxLength,
  ...controller
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    field: { value, onChange },
  } = useController(controller);

  const handleClearInput = () => {
    onChange("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(type == "number" ? event.target.valueAsNumber : event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative my-2 w-full bg-white p-2">
      <input
        id={`field-input-${controller.name}`}
        type={showPassword ? "text" : type}
        className={cn(
          "peer h-10 w-full rounded-md border border-gray-300 bg-white px-2 focus:border-smart-cbt-green focus:outline-none",
          controller.disabled && "bg-smart-cbt-light-grey",
          errorMessage && "border-smart-cbt-red",
          className
        )}
        ref={inputRef}
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        {...controller}
      />
      <label
        htmlFor={`field-input-${controller.name}`}
        className={cn(
          "absolute left-6 top-3 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-base text-smart-cbt-medium-grey peer-focus:text-smart-cbt-green",
          errorMessage && "text-smart-cbt-red",
          className
        )}
      >
        {isRequired && <span className="text-smart-cbt-red">*</span>} {placeholder}
      </label>
      {type === "password" && (
        <span className="absolute right-4 top-5 cursor-pointer text-smart-cbt-medium-grey">
          {showPassword ? (
            <EyeSlashIcon className="h-4 w-4" onClick={handleTogglePassword} />
          ) : (
            <EyeIcon className="h-4 w-4" onClick={handleTogglePassword} />
          )}
        </span>
      )}
      {type != "password" && showClearButton && value?.length > 1 && (
        <span className="absolute right-4 top-5 cursor-pointer text-smart-cbt-medium-grey">
          <XMarkIcon className="h-4 w-4 text-black" onClick={handleClearInput} />
        </span>
      )}
      {errorMessage && <FormFieldError useMessage={useMessage} error={errorMessage} />}
    </div>
  );
};

FormFloatingLabelTextInput.displayName = "FormFloatingLabelTextInput";
export default FormFloatingLabelTextInput;
