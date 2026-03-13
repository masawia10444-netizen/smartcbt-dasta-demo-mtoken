import { EyeIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes } from "react";

interface ActivityActionCellProps extends HtmlHTMLAttributes<HTMLDivElement> {
  activity: any;
}

export const ActivityActionCell = (props: ActivityActionCellProps) => {
  const { activity } = props;
  const t = useTranslations("common");

  return (
    <div className="flex flex-row gap-2">
      <NextLink intent={"whiteButtonBordered"} icon={<EyeIcon />} href={`/travel-mart/community-infos/${activity.id}`}>
        {t("community.info.view")}
      </NextLink>
    </div>
  );
};
