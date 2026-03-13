import { Menu, Transition } from "@headlessui/react";
import { useLocale } from "next-intl";

import { cn } from "@/utils/cn";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import { Fragment } from "react";
import { ArrowDownSFill } from "./Icon";

export default function ChangeLanguages() {
  const path = usePathname();
  const locale = useLocale();

  const language = [
    { key: "th", label: "TH" },
    { key: "en", label: "EN" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium text-white">
          <div className="relative flex flex-row items-center gap-2">
            <div className="text-sm font-medium hover:cursor-pointer">{locale == "th" ? "TH" : "EN"}</div>
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
        <Menu.Items className="absolute right-0 mt-2 origin-top-right gap-10 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="flex w-20 flex-col divide-gray-200 text-smart-cbt-very-dark-grey">
            {language.map((l) => {
              return (
                <Menu.Item key={l.key}>
                  <Link
                    locale={l.key}
                    href={path}
                    className={cn(
                      "rounded-md px-4 py-4 text-sm font-medium group-[.bg-transparent]:text-smart-cbt-dark-green",
                      l.key == locale && "bg-smart-cbt-light-grey"
                    )}
                  >
                    {l.label}
                  </Link>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
