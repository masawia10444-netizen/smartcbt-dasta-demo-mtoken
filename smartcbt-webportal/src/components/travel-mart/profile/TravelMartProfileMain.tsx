"use client";

import { ArrowLeftIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import NavigationBar from "@/components/NavigationBar";
import { useSession } from "@/components/context-provider/AuthProvider";
import { cn } from "@/utils/cn";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";
import TravelMartProfileLayout from "./TravelMartProfileLayout";

type TravelMartProfileMainProps = {};

const TravelMartProfileMain = (props: TravelMartProfileMainProps) => {
  const t = useTranslations("common");

  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  const { session } = useSession();

  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS").map((r) => r.role);

  useEffect(() => {
    if (roles?.includes("community")) {
      setSelectedIndex(0);
    } else if (roles?.includes("organization")) {
      setSelectedIndex(1);
    } else if (roles?.includes("guide")) {
      setSelectedIndex(2);
    } else if (roles?.includes("community") && roles?.includes("guide")) {
      setSelectedIndex(0);
    } else if (roles?.includes("community") && roles?.includes("organization")) {
      setSelectedIndex(0);
    } else if (roles?.includes("organization") && roles?.includes("guide")) {
      setSelectedIndex(1);
    } else if (roles?.includes("community") && roles?.includes("organization") && roles?.includes("guide")) {
      setSelectedIndex(0);
    }
  }, []);

  const tabs = [
    {
      title: t("travelMart.profile.tabs.community"),
      role: "community",
      context: (
        <TravelMartProfileLayout isMobileOpened={isMobileOpened} toggleMobileMenu={toggleMobileMenu} type="community" />
      ),
    },
    {
      title: t("travelMart.profile.tabs.organization"),
      role: "organization",
      context: (
        <TravelMartProfileLayout
          isMobileOpened={isMobileOpened}
          toggleMobileMenu={toggleMobileMenu}
          type="entrepreneur"
        />
      ),
    },
    {
      title: t("travelMart.profile.tabs.guide"),
      role: "guide",
      context: (
        <TravelMartProfileLayout isMobileOpened={isMobileOpened} toggleMobileMenu={toggleMobileMenu} type="guide" />
      ),
    },
  ];

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-screen">
        <div className="relative h-full w-full">
          <div className="min-h-full px-6 py-20  md:bg-[#F5FFF9] lg:px-8">
            <div className="md:container md:mx-auto">
              <div className="flex items-start">
                <NextLink
                  className="items-start no-underline md:pl-0"
                  href={"/travel-mart"}
                  icon={<ArrowLeftIcon />}
                  intent={"whiteButton"}
                  size={"medium"}
                >
                  {t("global.back")}
                </NextLink>
              </div>
              <div className="min-h-full rounded-2xl border-smart-cbt-green bg-white md:border">
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                  <div className="flex flex-grow flex-col">
                    <Tab.List className="flex items-center justify-between overflow-x-hidden rounded-t-2xl border-b border-smart-cbt-border-green">
                      {tabs.map((value, index) => {
                        const isHaveRole = roles?.includes(value.role);
                        return (
                          <Tab
                            key={index}
                            className={cn(
                              "flex w-full items-center justify-center gap-2 whitespace-nowrap  p-4 text-center text-2xl font-medium text-smart-cbt-dark-green",
                              index == selectedIndex
                                ? "border-b-4 border-smart-cbt-green bg-smart-cbt-light-green text-smart-cbt-green"
                                : "text-smart-cbt-dark-grey",
                              !isHaveRole &&
                                "cursor-not-allowed border-b-4 border-smart-cbt-light-grey bg-smart-cbt-light-grey"
                            )}
                            disabled={!isHaveRole}
                          >
                            {value.title}
                          </Tab>
                        );
                      })}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      {tabs.map((value, index) => (
                        <Tab.Panel key={index} className={cn("h-full rounded-b-2xl bg-white p-3")}>
                          <div className="flex flex-col justify-items-center gap-8 ">
                            <div className="flex flex-col gap-12">{value.context}</div>
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </div>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TravelMartProfileMain;
