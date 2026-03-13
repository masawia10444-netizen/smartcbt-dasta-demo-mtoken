import { cn } from "@/utils/cn";
import { enGB, th } from "date-fns/locale";
import { useLocale } from "next-intl";
import DatePicker from "react-datepicker";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { CalendarIcon } from "../Icon";

type FormDatePickerProps<T extends FieldValues> = UseControllerProps<T> & {
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  showFloatingLabel?: boolean;
  showIcon?: boolean;
  placeholder: string;
  inputClassName?: string;
  wrapperClassName?: string;
  showTime?: boolean;
  isRequired?: boolean;
};

const FormDatePicker = <T extends FieldValues>(props: FormDatePickerProps<T>) => {
  const {
    minDate,
    maxDate,
    disabled,
    placeholder,
    showTime,
    showIcon,
    inputClassName,
    wrapperClassName,
    showFloatingLabel,
    isRequired,
    ...controller
  } = props;

  const locale = useLocale();

  const {
    field: { value, onChange },
  } = useController(controller);

  const dateFormat = showTime ? "d MMMM yyyy - HH:mm" : "d MMMM yyyy";

  const options = { day: "2-digit", month: "short", year: "numeric" };

  const formattedDate = value?.toLocaleDateString("th-TH", options);

  return (
    <DatePicker
      selected={typeof value == "string" ? new Date(value) : value}
      locale={datePickerLocaleForLanguage(locale)}
      dateFormat={dateFormat}
      onChange={onChange}
      wrapperClassName="!block"
      popperClassName="!z-50"
      customInput={
        <div className={cn("relative my-2 w-full bg-white p-2", wrapperClassName)}>
          <input
            id={`field-input-${controller.name}`}
            className={cn(
              "peer h-10 w-full rounded-md border border-gray-300 bg-white px-2 focus:border-smart-cbt-green focus:outline-none",
              disabled && "bg-smart-cbt-light-grey",
              inputClassName && inputClassName
            )}
            readOnly
            value={formattedDate}
            placeholder={placeholder}
          />
          {showFloatingLabel && (
            <label
              htmlFor={`field-input-${controller.name}`}
              className={cn(
                "absolute left-6 top-3 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-base text-smart-cbt-medium-grey peer-focus:text-smart-cbt-green"
              )}
            >
              {isRequired && <span className="text-smart-cbt-red">*</span>} {placeholder}
            </label>
          )}
          {showIcon && (
            <CalendarIcon className="absolute right-4 top-0 h-full w-6 text-smart-cbt-dark-grey hover:cursor-pointer" />
          )}
        </div>
      }
      disabled={disabled}
      showTimeInput={showTime}
      showMonthDropdown
      showYearDropdown
      placeholderText={placeholder}
      minDate={minDate}
      maxDate={maxDate}
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

export default FormDatePicker;
