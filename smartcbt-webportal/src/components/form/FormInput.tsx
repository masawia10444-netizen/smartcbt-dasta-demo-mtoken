import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/utils/cn";

const formInput = cva(
  "h-10 w-full rounded-lg border border-smart-cbt-medium-grey px-2 py-2 placeholder-gray-300 focus:border-smart-cbt-very-dark-grey focus:outline-none disabled:bg-smart-cbt-light-grey",
  {
    variants: {
      intent: {
        primary: "bg-white text-black",
        disabled: "cursor-not-allowed bg-smart-cbt-light-grey text-black",
        displayOnly: "border-0 bg-white",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof formInput> & {
    disabled?: boolean;
  };

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, intent, size, disabled, ...props }, ref) => {
    return <input disabled={disabled} className={cn(formInput({ intent }), className)} ref={ref} {...props} />;
  }
);

FormInput.displayName = "FormInput";
