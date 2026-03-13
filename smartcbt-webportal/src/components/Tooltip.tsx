import { cn } from "@/utils/cn";
import { Transition } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";

interface TooltipProps {
  text: string;
  className?: string;
  textContainerClassName?: string;
  textClassName?: string;
}
function Tooltip(props: PropsWithChildren<TooltipProps>) {
  const { text, children, className, textContainerClassName, textClassName } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("relative inline-block", className)} onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
      {children}
      <Transition show={isOpen}>
        <div
          className={cn(
            "absolute left-1/2 z-40 mt-2 -translate-x-1/2 transform rounded-md bg-black/80 px-2 py-1 text-white shadow-lg",
            textContainerClassName
          )}
        >
          <label className={cn("break-words text-sm text-white", textClassName)}>{text}</label>
        </div>
      </Transition>
    </div>
  );
}

export default Tooltip;
