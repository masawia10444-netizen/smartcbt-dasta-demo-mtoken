import { MApiDashboardIcon } from "@/components/Icon";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("common");

  return (
    <>
      <div className="mb-3 flex items-center gap-x-3 text-2xl font-medium text-smart-cbt-dark-green">
        <MApiDashboardIcon fill="#005E38" />
        {t("manageApi.menus.dashboard")}
      </div>
      <div className="flex text-smart-cbt-very-dark-grey"></div>
    </>
  );
}
