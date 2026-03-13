import { TravelMartRequestNegotiationSelectionSchema } from "@/schemas/forms/travel-mart/matching/travel-mart-matching-popup-schema";
import { cn } from "@/utils/cn";
import { useRef } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import FormRoundTimeSelection from "./FormRoundTimeSelection";
import { DateSection } from "@/components/travel-mart/matching-popup/request-negotiation/RequestNegotiationPopup";

type FormDateSelectionProps<T extends FieldValues> = {
  dateSection: DateSection[];
  showBorder?: boolean;
  danger?: boolean;
} & UseControllerProps<T>;

const FormDateSelection = <T extends FieldValues>({
  dateSection,
  showBorder,
  danger,
  ...controller
}: FormDateSelectionProps<T>) => {
  const radioRef = useRef<HTMLInputElement>(null);

  const { field } = useController(controller);

  const fieldValue = field.value as TravelMartRequestNegotiationSelectionSchema;

  return (
    <div className="flex flex-col gap-4">
      {dateSection?.map((d, i) => {
        const checked = fieldValue?.date == d.title;
        return (
          <div
            className={cn("flex flex-col gap-4", showBorder && "rounded-lg border border-smart-cbt-light-grey p-2")}
            key={i}
          >
            <div className="flex flex-row items-center gap-2">
              <input
                id={`${d.title}-${i}`}
                ref={radioRef}
                className={cn(
                  "form-radio checked:text-smart-cbt-green hover:cursor-pointer",
                  danger &&
                    "!ring-smart-cbt-red checked:text-smart-cbt-red hover:cursor-pointer hover:text-smart-cbt-red hover:!ring-smart-cbt-red focus:!ring-smart-cbt-red"
                )}
                type="radio"
                value={d.title}
                checked={checked}
                onChange={(e) => field.onChange({ date: e.target.value })}
              />
              <label className="hover:cursor-pointer" htmlFor={`${d.title}-${i}`}>
                {d.title}
              </label>
            </div>
            {checked && (
              <div className="ml-4">
                <FormRoundTimeSelection danger={danger} rounds={d.rounds} {...controller} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormDateSelection;
