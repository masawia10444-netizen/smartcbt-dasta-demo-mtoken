import { cn } from "@/utils/cn";
import * as React from "react";

export interface FlexDivProps {
  className?: string;
  children?: React.ReactNode;
}

export type FlexDivElementProps = {
  withOutLabel?: boolean;
  withOutSubLabel?: boolean;
} & FlexDivProps;

const Flex = ({ className, ...props }: FlexDivProps) => {
  return <div className={cn("", className)} {...props} />;
};
const FlexDivContainer = ({ className, children, ...props }: FlexDivProps) => {
  return (
    <div className={cn("my-1 flex flex-col flex-wrap gap-1 lg:flex-row lg:items-start lg:gap-4", className)} {...props}>
      {children}
    </div>
  );
};
const FlexDivElement = ({ className, children, withOutLabel, withOutSubLabel, ...props }: FlexDivElementProps) => {
  return (
    <div className={cn("flex-1", className)} {...props}>
      {(withOutLabel || withOutSubLabel) && (
        <div className={cn("mt-2 block lg:mb-2 lg:mt-4 lg:h-6", withOutSubLabel && "lg:my-2 lg:h-5")} />
      )}
      {children}
    </div>
  );
};
const FlexInline = ({ className, children, ...props }: FlexDivProps) => {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {children}
    </div>
  );
};

Flex.displayName = "Flex";
FlexDivContainer.displayName = "FlexDivContainer";
FlexDivElement.displayName = "FlexDivElement";
FlexInline.displayName = "FlexInline";

export default Object.assign(Flex, {
  Container: FlexDivContainer,
  Element: FlexDivElement,
  Inline: FlexInline,
});
