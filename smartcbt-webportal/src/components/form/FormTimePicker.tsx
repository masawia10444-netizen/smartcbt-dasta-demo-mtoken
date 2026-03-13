import { cn } from "@/utils/cn";
import { enGB, th } from "date-fns/locale";
import { useLocale } from "next-intl";
import DatePicker from "react-datepicker";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

export function convertTimeStringToDate(timeString?: string | null): Date | null {
  if (timeString == null) {
    return null;
  }
  const [hours, minutes] = timeString.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    // Invalid input, return null or throw an error as needed
    return null;
  }
  const currentDate = new Date();
  currentDate.setHours(hours, minutes, 0, 0);
  return currentDate;
}

type FormPickerProps<T extends FieldValues> = UseControllerProps<T> & {
  maxTime?: Date;
  minTime?: Date;
  disabled?: boolean;
  placeholder: string;
  inputClassName?: string;
  wrapperClassName?: string;
  timeCaption?: string;
  timeIntervals?: number;
};

const FormPicker = <T extends FieldValues>(props: FormPickerProps<T>) => {
  const {
    disabled,
    placeholder,
    timeIntervals,
    inputClassName,
    wrapperClassName,
    maxTime,
    timeCaption,
    minTime,
    ...controller
  } = props;

  const locale = useLocale();

  const {
    field: { value, onChange },
  } = useController(controller);

  const convertValue = convertTimeStringToDate(value);

  const handleTimeChange = (date: Date) => {
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const time = `${hour}:${minutes}`;
    onChange(time);
  };

  const formattedTime = convertValue?.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });

  return (
    <DatePicker
      selected={convertValue}
      locale={datePickerLocaleForLanguage(locale)}
      onChange={handleTimeChange}
      wrapperClassName="!block"
      popperClassName="!z-50"
      customInput={
        <div className={cn("relative bg-white ", wrapperClassName)}>
          <input
            id={`field-input-${controller.name}`}
            className={cn(
              "peer h-10 rounded-md border border-smart-cbt-medium-grey bg-white p-2 focus:border-smart-cbt-green focus:outline-none",
              disabled && "bg-smart-cbt-light-grey",
              inputClassName && inputClassName
            )}
            readOnly
            value={formattedTime ?? ""}
          />
        </div>
      }
      disabled={disabled}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={timeIntervals ?? 15}
      timeCaption={timeCaption ?? "เลือกเวลา"}
      placeholderText={placeholder}
      maxTime={maxTime}
      minTime={minTime}
    />
  );
};

export function datePickerLocaleForLanguage(locale: string) {
  switch (locale) {
    case "th":
      return th;
    default:
      return enGB;
  }
}

export default FormPicker;
