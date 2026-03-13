"use client";

import { getCommunitiesByQuery } from "@/app/[locale]/(authenticated)/travel-mart/communities/action";
import { CommunityRecommend } from "@/utils/cms/cms-api-adapter";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import TravelMartCommunityRecommendHeader from "../recommend/recommend/TravelMartCommunityRecommendHeader";
import TravelMartPitchingGridItem from "./TravelMartPitchingGridItem";

type TravelMartSellProjectListProps = {};

const TravelMartSellProjectList = ({}: TravelMartSellProjectListProps) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const region = searchParams.get("region");
  const province = searchParams.get("province");
  const typeEvent = searchParams.get("typeEvent");

  const [data, setData] = useState<CommunityRecommend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [forceRefreshKey, setForceRefreshKey] = useState<number | string>();

  // Filter
  const [search, setSearch] = useState<string | null>(null);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);

  useEffect(() => {
    if (q) setSearch(q);
    if (region) setRegionId(Number(region));
    if (province) setProvinceId(Number(province));
    if (typeEvent) setType(typeEvent);
  }, [q, region, province, typeEvent]);

  useEffect(() => {
    const renderCommunities = async () => {
      try {
        setIsLoading(true);
        const response = await getCommunitiesByQuery(search, provinceId, type, regionId);
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setData([]);
        setIsLoading(false);
      }
    };
    renderCommunities();
  }, [forceRefreshKey, provinceId, regionId, type, search]);

  return (
    <Fragment>
      <TravelMartCommunityRecommendHeader
        q={q}
        province={province}
        region={region}
        typeEvent={typeEvent}
        onSearch={(value) => {
          setSearch(value.search);
          setProvinceId(value.provinceId);
          setType(value.type);
          setRegionId(value.communityId);
          setForceRefreshKey(value);
        }}
      />
      {isLoading ? (
        <div className="flex h-[100vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green"></div>
        </div>
      ) : (
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.length != 0 &&
            data?.map((c: any) => (
              <TravelMartPitchingGridItem
                key={c?.id}
                image={c?.featured_image?.src ?? ""}
                alt={c?.featured_image?.src ?? ""}
                title={`${c?.organization.title ?? ""}`}
                link={`/travel-mart/communities/${c?.id}/detail`}
                province=""
              />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default TravelMartSellProjectList;
