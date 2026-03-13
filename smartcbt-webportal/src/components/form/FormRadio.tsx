import { FieldValues, UseControllerProps, useController } from "react-hook-form";

export type FormRadioOption = {
  key: string;
  label: string;
};

type FormRadioProps<T extends FieldValues> = {
  options: FormRadioOption[];
  disabled?: boolean;
} & UseControllerProps<T>;

const FormRadio = <T extends FieldValues>(props: FormRadioProps<T>) => {
  const { disabled, ...controller } = props;
  const { field } = useController(controller);

  return (
    <div className="flex flex-col gap-4">
      {props.options.map((option, index) => (
        <span className="flex items-center gap-2" key={index}>
          <input
            id={`${option.key}`}
            className="form-radio checked:bg-smart-cbt-green hover:cursor-pointer"
            type="radio"
            value={option.key}
            onChange={(e) => field.onChange(e.target.value)}
            {...controller}
          />
          <label className="hover:cursor-pointer">{option.label}</label>
        </span>
      ))}
    </div>
  );
};

export default FormRadio;
