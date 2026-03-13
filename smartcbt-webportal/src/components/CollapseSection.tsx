import { DeleteIcon, TriangleUpIcon } from "@/components/Icon";
import { cn } from "@/utils/cn";
import { Disclosure } from "@headlessui/react";
import { PropsWithChildren } from "react";

interface CollapseSectionProps {
  title: string;
  className?: string;
  defaultOpen?: boolean;
  showDelete?: boolean;
  onClickRemoveButton?: () => void;
}

const CollapseSection = (props: PropsWithChildren<CollapseSectionProps>) => {
  const { className, defaultOpen, showDelete, onClickRemoveButton, title, children } = props;
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className={cn("bg-white py-2 hover:cursor-pointer", className)}>
            <div className="flex items-center justify-between gap-2 hover:cursor-pointer">
              <div>
                <TriangleUpIcon
                  className={cn(
                    "inline h-3 w-3 rotate-90 transform text-smart-cbt-dark-green",
                    open ? "rotate-180 transform" : ""
                  )}
                />{" "}
                <label className="cursor-pointer font-medium ">{title}</label>
              </div>
              {showDelete && (
                <DeleteIcon
                  className="min-w-[20px] text-smart-cbt-red hover:cursor-pointer"
                  onClick={() => onClickRemoveButton && onClickRemoveButton()}
                />
              )}
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="flex h-full flex-col pl-6">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default CollapseSection;
