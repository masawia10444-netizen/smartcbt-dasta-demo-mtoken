import { ReactNode, useEffect, useState } from "react";

import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { cn } from "@/utils/cn";
import { StatusCounts } from "@/utils/helper";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";

interface ProjectStatusProps {
  statusCounts: StatusCounts;
  children: ReactNode;
  status: {
    name: string;
    key?: string;
    status?: PROJECT_STATUS;
  }[];
  onChange: (index: number, status?: PROJECT_STATUS) => void;
  selectedIndex?: number;
}

export const ProjectStatusTab = (props: ProjectStatusProps) => {
  const { children, onChange, statusCounts, selectedIndex } = props;
  const [selected, setSelected] = useState(selectedIndex || 0);
  const t = useTranslations("common");
  const [menuItems, setMenuItems] = useState(props.status);
  // TODO: fetch project count from api not sure how to do it yet maybe we can pass it from parent
  useEffect(() => {}, [selectedIndex]);

  const titleView = (title: string, isSelected: boolean) => {
    return (
      <div
        className={cn(
          "flex h-12 items-center gap-2 whitespace-nowrap border-b hover:text-smart-cbt-green",
          isSelected ? " border-smart-cbt-green text-smart-cbt-green" : "border-white text-smart-cbt-dark-grey"
        )}
      >
        {title}
      </div>
    );
  };

  const badgeView = (number: number, isSelected: boolean) => {
    return (
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full bg-smart-cbt-light-grey p-2 text-xs",
          isSelected ? "bg-smart-cbt-light-green text-smart-cbt-green" : ""
        )}
      >
        {number}
      </span>
    );
  };

  return (
    <Tab.Group
      as={"div"}
      className="w-full"
      selectedIndex={selectedIndex}
      onChange={(selectedIndex) => {
        onChange(selectedIndex, menuItems[selectedIndex].status);
      }}
    >
      <Tab.List className="mb-4 flex items-start gap-6 border-b border-smart-cbt-light-grey">
        {menuItems.map((status) => (
          <Tab key={status.key} className="outline-none">
            {({ selected }) => {
              const count = statusCounts[status.key as keyof StatusCounts];
              return (
                <div className="flex flex-row items-center gap-2">
                  {titleView(status.name, selected)}
                  {count > 0 && badgeView(count, selected)}
                </div>
              );
            }}
          </Tab>
        ))}
      </Tab.List>
      {children}
    </Tab.Group>
  );
};
