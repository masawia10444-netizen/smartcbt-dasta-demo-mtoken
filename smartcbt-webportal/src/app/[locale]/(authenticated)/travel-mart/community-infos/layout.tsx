"use client";

import NavigationBar from "@/components/NavigationBar";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  const t = useTranslations("common");

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full pt-14">{children}</div>
    </>
  );
}
