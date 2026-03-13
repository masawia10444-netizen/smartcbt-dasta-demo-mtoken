import { cn } from "@/utils/cn";
import { Popover } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { BaselineArrowDropDown, CalendarIcon } from "../Icon";

type FormYearPickerProps<T extends FieldValues> = {
  title: string;
  useThaiYear?: boolean;
  showPagination?: boolean;
  startYear: number;
  endYear: number;
  className?: string;
} & UseControllerProps<T>;

const generateYearRange = (startYear: number, endYear: number) => {
  const yearRange: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    yearRange.push(year);
  }
  return yearRange;
};

const FormYearPicker = <T extends FieldValues>({
  title,
  useThaiYear,
  showPagination,
  endYear,
  startYear,
  className,
  ...controller
}: FormYearPickerProps<T>) => {
  const [showCalendar, setShowCalendar] = useState<"start" | "end" | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  const { field } = useController(controller);

  const value = field.value as { startYear: number; endYear: number };

  const yearsPerPage = 20;
  const thaiYearOffset = 543;

  const totalYears = endYear - startYear + 1;
  const totalPages = Math.ceil(totalYears / yearsPerPage);

  const startGregorianYear = (currentPage - 1) * yearsPerPage + startYear;
  const endGregorianYear = Math.min(startGregorianYear + yearsPerPage - 1, endYear);

  const showStartYear = useThaiYear ? startGregorianYear + thaiYearOffset : startGregorianYear;
  const showEndYear = useThaiYear ? endGregorianYear + thaiYearOffset : endGregorianYear;

  const yearRange = generateYearRange(showStartYear, showEndYear);

  const displayStartYear = useThaiYear ? value?.startYear + thaiYearOffset : value?.startYear;
  const displayEndYear = useThaiYear ? value?.endYear + thaiYearOffset : value?.endYear;

  const handleSelectYear = (year: number) => {
    if (showCalendar === "start") {
      field.onChange({
        startYear: useThaiYear ? year - thaiYearOffset : year,
        endYear: new Date().getFullYear(),
      });
    } else {
      field.onChange({
        startYear: value?.startYear,
        endYear: useThaiYear ? year - thaiYearOffset : year,
      });
    }
    setShowCalendar(undefined);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const YearButton = (displayYear: number, type: "start" | "end") => {
    return (
      <button
        onClick={() => {
          const yearIndex =
            type == "start" ? (value?.startYear ?? startYear) - startYear : (value?.endYear ?? startYear) - startYear;
          const pageIndex = Math.floor(yearIndex / yearsPerPage) + 1;
          handlePageChange(pageIndex);
          setShowCalendar(type);
        }}
        className={`flex flex-1 items-center rounded-lg border border-smart-cbt-medium-grey px-2 py-1 text-center text-smart-cbt-dark-grey focus:border-smart-cbt-green`}
      >
        <div className="flex flex-1 justify-center text-center">
          {displayYear ? <span>{displayYear}</span> : <span></span>}
        </div>
        <BaselineArrowDropDown className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  };

  return (
    <Popover>
      <div className="relative z-30 inline-block text-left">
        <Popover.Button
          className={cn(
            "relative flex h-10 w-full max-w-fit flex-row items-center gap-4 rounded-3xl bg-smart-cbt-light-grey px-4 text-left text-base text-smart-cbt-very-dark-grey transition-all",
            className
          )}
        >
          {`${title} : ${displayStartYear ? displayStartYear : ""} - ${displayEndYear ? displayEndYear : ""}`}
          <CalendarIcon className="h-5 w-5 text-smart-cbt-very-dark-grey" aria-hidden="true" />
        </Popover.Button>
        <Popover.Panel className="absolute mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white px-5 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-2">
            <div className="flex flex-row items-center justify-center gap-2">
              {YearButton(displayStartYear, "start")}
              <div className="w-2 border" />
              {YearButton(displayEndYear, "end")}
            </div>
          </div>
          {showCalendar && (
            <div className="px-1 py-3">
              {showPagination && totalPages != 1 && (
                <div className="flex flex-row justify-between py-1">
                  {currentPage !== 1 ? (
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      <ChevronLeftIcon className="h-4 w-4 cursor-pointer text-smart-cbt-dark-grey" />
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {currentPage !== totalPages ? (
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                      <ChevronRightIcon className="h-4 w-4 cursor-pointer text-smart-cbt-dark-grey" />
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                <ul className="grid grid-cols-4 gap-2">
                  {yearRange.map((year) => {
                    const minDate = year < value?.startYear;
                    const selectedYear =
                      (useThaiYear ? year - thaiYearOffset : year) ==
                      (showCalendar === "start" ? value?.startYear : value?.endYear);
                    return (
                      <li key={year}>
                        <button
                          disabled={showCalendar === "end" && minDate}
                          className={`rounded-lg px-2 py-1 hover:text-smart-cbt-green ${
                            selectedYear
                              ? `border border-smart-cbt-green text-smart-cbt-green`
                              : `text-smart-cbt-dark-grey`
                          } ${
                            showCalendar === "end" && minDate
                              ? `cursor-not-allowed text-smart-cbt-light-grey`
                              : `cursor-pointer`
                          }`}
                          onClick={() => handleSelectYear(year)}
                        >
                          {year}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </Popover.Panel>
      </div>
    </Popover>
  );
};

export default FormYearPicker;
