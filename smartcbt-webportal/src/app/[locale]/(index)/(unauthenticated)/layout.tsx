"use client";

import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { Fragment, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const t = useTranslations("common");

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  const BackgroundImage = () => {
    return <Image src="/images/login-bg.png" alt="Register DASTA" style={{ objectFit: "cover" }} fill />;
  };

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative flex-grow">
        <div className="inset-0 -z-10 hidden md:fixed md:block">{BackgroundImage()}</div>
        <div className="relative grid w-full grid-flow-row grid-cols-1 pt-14 md:h-full md:grid-flow-col md:grid-cols-2 md:items-center">
          <div className="relative col-span-1 px-20 py-10 md:py-0">
            <div className="absolute left-0 right-0 top-0 -z-10 block h-full w-full md:hidden">{BackgroundImage()}</div>
            <div className="flex flex-col items-center gap-4 text-white md:gap-10">
              <h1 className="text-6xl font-semibold drop-shadow-md md:text-9xl"> {t("global.dasta")}</h1>
              <p className="text-center text-lg font-medium md:text-3xl">{t("global.slogan")}</p>
            </div>
          </div>
          <div className="col-span-1 h-full w-full bg-white">{children}</div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}
