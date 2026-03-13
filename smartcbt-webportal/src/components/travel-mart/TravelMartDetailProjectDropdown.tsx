import { Menu, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { Fragment } from "react";
import { ArrowDownSFill } from "../Icon";

type TravelMartDetailProjectDropdownProps = {
  title: string;
};

const TravelMartDetailProjectDropdown = (props: TravelMartDetailProjectDropdownProps) => {
  const { title } = props;
  const t = useTranslations("common");

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium text-white">
          <div className="relative flex flex-row items-center gap-2">
            <div className="text-sm font-medium hover:cursor-pointer">{title}</div>
            <ArrowDownSFill className="h-5 w-5" />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right gap-10 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Menu.Item>
              <Link
                href={"/travel-mart/schedule-events/dasta-level-up-pitching-2566"}
                className="text-smart-cbt-dark-green"
              >
                {t("travelMart.main.menus.event")}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href={"/travel-mart/business-support/project-handbook"} className="text-smart-cbt-dark-green">
                {t("travelMart.main.menus.documents")}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href={"/travel-mart/training"} className="text-smart-cbt-dark-green">
                {t("travelMart.main.menus.training")}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href={"/travel-mart/main-pitching/project-list"} className="text-smart-cbt-dark-green">
                {t("travelMart.main.menus.sell")}
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TravelMartDetailProjectDropdown;
