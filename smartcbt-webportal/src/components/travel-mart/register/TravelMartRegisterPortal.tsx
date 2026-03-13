"use client";

import { useSession } from "@/components/context-provider/AuthProvider";
import MainMenuGridItem from "@/components/main-menu/MainMenuGridItem";
import { useTranslations } from "next-intl";

const TravelMartRegisterPortal = () => {
  const t = useTranslations("common");

  const { session } = useSession();
  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS").map((r) => r.role);
  const userCommunities = session?.user?.communities;

  const registerMenus = [
    {
      title: "travelMart.register.menus.community",
      image: "/images/travel-mart/register/community.png",
      key: "community",
      // href: "/travel-mart/register/community",
      href: roles?.includes("community") ? "/travel-mart/profile" : "/travel-mart/register/community",
    },
    {
      title: "travelMart.register.menus.entrepreneur",
      image: "/images/travel-mart/register/entrepreneur.png",
      key: "entrepreneur",
      href: roles?.includes("organization") ? "/travel-mart/profile" : "/travel-mart/register/entrepreneur",
      // href: "/travel-mart/register/entrepreneur",
    },
    {
      title: "travelMart.register.menus.guide",
      image: "/images/travel-mart/register/guide.png",
      key: "guide",
      href: roles?.includes("guide") ? "/travel-mart/profile" : "/travel-mart/register/guide",
    },
  ];

  return (
    <div className="px-20 py-5 md:py-20">
      <h1 className="pb-6 text-center text-4xl font-medium text-smart-cbt-dark-green md:pb-20 md:text-6xl">
        {t("travelMart.register.menus.title")}
      </h1>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-8 3xl:gap-10">
        {registerMenus.map((m) => {
          return (
            <MainMenuGridItem
              className="flex-1 text-smart-cbt-dark-green"
              key={m.title}
              title={m.title}
              href={m.href}
              image={m.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TravelMartRegisterPortal;
