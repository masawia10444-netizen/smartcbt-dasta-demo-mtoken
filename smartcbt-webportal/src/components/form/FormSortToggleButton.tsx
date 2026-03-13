import React, { Fragment, useEffect, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { cn } from "@/utils/cn";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { TablerArrowsSort } from "../Icon";
import { SelectDropDownVariantProps } from "./FormSelectDropDown";

export const sortValues: { title: string; value: string }[] = [
  {
    title: "global.asc",
    value: "asc",
  },
  {
    title: "global.desc",
    value: "desc",
  },
];

type FormSortToggleButtonProps<T extends FieldValues> = React.ButtonHTMLAttributes<HTMLButtonElement> &
  UseControllerProps<T> & {
    label: string;
  } & SelectDropDownVariantProps;

const FormSortToggleButton = <T extends FieldValues>(props: FormSortToggleButtonProps<T>) => {
  const { id, className, label, disabled, ...controller } = props;
  const t = useTranslations("common");

  const {
    field: { value, onChange },
  } = useController(controller);

  return (
    <div className="relative ">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button
          className={cn(
            "group flex min-h-[32px] w-full items-center justify-between gap-4 rounded-full border border-none bg-smart-cbt-light-grey px-4 py-2 text-smart-cbt-very-dark-grey placeholder-gray-300 focus:outline-none  disabled:cursor-default disabled:bg-smart-cbt-light-grey",
            className
          )}
        >
          <Fragment>
            {label} : {t(value.title)}
          </Fragment>
          <TablerArrowsSort className="text-black" aria-hidden="true" />
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-50 mt-1 max-h-72 w-[16rem] min-w-full max-w-xs overflow-auto  rounded-md bg-white  text-base ring-1 ring-black ring-opacity-5 drop-shadow-lg focus:outline-none">
            {sortValues.map((s, i) => {
              const selected = s.value == value.value;
              return (
                <Listbox.Option
                  key={i}
                  className="relative flex w-full cursor-pointer items-center justify-between p-2  text-left ui-selected:bg-smart-cbt-light-grey ui-selected:text-smart-cbt-very-dark-grey ui-active:bg-smart-cbt-light-grey ui-active:text-smart-cbt-very-dark-grey ui-not-selected:ui-not-active:bg-white ui-not-selected:ui-not-active:text-smart-cbt-very-dark-grey"
                  value={s}
                >
                  <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{t(s.title)}</span>
                  {selected && (
                    <span>
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
    // <button
    //   className={cn(
    //     "flex h-10 max-w-fit justify-center gap-2 rounded-3xl bg-smart-cbt-light-grey px-4 py-2 text-left text-base text-smart-cbt-very-dark-grey",
    //     className
    //   )}
    //   onClick={() => {
    //     setSortValue(sortValue === "asc" ? "desc" : "asc");
    //     onChange(sortValue);
    //   }}
    // >
    //   {label} : {sortValues[sortValue]?.title} <TablerArrowsSort />
    // </button>
  );
};

FormSortToggleButton.displayName = "FormSortToggleButton";
export default FormSortToggleButton;
