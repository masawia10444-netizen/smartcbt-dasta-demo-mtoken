import { cn } from "@/utils/cn";
import { SVGProps } from "react";

// https://icones.js.org/collection/all

export const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("h-5 w-5", props.className)}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("h-5 w-5", props.className)}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const XMarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("h-5 w-5", props.className)}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("h-5 w-5", props.className)}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const EyeSlashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("h-5 w-5", props.className)}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

export function LogosGoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262" {...props}>
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      ></path>
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      ></path>
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      ></path>
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      ></path>
    </svg>
  );
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"
      ></path>
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M16.175 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.713t.3-.712L16.175 13Z"
      ></path>
    </svg>
  );
}

export function BaselineArrowDropDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} className={cn("h-5 w-5", props.className)}>
      <path fill="currentColor" d="m7 10l5 5l5-5z"></path>
    </svg>
  );
}

export function BaselineArrowDropUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} className={cn("h-5 w-5", props.className)}>
      <path fill="currentColor" d="m7 14l5-5l5 5z"></path>
    </svg>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M208 34h-26V24a6 6 0 0 0-12 0v10H86V24a6 6 0 0 0-12 0v10H48a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14ZM48 46h26v10a6 6 0 0 0 12 0V46h84v10a6 6 0 0 0 12 0V46h26a2 2 0 0 1 2 2v34H46V48a2 2 0 0 1 2-2Zm160 164H48a2 2 0 0 1-2-2V94h164v114a2 2 0 0 1-2 2Z"
      ></path>
    </svg>
  );
}

export function TablerArrowsSort(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} className={cn("h-5 w-5", props.className)}>
      <path
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        d="m3 9l4-4l4 4M7 5v14m14-4l-4 4l-4-4m4 4V5"
      ></path>
    </svg>
  );
}

export function IconParkOutlineSettingConfig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M41.5 10h-6m-8-4v8m0-4h-22m8 14h-8m16-4v8m22-4h-22m20 14h-6m-8-4v8m0-4h-22"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsAddRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M11 13H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.713-.288T11 18v-5Z"
      ></path>
    </svg>
  );
}

export function PhDotsThreeVerticalBold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M112 60a16 16 0 1 1 16 16a16 16 0 0 1-16-16Zm16 52a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
      ></path>
    </svg>
  );
}

export function CheckIconCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L10.6 13.8ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  );
}

export function IcRoundDeleteOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z"
      ></path>
    </svg>
  );
}

export function IcTwotoneSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsUploadRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M6 20q-.825 0-1.413-.588T4 18v-2q0-.425.288-.713T5 15q.425 0 .713.288T6 16v2h12v-2q0-.425.288-.713T19 15q.425 0 .713.288T20 16v2q0 .825-.588 1.413T18 20H6Zm5-12.15L9.125 9.725q-.3.3-.713.288T7.7 9.7q-.275-.3-.288-.7t.288-.7l3.6-3.6q.15-.15.325-.212T12 4.425q.2 0 .375.063t.325.212l3.6 3.6q.3.3.288.7t-.288.7q-.3.3-.713.313t-.712-.288L13 7.85V15q0 .425-.288.713T12 16q-.425 0-.713-.288T11 15V7.85Z"
      ></path>
    </svg>
  );
}

export function PencilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SolarPaperclipBold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="m7.918 17.807l7.89-7.553a2.253 2.253 0 0 0 0-3.284a2.503 2.503 0 0 0-3.43 0l-7.834 7.498a4.28 4.28 0 0 0 0 6.24c1.8 1.723 4.718 1.723 6.518 0l7.949-7.608c2.652-2.54 2.652-6.656 0-9.196c-2.653-2.539-6.954-2.539-9.607 0L3 10.034"
      ></path>
    </svg>
  );
}

export function TriangleUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path fill="currentColor" d="M1 21h22L12 2"></path>
    </svg>
  );
}

export function SaveDiskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <path d="M17 21v-8H7v8M7 3v5h8"></path>
      </g>
    </svg>
  );
}

export function LogoYoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.15em" height="1em" viewBox="0 0 16 14" {...props}>
      <path
        fill="currentColor"
        d="M8 1.5c-6.88 0-7 .62-7 5.5s.12 5.5 7 5.5s7-.62 7-5.5s-.12-5.5-7-5.5Zm2.24 5.74L7.1 8.74c-.28.13-.5-.02-.5-.33V5.59c0-.31.23-.46.5-.33l3.14 1.5c.28.13.28.35 0 .48Z"
      ></path>
    </svg>
  );
}

export function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M5.52319 12.4246C5.66319 12.3426 5.81619 12.2626 5.98219 12.1866C5.84196 12.3957 5.69179 12.5979 5.53219 12.7926C5.25219 13.1296 5.03419 13.3086 4.89719 13.3646C4.88582 13.3694 4.87412 13.3734 4.86219 13.3766C4.85221 13.3627 4.84351 13.348 4.83619 13.3326C4.78019 13.2226 4.78219 13.1166 4.87619 12.9726C4.98219 12.8076 5.19519 12.6186 5.52319 12.4246ZM7.97819 10.7776C7.85919 10.8026 7.74119 10.8276 7.62219 10.8556C7.79845 10.5102 7.96518 10.1601 8.12219 9.80559C8.28026 10.0985 8.45041 10.3848 8.63219 10.6636C8.41519 10.6956 8.19619 10.7336 7.97819 10.7776ZM10.5032 11.7166C10.3479 11.5913 10.2024 11.4542 10.0682 11.3066C10.2962 11.3116 10.5022 11.3286 10.6802 11.3606C10.9972 11.4176 11.1462 11.5076 11.1982 11.5696C11.2146 11.5869 11.2239 11.6098 11.2242 11.6336C11.2207 11.7041 11.2001 11.7728 11.1642 11.8336C11.144 11.8823 11.1117 11.925 11.0702 11.9576C11.0496 11.9703 11.0252 11.9755 11.0012 11.9726C10.9112 11.9696 10.7432 11.9066 10.5032 11.7166ZM8.27819 6.97059C8.23819 7.21459 8.17019 7.49459 8.07819 7.79959C8.0443 7.68539 8.01461 7.56998 7.98919 7.45359C7.91319 7.10059 7.90219 6.82359 7.94319 6.63159C7.98119 6.45459 8.05319 6.38359 8.13919 6.34859C8.18532 6.32826 8.23417 6.31479 8.28419 6.30859C8.29719 6.33859 8.31219 6.40059 8.31619 6.50659C8.32119 6.62859 8.30919 6.78359 8.27819 6.97159V6.97059Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 0H9.293C9.5582 5.66374e-05 9.81251 0.105451 10 0.293L13.707 4C13.8945 4.18749 13.9999 4.4418 14 4.707V14C14 14.5304 13.7893 15.0391 13.4142 15.4142C13.0391 15.7893 12.5304 16 12 16H4C3.46957 16 2.96086 15.7893 2.58579 15.4142C2.21071 15.0391 2 14.5304 2 14V2C2 1.46957 2.21071 0.960859 2.58579 0.585786C2.96086 0.210714 3.46957 0 4 0ZM9.5 1.5V3.5C9.5 3.76522 9.60536 4.01957 9.79289 4.20711C9.98043 4.39464 10.2348 4.5 10.5 4.5H12.5L9.5 1.5ZM4.165 13.668C4.255 13.848 4.395 14.011 4.603 14.087C4.81 14.162 5.015 14.127 5.183 14.057C5.501 13.927 5.818 13.621 6.109 13.271C6.442 12.87 6.792 12.344 7.13 11.761C7.78253 11.5676 8.45075 11.4317 9.127 11.355C9.427 11.738 9.737 12.068 10.037 12.305C10.317 12.525 10.64 12.708 10.971 12.722C11.1513 12.7309 11.3298 12.6826 11.481 12.584C11.636 12.483 11.751 12.337 11.835 12.168C11.925 11.987 11.98 11.798 11.973 11.605C11.9667 11.4147 11.8962 11.2322 11.773 11.087C11.547 10.817 11.177 10.687 10.813 10.622C10.3714 10.5536 9.92343 10.5368 9.478 10.572C9.10186 10.0403 8.77389 9.47602 8.498 8.886C8.748 8.226 8.935 7.602 9.018 7.092C9.054 6.874 9.073 6.666 9.066 6.478C9.06476 6.29139 9.02134 6.10747 8.939 5.94C8.89156 5.84758 8.82414 5.76687 8.74164 5.70374C8.65913 5.64061 8.56361 5.59663 8.462 5.575C8.26 5.532 8.052 5.575 7.861 5.652C7.484 5.802 7.285 6.122 7.21 6.475C7.137 6.815 7.17 7.211 7.256 7.611C7.344 8.017 7.494 8.459 7.686 8.906C7.37889 9.6698 7.02419 10.4136 6.624 11.133C6.10864 11.2951 5.61188 11.5114 5.142 11.778C4.772 11.998 4.443 12.258 4.245 12.565C4.035 12.891 3.97 13.279 4.165 13.668Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21ZM12 9v4"></path>
        <path strokeLinejoin="round" d="m12 17.01l.01-.011"></path>
      </g>
    </svg>
  );
}

export function DeleteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"
      ></path>
    </svg>
  );
}

