"use client";

import { cn } from "@/utils/cn";
import Link from "next-intl/link";
import { usePathname } from "next/navigation";

type SideBarProps = {
  menuItems: {
    key: string;
    href?: string;
    label: string;
    disabled?: boolean;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
};

export default function SideBar({ menuItems }: SideBarProps) {
  const pathname = usePathname();

  const isSelected = (href: string) => {
    if (!href) return false;
    const regexPattern = new RegExp(`^(/[^/]+)?${href.replace(/\//g, "\\/")}$`);
    return pathname === href || regexPattern.test(pathname);
  };

  return (
    <nav className="fixed z-30 lg:min-h-screen w-full lg:w-64 top-14 lg:top-0 lg:pt-14 bg-white shadow-md lg:shadow-none overflow-x-auto custom-scrollbar">
      <div className="flex flex-row lg:flex-col min-w-max w-max lg:w-full">
        {menuItems.map((value, index) => {
          return !value.disabled ? (
            value.href ? (
              <Link key={index} href={value.href}>
                <div
                  className={cn(
                    "flex flex-row gap-2 md:gap-4 p-3 md:p-4 items-center",
                    isSelected(value.href)
                      ? "bg-[#EDFFF4] text-base text-smart-cbt-dark-green"
                      : "text-smart-cbt-medium-grey"
                  )}
                >
                  {value.icon}
                  <span className="whitespace-nowrap">{value.label}</span>
                </div>
              </Link>
            ) : (
              <div
                className="flex cursor-pointer flex-row gap-2 md:gap-4 p-3 md:p-4 text-base items-center text-smart-cbt-medium-grey whitespace-nowrap"
                onClick={value.onClick}
                key={index}
              >
                {value.icon}
                <span>{value.label}</span>
              </div>
            )
          ) : (
            <div
              className="flex cursor-not-allowed flex-row gap-2 md:gap-4 bg-smart-cbt-light-grey p-3 md:p-4 text-base items-center text-smart-cbt-medium-grey whitespace-nowrap"
              key={index}
            >
              {value.icon}
              <span>{value.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
