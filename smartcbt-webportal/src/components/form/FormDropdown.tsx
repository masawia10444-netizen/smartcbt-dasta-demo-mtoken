import { Paths, XOR, resolvePath } from "@/utils/helper";
import { Combobox, Transition } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { BaselineArrowDropDown, BaselineArrowDropUp } from "../Icon";

import { cn } from "@/utils/cn";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import debounce from "lodash.debounce";

const dropdown = cva("px-2 text-white ", {
  variants: {
    intent: {
      primary: "cursor-pointer px-2",
      disabled: "cursor-not-allowed",
    },
    size: {
      medium: "px-2 text-white ",
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

type FormDropdownProps<K extends FieldValues, T> = UseControllerProps<K> & {
  idKey: (Paths<T> & string) | null;
  title: string;
  className?: string;
  buttonClassName?: string;
  nullDisplay?: string;
  placeholder: string;
  disabled?: boolean;
  fixed?: boolean;
  inputEditable?: boolean;
  noResultText?: string;
  onChangeInterceptor?: (value: any, next: (value: any) => void) => void;
  itemDisplayFunction?: (object?: T | null) => React.JSX.Element;
} & XOR<
    { values: (null | T)[]; filterKey: Paths<T> | Paths<T>[] },
    { searchFunction: (keyword: string) => Promise<T[]> }
  > &
  XOR<{ displayKey: Paths<T> | Paths<T>[] | null }, { displayFunction: (object?: T | null) => string }> &
  VariantProps<typeof dropdown>;

const FormDropdown = <K extends FieldValues, T>(props: FormDropdownProps<K, T>) => {
  const { searchFunction, nullDisplay, values, filterKey, disabled, fixed, title, noResultText, ...controller } = props;

  const {
    field: { value, onChange },
  } = useController(controller);

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const onQueryDebounced = debounce((value: string) => setDebouncedQuery(value), 300);

  const [filteredData, setFilteredData] = useState<(T | null)[]>(values ?? []);

  useEffect(() => {
    if (!values) return;
    if (query === "") {
      setFilteredData(values);
    } else {
      const results = values.filter((value: T | null) => {
        if (value === null) {
          return nullDisplay?.toLocaleLowerCase().includes(query.toLowerCase());
        } else if (value != null && isString(filterKey)) {
          const element = resolvePath(filterKey, value);
          if (!isString(element)) return false;
          return element.toLowerCase().includes(query.toLowerCase());
        } else if (value != null && Array.isArray(filterKey)) {
          return filterKey.reduce((acc, filter) => {
            const element = resolvePath(filter, value);
            if (!isString(element)) return acc;
            return acc || element.toLowerCase().includes(query.toLowerCase());
          }, false);
        }
      });
      setFilteredData(results);
    }
  }, [query, values, filterKey, nullDisplay]);

  useEffect(() => {
    if (!searchFunction || !focus) return;
    const fetchData = async () => {
      const results = await searchFunction(debouncedQuery);
      setFilteredData(results);
    };
    fetchData();
  }, [debouncedQuery, focus, searchFunction]);

  const localDisplayFunction = (data: T | null | undefined) => {
    if (props.displayFunction) return props.displayFunction(data);
    if ((data === null || data === undefined) && props.nullDisplay) return props.nullDisplay;
    if (data === undefined || data === null) return "";
    if (props.displayKey == null) return data as string;
    const displayKeys = Array.isArray(props.displayKey) ? props.displayKey : [props.displayKey];
    const display = displayKeys
      .map((key) => resolvePath(key, data))
      .filter(Boolean)
      .join(" - ");
    if (isString(display)) return display;
    return "";
  };

  const itemDisplayFunction = (data: T | null | undefined, selected: boolean) => {
    if (props.itemDisplayFunction) return props.itemDisplayFunction(data);
    // return localDisplayFunction(data);

    return (
      <div className="flex w-full justify-between p-2">
        {localDisplayFunction(data)}
        {selected && (
          <span>
            <CheckIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
    );
  };

  const by = (a: T | null, b: T | null) => {
    if (a === null && b != null) return false;
    if (a !== null && b == null) return false;
    if (a !== null && b !== null && a !== undefined && b !== undefined && !props.idKey) return a === b;
    if (a !== null && b !== null && a !== undefined && b !== undefined && props.idKey)
      return resolvePath(props.idKey, a) === resolvePath(props.idKey, b);
    return true;
  };

  const isNumberOrString = (value: any) => {
    return typeof value === "number" || typeof value === "string";
  };
  const isString = (value: any) => {
    return typeof value === "string";
  };

  return (
    <Combobox
      by={by}
      value={value ?? null}
      onChange={(value) => (props.onChangeInterceptor ? props.onChangeInterceptor(value, onChange) : onChange(value))}
      disabled={disabled}
    >
      <div className={cn("relative h-10", props.className)}>
        {props.inputEditable ? (
          <Combobox.Button as="div">
            <div className="relative flex items-center gap-2">
              <Combobox.Input
                className={cn(
                  "relative h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2",
                  disabled && "cursor-not-allowed bg-smart-cbt-light-grey"
                )}
                autoComplete="off"
                displayValue={localDisplayFunction}
                placeholder={props.placeholder}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                  if (props.searchFunction) onQueryDebounced(event.target.value);
                }}
              />
              <ChevronDownIcon
                className="absolute inset-y-2 right-0 flex h-6 w-6 items-center pr-2 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </Combobox.Button>
        ) : (
          <>
            <Combobox.Button
              className={cn(
                "relative w-fit truncate rounded-3xl bg-smart-cbt-light-grey px-4 py-2 pr-4 text-left text-base text-smart-cbt-very-dark-grey transition-all",
                props.buttonClassName
              )}
            >
              <span className="mr-4">
                {title} : {localDisplayFunction(value)}
              </span>
              <div className="absolute inset-y-0 right-2 flex w-fit items-center">
                <BaselineArrowDropDown className="text-smart-cbt-very-dark-grey ui-open:hidden" aria-hidden="true" />
                <BaselineArrowDropUp className="text-smart-cbt-very-dark-grey ui-not-open:hidden" aria-hidden="true" />
              </div>
            </Combobox.Button>
          </>
        )}

        <Transition
          afterLeave={() => {
            if (props.searchFunction) onQueryDebounced("");
            setQuery("");
          }}
        >
          <Combobox.Options
            hold={false}
            className={cn(
              "z-50 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
              fixed ? "fixed w-48 min-w-fit" : "absolute left-0 top-[44px] w-48 min-w-fit"
            )}
          >
            {filteredData.length === 0 && query !== "" ? (
              <p className="relative m-2 cursor-default rounded-md px-2">{noResultText}</p>
            ) : (
              filteredData.map((data, i) => {
                const key = () => {
                  if (data === null) return -1;
                  if (data === undefined) return undefined;
                  if (props.idKey === null) return data as string;
                  const key = resolvePath(props.idKey, data);
                  if (isNumberOrString(key)) return key;
                  return i;
                };
                return (
                  <Combobox.Option
                    key={key()}
                    value={data}
                    className="ui-not-selected:ui-not-active:text-smart-cbt-smart-cbt-dark-green min-h-10 relative flex cursor-pointer items-center justify-between text-smart-cbt-dark-green ui-selected:bg-smart-cbt-light-grey ui-active:ui-not-selected:bg-smart-cbt-light-grey ui-not-selected:ui-not-active:bg-white"
                  >
                    {({ selected }) => itemDisplayFunction(data, selected)}
                  </Combobox.Option>
                );
              })
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default FormDropdown;
