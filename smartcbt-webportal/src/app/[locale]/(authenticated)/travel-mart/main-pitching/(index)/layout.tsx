"use client";

import BreadCrumb from "@/components/Breadcrumb";
import NavigationBar from "@/components/NavigationBar";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const t = useTranslations("common");

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "travel-mart",
    },
    {
      name: t("travelMart.main.menus.sell"),
      slug: "travel-mart/main-pitching",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full w-full flex-grow">
        <div className="mt-20 md:container md:mx-auto">
          <BreadCrumb links={breadCrumbLinks} />
          <div className="mt-10 px-10 md:px-20">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