export function HourGlassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <path
        fill="#F9E7C0"
        d="M327.7 173.372c-20.641 20.641-45.275 47.46-48.299 82.362c3.024 34.902 27.659 61.721 48.299 82.362c27.953 24.088 45.652 59.747 45.652 99.542c0 .07-.005.139-.006.209h.006v56.025H110.648v-56.025h.006c0-.07-.006-.139-.006-.209c0-39.795 17.699-75.454 45.652-99.542c20.641-20.641 45.275-47.46 48.299-82.362c-3.024-34.902-27.659-61.721-48.299-82.362c-27.953-24.088-45.652-59.747-45.652-99.542V16.962h262.704V73.83c0 39.795-17.699 75.454-45.652 99.542z"
      ></path>
      <path
        fill="#FFB636"
        d="M242 427.504c9.777 0 59.476 54.092 59.476 54.092H182.524s49.699-54.092 59.476-54.092zm-5.25-71.823a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zm5.906 20.999a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zm-14.31 35.251a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zm17.56-83.169a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zM144.252 118.927c0 24.516 27.73 46.485 44.951 61.325c12.716 12.716 34.457 36.779 34.457 66.987c0 1.012.048 1.981.127 2.921c.639 24.677 3.799 52.197 11.638 62.017a5.906 5.906 0 1 0 10.373 2.621c10.525-6.473 14.175-40.104 14.515-69.728c1.8-25.503 22.332-52.666 34.484-64.818c17.221-14.84 44.951-36.808 44.951-61.325c0-11.927-195.496-11.927-195.496 0zm104.534 281.752a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811z"
      ></path>
      <path
        fill="#68442A"
        d="M373.353 31.627H110.648c-8.1 0-14.666-6.566-14.666-14.666s6.566-14.666 14.666-14.666h262.705c8.1 0 14.666 6.566 14.666 14.666s-6.567 14.666-14.666 14.666zm14.666 462.245c0-8.1-6.566-14.665-14.666-14.665H110.648c-8.1 0-14.666 6.565-14.666 14.665s6.566 14.665 14.666 14.665h262.705c8.099 0 14.666-6.565 14.666-14.665z"
      ></path>
      <path
        fill="#FFD469"
        d="M339.748 115.432c0 9.076-43.763 16.434-97.748 16.434s-97.748-7.358-97.748-16.434S188.015 98.998 242 98.998s97.748 7.358 97.748 16.434z"
      ></path>
    </svg>
  );
}

export function AddPlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"></path>
    </svg>
  );
}

export function ShieldCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9m-6-8L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4Z"
      ></path>
    </svg>
  );
}

export function EditPencil(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"
      ></path>
    </svg>
  );
}

export function CallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19.95 21q-3.125 0-6.175-1.363t-5.55-3.862q-2.5-2.5-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.338t.712-.062l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3Z"
      ></path>
    </svg>
  );
}

export function AlternateEmail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.875 0-1.65-.375t-1.3-1.075q-.725.725-1.638 1.088T12 17q-2.075 0-3.538-1.463T7 12q0-2.075 1.463-3.538T12 7q2.075 0 3.538 1.463T17 12v1.45q0 .65.425 1.1T18.5 15q.65 0 1.075-.45t.425-1.1V12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20h5v2h-5Zm0-7q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Z"
      ></path>
    </svg>
  );
}

export function IconWww(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M3.338 17A9.996 9.996 0 0 0 12 22a9.996 9.996 0 0 0 8.662-5M3.338 7A9.996 9.996 0 0 1 12 2a9.996 9.996 0 0 1 8.662 5"></path>
        <path d="M13 21.95s1.408-1.853 2.295-4.95M13 2.05S14.408 3.902 15.295 7M11 21.95S9.592 20.098 8.705 17M11 2.05S9.592 3.902 8.705 7M9 10l1.5 5l1.5-5l1.5 5l1.5-5M1 10l1.5 5L4 10l1.5 5L7 10m10 0l1.5 5l1.5-5l1.5 5l1.5-5"></path>
      </g>
    </svg>
  );
}

export function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
      ></path>
    </svg>
  );
}

export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g id="feInstagram0" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g id="feInstagram1" fill="currentColor">
          <path
            id="feInstagram2"
            d="M12 2c-2.716 0-3.056.012-4.123.06c-1.064.049-1.791.218-2.427.465a4.901 4.901 0 0 0-1.772 1.153A4.902 4.902 0 0 0 2.525 5.45c-.247.636-.416 1.363-.465 2.427C2.011 8.944 2 9.284 2 12s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.903 4.903 0 0 0 1.153 1.772a4.903 4.903 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465c1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 0 0 1.772-1.153a4.902 4.902 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 0 0-1.153-1.772a4.901 4.901 0 0 0-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2m0 1.802c2.67 0 2.986.01 4.04.058c.976.045 1.505.207 1.858.344c.466.182.8.399 1.15.748c.35.35.566.684.748 1.15c.136.353.3.882.344 1.857c.048 1.055.058 1.37.058 4.041c0 2.67-.01 2.986-.058 4.04c-.045.976-.208 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15c-.35.35-.684.566-1.15.748c-.353.136-.882.3-1.857.344c-1.054.048-1.37.058-4.041.058c-2.67 0-2.987-.01-4.04-.058c-.976-.045-1.505-.208-1.858-.344a3.098 3.098 0 0 1-1.15-.748a3.098 3.098 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857c-.048-1.055-.058-1.37-.058-4.041c0-2.67.01-2.986.058-4.04c.045-.976.207-1.505.344-1.858c.182-.466.399-.8.748-1.15c.35-.35.684-.566 1.15-.748c.353-.137.882-.3 1.857-.344c1.055-.048 1.37-.058 4.041-.058m0 11.531a3.333 3.333 0 1 1 0-6.666a3.333 3.333 0 0 1 0 6.666m0-8.468a5.135 5.135 0 1 0 0 10.27a5.135 5.135 0 0 0 0-10.27m6.538-.203a1.2 1.2 0 1 1-2.4 0a1.2 1.2 0 0 1 2.4 0"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function IconTiktok(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
      ></path>
    </svg>
  );
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94Z"
      ></path>
    </svg>
  );
}

export function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M18.3346 1.66699L9.16797 10.8337"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3346 1.66699L12.5013 18.3337L9.16797 10.8337L1.66797 7.50033L18.3346 1.66699Z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83203 8.33301L9.9987 12.4997L14.1654 8.33301"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5V2.5"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WarningCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 7v6m0 4.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
      ></path>
    </svg>
  );
}

export function Announcement(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z"
      ></path>
    </svg>
  );
}

export function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M9.35784 13.9579C9.23613 13.9573 9.11683 13.9239 9.0125 13.8612L6.78984 12.5279C6.5398 12.377 6.33283 12.1643 6.18886 11.9102C6.04489 11.6561 5.96877 11.3693 5.96784 11.0772V8.06058C5.96845 7.84764 5.90222 7.63989 5.7785 7.46658L2.67517 3.10525C2.60271 3.00456 2.55946 2.88582 2.55021 2.76212C2.54097 2.63841 2.56607 2.51456 2.62276 2.40422C2.67944 2.29388 2.76551 2.20134 2.87146 2.13682C2.97741 2.0723 3.09912 2.0383 3.22317 2.03858H12.7765C12.9007 2.03806 13.0225 2.07191 13.1286 2.13638C13.2347 2.20085 13.3209 2.29342 13.3776 2.40385C13.4344 2.51428 13.4594 2.63825 13.4501 2.76205C13.4407 2.88584 13.3972 3.00462 13.3245 3.10525L10.2212 7.46658C10.0973 7.63983 10.0308 7.84758 10.0312 8.06058V13.2832C10.031 13.4619 9.96004 13.6332 9.83384 13.7596C9.70764 13.8861 9.53648 13.9574 9.35784 13.9579ZM3.22317 2.70858L6.32117 7.07991C6.52587 7.36585 6.63549 7.70892 6.6345 8.06058V11.0766C6.63494 11.2535 6.68101 11.4273 6.76824 11.5812C6.85548 11.7352 6.98094 11.864 7.1325 11.9552L9.35517 13.2886L9.3645 8.05991C9.36376 7.70819 9.47361 7.36513 9.6785 7.07925L12.7812 2.71791L3.22317 2.70858Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WarningCirleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm-8-80V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"
      ></path>
    </svg>
  );
}

export function LoadingSpinningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
        <path
          strokeDasharray="60"
          strokeDashoffset="60"
          strokeOpacity=".3"
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate>
        </path>
        <path strokeDasharray="15" strokeDashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate>
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          ></animateTransform>
        </path>
      </g>
    </svg>
  );
}

export function CancelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      fill="none"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M10.8778 19.2878C15.4801 19.2878 19.2111 15.5568 19.2111 10.9544C19.2111 6.35205 15.4801 2.62109 10.8778 2.62109C6.27539 2.62109 2.54443 6.35205 2.54443 10.9544C2.54443 15.5568 6.27539 19.2878 10.8778 19.2878Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3779 8.45508L8.37793 13.4551"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.37793 8.45508L13.3779 13.4551"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M27 15L18 24L27 33" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M21 33L30 24L21 15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProfileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M15.9997 5.33301C17.4142 5.33301 18.7707 5.89491 19.7709 6.8951C20.7711 7.8953 21.333 9.25185 21.333 10.6663C21.333 12.0808 20.7711 13.4374 19.7709 14.4376C18.7707 15.4378 17.4142 15.9997 15.9997 15.9997C14.5852 15.9997 13.2286 15.4378 12.2284 14.4376C11.2282 13.4374 10.6663 12.0808 10.6663 10.6663C10.6663 9.25185 11.2282 7.8953 12.2284 6.8951C13.2286 5.89491 14.5852 5.33301 15.9997 5.33301ZM15.9997 18.6663C21.893 18.6663 26.6663 21.053 26.6663 23.9997V26.6663H5.33301V23.9997C5.33301 21.053 10.1063 18.6663 15.9997 18.6663Z"
        fill="white"
      />
    </svg>
  );
}

