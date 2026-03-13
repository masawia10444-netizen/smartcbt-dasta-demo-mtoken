import { useTranslations } from "next-intl";
import { useState } from "react";
import NavigationBar from "./NavigationBar";

export default function Loading() {
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  const t = useTranslations("common");

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <div className="relative h-screen">
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green"></div>
      </div>
    </div>
  );
}
