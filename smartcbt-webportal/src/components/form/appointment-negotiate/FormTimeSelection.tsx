import { Button } from "@/components/Button";
import { RangeTime } from "@/components/travel-mart/matching-popup/request-negotiation/RequestNegotiationPopup";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type FormTimeSelectionProps<T extends FieldValues> = {
  rangeTime: RangeTime[];
  danger?: boolean;
} & UseControllerProps<T>;

const FormTimeSelection = <T extends FieldValues>({ rangeTime, danger, ...controller }: FormTimeSelectionProps<T>) => {
  const { field } = useController(controller);

  const handleOnClick = (t: RangeTime) => {
    field.onChange({ ...field.value, time: t });
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {rangeTime.map((t, i) => {
        const selected = t.dateTime === field.value.time?.dateTime;
        const display = new Date(t.dateTime).toLocaleString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <Button
            size={"small"}
            key={i}
            type="button"
            disabled={t.status != "available"}
            intent={
              t.status == "available"
                ? danger
                  ? selected
                    ? "danger"
                    : "dangerOutline"
                  : selected
                  ? "primary"
                  : "secondary"
                : "disabled"
            }
            onClick={() => handleOnClick(t)}
          >
            {display}
          </Button>
        );
      })}
    </div>
  );
};

export default FormTimeSelection;