export function FilePdfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.1 9.4c-.02.04-.29 1.76-2.1 4.69c0 0-3.5 1.82-2.67 3.18c.67 1.08 2.32-.04 3.74-2.68c0 0 1.82-.64 4.24-.82c0 0 3.86 1.73 4.39-.11c.52-1.86-3.06-1.44-3.7-1.25c0 0-2-1.35-2.5-3.21c0 0 1.14-3.95-.61-3.9c-1.75.05-1.09 3.13-.79 4.1m.81 1.04c.03.01.47 1.21 1.89 2.46c0 0-2.33.46-3.39.9c0 0 1-1.73 1.5-3.36m3.93 2.72c.58-.16 2.33.15 2.26.48c-.06.33-2.26-.48-2.26-.48M7.77 17c-.53 1.24-1.44 2-1.67 2c-.23 0 .7-1.6 1.67-2m3.14-6.93c0-.07-.36-2.2 0-2.15c.54.08 0 2.08 0 2.15z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function PhDotsSixVerticalBoldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
      ></path>
    </svg>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="m25.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7zM18 4.4l5.6 5.6H18V4.4zM24 28H8V4h8v6c0 1.1.9 2 2 2h6v16z"
      />
      <path fill="currentColor" d="M10 22h12v2H10zm0-6h12v2H10z" />
    </svg>
  );
}

export function CarbonTransportationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1725_75092)">
        <path
          d="M52.5606 24.0625H46.3967L37.0918 14.7576C36.7738 14.437 36.3952 14.1829 35.978 14.0099C35.5609 13.8369 35.1135 13.7486 34.6619 13.75H10.5113C9.94671 13.7511 9.39103 13.8912 8.89342 14.158C8.3958 14.4248 7.97157 14.81 7.6582 15.2797L1.28594 24.8274C1.09871 25.1103 0.998607 25.442 0.998047 25.7813L0.998047 36.0938C0.998047 37.0055 1.36021 37.8798 2.00487 38.5244C2.64952 39.1691 3.52387 39.5313 4.43555 39.5313H8.08789C8.46653 41.0101 9.3266 42.3209 10.5325 43.2569C11.7384 44.1929 13.2215 44.701 14.748 44.701C16.2746 44.701 17.7577 44.1929 18.9636 43.2569C20.1695 42.3209 21.0296 41.0101 21.4082 39.5313H35.5879C35.9665 41.0101 36.8266 42.3209 38.0325 43.2569C39.2384 44.1929 40.7215 44.701 42.2481 44.701C43.7746 44.701 45.2577 44.1929 46.4636 43.2569C47.6695 42.3209 48.5296 41.0101 48.9082 39.5313H52.5606C53.4722 39.5313 54.3466 39.1691 54.9912 38.5244C55.6359 37.8798 55.9981 37.0055 55.9981 36.0938V27.5C55.9981 26.5883 55.6359 25.714 54.9912 25.0693C54.3466 24.4247 53.4722 24.0625 52.5606 24.0625ZM10.5113 17.1875H34.6619L41.5369 24.0625H5.93945L10.5113 17.1875ZM14.748 41.25C14.0682 41.25 13.4036 41.0484 12.8383 40.6707C12.273 40.293 11.8324 39.7561 11.5722 39.128C11.312 38.4999 11.244 37.8087 11.3766 37.1419C11.5092 36.4751 11.8366 35.8626 12.3174 35.3818C12.7981 34.9011 13.4106 34.5737 14.0774 34.4411C14.7442 34.3084 15.4354 34.3765 16.0635 34.6367C16.6916 34.8969 17.2285 35.3375 17.6062 35.9027C17.9839 36.468 18.1855 37.1326 18.1855 37.8125C18.1855 38.7242 17.8234 39.5985 17.1787 40.2432C16.5341 40.8879 15.6597 41.25 14.748 41.25ZM42.2481 41.25C41.5682 41.25 40.9036 41.0484 40.3383 40.6707C39.773 40.293 39.3324 39.7561 39.0722 39.128C38.812 38.4999 38.744 37.8087 38.8766 37.1419C39.0092 36.4751 39.3366 35.8626 39.8174 35.3818C40.2981 34.9011 40.9106 34.5737 41.5774 34.4411C42.2442 34.3084 42.9354 34.3765 43.5635 34.6367C44.1916 34.8969 44.7285 35.3375 45.1062 35.9027C45.4839 36.468 45.6856 37.1326 45.6856 37.8125C45.6856 38.7242 45.3234 39.5985 44.6787 40.2432C44.0341 40.8879 43.1597 41.25 42.2481 41.25Z"
          fill="#1890FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1725_75092">
          <rect width="55" height="55" fill="white" transform="translate(0.998047)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CarbonFoodIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M55.8704 33.6366C59.462 26.7947 52.1616 22.05 42.617 19.7231C43.3351 18.0909 43.5432 15.9544 41.5182 13.9144C38.9213 11.3034 40.6473 7.5 40.6473 7.5C40.6473 7.5 35.1966 12.5278 38.6382 15.9947C39.9076 17.2725 40.5685 18.3947 40.8845 19.3331C38.2495 18.79 35.5815 18.4223 32.8979 18.2325C33.6995 16.0538 33.7773 13.3172 31.2516 10.6969C27.7941 7.10531 30.0966 1.875 30.0966 1.875C30.0966 1.875 22.8282 8.78813 27.4173 13.5544C29.0926 15.2925 29.9748 16.8225 30.4023 18.105C27.5579 18.0197 24.8204 18.1444 22.3885 18.4847C22.6782 17.0831 22.4363 15.4716 20.8904 13.9153C18.2935 11.3044 20.0204 7.5 20.0204 7.5C20.0204 7.5 14.5688 12.5278 18.0113 15.9947C19.0895 17.0803 19.7213 18.0497 20.0841 18.8944C19.6735 18.9844 19.2751 19.0819 18.8916 19.1878C7.03977 18.0787 1.87039 20.5275 4.23195 25.3313C0.110704 29.4525 1.65945 34.1559 6.81664 37.755C9.50727 48.8372 10.2001 58.125 30.4651 58.125C48.5476 58.125 51.046 50.7281 53.2857 41.2612C60.0057 39.9234 58.5741 36.7022 55.8704 33.6366ZM54.1951 32.5294C51.9441 37.3294 42.1754 40.9425 30.4651 40.9425C18.7557 40.9425 8.98695 37.3294 6.73508 32.5294C6.68727 32.3869 6.64133 32.2388 6.59539 32.0944C7.66789 29.3738 11.1535 27.0131 16.0491 25.4325C14.8988 26.5444 14.6598 28.2047 17.687 28.7869C18.5532 28.9537 20.9316 28.3763 19.892 25.425C19.7466 25.0125 19.5095 24.7359 19.2179 24.5691C22.5816 23.7994 26.4001 23.3559 30.4651 23.3559C30.9207 23.3559 31.3679 23.3719 31.817 23.3822C29.4713 24.2147 27.5579 26.7797 32.3476 27.5362C33.4051 27.7031 36.3085 27.1256 35.0391 24.1744C34.9282 23.9113 34.7505 23.6819 34.5235 23.5088C39.0113 23.8388 43.0773 24.7031 46.3641 25.9491C43.4738 25.7878 40.2676 27.5691 45.4023 30.0769C46.5038 30.615 49.8507 31.1091 49.3904 27.8503C49.3571 27.6149 49.274 27.3892 49.1466 27.1884C51.7745 28.5731 53.6073 30.2522 54.3338 32.0944L54.1951 32.5294Z"
        fill="#F29100"
      />
      <path
        d="M24.2226 34.538C27.2535 34.538 29.2748 31.7977 30.8582 30.7252C33.0707 29.2252 38.6338 28.6402 33.7344 28.5221C29.0873 28.4105 23.3498 32.183 19.5154 31.9233C13.1666 31.4921 19.6691 34.538 24.2226 34.538ZM30.7719 40.1368C31.8426 40.343 34.7854 39.6287 33.4982 35.979C32.0441 31.8493 23.2419 38.6874 30.7719 40.1368ZM14.1069 31.104C13.0841 29.6602 11.601 27.8293 10.9869 28.7827C10.1479 30.0868 9.8835 32.7108 10.4929 32.8271C15.2704 33.743 14.9357 32.273 14.1069 31.104ZM41.8804 31.689C42.7419 30.6221 41.0216 28.0543 39.9173 28.5033C38.1885 29.2065 37.1919 28.7302 36.4326 29.7971C34.6541 32.2955 40.7094 33.1374 41.8804 31.689ZM41.3423 34.7462C40.1029 34.1996 40.3954 36.0305 38.5644 34.5615C37.2538 33.5096 34.4338 36.1627 36.2938 37.9646C38.3638 39.9699 38.9151 38.064 39.7851 38.2243C41.5532 38.5496 44.5935 36.1805 41.3423 34.7462ZM20.7341 35.3724C20.0882 34.7368 19.2219 35.5037 18.7326 36.4393C18.2479 36.2012 17.8532 36.1458 17.8532 36.1458C17.4829 35.0902 16.3813 34.3665 16.3813 34.3665C16.3813 34.3665 16.4816 35.4643 16.6269 35.9996C15.4101 35.5674 15.3726 33.3924 15.3726 33.3924C15.3726 33.3924 14.556 33.8808 14.6301 34.7105C13.2904 33.6296 12.1494 34.1349 12.1494 34.1349C12.1494 34.1349 13.8491 35.0912 14.0835 35.7362C13.1291 35.8102 12.5723 36.1402 12.2479 36.908C12.2488 36.9146 14.1341 36.0108 15.5291 36.6633C14.9788 37.1133 15.2526 38.2374 15.2526 38.2374C16.551 36.8612 17.5879 37.0083 18.4176 37.2549C18.3173 37.6758 18.3238 38.0602 18.5019 38.2937C19.941 40.1855 24.9538 39.7599 26.3001 38.3612C27.9304 36.669 23.4004 37.9965 20.7341 35.3724Z"
        fill="#F29100"
      />
      <path
        d="M24.2744 28.2467C23.8478 29.1036 23.845 29.7505 24.3381 30.4236C24.3447 30.4255 24.5369 28.3442 25.8128 27.4817C25.9169 28.1848 27.0212 28.5261 27.0212 28.5261C26.1381 25.3986 28.7162 25.2355 28.7041 24.1133C27.3372 24.2286 26.5609 25.2223 26.5609 25.2223C25.465 24.9983 24.2772 25.5711 24.2772 25.5711C24.2772 25.5711 25.2719 26.0483 25.8053 26.1992C24.8097 27.0214 22.9234 25.9367 22.9234 25.9367C22.9234 25.9367 22.9234 26.8892 23.6734 27.2502C22.0581 27.8455 21.9062 29.083 21.9062 29.083C21.9062 29.083 23.5994 28.1164 24.2744 28.2467ZM48.2284 32.518C48.6166 31.7811 48.0503 31.0152 48.0503 31.0152C48.0503 31.0152 47.1794 33.0092 45.8903 32.9408C46.2297 32.502 46.7453 31.527 46.7453 31.527C46.7453 31.527 45.4497 31.7736 44.7016 32.6052C44.7016 32.6052 43.4866 32.2686 42.3203 32.9886C42.9784 33.898 45.1478 32.4945 46.2981 35.5339C46.2981 35.5339 46.9825 34.603 46.6478 33.9758C48.1872 33.9092 49.5803 35.4673 49.585 35.4617C49.5794 34.6273 49.1931 34.1098 48.3391 33.6748C48.8041 33.1695 50.7409 32.9398 50.7409 32.9398C50.7409 32.9398 49.8822 32.0352 48.2284 32.518Z"
        fill="#F29100"
      />
    </svg>
  );
}

