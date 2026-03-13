"use client";

import NavigationBar from "@/components/NavigationBar";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useState } from "react";
import Background from "/public/images/user-manual/background.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  const t = useTranslations("common");

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <div className="relative h-screen">
      <div className="fixed bottom-0 right-0 h-[683px] w-[683px]">
        <Image quality={100} priority src={Background} fill alt="Background image" style={{ objectFit: "cover" }} />
      </div>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full w-full md:container md:mx-auto">{children}</div>
    </div>
  );
}
