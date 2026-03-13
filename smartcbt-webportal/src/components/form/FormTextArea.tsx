import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { TextareaHTMLAttributes, forwardRef } from "react";

const formTextArea = cva(
  "w-full rounded-lg border border-smart-cbt-medium-grey px-2 py-3 placeholder-gray-300 focus:border-smart-cbt-very-dark-grey focus:outline-none",
  {
    variants: {
      intent: {
        displayOnly: "resize-none border-none bg-transparent",
        primary: "bg-white text-black",
        disabled: "cursor-not-allowed bg-smart-cbt-light-grey text-black",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof formTextArea> & {
    disabled?: boolean;
  };

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, intent, disabled, ...props }, ref) => {
    return <textarea disabled={disabled} className={cn(formTextArea({ intent }), className)} ref={ref} {...props} />;
  }
);

FormTextArea.displayName = "TextArea";
