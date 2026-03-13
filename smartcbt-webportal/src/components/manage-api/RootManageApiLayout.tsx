"use client";

import {
  DeleteIcon2,
  MApiApiKeyIcon,
  MApiDeveloperIcon,
  MApiOverviewIcon,
  MApiPolicyIcon,
  MApiSecurityIcon,
} from "@/components/Icon";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "@/components/Sidebar";
import { ManageApiContext } from "@/contexts/App.context";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { getIsOnBoarding } from "@/utils/manage-api";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RootManageApiLayout({ children, profile }: { children: React.ReactNode; profile?: Profile }) {
  const t = useTranslations("common");
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const isOnboarding = getIsOnBoarding(profile?.roles) ?? false;

  const menuItems = [
    {
      key: "mapi-developer",
      href: `/mapi/developer`,
      label: t("manageApi.menus.developer"),
      icon: <MApiDeveloperIcon />,
    },
    {
      key: "mapi-overview",
      href: `/mapi/developer/overview`,
      label: t("manageApi.menus.overview"),
      icon: <MApiOverviewIcon />,
    },
    {
      key: "mapi-apiKey",
      href: `/mapi/developer/apiKey`,
      label: t("manageApi.menus.apiKey"),
      icon: <MApiApiKeyIcon />,
    },
    {
      key: "mapi-security",
      href: `/mapi/developer/security`,
      label: t("manageApi.menus.security"),
      icon: <MApiSecurityIcon />,
    },
    {
      key: "mapi-policy",
      href: `/mapi/developer/policy`,
      label: t("manageApi.menus.policy"),
      icon: <MApiPolicyIcon />,
    },
    // {
    //   key: "mapi-dashboard",
    //   href: `/mapi/developer/dashboard`,
    //   label: t("manageApi.menus.dashboard"),
    //   icon: <MApiDashboardIcon />,
    // },
    {
      key: "mapi-removeAccount",
      href: `/profile/remove-account`,
      label: t("manageApi.menus.removeAccount"),
      icon: <DeleteIcon2 />,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <ManageApiContext.Provider value={{ isOnboarding }}>
      <SideBar menuItems={menuItems} />
      <div className="pl-64">
        <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
        <div className="relative min-h-screen bg-smart-cbt-border-green pb-4 pt-14">
          <div className="m-8 flex flex-col gap-4 rounded-2xl border border-smart-cbt-green bg-white p-6 md:p-10">
            {children}
          </div>
        </div>
      </div>
    </ManageApiContext.Provider>
  );
}
