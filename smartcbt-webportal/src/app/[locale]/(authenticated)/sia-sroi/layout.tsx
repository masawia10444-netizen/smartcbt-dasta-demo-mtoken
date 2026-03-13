"use client";

import NavigationBar from "@/components/NavigationBar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full pb-6 pt-20 md:container md:mx-auto md:px-4">{children}</div>
    </>
  );
}
