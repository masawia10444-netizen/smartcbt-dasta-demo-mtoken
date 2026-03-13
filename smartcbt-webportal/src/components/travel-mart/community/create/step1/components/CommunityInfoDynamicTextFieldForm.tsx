import { Button } from "@/components/Button";
import { IcRoundDeleteOutline } from "@/components/Icon";
import { cn } from "@/utils/cn";
import { PlusIcon } from "@heroicons/react/24/outline";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

const spaceClassName = "w-20";

type CommunityInfoDynamicTextFieldFormProps<T extends FieldValues> = {
  addButtonLabel: string;
} & UseControllerProps<T>;

const CommunityInfoDynamicTextFieldForm = <T extends FieldValues>(props: CommunityInfoDynamicTextFieldFormProps<T>) => {
  const { ...controller } = props;
  const { field } = useController(controller);
  const fieldValue = field.value as string[];

  const handleAddClick = () => {
    const newValue = [...fieldValue];
    newValue.push("");
    field.onChange(newValue);
  };

  const handleDeleteClick = (index: number) => {
    const newValue = [...fieldValue];
    newValue.splice(index, 1);
    field.onChange(newValue);
  };

  const handleTextChange = (index: number, value: string) => {
    const newValue = [...fieldValue];
    newValue[index] = value;
    field.onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {fieldValue.map((text, i) => (
        <div className={`flex items-center justify-between gap-2`} key={i}>
          <div className={`${spaceClassName} pl-4`}>{i + 1}</div>
          <input
            className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2")}
            value={text}
            onFocus={(e) => {
              e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
            }}
            onChange={(e) => handleTextChange(i, e.target.value)}
            {...controller}
          />
          <IcRoundDeleteOutline
            className="w-6 h-6 text-smart-cbt-red hover:cursor-pointer"
            onClick={() => handleDeleteClick(i)}
          />
        </div>
      ))}
      <div className="flex flex-row">
        <div className={spaceClassName} />
        <Button
          className="w-fit rounded-[50px]"
          intent={"secondary"}
          size={"small"}
          icon={<PlusIcon className="w-6 h-6" />}
          onClick={handleAddClick}
        >
          {props.addButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default CommunityInfoDynamicTextFieldForm;
