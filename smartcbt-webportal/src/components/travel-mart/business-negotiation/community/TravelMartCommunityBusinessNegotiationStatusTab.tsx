import { ReactElement, useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export enum TabSlug {
  request = "request",
  waitingAccept = "waiting-accept",
  open = "open",
  history = "history",
}

export function selectedIndex(tab: string) {
  switch (tab) {
    case TabSlug.waitingAccept:
      return 1;
    case TabSlug.open:
      return 2;
    case TabSlug.history:
      return 3;
    default:
      return 0;
  }
}

export function slugForIndex(index: number) {
  switch (index) {
    case 1:
      return TabSlug.waitingAccept;
    case 2:
      return TabSlug.open;
    case 3:
      return TabSlug.history;
    default:
      return TabSlug.request;
  }
}

interface TravelMartCommunityBusinessNegotiationStatusTabProps {
  items?: { key: string; name: string; count: number; content?: JSX.Element }[];
}

export const TravelMartCommunityBusinessNegotiationStatusTab = (
  props: TravelMartCommunityBusinessNegotiationStatusTabProps
) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();

  const { items } = props;
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    if (!tab) {
      setSelected(0);
      return;
    }
    setSelected(selectedIndex(tab));
  }, [tab]);

  return (
    <Tab.Group
      as={"div"}
      selectedIndex={selected ?? 0}
      onChange={(selectedIndex) => {
        router.push(`/travel-mart/business-negotiation/community?tab=${slugForIndex(selectedIndex)}`);
      }}
    >
      <Tab.List className="flex items-start">
        {items?.map((m) => (
          <Tab key={m.key}>
            {({ selected }) => (
              <div className="pr-4">
                <div
                  className={cn(
                    "flex h-12 items-center gap-2 whitespace-nowrap",
                    selected ? "border-b-2 border-smart-cbt-green text-smart-cbt-green" : "text-smart-cbt-dark-grey"
                  )}
                >
                  {m.name}
                  {m.count > 0 && (
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full bg-smart-cbt-light-grey p-2 text-xs",
                        selected ? "text-smart-cbt-green" : "text-smart-cbt-dark-grey hover:text-smart-cbt-green"
                      )}
                    >
                      {m.count}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-5">
        {items?.map((item, i) => (
          <Tab.Panel unmount={false} key={i} className="flex flex-1 ">
            {item.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
