import { cn } from "@/utils/cn";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { XMarkIcon } from "../Icon";

type FormSimpleSearchInputProps<T extends FieldValues> = {
  placeholder: string;
  isRequired?: boolean;
  showClearButton?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  inputClassName?: string;
} & UseControllerProps<T>;

const FormSimpleSearchInput = <T extends FieldValues>({
  placeholder,
  isRequired,
  showClearButton,
  inputRef,
  className,
  inputClassName,
  ...controller
}: FormSimpleSearchInputProps<T>) => {
  const {
    field: { value, onChange },
  } = useController(controller);

  const handleClearInput = () => {
    onChange("");
  };

  return (
    <div className="relative flex flex-row items-center gap-2 rounded-full bg-smart-cbt-light-grey p-2 pr-2 text-smart-cbt-dark-grey focus:cursor-text">
      <input
        value={value}
        type="text"
        onChange={onChange}
        className={cn("w-full bg-transparent px-2 focus:outline-none", inputClassName)}
        placeholder={placeholder}
      />
      {showClearButton && value?.length > 1 && (
        <span className="right-4 top-0 cursor-pointer text-smart-cbt-medium-grey">
          <XMarkIcon className="h-5 w-5 text-gray-500" onClick={handleClearInput} />
        </span>
      )}
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
    </div>
  );
};

export default FormSimpleSearchInput;
