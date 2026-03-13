import { cn } from "@/utils/cn";

interface FieldErrorProps {
  className?: string;
  children: React.ReactNode;
}

export const FieldError = ({ className, children, ...props }: FieldErrorProps) => {
  return (
    <p className={cn("pt-1 text-xs text-smart-cbt-red", className)} {...props}>
      {children}
    </p>
  );
};
