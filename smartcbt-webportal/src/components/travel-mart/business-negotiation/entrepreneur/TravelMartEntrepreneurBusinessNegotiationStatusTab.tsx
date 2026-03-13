import { ReactNode, useEffect, useState } from "react";

import { BusinessMatchingCount } from "@/models/travel-mart/travel-mart-business";
import { cn } from "@/utils/cn";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";

interface TravelMartEntrepreneurBusinessNegotiationStatusTabProps {
  countList: BusinessMatchingCount;
  selectedIndex?: number;
  children: ReactNode;
  onChange: (status: string, index: number) => void;
}

export const TravelMartEntrepreneurBusinessNegotiationStatusTab = (
  props: TravelMartEntrepreneurBusinessNegotiationStatusTabProps
) => {
  const { children, onChange, countList, selectedIndex } = props;
  const t = useTranslations("common");

  const items = [
    {
      key: "ready",
      name: t("businessNegotiation.entrepreneur.tabs.status.requested"),
      count: countList.request ?? 0,
    },
    {
      key: "appointmentRequested",
      name: t("businessNegotiation.entrepreneur.tabs.status.appointmentRequested"),
      count: countList.waiting_accept ?? 0,
    },
    {
      key: "completed",
      name: t("businessNegotiation.entrepreneur.tabs.status.completed"),
      count: countList.open ?? 0,
    },
    {
      key: "history",
      name: t("businessNegotiation.entrepreneur.tabs.status.history"),
      count: countList.history ?? 0,
    },
  ];
  const [menuItems, setMenuItems] = useState(items);

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
