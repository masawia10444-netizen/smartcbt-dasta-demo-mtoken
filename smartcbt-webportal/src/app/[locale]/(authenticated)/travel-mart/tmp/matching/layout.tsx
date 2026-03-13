"use client";

import BreadCrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
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
      name: t("travelMart.main.menus.matching"),
      slug: "travel-mart/tmp/matching",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full w-full flex-grow">
        <div className="flex min-h-full flex-1 flex-col px-6 pb-4 pt-20 md:bg-[#F5FFF9] lg:px-8">
          <div className="md:container md:mx-auto">
            <div className="px-4 lg:px-10">
              <BreadCrumb links={breadCrumbLinks} />
            </div>
            <div className="mt-4 min-h-full rounded-2xl border-smart-cbt-green bg-white md:border lg:mx-10">
              {children}
            </div>
            <Footer className="relative pt-8 md:relative" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
