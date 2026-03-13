import { cn } from "@/utils/cn";

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex h-full items-center justify-center", className)}>
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green"/>
    </div>
  );
};

export default LoadingSpinner;
