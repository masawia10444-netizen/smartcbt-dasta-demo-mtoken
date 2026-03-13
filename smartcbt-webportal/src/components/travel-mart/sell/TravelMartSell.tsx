"use client";

import { ArrowRightIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { BusinessPitching } from "@/utils/cms/adapters/website/travel-mart/pitchings";
import { useTranslations } from "next-intl";
import TravelMartPitchingGridItem from "./TravelMartPitchingGridItem";

export type FeaturedCommunity = {
  id: number;
  title: string | null;
  image: {
    src: string | null;
    title: string | null;
    alt: string | null;
  };
  link: string | null;
};

type TravelMartSellProps = {
  businessPitching: BusinessPitching;
};

const TravelMartSell = ({ businessPitching }: TravelMartSellProps) => {
  const t = useTranslations("common");

  const featuredCommunities = businessPitching?.featured_communities?.slice(0, 3) ?? [];

  return (
    <div className="flex flex-col gap-6 text-smart-cbt-dark-green">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl md:text-3xl">{t("travelMart.sell.title")}</h1>
        {/* <NextLink
          href="/travel-mart/register/portal"
          intent={"primaryButton"}
          className="w-fit-content h-12  w-full justify-center rounded-full sm:min-w-[10rem] sm:max-w-fit"
        >
          {t("menus.registerTravelMart")}
        </NextLink> */}
      </div>
      <span>
        {t.rich("travelMart.sell.description", {
          h3: (chunk) => <h3 className="text-lg font-medium md:text-xl">{chunk}</h3>,
          ul: (chunk) => <ul className="relative ml-6 mt-4 list-outside list-disc space-y-2 indent-0">{chunk}</ul>,
          li: (chunk) => <li>{chunk}</li>,
        })}
      </span>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between md:flex-row">
          <h3 className="text-lg font-medium md:text-xl">{t("travelMart.sell.event")}</h3>
          <NextLink
            href="/travel-mart/main-pitching/project-list"
            className="max-w-fit rounded-full"
            intent={"primaryOutlineButton"}
            size={"medium"}
          >
            {t("travelMart.sell.allProjects")}
            <ArrowRightIcon />
          </NextLink>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCommunities?.map((c: FeaturedCommunity) => (
            <TravelMartPitchingGridItem
              key={c.id}
              image={c.image.src ?? ""}
              alt={c.image.alt ?? ""}
              title={c.title ?? ""}
              link={`/travel-mart/communities/${c.id}/detail`}
              province=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelMartSell;
