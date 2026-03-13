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
      name: t("travelMart.training.title"),
      slug: "travel-mart/training",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full w-full flex-grow">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-4 pt-20 lg:px-8">
          <div className="md:container md:mx-auto">
            <div className="px-4 lg:px-10">
              <BreadCrumb links={breadCrumbLinks} />
            </div>
            <div className="mt-4 min-h-full rounded-2xl border-smart-cbt-green bg-white lg:mx-10 lg:border">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
