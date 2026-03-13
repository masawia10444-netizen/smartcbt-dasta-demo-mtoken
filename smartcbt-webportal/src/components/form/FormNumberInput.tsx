import { XOR } from "@/utils/helper";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { FormInput, FormInputProps } from "./FormInput";

type FormNumberInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = XOR<
  Required<Pick<UseControllerProps<TFieldValues, TName>, "control" | "name">> &
    Omit<UseControllerProps<TFieldValues, TName>, "control" | "name">,
  { fixedValue: string | number | null | undefined; disabled?: boolean }
> &
  FormInputProps &
  NumericFormatProps;

const FormNumberInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  fixedValue,
  disabled = false,
  ...props
}: FormNumberInputProps<TFieldValues, TName>) => {
  if (props.control && props.name) {
    return <ControlledNumberInput {...props} disabled={disabled} />;
  } else {
    return (
      <NumericFormat
        customInput={FormInput}
        thousandSeparator={","}
        value={fixedValue}
        {...props}
        disabled={disabled}
      />
    );
  }
};

export default FormNumberInput;

export const ControlledNumberInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: Required<Pick<FormNumberInputProps<TFieldValues, TName>, "control" | "name">> &
    Partial<FormNumberInputProps<TFieldValues, TName>>
) => {
  const {
    field: { value, onChange },
  } = useController({ ...props });

  return (
    <NumericFormat
      customInput={FormInput}
      thousandSeparator={","}
      value={value ?? ""}
      onValueChange={(values) => {
        const { value } = values;
        onChange(Number(value));
      }}
      {...props}
    />
  );
};
