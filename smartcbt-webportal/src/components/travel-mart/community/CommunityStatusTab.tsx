import { ReactNode, useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";

export type CommunityStatusTab = {
  key: string;
  name: string;
  count: number;
};

interface CommunityStatusTabProps {
  tabs: CommunityStatusTab[];
  selectedIndex: number;
  children: ReactNode;
  onChange: (status: string, index: number) => void;
}

export const CommunityStatusTab = (props: CommunityStatusTabProps) => {
  const { tabs, selectedIndex, children, onChange } = props;
  const [menuItems, setMenuItems] = useState<CommunityStatusTab[]>(tabs);
  const t = useTranslations("common");

  useEffect(() => {}, [selectedIndex]);

  return (
    <Tab.Group
      as={"div"}
      onChange={(selectedIndex) => {
        onChange(menuItems[selectedIndex].key, selectedIndex);
      }}
    >
      <Tab.List className="flex items-start">
        {menuItems.map((status) => (
          <Tab key={status.key}>
            {({ selected }) => (
              <div className="pr-4">
                <div
                  className={cn(
                    "flex h-12 items-center gap-2 whitespace-nowrap",
                    selected ? "border-b-2 border-smart-cbt-green text-smart-cbt-green" : "text-smart-cbt-dark-grey"
                  )}
                >
                  {status.name}
                  {status.count > 0 && (
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full bg-smart-cbt-light-grey p-2 text-xs",
                        selected ? "text-smart-cbt-green" : "text-smart-cbt-dark-grey hover:text-smart-cbt-green"
                      )}
                    >
                      {status.count}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <div className="mt-8">{children}</div>
    </Tab.Group>
  );
};
