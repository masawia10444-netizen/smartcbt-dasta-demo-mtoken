"use client";

import { Menu } from "@/constants/menus";
import { useTranslations } from "next-intl";
import { XCircleIcon } from "./Icon";
import { MenuItem } from "./NavigationBar";

interface MenusProps {
  onToggle: () => void;
  isMobileOpened: boolean;
  session: any;
  menus: Menu[];
}

export const MobileMenu = ({ onToggle, isMobileOpened, menus, session }: MenusProps) => {
  const t = useTranslations("common");

  return (
    <div>
      {isMobileOpened && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="fixed left-auto right-0 z-50 h-screen w-[400px] bg-smart-cbt-green">
            <div className="px-16 py-10">
              <div className="flex flex-col gap-10">
                <button className="flex justify-end" onClick={onToggle}>
                  <XCircleIcon className="h-8 w-8 fill-smart-cbt-green text-white" />
                </button>
                <ul className="flex list-none flex-col items-start gap-6">
                  {menus?.map((m) => (
                    <MenuItem key={m.key} type={m.key} title={t(m.title)} session={session} href={m.href} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