export function CarbonAccomodationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="65" height="60" viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.43399 15C7.43399 14.5027 7.22038 14.0258 6.84014 13.6742C6.4599 13.3225 5.94419 13.125 5.40645 13.125C4.86871 13.125 4.353 13.3225 3.97276 13.6742C3.59252 14.0258 3.37891 14.5027 3.37891 15V45C3.37891 45.4973 3.59252 45.9742 3.97276 46.3258C4.353 46.6775 4.86871 46.875 5.40645 46.875C5.94419 46.875 6.4599 46.6775 6.84014 46.3258C7.22038 45.9742 7.43399 45.4973 7.43399 45V41.875H57.1547V45C57.1547 45.4973 57.3683 45.9742 57.7486 46.3258C58.1288 46.6775 58.6445 46.875 59.1823 46.875C59.72 46.875 60.2357 46.6775 60.616 46.3258C60.9962 45.9742 61.2098 45.4973 61.2098 45V39.1075C61.2098 34.12 61.2098 31.6275 60.4529 29.6225C59.7822 27.85 58.6883 26.24 57.2524 24.9122C55.8165 23.5843 54.0756 22.5727 52.1589 21.9525C49.9908 21.2525 47.2928 21.2525 41.9022 21.2525H41.8968C39.7395 21.2525 36.928 21.2525 36.0602 21.53C35.2937 21.7781 34.5974 22.1827 34.0232 22.7137C33.4489 23.2448 33.0114 23.8886 32.7431 24.5975C32.4403 25.4 32.4403 26.4 32.4403 28.3925V38.125H7.43399V15Z"
        fill="#39B78A"
      />
      <path
        d="M18.9225 33.75C20.715 33.75 22.434 33.0915 23.7015 31.9194C24.969 30.7473 25.681 29.1576 25.681 27.5C25.681 25.8424 24.969 24.2527 23.7015 23.0806C22.434 21.9085 20.715 21.25 18.9225 21.25C17.1301 21.25 15.411 21.9085 14.1436 23.0806C12.8761 24.2527 12.1641 25.8424 12.1641 27.5C12.1641 29.1576 12.8761 30.7473 14.1436 31.9194C15.411 33.0915 17.1301 33.75 18.9225 33.75Z"
        fill="#39B78A"
      />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.66667 15.8333C13.3486 15.8333 16.3333 12.8486 16.3333 9.16667C16.3333 5.48477 13.3486 2.5 9.66667 2.5C5.98477 2.5 3 5.48477 3 9.16667C3 12.8486 5.98477 15.8333 9.66667 15.8333Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 17.5L14.375 13.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CarbonWasteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35.6203 41.9566C35.8227 41.9566 35.9867 41.7954 35.9867 41.5965C35.9867 41.3976 35.8227 41.2363 35.6203 41.2363C35.418 41.2363 35.2539 41.3976 35.2539 41.5965C35.2539 41.7954 35.418 41.9566 35.6203 41.9566Z"
        fill="#C03551"
      />
      <path
        d="M47.7055 45.5571H46.2406L45.9477 39.5063L45.6539 33.4571L45.3609 27.4071L45.0688 21.3579L44.7758 15.3079H44.6406C44.9926 14.9103 45.1881 14.3983 45.1906 13.8672C45.1906 13.2227 44.9063 12.6196 44.4305 12.2047C44.4484 12.0782 44.4578 11.9516 44.4578 11.8266C44.4578 10.1672 43.0391 8.7938 41.3648 8.88755C41.263 8.66609 41.14 8.45496 40.9977 8.25708C41.0086 8.15943 41.0141 8.06177 41.0141 7.96099C41.0141 5.62427 39.0867 3.72349 36.718 3.72349C36.546 3.72359 36.3742 3.7356 36.2039 3.75943C35.8048 3.08682 35.2369 2.53024 34.5563 2.14488C33.8758 1.75951 33.1063 1.55877 32.3242 1.56255C31.2845 1.56385 30.2772 1.92491 29.4734 2.58443C28.5894 1.91693 27.5108 1.55794 26.4031 1.56255C25.4078 1.56264 24.4342 1.85316 23.6016 2.39849C22.0594 1.28365 19.7727 1.32115 18.2539 2.52505C16.5258 1.40162 14.2016 1.26099 12.3398 2.1938C11.3868 1.77568 10.3571 1.5607 9.31641 1.56255C5.18047 1.56255 1.81562 4.87661 1.81562 8.95083C1.81562 13.0251 5.18047 16.3399 9.31641 16.3399C11.7797 16.3399 14.043 15.1704 15.4508 13.1907C16.4284 13.123 17.3737 12.8123 18.2007 12.2866C19.0278 11.7609 19.7105 11.037 20.1867 10.1805C21.016 10.3448 21.8755 10.2595 22.6563 9.93521C23.1349 10.4507 23.7148 10.8618 24.3597 11.1429C25.0045 11.424 25.7005 11.569 26.4039 11.5688C27.1157 11.5707 27.82 11.423 28.4711 11.1354C29.1222 10.8478 29.7056 10.4267 30.1836 9.89927C31.0977 10.4069 32.1637 10.5693 33.1875 10.3571C33.4266 10.7032 33.7125 11.011 34.0367 11.2696C34.4258 13.0063 35.993 14.2774 37.8188 14.2774C38.3727 14.2774 38.9133 14.1618 39.4125 13.9368C39.8156 14.3266 40.318 14.593 40.8695 14.7063C40.9594 14.9282 41.0859 15.1297 41.2391 15.3079H40.382L40.0891 21.3579L39.7953 27.4071L39.5023 33.4571L39.2102 39.5063L38.9172 45.5571V31.1524H30.1281L21.3391 23.9501V31.1524L12.55 23.9501V31.1524L3.76094 23.9501V45.5563H2.29531C2.10273 45.5555 1.91762 45.6308 1.78035 45.7659C1.64307 45.901 1.56477 46.0848 1.5625 46.2774V47.7172C1.5625 48.1133 1.89141 48.4375 2.29531 48.4375H47.7055C47.8979 48.4384 48.0828 48.3631 48.2199 48.2282C48.357 48.0933 48.4352 47.9096 48.4375 47.7172V46.2774C48.4352 46.085 48.357 45.9014 48.2199 45.7664C48.0828 45.6315 47.8979 45.5562 47.7055 45.5571ZM40.2695 12.5266L39.8375 11.8204L39.157 12.293C38.764 12.5672 38.2964 12.7142 37.8172 12.7141C36.6562 12.7141 35.6703 11.8579 35.5242 10.7235L35.4781 10.3704L35.182 10.1735C34.7841 9.90397 34.4647 9.53387 34.2563 9.10083L33.9523 8.4774L33.2969 8.70552C32.2227 9.07896 31.282 8.85865 30.4898 8.23677L29.8234 7.71099L29.3555 8.42193C29.0338 8.91049 28.5953 9.31114 28.0799 9.58764C27.5644 9.86414 26.9881 10.0078 26.4031 10.0055C25.8359 10.0064 25.2767 9.87092 24.7728 9.6104C24.2689 9.34989 23.835 8.97201 23.5078 8.50865L23.0914 7.91568L22.4688 8.28599C21.7258 8.72818 20.9227 8.83833 20.0281 8.51724L19.3227 8.26411L19.0406 8.95786C18.3797 10.5829 16.8023 11.6368 15.0211 11.643L14.5914 11.6446L14.3625 12.0079C13.2688 13.7407 11.382 14.7758 9.31641 14.7758C6.04219 14.7758 3.37813 12.1618 3.37813 8.94927C3.37813 5.73833 6.04141 3.12505 9.31641 3.12505C10.2602 3.12505 11.168 3.34146 12.0141 3.76724L12.3961 3.95943L12.7641 3.74146C14.3336 2.81099 16.4266 2.98365 17.8125 4.13677L18.3859 4.61333L18.8891 4.06333C19.1556 3.76737 19.4814 3.53086 19.8454 3.3692C20.2094 3.20753 20.6033 3.12435 21.0016 3.12505C21.759 3.12195 22.4867 3.4195 23.025 3.9524L23.5383 4.45943L24.0844 3.98755C24.7287 3.43108 25.5517 3.12494 26.4031 3.12505C27.368 3.12505 28.2695 3.50318 28.9398 4.19068L29.5336 4.79849L30.0898 4.15552C30.3665 3.83346 30.7092 3.57473 31.0948 3.39692C31.4803 3.21911 31.8997 3.12639 32.3242 3.12505C33.5313 3.12505 34.6016 3.83833 35.0516 4.94146L35.3133 5.58443L35.9828 5.39927C36.2641 5.32115 36.4977 5.28521 36.718 5.28521C38.2258 5.28521 39.4516 6.48521 39.4516 7.96021C39.4516 8.08833 39.4305 8.21099 39.407 8.36021L39.3531 8.7149L39.5867 8.98755C39.8359 9.2774 40.0023 9.59927 40.082 9.9438L40.2695 10.7563L41.0672 10.5165C41.2266 10.468 41.357 10.4461 41.4781 10.4461C42.2586 10.4461 42.8945 11.0649 42.8945 11.8258C42.8945 11.9704 42.8656 12.1204 42.8055 12.2868L42.5555 12.9735L43.2242 13.268C43.3422 13.3182 43.4431 13.4015 43.5146 13.5079C43.5862 13.6142 43.6253 13.7391 43.6273 13.8672C43.6273 14.2313 43.3203 14.5266 42.9438 14.5266C42.7756 14.5297 42.6126 14.4689 42.4875 14.3565C42.3624 14.2442 42.2845 14.0886 42.2695 13.9211L42.2102 13.2047L41.4359 13.2055C41.2002 13.1991 40.9699 13.1336 40.7661 13.0149C40.5623 12.8963 40.3915 12.7284 40.2695 12.5266ZM41.0242 26.2352L41.2039 22.5297H43.9516L44.1305 26.2352H41.0242ZM40.4391 38.3344L40.618 34.629H44.5375L44.7172 38.3344H40.4391ZM37.2563 47.8344H31.7875V47.1938H37.2563V47.8344ZM37.3539 38.3547V43.9954H37.1094V38.3547H37.3539ZM32.7148 45.1665V38.7446H36.3281V45.1665H32.7148ZM32.5195 46.8024V45.9477H36.5234V46.8024H32.5195ZM12.9148 38.7149H20.9719V41.2368H12.9148V38.7149ZM12.1828 41.236H5.32266V38.7141H12.1828V41.236ZM21.7039 38.7149H29.3945V41.2368H21.7039V38.7149ZM21.7039 37.9946V35.4735H29.3945V37.9946H21.7039ZM20.9719 37.9946H12.9148V35.4735H20.9719V37.9946ZM12.1828 37.9946H5.32266V35.4735H12.1828V37.9946Z"
        fill="#C03551"
      />
      <path
        d="M17.6004 6.71674C17.512 6.64321 17.4161 6.57906 17.3145 6.52533C17.2125 6.46425 17.105 6.41298 16.9934 6.3722C16.8611 6.32042 16.7247 6.27991 16.5855 6.25111C16.4874 5.82255 16.2661 5.43204 15.9488 5.12767C15.7495 4.92743 15.5185 4.76141 15.2652 4.63627C15.0119 4.50737 14.7437 4.40978 14.4668 4.34564C13.4332 4.10892 12.2855 4.39799 11.5684 5.04408C11.5598 5.04095 11.5543 5.03549 11.5473 5.03314C11.4111 4.97798 11.2698 4.93663 11.1254 4.9097C10.8378 4.85997 10.5435 4.86394 10.2574 4.92142C9.70664 5.04642 9.24648 5.38392 9.08398 5.79955C9.43497 5.51463 9.87578 5.36373 10.3277 5.37377C10.5395 5.37455 10.7402 5.41986 10.9191 5.49174C11.023 5.53314 11.0512 5.54877 11.1738 5.61674C11.2426 5.65736 11.3129 5.7183 11.3746 5.77533L11.6449 6.02299L11.9816 5.7433C12.577 5.2472 13.4434 5.05502 14.209 5.22064C14.3004 5.23783 14.402 5.26752 14.484 5.29252C14.5551 5.31439 14.6543 5.35189 14.7715 5.40892C14.916 5.4847 15.0988 5.58783 15.2379 5.70267C15.5301 5.93549 15.7402 6.2472 15.8691 6.59095L15.9738 6.86595L16.234 6.86439C16.4145 6.86361 16.6105 6.86595 16.7793 6.8933C16.9395 6.9097 17.1637 6.98627 17.3254 7.05033C17.6754 7.20111 17.9926 7.43783 18.2395 7.75658C18.1863 7.37533 17.952 6.99955 17.6004 6.71674ZM39.041 8.84955C38.991 8.77671 38.9342 8.7087 38.8715 8.64642C38.7988 8.56986 38.7193 8.50004 38.634 8.43783C38.705 8.11852 38.6803 7.78534 38.5629 7.48002C38.4924 7.28246 38.3888 7.09833 38.2566 6.93549C38.1948 6.85535 38.1277 6.7794 38.0559 6.70814C37.9783 6.63081 37.8961 6.55828 37.8098 6.49095C37.1848 6.01049 36.316 5.85111 35.6223 6.06595L35.6113 6.05189C35.5369 5.97221 35.4545 5.90047 35.3652 5.83783C35.1858 5.71502 34.9854 5.6263 34.7738 5.57611C34.3613 5.49017 33.9418 5.57611 33.698 5.80736C34.0255 5.7225 34.3725 5.75684 34.677 5.90424C34.8199 5.96986 34.9418 6.06361 35.0395 6.16674C35.0973 6.22689 35.1105 6.24642 35.1723 6.33002C35.2059 6.37924 35.2332 6.44252 35.2566 6.49955L35.3613 6.75111L35.6785 6.66595C36.2402 6.51439 36.8887 6.65267 37.3535 7.00189C37.4098 7.04252 37.4691 7.0933 37.5168 7.13549C37.5582 7.1722 37.6129 7.22924 37.6738 7.30345C37.748 7.39955 37.8379 7.52611 37.8949 7.6472C38.0176 7.89564 38.0613 8.17142 38.0387 8.44408L38.0215 8.66283L38.1988 8.74252C38.3207 8.79799 38.4535 8.8597 38.5582 8.9308C38.9196 9.17286 39.1745 9.54411 39.2707 9.9683C39.359 9.69564 39.3207 9.36908 39.173 9.0683C39.1362 8.99129 39.092 8.91803 39.041 8.84955Z"
        fill="#C03551"
      />
    </svg>
  );
}

