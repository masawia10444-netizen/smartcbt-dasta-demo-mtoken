import { cn } from "@/utils/cn";
import { PropsWithChildren } from "react";

type FormLabelProps = PropsWithChildren<{ className?: string; required?: boolean }>;

export const FormLabel = ({ className, children, required }: FormLabelProps) => (
  <p className={cn("mb-2 text-smart-cbt-dark-grey", className)}>
    {children} {required && <span className="text-smart-cbt-red"> *</span>}
  </p>
);
