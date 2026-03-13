import { MApiPolicyIcon } from "@/components/Icon";
import { Collection } from "@/utils/cms/cms-type";
import { useTranslations } from "next-intl";

type PolicyProps = { data?: Collection["policies"][] };

export default function Policy({ data }: PolicyProps) {
  const t = useTranslations("common");

  return (
    <>
      <div className="mb-3 flex items-center gap-x-3 text-2xl font-medium text-smart-cbt-dark-green">
        <MApiPolicyIcon fill="#005E38" />
        {t("manageApi.menus.policy")}
      </div>
      <div
        className="flex text-smart-cbt-very-dark-grey"
        dangerouslySetInnerHTML={{ __html: data?.[0]?.detail ?? "" }}
      />
    </>
  );
}
