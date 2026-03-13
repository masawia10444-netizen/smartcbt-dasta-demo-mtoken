import { Button } from "@/components/Button";
import { CancelIcon } from "@/components/Icon";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type FormTagsInputProps<T extends FieldValues> = {
  disabled: boolean;
} & UseControllerProps<T>;

const FormTagsInput = <T extends FieldValues>({ disabled, ...controller }: FormTagsInputProps<T>) => {
  const { field } = useController(controller);
  const [text, setText] = useState("");
  const fieldValue = field.value as string[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newValue = [...field.value, text];
      field.onChange(newValue);
      setText("");
    }
  };

  const handleDeleteClick = (index: number) => {
    const newValue = [...fieldValue];
    newValue.splice(index, 1);
    field.onChange(newValue);
  };

  return (
    <div
      className={cn(
        "my-4 flex flex-wrap gap-4 rounded-md border border-gray-300 bg-white p-5",
        disabled ? "bg-smart-cbt-light-grey" : ""
      )}
    >
      {fieldValue.map((text, i) => (
        <Button
          key={i}
          className="border rounded-3xl border-smart-cbt-green "
          intent={disabled ? "disabled" : "text"}
          size={"small"}
          iconRight={
            <CancelIcon
              className={cn("h-6 w-6 text-smart-cbt-red ", disabled ? "" : "hover:cursor-pointer")}
              onClick={() => !disabled && handleDeleteClick(i)}
            />
          }
        >
          {text}
        </Button>
      ))}
      <input
        className={cn("grow border-0", disabled ? "bg-smart-cbt-light-grey" : "")}
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        disabled={disabled}
        value={text}
      />
    </div>
  );
};

export default FormTagsInput;