export function BarGraphIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={props.className}
    >
      <path
        d="M4.5 20.4297C4.30189 20.4271 4.11263 20.3472 3.97253 20.2072C3.83244 20.0671 3.75259 19.8778 3.75 19.6797V4.67969C3.75 4.48078 3.82902 4.29001 3.96967 4.14936C4.11032 4.00871 4.30109 3.92969 4.5 3.92969C4.69891 3.92969 4.88968 4.00871 5.03033 4.14936C5.17098 4.29001 5.25 4.48078 5.25 4.67969V19.6797C5.24741 19.8778 5.16756 20.0671 5.02747 20.2072C4.88737 20.3472 4.69811 20.4271 4.5 20.4297Z"
        fill="currentColor"
      />
      <path d="M19.5 20.4297H4.5C4.30109 20.4297 4.11032 20.3507 3.96967 20.21C3.82902 20.0694 3.75 19.8786 3.75 19.6797C3.75 19.4808 3.82902 19.29 3.96967 19.1494C4.11032 19.0087 4.30109 18.9297 4.5 18.9297H19.5C19.6989 18.9297 19.8897 19.0087 20.0303 19.1494C20.171 19.29 20.25 19.4808 20.25 19.6797C20.25 19.8786 20.171 20.0694 20.0303 20.21C19.8897 20.3507 19.6989 20.4297 19.5 20.4297ZM8 16.9297C7.80189 16.9271 7.61263 16.8472 7.47253 16.7072C7.33244 16.5671 7.25259 16.3778 7.25 16.1797V12.1797C7.25 11.9808 7.32902 11.79 7.46967 11.6494C7.61032 11.5087 7.80109 11.4297 8 11.4297C8.19891 11.4297 8.38968 11.5087 8.53033 11.6494C8.67098 11.79 8.75 11.9808 8.75 12.1797V16.1797C8.74741 16.3778 8.66756 16.5671 8.52747 16.7072C8.38737 16.8472 8.19811 16.9271 8 16.9297ZM11.5 16.9297C11.3019 16.9271 11.1126 16.8472 10.9725 16.7072C10.8324 16.5671 10.7526 16.3778 10.75 16.1797V8.17969C10.75 7.98078 10.829 7.79001 10.9697 7.64936C11.1103 7.50871 11.3011 7.42969 11.5 7.42969C11.6989 7.42969 11.8897 7.50871 12.0303 7.64936C12.171 7.79001 12.25 7.98078 12.25 8.17969V16.1797C12.2474 16.3778 12.1676 16.5671 12.0275 16.7072C11.8874 16.8472 11.6981 16.9271 11.5 16.9297ZM15 16.9297C14.8019 16.9271 14.6126 16.8472 14.4725 16.7072C14.3324 16.5671 14.2526 16.3778 14.25 16.1797V12.1797C14.25 11.9808 14.329 11.79 14.4697 11.6494C14.6103 11.5087 14.8011 11.4297 15 11.4297C15.1989 11.4297 15.3897 11.5087 15.5303 11.6494C15.671 11.79 15.75 11.9808 15.75 12.1797V16.1797C15.7474 16.3778 15.6676 16.5671 15.5275 16.7072C15.3874 16.8472 15.1981 16.9271 15 16.9297ZM18.5 16.9297C18.3019 16.9271 18.1126 16.8472 17.9725 16.7072C17.8324 16.5671 17.7526 16.3778 17.75 16.1797V8.17969C17.75 7.98078 17.829 7.79001 17.9697 7.64936C18.1103 7.50871 18.3011 7.42969 18.5 7.42969C18.6989 7.42969 18.8897 7.50871 19.0303 7.64936C19.171 7.79001 19.25 7.98078 19.25 8.17969V16.1797C19.2474 16.3778 19.1676 16.5671 19.0275 16.7072C18.8874 16.8472 18.6981 16.9271 18.5 16.9297Z" />
    </svg>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        d="M21.6484 19.8736C20.2206 17.4052 18.0203 15.6352 15.4525 14.7961C16.7226 14.04 17.7094 12.8878 18.2614 11.5166C18.8134 10.1453 18.8999 8.63077 18.5078 7.20554C18.1157 5.78031 17.2666 4.5232 16.0909 3.62726C14.9151 2.73132 13.4778 2.24609 11.9996 2.24609C10.5215 2.24609 9.08414 2.73132 7.90842 3.62726C6.73269 4.5232 5.88358 5.78031 5.49146 7.20554C5.09935 8.63077 5.18592 10.1453 5.73788 11.5166C6.28984 12.8878 7.27668 14.04 8.54683 14.7961C5.97902 15.6343 3.77871 17.4043 2.35089 19.8736C2.29853 19.959 2.2638 20.054 2.24875 20.153C2.2337 20.2521 2.23863 20.3531 2.26326 20.4502C2.28789 20.5472 2.33171 20.6384 2.39214 20.7183C2.45257 20.7981 2.52838 20.8651 2.6151 20.9152C2.70183 20.9653 2.79771 20.9975 2.89709 21.0099C2.99647 21.0224 3.09733 21.0148 3.19373 20.9876C3.29012 20.9604 3.3801 20.9142 3.45835 20.8517C3.5366 20.7892 3.60154 20.7117 3.64933 20.6236C5.41558 17.5711 8.53746 15.7486 11.9996 15.7486C15.4618 15.7486 18.5837 17.5711 20.35 20.6236C20.3977 20.7117 20.4627 20.7892 20.5409 20.8517C20.6192 20.9142 20.7092 20.9604 20.8056 20.9876C20.902 21.0148 21.0028 21.0224 21.1022 21.0099C21.2016 20.9975 21.2975 20.9653 21.3842 20.9152C21.4709 20.8651 21.5467 20.7981 21.6072 20.7183C21.6676 20.6384 21.7114 20.5472 21.736 20.4502C21.7607 20.3531 21.7656 20.2521 21.7505 20.153C21.7355 20.054 21.7008 19.959 21.6484 19.8736ZM6.74964 8.99864C6.74964 7.96029 7.05755 6.94526 7.63443 6.0819C8.21131 5.21854 9.03124 4.54564 9.99056 4.14828C10.9499 3.75092 12.0055 3.64695 13.0239 3.84952C14.0423 4.05209 14.9777 4.55211 15.712 5.28633C16.4462 6.02056 16.9462 6.95602 17.1488 7.97442C17.3513 8.99282 17.2474 10.0484 16.85 11.0077C16.4527 11.967 15.7797 12.787 14.9164 13.3639C14.053 13.9407 13.038 14.2486 11.9996 14.2486C10.6077 14.2472 9.27322 13.6936 8.28898 12.7093C7.30473 11.7251 6.75113 10.3906 6.74964 8.99864Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function LineGraphIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 20.6802C3 20.8128 3.05268 20.94 3.14645 21.0337C3.24021 21.1275 3.36739 21.1802 3.5 21.1802H20C20.2761 21.1802 20.5 20.9563 20.5 20.6802C20.5 20.404 20.2761 20.1802 20 20.1802H4V17.8597L7.176 14.0032C7.6079 14.1987 8.09523 14.2343 8.55097 14.1037C9.0067 13.9731 9.40119 13.6847 9.664 13.2902L12.0015 14.2642C12.0146 14.5702 12.0979 14.8691 12.2448 15.1379C12.3918 15.4067 12.5985 15.6381 12.8491 15.8143C13.0996 15.9905 13.3873 16.1069 13.69 16.1543C13.9926 16.2017 14.3021 16.179 14.5945 16.0879C14.887 15.9968 15.1546 15.8397 15.3767 15.6288C15.5989 15.4179 15.7696 15.1588 15.8758 14.8714C15.9819 14.5841 16.0206 14.2762 15.9889 13.9715C15.9572 13.6669 15.856 13.3735 15.693 13.1142L18.1805 10.0052C18.6245 10.2048 19.126 10.2357 19.5911 10.0919C20.0562 9.94824 20.4529 9.63984 20.7069 9.22455C20.9609 8.80927 21.0547 8.31561 20.9707 7.83612C20.8867 7.35662 20.6308 6.92421 20.2508 6.61994C19.8708 6.31566 19.3929 6.16042 18.9067 6.1833C18.4204 6.20618 17.9592 6.40562 17.6095 6.74423C17.2598 7.08285 17.0455 7.53739 17.007 8.02265C16.9684 8.50791 17.1081 8.99058 17.4 9.38018L14.9625 12.4267C14.7278 12.2978 14.4695 12.2173 14.2031 12.1901C13.9367 12.1628 13.6675 12.1894 13.4115 12.2681C13.1556 12.3469 12.918 12.4763 12.713 12.6486C12.508 12.8209 12.3397 13.0326 12.218 13.2712L9.993 12.3442C10.0195 12.0217 9.96732 11.6975 9.84098 11.3996C9.71463 11.1017 9.51788 10.8389 9.26761 10.6337C9.01735 10.4286 8.72104 10.2872 8.40412 10.2218C8.0872 10.1563 7.75913 10.1688 7.44808 10.258C7.13703 10.3473 6.85228 10.5107 6.61827 10.7342C6.38427 10.9577 6.20799 11.2347 6.10458 11.5413C6.00117 11.848 5.97371 12.1751 6.02455 12.4947C6.0754 12.8143 6.20303 13.1168 6.3965 13.3762L4 16.2862V4.18018C4 3.90403 3.77614 3.68018 3.5 3.68018C3.22386 3.68018 3 3.90403 3 4.18018V20.6802ZM9 12.1802C9 12.4454 8.89464 12.6997 8.70711 12.8873C8.51957 13.0748 8.26522 13.1802 8 13.1802C7.73478 13.1802 7.48043 13.0748 7.29289 12.8873C7.10536 12.6997 7 12.4454 7 12.1802C7 11.915 7.10536 11.6606 7.29289 11.4731C7.48043 11.2855 7.73478 11.1802 8 11.1802C8.26522 11.1802 8.51957 11.2855 8.70711 11.4731C8.89464 11.6606 9 11.915 9 12.1802ZM14 15.1802C14.2652 15.1802 14.5196 15.0748 14.7071 14.8873C14.8946 14.6997 15 14.4454 15 14.1802C15 13.915 14.8946 13.6606 14.7071 13.4731C14.5196 13.2855 14.2652 13.1802 14 13.1802C13.7348 13.1802 13.4804 13.2855 13.2929 13.4731C13.1054 13.6606 13 13.915 13 14.1802C13 14.4454 13.1054 14.6997 13.2929 14.8873C13.4804 15.0748 13.7348 15.1802 14 15.1802ZM20 8.18018C20 8.44539 19.8946 8.69975 19.7071 8.88728C19.5196 9.07482 19.2652 9.18018 19 9.18018C18.7348 9.18018 18.4804 9.07482 18.2929 8.88728C18.1054 8.69975 18 8.44539 18 8.18018C18 7.91496 18.1054 7.66061 18.2929 7.47307C18.4804 7.28553 18.7348 7.18018 19 7.18018C19.2652 7.18018 19.5196 7.28553 19.7071 7.47307C19.8946 7.66061 20 7.91496 20 8.18018Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 40 40"
      fill="none"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path d="M30 10L10 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10L30 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InformationCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200s200-89.72 200-200S366.28 56 256 56Zm0 82a26 26 0 1 1-26 26a26 26 0 0 1 26-26Zm48 226h-88a16 16 0 0 1 0-32h28v-88h-16a16 16 0 0 1 0-32h32a16 16 0 0 1 16 16v104h28a16 16 0 0 1 0 32Z"
      ></path>
    </svg>
  );
}

