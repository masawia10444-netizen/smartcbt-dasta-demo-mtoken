import { cn } from "@/utils/cn";
import { PropsWithChildren } from "react";

type CarbonFootprintOverviewCardProps = { className?: string } & PropsWithChildren;

const CarbonFootprintOverviewCard = ({ className, children }: CarbonFootprintOverviewCardProps) => {
  return <div className={cn("rounded-2xl bg-white p-2 shadow-lg", className)}>{children}</div>;
};

export default CarbonFootprintOverviewCard;
