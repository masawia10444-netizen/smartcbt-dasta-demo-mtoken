import { cn } from "@/utils/cn";
import { Paths, XOR, resolvePath } from "@/utils/helper";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { VariantProps, cva } from "class-variance-authority";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { BaselineArrowDropDown, BaselineArrowDropUp } from "../Icon";

export type SelectDropDownVariantProps = VariantProps<typeof dropdownButton>;

export const dropdownButton = cva("flex min-h-[32px] w-full items-center justify-between border px-3 text-white", {
  variants: {
    intent: {
      primary: "rounded-3xl border-smart-cbt-green bg-smart-cbt-light-green text-smart-cbt-green",
      danger: "rounded-3xl border-smart-cbt-yellow bg-smart-cbt-yellow-2 text-smart-cbt-yellow",
      iddle: "rounded-3xl border-smart-cbt-medium-grey bg-smart-cbt-light-grey text-black",
      form: "rounded-lg  border-smart-cbt-medium-grey bg-white px-2 py-2 text-black  placeholder-gray-300 focus:outline-none",
      filter:
        "rounded-full border-none  bg-smart-cbt-light-grey px-4 py-2 text-smart-cbt-very-dark-grey  placeholder-gray-300 focus:outline-none",
      disabled: "cursor-not-allowed rounded-3xl border-smart-cbt-light-grey bg-smart-cbt-dark-grey text-black",
      displayOnly: "justify-center border-none bg-white text-black disabled:bg-white",
    },
    size: {
      medium: "",
    },
  },
  compoundVariants: [
    { intent: "primary", size: "medium" },
    { intent: "disabled", size: "medium" },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

type FormSelectDropDownProps<K extends FieldValues, T> = UseControllerProps<K> & {
  idKey: (Paths<T> & string) | null;
  placeholder: string;
  disabled?: boolean;
  fixed?: boolean;
  onChangeInterceptor?: (value: any, next: (value: any) => void) => void;
  values: T[];
  buttonDisplayFunction?: (object: T[]) => string;
  plainArrow?: boolean;
  className?: string;
  containerClassName?: string;
} & XOR<{ displayKey: Paths<T> | Paths<T>[] | null }, { displayFunction: (object: T[]) => string }> &
  SelectDropDownVariantProps;

const FormSelectDropDown = <K extends FieldValues, T>(props: FormSelectDropDownProps<K, T>) => {
  const {
    idKey,
    placeholder,
    onChangeInterceptor,
    buttonDisplayFunction,
    disabled,
    plainArrow,
    values,
    className,
    containerClassName,
    ...controller
  } = props;

  const {
    field: { value, onChange },
  } = useController(controller);

  const formatWithDisplayKey = (item: T) => {
    if (props.displayFunction) return props.displayFunction([item]);
    if (props.displayKey == null) return item as string;
    const displayKeys = Array.isArray(props.displayKey) ? props.displayKey : [props.displayKey];
    const display = displayKeys
      .map((key) => resolvePath(key, item))
      .filter(Boolean)
      .join(" - ");
    if (isString(display)) return display;
    return "";
  };
  const resultDisplayFunction = (data: T[]) => {
    if (data.length == 0) return props.placeholder ?? "-";
    if (props.buttonDisplayFunction) return props.buttonDisplayFunction(data);
    if (props.displayFunction) return props.displayFunction(data);
    return (
      <>
        {data.map((d) => {
          const title = formatWithDisplayKey(d);
          return (
            <p key={title} className="whitespace-nowrap">
              {title}
            </p>
          );
        })}
      </>
    );
  };

  function by(a: T | null, b: T | null) {
    if (a === null && b != null) return false;
    if (a !== null && b == null) return false;
    if (a !== null && b !== null && a !== undefined && b !== undefined && !props.idKey) return a === b;
    if (a !== null && b !== null && a !== undefined && b !== undefined && props.idKey)
      return resolvePath(props.idKey, a) === resolvePath(props.idKey, b);
    return true;
  }

  return (
    <div className={cn("relative", containerClassName)}>
      <Listbox
        by={by}
        value={value == undefined ? [] : value}
        onChange={(value) => (props.onChangeInterceptor ? props.onChangeInterceptor(value, onChange) : onChange(value))}
        disabled={disabled ?? false}
      >
        <Listbox.Button
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "group disabled:cursor-default disabled:bg-smart-cbt-light-grey",
            dropdownButton({ intent: props.intent, size: props.size }),
            props.className
          )}
        >
          <>
            {resultDisplayFunction(
              value === null || value != undefined ? (Array.isArray(value) ? value : [value]) : []
            )}
          </>
          {props.disabled ? (
            <></>
          ) : props.plainArrow ? (
            <>
              <BaselineArrowDropDown className="group-data-[headlessui-state~=open]:hidden" aria-hidden="true" />
              <BaselineArrowDropUp className="ui-not-open:hidden" aria-hidden="true" />
            </>
          ) : (
            <>
              <ChevronDownIcon className="h-4 w-4 group-data-[headlessui-state~=open]:hidden" aria-hidden="true" />
              <ChevronUpIcon className="h-4 w-4 ui-not-open:hidden" aria-hidden="true" />
            </>
          )}
        </Listbox.Button>

        <Listbox.Options
          className={cn(
            "z-50 mt-1 max-h-72 max-w-xs overflow-auto  rounded-md bg-white  text-base ring-1 ring-black ring-opacity-5 drop-shadow-lg focus:outline-none",
            props.fixed ? "fixed w-48 min-w-fit" : "absolute left-0 top-[44px] w-[16rem] min-w-full"
          )}
        >
          {values.map((value, i) => {
            const key = () => {
              if (props.idKey === null) return value as string;
              const key = resolvePath(props.idKey, value);
              if (isNumberOrString(key)) return key;
              return i;
            };
            return (
              <Listbox.Option
                onClick={(e) => e.stopPropagation()}
                as="button"
                key={key()}
                value={value}
                className={
                  "relative flex w-full cursor-pointer items-center justify-between p-2  text-left ui-selected:bg-smart-cbt-light-grey ui-selected:text-smart-cbt-very-dark-grey ui-active:bg-smart-cbt-light-grey ui-active:text-smart-cbt-very-dark-grey ui-not-selected:ui-not-active:bg-white ui-not-selected:ui-not-active:text-smart-cbt-very-dark-grey"
                }
              >
                {({ selected }) => (
                  <>
                    {formatWithDisplayKey(value)}
                    {selected && (
                      <span>
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

function isNumberOrString(value: any): value is number | string {
  return typeof value === "number" || typeof value === "string";
}
function isString(value: any): value is string {
  return typeof value === "string";
}

export default FormSelectDropDown;
