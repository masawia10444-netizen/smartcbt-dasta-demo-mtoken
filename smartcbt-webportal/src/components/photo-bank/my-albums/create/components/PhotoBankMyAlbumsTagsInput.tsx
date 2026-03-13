import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type PhotoBankMyAlbumsTagsInputProps<T extends FieldValues> = {
  disabled: boolean;
  placeholder: string | null;
} & UseControllerProps<T>;

const PhotoBankMyAlbumsTagsInput = <T extends FieldValues>({
  disabled,
  placeholder,
  ...controller
}: PhotoBankMyAlbumsTagsInputProps<T>) => {
  const { field } = useController(controller);
  const [text, setText] = useState("");
  const fieldValue = field.value as string[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDeleteClick = (index: number) => {
    const newValue = [...fieldValue];
    newValue.splice(index, 1);
    field.onChange(newValue);
  };

  const handleAddTag = () => {
    const newValue = [...field.value, text];
    field.onChange(newValue);
    setText("");
  };

  return (
    <div className="flex flex-col gap-4">
      {!disabled && (
        <div className="flex flex-row items-center gap-2">
          <input
            className="h-10 w-full rounded-lg border border-smart-cbt-medium-grey px-2 placeholder-gray-300 focus:border-smart-cbt-very-dark-grey focus:outline-none"
            type="text"
            onChange={handleChange}
            disabled={disabled}
            value={text}
            placeholder={placeholder || ""}
          />
          <PlusCircleIcon className="h-7 w-7 cursor-pointer text-smart-cbt-dark-green" onClick={handleAddTag} />
        </div>
      )}
      <div className="flex flex-row gap-2">
        {fieldValue.map((text, i) => (
          <div
            key={i}
            className="flex flex-row items-center gap-1 rounded-full border border-smart-cbt-dark-green px-3 py-1"
          >
            <div className="text-sm font-normal text-smart-cbt-dark-green">#{text}</div>
            {!disabled && (
              <XCircleIcon
                className="h-7 w-7 cursor-pointer text-smart-cbt-dark-green"
                onClick={() => handleDeleteClick(i)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoBankMyAlbumsTagsInput;
