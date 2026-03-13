import Image from "@/components/image";
import { CommunityDetail } from "@/models/travel-mart/travel-mart-community";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

const mediaIcon = "/images/travel-mart/community/medal-icon.png";
const fileIcon = "/images/travel-mart/community/file-icon.png";
const youtubeIcon = "/images/travel-mart/community/youtube-icon.png";
const facebookIcon = "/images/travel-mart/community/facebook-icon.png";
const instagramIcon = "/images/travel-mart/community/instagram-icon.png";
const tiktokIcon = "/images/travel-mart/community/tiktok-icon.png";
const otherPlatformIcon = "/images/travel-mart/community/other-platform-icon.png";

type PresentationLayoutProps = {
  icon: string;
  text: string;
  link: string;
  textClassName?: string;
};

const PresentationLayout = (props: PresentationLayoutProps) => {
  const { icon, text, link, textClassName } = props;

  // check has https
  const fullLink = link.indexOf("https:") > -1 ? link : `https://${link}`;

  return (
    <Link href={fullLink} target="_blank">
      <div className="flex flex-row items-center gap-4">
        <Image width={64} height={64} src={icon} alt="" />
        <div className={cn("underline", textClassName)}>{text}</div>
      </div>
    </Link>
  );
};

type CommunityDetailTravelInfoProps = {
  community: CommunityDetail;
};

export const CommunityDetailTravelInfo = (props: CommunityDetailTravelInfoProps) => {
  const t = useTranslations("common");
  const { community } = props;
  const { tourism_info, presentations, awards, attraction_type, community_way_of_life } = community;

  const touristCapacity =
    tourism_info?.tourist_accomodate_min != null && tourism_info?.tourist_accomodate_max != null
      ? `${tourism_info?.tourist_accomodate_min} - ${tourism_info?.tourist_accomodate_max}`
      : tourism_info?.tourist_accomodate_min ?? tourism_info?.tourist_accomodate_max ?? null;

  const address =
    [
      tourism_info?.address_info?.address_1,
      tourism_info?.address_info?.address_2,
      tourism_info?.address_info?.subdistrict,
      tourism_info?.address_info?.district,
      tourism_info?.address_info?.province,
      tourism_info?.address_info?.postal_code,
    ]
      .filter((item) => item != null)
      .join(" ") || null;

  const hasPresentations =
    presentations?.files?.[0].url ||
    presentations?.video ||
    presentations?.facebook ||
    presentations?.instagram ||
    presentations?.tiktok ||
    presentations?.other;

  return (
    <>
      <div className="flex flex-col gap-8 px-4 py-9 md:container md:mx-auto">
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("community.detail.tourismData")}</h1>
        <div className="flex flex-col gap-2">
          <p className="text-x font-bold text-cyan-600">{t("community.detail.maximumTouristCapacity")}</p>
          <p>{touristCapacity != null ? t("community.detail.touristCapacity", { number: touristCapacity }) : "-"}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-x font-bold text-cyan-600">{t("community.detail.recommendedSeason")}</p>
          <p>
            {tourism_info?.traveling_recommended_during && tourism_info.traveling_recommended_during.length > 0
              ? tourism_info?.traveling_recommended_during?.map((value) => value.title).join(", ")
              : "-"}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-x font-bold text-cyan-600">{t("community.detail.communityHighlights")}</p>
          <p>{community.highlight}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-x font-bold text-cyan-600">{t("community.detail.address")}</p>
          <p>{address ? address : "-"}</p>
        </div>
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("community.detail.standardsAndAwards")}</h1>
        <div className="flex flex-col gap-4">
          {awards && awards.length > 0 ? (
            awards?.map((value, index) => (
              <div key={index} className="flex flex-row gap-2">
                <div className="relative h-6 w-6">
                  <Image fill src={mediaIcon} alt={"Media"} style={{ objectFit: "cover" }} />
                </div>
                <p className="text-x font-bold text-cyan-600">{value.title}</p>
              </div>
            ))
          ) : (
            <div>-</div>
          )}
        </div>
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("community.detail.attractionType")}</h1>
        <div className="flex flex-col gap-2">
          {attraction_type && attraction_type.length > 0 ? (
            attraction_type?.map((value, index) => <p key={index}>{value.title}</p>)
          ) : (
            <div>-</div>
          )}
        </div>
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("community.detail.lifestyle")}</h1>
        <div className="flex flex-col gap-2 md:ml-4">
          <div className="flex flex-row gap-4 md:gap-6">
            <p className="max-w-24 text-right font-bold text-cyan-600">{t("community.detail.lifestyle")}:</p>
            <p>{community_way_of_life?.way_of_life ?? "-"}</p>
          </div>
          <div className="flex flex-row gap-4 md:gap-6">
            <p className="max-w-24 text-right font-bold text-cyan-600">{t("community.detail.language")}:</p>
            <p>{community_way_of_life?.local_language ?? "-"}</p>
          </div>
          <div className="flex flex-row gap-4 md:gap-6">
            <p className="max-w-24 text-right font-bold text-cyan-600">{t("community.detail.food")}:</p>
            <p>{community_way_of_life?.food_menus ?? "-"}</p>
          </div>
          <div className="flex flex-row gap-4 md:gap-6">
            <p className="max-w-24 text-right font-bold text-cyan-600">{t("community.detail.product")}:</p>
            <p>{community_way_of_life?.products ?? "-"}</p>
          </div>
        </div>
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("community.detail.presentationMedia")}</h1>
        <div className="flex flex-wrap gap-x-16 gap-y-12">
          {presentations?.files?.[0].url && (
            <PresentationLayout
              icon={fileIcon}
              text={t("community.detail.pdf")}
              link={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${presentations?.files?.[0].url}`}
              textClassName="text-smart-cbt-dark-green"
            />
          )}
          {presentations?.video && (
            <PresentationLayout
              icon={youtubeIcon}
              text={t("community.detail.youtube")}
              link={presentations?.video}
              textClassName="text-smart-cbt-red"
            />
          )}
          {presentations?.facebook && (
            <PresentationLayout
              icon={facebookIcon}
              text={t("community.detail.facebook")}
              link={presentations?.facebook}
              textClassName="text-smart-cbt-blue"
            />
          )}
          {presentations?.instagram && (
            <PresentationLayout
              icon={instagramIcon}
              text={t("community.detail.instagram")}
              link={presentations?.instagram}
              textClassName="text-smart-cbt-yellow"
            />
          )}
          {presentations?.tiktok && (
            <PresentationLayout
              icon={tiktokIcon}
              text={t("community.detail.tiktok")}
              link={presentations?.tiktok}
              textClassName="text-smart-cbt-black"
            />
          )}
          {presentations?.other && (
            <PresentationLayout
              icon={otherPlatformIcon}
              text={t("community.detail.otherPlatform")}
              link={presentations?.other}
              textClassName="text-smart-cbt-grey"
            />
          )}
          {!hasPresentations && <div>-</div>}
        </div>
      </div>
    </>
  );
};
