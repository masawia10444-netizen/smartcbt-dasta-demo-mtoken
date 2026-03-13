"use client";

import BreadCrumb from "@/components/Breadcrumb";
import NavigationBar from "@/components/NavigationBar";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
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
      name: t("menus.contactUs"),
      slug: "travel-mart/contact-us",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative flex-grow">
        <div className="fixed bottom-0 right-0 h-[683px] w-[683px] opacity-25">
          <Image
            src="/images/travel-mart/contact-us/contact-us-bg.png"
            fill
            alt="DASTA"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative h-full w-full ">
          <div className="flex min-h-full flex-1 flex-col px-6 pb-4 pt-20 lg:px-8">
            <div className="md:container md:mx-auto">
              <div className="px-4 lg:px-10">
                <BreadCrumb links={breadCrumbLinks} />
              </div>
              <div className="mt-4 min-h-full rounded-2xl lg:mx-10">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
