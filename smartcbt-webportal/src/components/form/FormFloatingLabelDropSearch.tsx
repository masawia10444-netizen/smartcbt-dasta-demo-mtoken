import { cn } from "@/utils/cn";
import { Paths, XOR, resolvePath } from "@/utils/helper";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import debounce from "lodash.debounce";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { BaselineArrowDropDown, BaselineArrowDropUp } from "../Icon";

type FormFloatingLabelDropSearchProps<K extends FieldValues, T> = UseControllerProps<K> & {
  idKey: (Paths<T> & string) | null;
  nullDisplay?: string;
  placeholder: string;
  title: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  fixed?: boolean;
  isRequired?: boolean;
  hideLabel?: boolean;
  // inputEditable?: boolean;
  onChangeInterceptor?: (value: any, next: (value: any) => void) => void;
} & XOR<
    { values: (null | T)[]; filterKey: Paths<T> | Paths<T>[] },
    { searchFunction: (keyword: string) => Promise<T[]> }
  > &
  XOR<{ displayKey: Paths<T> | Paths<T>[] | null }, { displayFunction: (object?: T | null) => string }>;

const FormFloatingLabelDropSearch = <K extends FieldValues, T>(props: FormFloatingLabelDropSearchProps<K, T>) => {
  const {
    searchFunction,
    nullDisplay,
    values,
    filterKey,
    disabled,
    hideLabel,
    placeholder,
    fixed,
    isRequired,
    className,
    inputClassName,
  } = props;

  const {
    field: { value, onChange },
  } = useController(props);

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
  }, [query, values]);

  useEffect(() => {
    if (!searchFunction || !focus) return;
    const fetchData = async () => {
      const results = await searchFunction(debouncedQuery);
      setFilteredData(results);
    };
    fetchData();
  }, [debouncedQuery, focus]);

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

  function by(a: T | null, b: T | null) {
    if (a === null && b != null) return false;
    if (a !== null && b == null) return false;
    if (a !== null && b !== null && a !== undefined && b !== undefined && !props.idKey) return a === b;
    if (a !== null && b !== null && a !== undefined && b !== undefined && props.idKey)
      return resolvePath(props.idKey, a) === resolvePath(props.idKey, b);
    return true;
  }

  return (
    <Combobox
      by={by}
      value={value ?? null}
      onChange={(value) => (props.onChangeInterceptor ? props.onChangeInterceptor(value, onChange) : onChange(value))}
      disabled={disabled}
    >
      <div className={cn("relative my-2 w-full bg-white p-2", className)}>
        {/* {props.inputEditable && ( */}
        <Combobox.Button as="div">
          <Combobox.Input
            className={cn(
              "peer h-10 w-full rounded-md border border-gray-300 bg-white px-2 focus:border-smart-cbt-green focus:outline-none",
              inputClassName,
              disabled && "bg-smart-cbt-light-grey"
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
          {!hideLabel && (
            <label
              htmlFor="field-input"
              className={cn(
                "absolute left-6 top-3 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-base text-smart-cbt-medium-grey peer-focus:text-smart-cbt-green"
              )}
            >
              {isRequired && <span className="text-smart-cbt-red">*</span>} {placeholder}
            </label>
          )}
        </Combobox.Button>
        {/* )} */}
        {/* {!props.inputEditable && (
          <Combobox.Button className="peer h-10 w-full items-start rounded-md border border-gray-300 bg-white px-2 focus:border-smart-cbt-green focus:outline-none">
            {localDisplayFunction(value)}
            <label
              htmlFor="field-input"
              className={cn(
                "absolute left-6 top-3 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-base text-smart-cbt-medium-grey peer-focus:text-smart-cbt-green"
              )}
            >
              {placeholder}
            </label>
          </Combobox.Button>
        )} */}
        <Combobox.Button className="absolute inset-y-0 right-3 flex items-center">
          <BaselineArrowDropDown className="h-5 w-5 text-zinc-400 ui-open:hidden" aria-hidden="true" />
          <BaselineArrowDropUp className="h-5 w-5 text-zinc-400 ui-not-open:hidden" aria-hidden="true" />
        </Combobox.Button>
        <Transition
          afterLeave={() => {
            if (props.searchFunction) onQueryDebounced("");
            setQuery("");
          }}
        >
          <Combobox.Options
            hold={false}
            className={cn(
              "z-50 m-2 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
              fixed ? "fixed w-64 min-w-fit" : "absolute left-0 w-full"
            )}
          >
            {filteredData.length === 0 && query !== "" ? (
              <p className="relative m-2 cursor-default rounded-md px-2">No result</p>
            ) : (
              filteredData.map((data) => {
                const key = () => {
                  if (data === null) return -1;
                  if (data === undefined) return undefined;
                  if (props.idKey === null) return data as string;
                  const key = resolvePath(props.idKey, data);
                  if (isNumberOrString(key)) return key;
                  return undefined;
                };
                return (
                  <Combobox.Option
                    key={key()}
                    value={data}
                    className="relative flex w-full cursor-pointer items-center justify-between p-2  ui-selected:bg-smart-cbt-light-grey ui-selected:text-smart-cbt-very-dark-grey ui-active:bg-smart-cbt-light-grey ui-active:text-smart-cbt-very-dark-grey ui-not-selected:ui-not-active:bg-white ui-not-selected:ui-not-active:text-smart-cbt-very-dark-grey"
                  >
                    {({ selected }) => (
                      <>
                        {localDisplayFunction(data)}
                        {selected && (
                          <span>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
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

function isNumberOrString(value: any): value is number | string {
  return typeof value === "number" || typeof value === "string";
}
function isString(value: any): value is string {
  return typeof value === "string";
}

export default FormFloatingLabelDropSearch;