export function OptionsVertical(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"
      ></path>
    </svg>
  );
}
export function ExcelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g clipPath="url(#clip0_7013_54854)">
        <path
          d="M21.26 12.8175H17.4431V10.9091H21.26V12.8175ZM21.26 13.908H17.4431V15.8165H21.26V13.908ZM21.26 4.91113H17.4431V6.81955H21.26V4.91113ZM21.26 7.9101H17.4431V9.81852H21.26V7.9101ZM21.26 16.907H17.4431V18.8155H21.26V16.907V16.907ZM23.8964 20.6694C23.7873 21.2365 23.1057 21.2501 22.6504 21.2692H14.1715V23.7229H12.4785L0 21.5418V2.46018L12.5521 0.276367H14.1715V2.44926H22.3587C22.8195 2.46834 23.3266 2.43562 23.7273 2.71096C24.0082 3.11446 23.9809 3.62704 24 4.09049L23.9891 18.2838C23.9755 19.0772 24.0627 19.8869 23.8964 20.6694ZM9.99745 16.3918C9.24502 14.865 8.47894 13.3491 7.72917 11.8224C8.47073 10.3365 9.20142 8.84526 9.92934 7.35393C9.31045 7.38393 8.69156 7.42209 8.07544 7.46573C7.61466 8.58623 7.07756 9.67677 6.7177 10.8355C6.38236 9.74221 5.93798 8.68982 5.53177 7.62384C4.93195 7.65655 4.33214 7.69199 3.73238 7.72743C4.36486 9.12337 5.03831 10.5001 5.65172 11.9042C4.92923 13.2674 4.25311 14.6496 3.55242 16.021C4.14947 16.0455 4.74656 16.0701 5.34361 16.0782C5.76895 14.9931 6.29784 13.949 6.66863 12.8421C7.00125 14.0308 7.56558 15.1295 8.02908 16.2663C8.68612 16.3127 9.34041 16.3536 9.99745 16.3918ZM22.6997 3.74409H14.1715V4.91113H16.3526V6.81955H14.1715V7.9101H16.3526V9.81852H14.1715V10.9091H16.3526V12.8175H14.1715V13.908H16.3526V15.8165H14.1715V16.907H16.3526V18.8155H14.1715V20.0763H22.6997V3.74409Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7013_54854">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const MApiDeveloperIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g
      id="streamline:programming-browser-code-2-code-browser-tags-angle-programming-bracket"
      clipPath="url(#clip0_9166_415)"
    >
      <g id="Group">
        <path
          id="Vector"
          d="M18.3577 0.714355H2.64342C1.85444 0.714355 1.21484 1.35395 1.21484 2.14293V17.8572C1.21484 18.6462 1.85444 19.2858 2.64342 19.2858H18.3577C19.1467 19.2858 19.7863 18.6462 19.7863 17.8572V2.14293C19.7863 1.35395 19.1467 0.714355 18.3577 0.714355Z"
          stroke={props.fill ?? "#BFBFBF"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M1.21484 5.71436H19.7863M6.92913 10.0001L4.78627 12.1429L6.92913 14.2858M14.7863 10.0001L16.9291 12.1429L14.7863 14.2858M9.78627 15.0001L11.9291 8.5715"
          stroke={props.fill ?? "#BFBFBF"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_9166_415">
        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export const MApiOverviewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <g id="fontisto:world-o" clipPath="url(#clip0_9166_421)">
      <path
        id="Vector"
        d="M24 12V11.994C24 8.443 22.454 5.254 19.999 3.061L19.987 3.051C19.9567 3.01831 19.9228 2.98913 19.886 2.964L19.884 2.963C17.7036 1.04853 14.8996 -0.00465513 11.998 0.000999213C8.966 0.000999213 6.198 1.127 4.088 2.985L4.101 2.974C4.07557 2.99329 4.05212 3.01506 4.031 3.039C2.76253 4.16219 1.7472 5.54309 1.05226 7.08829C0.357326 8.63349 -0.00134689 10.3087 3.80066e-06 12.003C3.80066e-06 15.553 1.544 18.742 3.997 20.936L4.009 20.946C4.04077 20.982 4.07631 21.0145 4.115 21.043L4.117 21.044C6.29684 22.9556 9.09869 24.0073 11.998 24.002C14.9109 24.0065 17.7247 22.9451 19.909 21.018L19.896 21.029C21.1865 19.9071 22.2209 18.521 22.9293 16.9647C23.6377 15.4083 24.0035 13.718 24.002 12.008V12.001L24 12ZM19.538 19.805C18.9436 19.3242 18.3043 18.9015 17.629 18.543L17.564 18.511C18.177 16.744 18.546 14.707 18.581 12.588V12.572H22.842C22.6983 15.3134 21.5184 17.8978 19.541 19.802L19.538 19.805ZM12.572 18.3C13.855 18.369 15.054 18.651 16.16 19.11L16.088 19.084C15.202 21.104 13.955 22.492 12.572 22.797V18.3ZM12.572 17.156V12.572H17.44C17.4014 14.4703 17.0722 16.3514 16.464 18.15L16.503 18.019C15.2615 17.5087 13.941 17.2171 12.6 17.157L12.573 17.156H12.572ZM12.572 11.428V6.844C13.9492 6.78115 15.305 6.47967 16.579 5.953L16.5 5.982C17.055 7.601 17.396 9.467 17.44 11.407V11.428H12.572ZM12.572 5.7V1.205C13.955 1.51 15.202 2.892 16.088 4.918C15.054 5.348 13.855 5.629 12.601 5.699L12.572 5.7ZM15.426 1.7C16.6044 2.09303 17.7064 2.68566 18.684 3.452L18.661 3.434C18.218 3.782 17.721 4.11 17.197 4.395L17.141 4.423C16.7176 3.42373 16.1354 2.49947 15.417 1.686L15.426 1.697V1.7ZM11.426 1.208V5.7C10.1925 5.63707 8.97891 5.3631 7.838 4.89L7.91 4.916C8.8 2.896 10.045 1.509 11.428 1.204L11.426 1.208ZM6.858 4.42C6.31593 4.12836 5.79943 3.79149 5.314 3.413L5.338 3.431C6.28714 2.68715 7.35472 2.1084 8.496 1.719L8.572 1.696C7.87242 2.48743 7.30238 3.38451 6.883 4.354L6.858 4.42ZM11.428 6.843V11.427H6.56C6.604 9.466 6.945 7.6 7.539 5.85L7.5 5.981C8.74106 6.49047 10.0608 6.78175 11.401 6.842L11.428 6.843ZM11.428 12.571V17.155C10.0508 17.2179 8.69504 17.5193 7.421 18.046L7.5 18.017C6.945 16.399 6.604 14.532 6.56 12.592V12.571H11.428ZM11.428 18.299V22.794C10.045 22.489 8.798 21.107 7.912 19.081C8.946 18.651 10.145 18.371 11.399 18.301L11.428 18.299ZM8.578 22.299C7.39996 21.9071 6.29794 21.3159 5.32 20.551L5.344 20.569C5.787 20.221 6.284 19.893 6.808 19.608L6.864 19.58C7.28389 20.5797 7.86606 21.5031 8.587 22.313L8.578 22.303V22.299ZM17.142 19.579C17.722 19.894 18.219 20.221 18.686 20.586L18.662 20.568C17.7129 21.3118 16.6453 21.8906 15.504 22.28L15.428 22.303C16.1276 21.5119 16.6976 20.6152 17.117 19.646L17.142 19.581V19.579ZM22.842 11.428H18.581C18.5503 9.35895 18.1933 7.30771 17.523 5.35L17.564 5.488C18.2704 5.11606 18.9392 4.67668 19.561 4.176L19.537 4.194C21.5103 6.09103 22.6906 8.66584 22.84 11.399L22.841 11.427L22.842 11.428ZM4.462 4.195C5.038 4.663 5.685 5.092 6.371 5.457L6.436 5.489C5.823 7.256 5.454 9.293 5.419 11.412V11.428H1.157C1.3007 8.6866 2.48065 6.10221 4.458 4.198L4.462 4.195ZM1.158 12.572H5.419C5.44966 14.641 5.80672 16.6923 6.477 18.65L6.436 18.512C5.685 18.911 5.039 19.34 4.439 19.824L4.463 19.806C2.48974 17.909 1.30937 15.3342 1.16 12.601L1.159 12.573L1.158 12.572Z"
        fill={props.fill ?? "#BFBFBF"}
      />
    </g>
    <defs>
      <clipPath id="clip0_9166_421">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const MApiApiKeyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <g id="uil:key-skeleton">
      <path
        id="Vector"
        d="M20.9996 4.40994L21.7096 3.70994C21.8979 3.52164 22.0037 3.26624 22.0037 2.99994C22.0037 2.73364 21.8979 2.47824 21.7096 2.28994C21.5213 2.10164 21.2659 1.99585 20.9996 1.99585C20.7333 1.99585 20.4779 2.10164 20.2896 2.28994L18.8896 3.69994L16.0596 6.52994L9.74961 12.8299C8.71565 12.1478 7.46528 11.8737 6.24078 12.0608C5.01628 12.248 3.90483 12.883 3.12179 13.8428C2.33876 14.8026 1.9399 16.0189 2.00248 17.2561C2.06507 18.4932 2.58466 19.6631 3.46056 20.539C4.33647 21.4149 5.50633 21.9345 6.74346 21.9971C7.9806 22.0597 9.19693 21.6608 10.1568 20.8778C11.1166 20.0947 11.7516 18.9833 11.9387 17.7588C12.1258 16.5343 11.8518 15.2839 11.1696 14.2499L16.7596 8.64994L18.8796 10.7799C18.9728 10.8725 19.0834 10.9458 19.205 10.9957C19.3265 11.0455 19.4567 11.071 19.5881 11.0705C19.7195 11.07 19.8496 11.0437 19.9708 10.993C20.092 10.9423 20.202 10.8682 20.2946 10.7749C20.3872 10.6817 20.4605 10.5711 20.5104 10.4496C20.5602 10.328 20.5856 10.1978 20.5852 10.0664C20.5847 9.93501 20.5584 9.80499 20.5076 9.68378C20.4569 9.56256 20.3828 9.45252 20.2896 9.35994L18.1696 7.23994L19.5896 5.82994L20.2896 6.52994C20.3822 6.62318 20.4922 6.69727 20.6134 6.74798C20.7347 6.79869 20.8647 6.82503 20.9961 6.8255C21.1275 6.82596 21.2577 6.80054 21.3792 6.75069C21.5008 6.70083 21.6114 6.62752 21.7046 6.53494C21.7978 6.44236 21.8719 6.33232 21.9226 6.2111C21.9734 6.08989 21.9997 5.95987 22.0002 5.82848C22.0006 5.69708 21.9752 5.56688 21.9254 5.44531C21.8755 5.32374 21.8022 5.21318 21.7096 5.11994L20.9996 4.40994ZM6.99961 19.9999C6.40626 19.9999 5.82624 19.824 5.3329 19.4944C4.83955 19.1647 4.45503 18.6962 4.22797 18.148C4.00091 17.5998 3.9415 16.9966 4.05725 16.4147C4.17301 15.8327 4.45873 15.2982 4.87829 14.8786C5.29785 14.4591 5.83239 14.1733 6.41434 14.0576C6.99628 13.9418 7.59948 14.0012 8.14766 14.2283C8.69584 14.4554 9.16437 14.8399 9.49402 15.3332C9.82366 15.8266 9.99961 16.4066 9.99961 16.9999C9.99961 17.7956 9.68354 18.5587 9.12093 19.1213C8.55832 19.6839 7.79526 19.9999 6.99961 19.9999Z"
        fill={props.fill ?? "#BFBFBF"}
      />
    </g>
  </svg>
);

export const MApiSecurityIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <g id="mdi:security">
      <path
        id="Vector"
        d="M12 12H19C18.47 16.11 15.72 19.78 12 20.92V12H5V6.3L12 3.19M12 1L3 5V11C3 16.55 6.84 21.73 12 23C17.16 21.73 21 16.55 21 11V5L12 1Z"
        fill={props.fill ?? "#BFBFBF"}
      />
    </g>
  </svg>
);

