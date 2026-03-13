"use client";

import { useTranslations } from "next-intl";

type ProfileMainProps = {};

const ProfileMain = (props: ProfileMainProps) => {
  const t = useTranslations("common");

  return (
    <div className="m-8 flex flex-col gap-4 rounded-2xl border border-smart-cbt-green bg-white p-6 md:p-10">
      <div className="text-2xl font-medium text-smart-cbt-dark-green">{t("profile.menus.profile")}</div>
    </div>
  );
};

export default ProfileMain;
