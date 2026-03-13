import { ChangeEvent } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { cn } from "@/utils/cn";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "./Icon";

type ToggleSearchButtonProps<T extends FieldValues> = {
  placeholder: string;
  isRequired?: boolean;
  showClearButton?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  inputClassName?: string;
  onClick: () => void;
  isExpanded: boolean;
} & UseControllerProps<T>;

const ToggleSearchButton = <T extends FieldValues>({
  placeholder,
  isRequired,
  showClearButton,
  inputRef,
  className,
  inputClassName,
  onClick,
  isExpanded,
  ...controller
}: ToggleSearchButtonProps<T>) => {
  const {
    field: { value, onChange },
  } = useController(controller);

  const handleClearInput = () => {
    onChange("");
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={cn(
        `flex ${
          isExpanded ? "flex-grow" : "w-fit"
        } h-10 max-w-lg rounded-full bg-smart-cbt-light-grey p-2 focus:cursor-text`,
        className
      )}
    >
      {isExpanded && (
        <div className="flex flex-grow items-center gap-2 pr-2">
          <input
            value={value}
            type="text"
            onChange={handleOnChange}
            className={cn("flex-grow bg-transparent px-2 focus:outline-none", inputClassName)}
            placeholder={placeholder}
          />
          {showClearButton && value?.length > 0 && (
            <button className="border-r border-smart-cbt-medium-grey pr-2 text-smart-cbt-medium-grey">
              <XMarkIcon className="h-5 w-5 text-smart-cbt-dark-grey" onClick={handleClearInput} />
            </button>
          )}
        </div>
      )}
      <button onClick={onClick}>
        <MagnifyingGlassIcon className={cn(isExpanded ? "h-5 w-5" : "h-6 w-6", "text-smart-cbt-dark-grey")} />
      </button>
    </div>
  );
};

export default ToggleSearchButton;
