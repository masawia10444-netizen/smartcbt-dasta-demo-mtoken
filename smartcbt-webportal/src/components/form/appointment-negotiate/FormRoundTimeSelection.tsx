import { TravelMartRequestNegotiationSelectionSchema } from "@/schemas/forms/travel-mart/matching/travel-mart-matching-popup-schema";
import { cn } from "@/utils/cn";
import { Fragment, useRef } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import FormTimeSelection from "./FormTimeSelection";
import { Round } from "@/components/travel-mart/matching-popup/request-negotiation/RequestNegotiationPopup";

type FormRoundTimeSelectionProps<T extends FieldValues> = {
  rounds: Round[];
  danger?: boolean;
} & UseControllerProps<T>;

const FormRoundTimeSelection = <T extends FieldValues>({
  rounds,
  danger,
  ...controller
}: FormRoundTimeSelectionProps<T>) => {
  const radioRef = useRef<HTMLInputElement>(null);

  const { field } = useController(controller);

  const fieldValue = field.value as TravelMartRequestNegotiationSelectionSchema;

  return (
    <div className="flex flex-col gap-4">
      {rounds?.map((r, i) => {
        const checked = fieldValue?.round == `${r.title}-${i}`;
        return (
          <Fragment key={i}>
            <div key={i} className="flex flex-row items-center gap-2">
              <input
                id={`${r.title}-${i}`}
                ref={radioRef}
                className={cn(
                  "form-radio checked:text-smart-cbt-green hover:cursor-pointer",
                  danger &&
                    "!ring-smart-cbt-red checked:text-smart-cbt-red hover:cursor-pointer hover:text-smart-cbt-red hover:!ring-smart-cbt-red focus:!ring-smart-cbt-red"
                )}
                type="radio"
                value={r.title}
                checked={checked}
                onChange={(e) => field.onChange({ ...fieldValue, round: `${e.target.value}-${i}` })}
              />
              <label htmlFor={`${r.title}-${i}`} className="hover:cursor-pointer">
                {r.title}
              </label>
            </div>
            {checked && (
              <div className="ml-4">
                <FormTimeSelection danger={danger} rangeTime={r.timeRange} {...controller} />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default FormRoundTimeSelection;
