import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

import { ButtonHTMLAttributes } from "react";

const button = cva("rounded-md text-center text-base capitalize", {
  variants: {
    intent: {
      primary: "bg-smart-cbt-green text-white",
      secondary:
        "border border-smart-cbt-green bg-white text-smart-cbt-green hover:bg-smart-cbt-green hover:text-white",
      tertiary: "border border-smart-cbt-medium-grey text-black",
      text: "bg-transparent text-smart-cbt-green",
      danger:
        "bg-smart-cbt-red text-white disabled:cursor-not-allowed disabled:bg-smart-cbt-light-grey disabled:text-smart-cbt-medium-grey",
      dangerOutline:
        "border border-smart-cbt-red bg-white text-smart-cbt-red hover:bg-smart-cbt-red hover:text-white disabled:cursor-not-allowed disabled:bg-smart-cbt-light-grey disabled:text-smart-cbt-medium-grey",
      disabled: "cursor-not-allowed bg-smart-cbt-light-grey text-smart-cbt-medium-grey",
    },
    size: {
      small: "min-w-fit-content h-10 p-2",
      medium: "w-fit-content h-12 w-full sm:min-w-[20rem] sm:max-w-fit",
      responsive: "h-12 flex-1 p-2",
    },
    disabled: {
      true: "cursor-not-allowed bg-smart-cbt-light-grey text-smart-cbt-medium-grey",
    }
  },
  compoundVariants: [
    { intent: "primary", size: "medium" },
    { intent: "secondary", size: "medium" },
    { intent: "text", size: "medium" },
    { intent: "tertiary", size: "medium" },
    { intent: "disabled", size: "medium" },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  disabled?: boolean;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
}

export const Button = ({ className, intent, size, disabled, icon, iconRight, ...props }: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      disabled={disabled}
      className={cn(button({ intent, size, disabled }), className)}
      {...props}
    >
      {icon || iconRight ? (
        <div className="line-clamp-1 flex items-center justify-center gap-2 truncate  whitespace-nowrap px-2">
          {icon}
          {props.children}
          {iconRight}
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};
