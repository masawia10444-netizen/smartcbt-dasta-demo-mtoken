"use client";

import { useSession } from "@/components/context-provider/AuthProvider";
import MainMenuGridItem from "@/components/main-menu/MainMenuGridItem";
import { useTranslations } from "next-intl";

export const registerMenus = [
  {
    title: "travelMart.register.menus.community",
    image: "/images/travel-mart/register/community.png",
    key: "community",
    href: "/travel-mart/business-negotiation/community",
  },
  {
    title: "travelMart.register.menus.entrepreneur",
    image: "/images/travel-mart/register/entrepreneur.png",
    key: "entrepreneur",
    href: "/travel-mart/business-negotiation/entrepreneur",
  },
];

const BusinessNegotiationPortal = () => {
  const t = useTranslations("common");

  const { session } = useSession();
  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS").map((r) => r.role);
  const userCommunities = session?.user?.communities;

  return (
    <div className="px-20 py-5 md:py-20">
      <h1 className="pb-6 text-center text-4xl font-medium text-smart-cbt-dark-green md:pb-20 md:text-6xl">
        {t("businessNegotiation.postalTitle")}
      </h1>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-8 3xl:gap-10">
        {registerMenus.map((m) => {
          return (
            <MainMenuGridItem
              className="flex-1 text-smart-cbt-dark-green"
              key={m.title}
              title={m.title}
              href={
                m.key == "community" && roles?.includes("community") && !userCommunities
                  ? "/travel-mart/community-infos/create"
                  : m.href
              }
              image={m.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BusinessNegotiationPortal;
