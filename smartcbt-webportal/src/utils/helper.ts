import { irr } from "financial";
import { toast } from "react-toastify";

import {
  DateSection,
  RangeTime,
  Round,
} from "@/components/travel-mart/matching-popup/request-negotiation/RequestNegotiationPopup";
import { QuestionType } from "@/schemas/forms/projects/question-schema";
import { isEmpty, omit } from "lodash";
import { DateTime } from "luxon";
import { CarbonListJson } from "./cms/adapters/website/carbon/types";
import { PROJECT_STATUS } from "./cms/adapters/website/constants";
import { extractErrorMessage } from "./error";
import { ProjectListJSON } from "./cms/adapters/website/sia/types/project";

export type StatusCounts = Record<PROJECT_STATUS | "totalCount", number>;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

//NOTE: If project don't have headless ui lib can use this
type Without<A, B> = { [K in Exclude<keyof A, keyof B>]?: never };
export type XOR<A, B> = A | B extends object ? (Without<A, B> & B) | (Without<B, A> & A) : A | B;

export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

export type Paths<T, D extends number = 2> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : "";

export type Leaves<T, D extends number = 2> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

export function resolvePath(path: string | string[], obj: any, separator = ".") {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

// TODO: check this again

export const fetchItemPaginated = async <T extends any>(
  path: string,
  pageIndex: number,
  pageSize: number,
  order: string,
  sort: string,
  searchKey: string,
  opts: { [key: string]: string }
) => {
  const params = {};

  return {
    items: [],
    currentPageIndex: 1,
    searchKey,
    totalPages: 1,
  };
};

// TODO: check error again
export function handleAPIError(error: unknown) {
  const message = extractErrorMessage(error, "เกิดข้อผิดพลาด");
  toastError(message);
}

export function toastSuccess(message: string) {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export function toastError(message: string) {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export const generateNumberArray = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

export function generateBuddhistYears(min?: number, max?: number) {
  const currentBuddhistYear = new Date().getFullYear() + 543;
  let years = [];
  for (let year = min ?? currentBuddhistYear - 6; year <= (max ?? currentBuddhistYear + 50); year++) {
    years.push(year);
  }
  return years;
}

export function calculateIRR(cashFlows: number[], iterations: number = 100, guess: number = 0.1): number | null {
  // const tolerance = 1e-7;
  try {
    const result = irr(cashFlows);

    return result;
  } catch (e) {
    return 0;
  }
}

export function formatError(error: any) {
  if (!error) return null;
  if (error.message) return error.message;
  const firstErrorKey = Object.keys(error)?.at(0);
  if (firstErrorKey) {
    return formatError(error[firstErrorKey]);
  }
  return null;
}

export function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export function parseTranslation(translations: { [key: string]: any }[], languagesCode = "th-TH") {
  // find data with language
  const filterWithLanguageCode = translations.filter((data) => {
    return data.languages_code == languagesCode;
  });

  return isEmpty(filterWithLanguageCode)
    ? []
    : filterWithLanguageCode.map((data) =>
        omit(data, ["languages_code", "id", "status", "date_created", "date_updated"])
      );
}

export function convertDateSelection(data: { [date: string]: any[] }): DateSection[] {
  const formattedData: DateSection[] = [];

  for (const date in data) {
    const timeSlots = data[date];
    const rounds: Round[] = [];

    for (let i = 0; i < timeSlots.length; i += 4) {
      const timeSlotGroup = timeSlots.slice(i, i + 4);
      const roundStartTime = timeSlotGroup[0].start_time;
      const roundTitle = `รอบ ${roundStartTime.substr(0, 2)}:00 น`;

      const timeRange: RangeTime[] = timeSlotGroup.map((slot) => {
        const startDateTime = `${date} ${slot.start_time}`;
        return { dateTime: `${startDateTime}`, status: slot.status, id: slot.id };
      });

      rounds.push({ title: roundTitle, timeRange });
    }

    const formattedDate = new Date(date).toLocaleDateString("th-TH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      era: "long",
    });

    formattedData.push({ title: formattedDate, rounds });
  }

  return formattedData;
}

interface Option {
  key: string;
  label: string;
  value: string;
}

interface ConvertedData {
  key: string;
  label: string;
  options: Option[];
  type: QuestionType;
}

export function convertDataToJsonChoice(inputData: any[], key: string, type: QuestionType, label: string) {
  let outputData: ConvertedData;
  const result = inputData.map((item) => {
    return {
      key: `${key}-option-${item.id}`,
      label: item.title,
      value: `${item.id}`,
    };
  });
  outputData = {
    key: key,
    label: label,
    options: result,
    type: type,
  };
  return outputData;
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function countProjectStatus(projects: ProjectListJSON[] | CarbonListJson[]): StatusCounts {
  const statusCounts: Record<PROJECT_STATUS, number> = {
    [PROJECT_STATUS.DRAFT]: 0,
    [PROJECT_STATUS.PENDING_FOR_APPROVAL]: 0,
    [PROJECT_STATUS.APPROVAL]: 0,
    [PROJECT_STATUS.REJECTED]: 0,
    [PROJECT_STATUS.IN_PROGRESS]: 0,
    [PROJECT_STATUS.DONE]: 0,
    [PROJECT_STATUS.REQUEST_TO_DELETE]: 0,
    [PROJECT_STATUS.DELETED]: 0,
    // [PROJECT_STATUS.PUBLISHED]: 0,
  };
  projects.forEach((project) => {
    statusCounts[project.status as PROJECT_STATUS]++;
  });
  const totalCount = Object.values(statusCounts).reduce((total, count) => total + count, 0);

  return { ...statusCounts, totalCount: totalCount };
}

export function convertDateStringToDateFormat(inputDate?: string | null) {
  if (!inputDate) return;
  const [year, month, day] = inputDate.split("-");
  const thaiMonths = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  const thaiMonth = thaiMonths[parseInt(month, 10) - 1];
  const thaiYear = parseInt(year, 10) + 543;
  const result = `${day} ${thaiMonth} ${thaiYear}`;
  return result;
}

export function convertDateStringToDate(dateString?: string | null): Date | null {
  if (!dateString) return null;
  const parts = dateString.split("-").map(Number);
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const dateObject = new Date(year, month - 1, day);
    if (dateObject) {
      return dateObject;
    }
  }
  return null;
}

export function convertDateToDateFormat(inputDate?: Date | null) {
  if (!inputDate) return "-";
  const year = inputDate?.getFullYear();
  const month = inputDate?.getMonth() + 1; // Month is zero-based, so add 1
  const day = inputDate?.getDate();
  const thaiMonths = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  const thaiMonth = thaiMonths[month - 1];
  const thaiYear = year + 543;
  const result = `${day} ${thaiMonth} ${thaiYear}`;
  return result;
}

export function convertFileToFormData(file: File) {
  const formData = new FormData();
  formData.append("file", new Blob([file], { type: file.type }), file.name);
  return formData;
}

export function convertFromDateToString(date: Date) {
  return DateTime.fromJSDate(date).setLocale("th-TH").toFormat("yyyy-MM-dd");
}

export function replaceEmptyObjectsWithNull(obj: any): any {
  // console.log("obj: ", obj);
  if (Array.isArray(obj)) {
    // If the object is an array, recursively apply the function to each element
    return obj.map(replaceEmptyObjectsWithNull);
  } else if (obj && typeof obj === "object") {
    if (Object.keys(obj).length === 0) {
      return null;
    }

    // If the object is a non-null object, iterate over its properties
    return Object.keys(obj).reduce((acc, key) => {
      // Recursively apply the function to each property value
      acc[key] = replaceEmptyObjectsWithNull(obj[key]);
      return acc;
    }, {} as any);
  } else {
    // For primitive types, return the value as is
    return obj;
  }
}
