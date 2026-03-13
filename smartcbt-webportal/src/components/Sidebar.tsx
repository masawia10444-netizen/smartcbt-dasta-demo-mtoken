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
    <nav className="fixed z-30 min-h-screen w-64 pt-14">
      <div className="flex flex-col">
        {menuItems.map((value, index) => {
          return !value.disabled ? (
            value.href ? (
              <Link key={index} href={value.href}>
                <div
                  className={cn(
                    "flex flex-row gap-4 p-4",
                    isSelected(value.href)
                      ? "bg-[#EDFFF4] text-base text-smart-cbt-dark-green"
                      : "text-smart-cbt-medium-grey"
                  )}
                >
                  {value.icon}
                  {value.label}
                </div>
              </Link>
            ) : (
              <div
                className="flex cursor-pointer flex-row gap-4 p-4 text-base text-smart-cbt-medium-grey"
                onClick={value.onClick}
                key={index}
              >
                {value.icon}
                {value.label}
              </div>
            )
          ) : (
            <div
              className="flex cursor-not-allowed flex-row gap-4 bg-smart-cbt-light-grey p-4 text-base text-smart-cbt-medium-grey"
              key={index}
            >
              {value.icon}
              {value.label}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
