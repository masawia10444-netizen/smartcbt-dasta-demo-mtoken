import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { cn } from "@/utils/cn";
import { VariantProps } from "class-variance-authority";
import { useLocale, useTranslations } from "next-intl";
import { InputHTMLAttributes, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "../Icon";
import { datePickerLocaleForLanguage } from "./FormDatePicker";
import { FormInput } from "./FormInput";

type FormRangeDatePickerType<T extends FieldValues> = UseControllerProps<T> & {
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  showIcon?: boolean;
  placeholder: string;
  className?: string;
  isRequired?: boolean;
};

export type FormRangeDatePickerInputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof FormInput> & {
    disabled?: boolean;
    showIcon?: boolean;
  };

const FormRangeDatePickerInput = forwardRef<HTMLInputElement, FormRangeDatePickerInputProps>(
  ({ className, intent, size, disabled, showIcon, ...props }, ref) => {
    return (
      <div className={cn("relative w-full bg-white")}>
        <input
          disabled={disabled}
          className={cn(
            "h-10 w-full rounded-lg border border-smart-cbt-medium-grey px-2 py-2 placeholder-gray-300 focus:border-smart-cbt-very-dark-grey focus:outline-none disabled:bg-smart-cbt-light-grey",
            className
          )}
          ref={ref}
          {...props}
        />
        {showIcon && <CalendarIcon className="absolute right-4 top-0 h-full w-6 text-smart-cbt-dark-grey" />}
      </div>
    );
  }
);

const FormRangeDatePicker = <T extends FieldValues>(props: FormRangeDatePickerType<T>) => {
  const { minDate, maxDate, disabled, placeholder, showIcon, className, isRequired, ...controller } = props;

  const t = useTranslations("common");

  const dateFormat = "d MMMM yyyy";

  const locale = useLocale();

  const { field } = useController(controller);

  const value = field.value as { startDate: Date; endDate: Date } | undefined;

  const handleOnChange = ([startDate, endDate]: any) => field.onChange({ startDate, endDate });

  return (
    <div className="z-10 w-full">
      <DatePicker
        locale={datePickerLocaleForLanguage(locale)}
        dateFormat={dateFormat}
        onChange={handleOnChange}
        customInput={<FormRangeDatePickerInput {...props} />}
        disabled={disabled}
        startDate={value?.startDate}
        endDate={value?.endDate}
        monthsShown={2}
        wrapperClassName="!block"
        placeholderText={placeholder}
        showPreviousMonths={false}
        focusSelectedMonth={false}
        selectsRange
        showDisabledMonthNavigation
        disabledKeyboardNavigation
        shouldCloseOnSelect={false}
      />
    </div>
  );
};

export default FormRangeDatePicker;
FormRangeDatePickerInput.displayName = "FormRangeDatePickerInput";
