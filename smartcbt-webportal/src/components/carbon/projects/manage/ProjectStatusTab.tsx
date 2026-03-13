import { ReactNode, useState } from "react";

import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { cn } from "@/utils/cn";
import { StatusCounts } from "@/utils/helper";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";

interface CarbonProjectStatusProps {
  selectedIndex?: number;
  statusCounts: StatusCounts;
  children: ReactNode;
  onChange: (index: number, status?: PROJECT_STATUS) => void;
}

export const CarbonProjectStatusTab = (props: CarbonProjectStatusProps) => {
  const { children, onChange, statusCounts, selectedIndex } = props;
  const t = useTranslations("common");

  const items = [
    {
      key: "totalCount",
      status: undefined,
      name: t("project.manage.tabs.status.all"),
    },
    { key: "draft", status: PROJECT_STATUS.DRAFT, name: t("project.manage.tabs.status.draft") },
    {
      key: "pending_for_approval",
      status: PROJECT_STATUS.PENDING_FOR_APPROVAL,
      name: t("project.manage.tabs.status.waitingForApprove"),
    },
    {
      key: "approved",
      status: PROJECT_STATUS.APPROVAL,
      name: t("project.manage.tabs.status.approved"),
    },
    {
      key: "rejected",
      status: PROJECT_STATUS.REJECTED,
      name: t("project.manage.tabs.status.rejected"),
    },
    {
      key: "request_to_delete",
      status: PROJECT_STATUS.REQUEST_TO_DELETE,
      name: t("project.manage.tabs.status.pendingDelete"),
    },
  ];
  const [menuItems, setMenuItems] = useState(items);

  return (
    <Tab.Group
      as={"div"}
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
                <div>
                  <p
                    className={cn(
                      "flex h-12 items-center gap-2 whitespace-nowrap border-b hover:text-smart-cbt-green",
                      selected
                        ? " border-smart-cbt-green text-smart-cbt-green"
                        : "border-white text-smart-cbt-dark-grey"
                    )}
                  >
                    {status.name}
                    {count > 0 && (
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full bg-smart-cbt-light-grey p-2 text-xs",
                          selected ? "bg-smart-cbt-light-green text-smart-cbt-green" : ""
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </p>
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
