import { FilePdfIcon, LogoYoutubeIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { getCmsMedia } from "@/utils/cms/api-helpers";
import { CommunityRecommend } from "@/utils/cms/cms-api-adapter";
import { cn } from "@/utils/cn";
import * as _ from "lodash";
import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes } from "react";

interface TravelMartCommunityRecommendHeaderMediaCellProps extends HtmlHTMLAttributes<HTMLDivElement> {
  community: CommunityRecommend;
}

export const TravelMartCommunityRecommendMediaCell = (props: TravelMartCommunityRecommendHeaderMediaCellProps) => {
  const t = useTranslations("common");
  const { community } = props;

  const pdfLink = _.get(community?.link, "presentation_asset", null);
  const youtubeLink = _.get(community?.link, "video_url", null);

  return (
    <div className="flex flex-row gap-2">
      <NextLink
        className={cn(
          "w-fit",
          pdfLink
            ? "border-smart-cbt-blue-2 text-smart-cbt-blue-2"
            : "cursor-not-allowed border-smart-cbt-medium-grey bg-smart-cbt-light-grey text-smart-cbt-medium-grey"
        )}
        intent={"whiteButtonBordered"}
        icon={<FilePdfIcon className="h-5 w-5" />}
        href={`${getCmsMedia(pdfLink ?? "")}`}
      >
        {t("recommend.community.pdf")}
      </NextLink>
      <NextLink
        className={cn(
          "w-fit",
          youtubeLink
            ? "border-smart-cbt-red text-smart-cbt-red"
            : "cursor-not-allowed border-smart-cbt-medium-grey bg-smart-cbt-light-grey text-smart-cbt-medium-grey"
        )}
        intent={"whiteButtonBordered"}
        icon={<LogoYoutubeIcon className="h-5 w-5" />}
        href={youtubeLink ?? "/"}
      >
        {t("recommend.community.youtube")}
      </NextLink>
    </div>
  );
};