export const MApiPolicyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="iconoir:privacy-policy">
      <g id="Group">
        <path
          id="Vector"
          d="M20 12V5.749C20.0001 5.67006 19.9845 5.59189 19.9543 5.51896C19.9241 5.44603 19.8798 5.37978 19.824 5.324L16.676 2.176C16.5636 2.06345 16.4111 2.00014 16.252 2H4.6C4.44087 2 4.28826 2.06321 4.17574 2.17574C4.06321 2.28826 4 2.44087 4 2.6V21.4C4 21.5591 4.06321 21.7117 4.17574 21.8243C4.28826 21.9368 4.44087 22 4.6 22H13M8 10H16M8 6H12M8 14H11"
          stroke={props.fill ?? "#BFBFBF"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M16 2V5.4C16 5.55913 16.0632 5.71174 16.1757 5.82426C16.2883 5.93679 16.4409 6 16.6 6H20M19.992 15.125L22.548 15.774C22.814 15.842 23.001 16.084 22.993 16.358C22.821 22.116 19.5 23 19.5 23C19.5 23 16.179 22.116 16.007 16.358C16.0039 16.2246 16.0463 16.0941 16.1271 15.988C16.208 15.8819 16.3226 15.8064 16.452 15.774L19.008 15.125C19.331 15.043 19.669 15.043 19.992 15.125Z"
          stroke={props.fill ?? "#BFBFBF"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export const MApiDashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <g id="fluent:data-pie-24-regular">
      <path
        id="Vector"
        d="M10.25 4.25C10.4489 4.25 10.6397 4.32902 10.7803 4.46967C10.921 4.61032 11 4.80109 11 5V13H19C19.1812 13 19.3563 13.0656 19.4929 13.1848C19.6295 13.3039 19.7184 13.4684 19.743 13.648L19.75 13.75C19.75 18.72 15.72 22.25 10.75 22.25C8.36305 22.25 6.07387 21.3018 4.38604 19.614C2.69821 17.9261 1.75 15.6369 1.75 13.25C1.75 8.28 5.28 4.25 10.25 4.25ZM9.5 5.787L9.291 5.811C5.601 6.281 3.25 9.433 3.25 13.25C3.25 15.2391 4.04018 17.1468 5.4467 18.5533C6.85322 19.9598 8.76088 20.75 10.75 20.75C14.567 20.75 17.718 18.398 18.19 14.709L18.212 14.5H10.25C10.0688 14.5 9.89366 14.4344 9.75707 14.3152C9.62048 14.1961 9.53165 14.0316 9.507 13.852L9.5 13.75V5.787ZM13.25 1.75C15.6369 1.75 17.9261 2.69821 19.614 4.38604C21.3018 6.07387 22.25 8.36305 22.25 10.75C22.25 10.9489 22.171 11.1397 22.0303 11.2803C21.8897 11.421 21.6989 11.5 21.5 11.5H13.25C13.0511 11.5 12.8603 11.421 12.7197 11.2803C12.579 11.1397 12.5 10.9489 12.5 10.75V2.5C12.5 2.30109 12.579 2.11032 12.7197 1.96967C12.8603 1.82902 13.0511 1.75 13.25 1.75ZM14 3.287V10H20.712L20.689 9.791C20.4764 8.14679 19.7254 6.61925 18.5531 5.44694C17.3807 4.27463 15.8532 3.52356 14.209 3.311L14 3.287Z"
        fill={props.fill ?? "#BFBFBF"}
      />
    </g>
  </svg>
);

export const DeleteIcon2 = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <g id="fluent:delete-28-regular">
      <path
        id="Vector"
        d="M9.85603 5.14293H14.1417C14.1417 4.57461 13.916 4.02956 13.5141 3.6277C13.1122 3.22583 12.5672 3.00007 11.9989 3.00007C11.4306 3.00007 10.8855 3.22583 10.4837 3.6277C10.0818 4.02956 9.85603 4.57461 9.85603 5.14293ZM8.57031 5.14293C8.57031 4.23361 8.93154 3.36154 9.57452 2.71856C10.2175 2.07558 11.0896 1.71436 11.9989 1.71436C12.9082 1.71436 13.7803 2.07558 14.4232 2.71856C15.0662 3.36154 15.4275 4.23361 15.4275 5.14293H20.7846C20.9551 5.14293 21.1186 5.21066 21.2392 5.33122C21.3597 5.45177 21.4275 5.61529 21.4275 5.78578C21.4275 5.95628 21.3597 6.11979 21.2392 6.24035C21.1186 6.36091 20.9551 6.42864 20.7846 6.42864H19.6617L18.6186 18.9455C18.5427 19.8561 18.1274 20.7049 17.455 21.3236C16.7827 21.9423 15.9023 22.2857 14.9886 22.2858H9.00917C8.09545 22.2857 7.21512 21.9423 6.54274 21.3236C5.87037 20.7049 5.45506 19.8561 5.37917 18.9455L4.33603 6.42864H3.21317C3.04267 6.42864 2.87916 6.36091 2.7586 6.24035C2.63804 6.11979 2.57031 5.95628 2.57031 5.78578C2.57031 5.61529 2.63804 5.45177 2.7586 5.33122C2.87916 5.21066 3.04267 5.14293 3.21317 5.14293H8.57031ZM6.6606 18.8384C6.70962 19.4276 6.97828 19.9768 7.4133 20.3772C7.84832 20.7777 8.41793 21 9.00917 21.0001H14.9886C15.5798 21 16.1495 20.7777 16.5845 20.3772C17.0195 19.9768 17.2882 19.4276 17.3372 18.8384L18.3726 6.42864H5.62603L6.6606 18.8384ZM10.0703 9.42864C10.2408 9.42864 10.4043 9.49637 10.5249 9.61693C10.6454 9.73749 10.7132 9.901 10.7132 10.0715V17.3572C10.7132 17.5277 10.6454 17.6912 10.5249 17.8118C10.4043 17.9323 10.2408 18.0001 10.0703 18.0001C9.89982 18.0001 9.7363 17.9323 9.61574 17.8118C9.49519 17.6912 9.42746 17.5277 9.42746 17.3572V10.0715C9.42746 9.901 9.49519 9.73749 9.61574 9.61693C9.7363 9.49637 9.89982 9.42864 10.0703 9.42864ZM14.5703 10.0715C14.5703 9.901 14.5026 9.73749 14.382 9.61693C14.2615 9.49637 14.098 9.42864 13.9275 9.42864C13.757 9.42864 13.5934 9.49637 13.4729 9.61693C13.3523 9.73749 13.2846 9.901 13.2846 10.0715V17.3572C13.2846 17.5277 13.3523 17.6912 13.4729 17.8118C13.5934 17.9323 13.757 18.0001 13.9275 18.0001C14.098 18.0001 14.2615 17.9323 14.382 17.8118C14.5026 17.6912 14.5703 17.5277 14.5703 17.3572V10.0715Z"
        fill={props.fill ?? "#BFBFBF"}
      />
    </g>
  </svg>
);

export function PencilWithLined(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
      className={cn("h-5 w-5", props.className)}
    >
      <path
        fill="currentColor"
        d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3l-362.7 362.6l-88.9 15.7l15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
      ></path>
    </svg>
  );
}

export function ArrowDownSFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="m12 16l-6-6h12l-6 6Z"></path>
    </svg>
  );
}

export function PhBookOpen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M224 48h-64a40 40 0 0 0-32 16a40 40 0 0 0-32-16H32a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h64a24 24 0 0 1 24 24a8 8 0 0 0 16 0a24 24 0 0 1 24-24h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16M96 192H32V64h64a24 24 0 0 1 24 24v112a39.81 39.81 0 0 0-24-8m128 0h-64a39.81 39.81 0 0 0-24 8V88a24 24 0 0 1 24-24h64Z"
      ></path>
    </svg>
  );
}
