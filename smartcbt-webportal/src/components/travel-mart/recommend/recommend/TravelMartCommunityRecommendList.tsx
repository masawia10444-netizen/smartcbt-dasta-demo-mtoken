"use client";

import { useEffect, useMemo, useState } from "react";

import { getCommunitiesByQuery } from "@/app/[locale]/(authenticated)/travel-mart/communities/action";
import DataTable from "@/components/data-table/data-table";
import Image from "@/components/image";
import { AttractionTypeInfo, CommunityRecommend, Schedule } from "@/utils/cms/cms-api-adapter";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { useSearchParams } from "next/navigation";
import TravelMartCommunityRecommendHeader from "./TravelMartCommunityRecommendHeader";
import { TravelMartCommunityRecommendMediaCell } from "./TravelMartCommunityRecommendMediaCell";

interface TravelMartCommunityRecommendHeaderListProps {
  organizationId?: number;
  requestNotifications?: Schedule[];
  isAppointmentRequestButtonHidden: boolean;
  organizationAttractionTypes?: AttractionTypeInfo[];
}

const TravelMartCommunityRecommendHeaderList = ({
  organizationId,
  requestNotifications,
  isAppointmentRequestButtonHidden,
  organizationAttractionTypes,
}: TravelMartCommunityRecommendHeaderListProps) => {
  const t = useTranslations("common");

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

  const columnHelper = createColumnHelper<CommunityRecommend>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("score", {
        header: () => t("recommend.community.recommended"),
        enableSorting: false,
        meta: { fullWidth: true, centerData: true },
        cell: ({ row }) => {
          return (
            <Link href={`${getPath()}/${row.original?.id}/detail`}>
              {row.original?.score != null && row.original.score > 0 && (
                <Image src="/images/travel-mart/recommend-icon.png" width={40} height={40} alt="recommend-icon" />
              )}
            </Link>
          );
        },
      }),
      columnHelper.accessor("organization.title", {
        header: () => t("recommend.community.name"),
        enableSorting: false,
        meta: { fullWidth: true },
        cell: ({ row }) => {
          return (
            <Link href={`${getPath()}/${row.original?.id}/detail`}>
              {(row.original?.organization as any)?.title ?? ""}
            </Link>
          );
        },
      }),
      columnHelper.accessor("organization.province", {
        header: () => t("recommend.community.province"),
        enableSorting: false,
        meta: { fullWidth: true, centerData: true },
        cell: ({ row }) => {
          return (
            <Link href={`${getPath()}/${row.original?.id}/detail`}>
              {(row.original?.organization as any)?.province ?? ""}
            </Link>
          );
        },
      }),
      columnHelper.display({
        id: "link",
        header: () => t("recommend.community.media"),
        meta: { fullWidth: true, centerData: true },
        cell: ({ row }) => row.original?.link && <TravelMartCommunityRecommendMediaCell community={row.original} />,
      }),
    ],
    [columnHelper, t]
  );

  const getPath = () => {
    return isAppointmentRequestButtonHidden ? `/travel-mart/communities-info` : `/travel-mart/communities`;
  };

  useEffect(() => {
    if (q) setSearch(q);
    if (region) setRegionId(Number(region));
    if (province) setProvinceId(Number(province));
    if (typeEvent) setType(typeEvent);
  }, [q, region, province, typeEvent]);

  useEffect(() => {
    const renderCommunities = async () => {
      try {
        setData([]);
        setIsLoading(true);
        const response = await getCommunitiesByQuery(
          search,
          provinceId,
          type,
          regionId,
          organizationAttractionTypes ?? []
        );

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
    <div className="flex flex-col px-4 pb-6 pt-6 md:container md:mx-auto">
      <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("recommend.community.title")}</h1>
      <DataTable
        tableName={""}
        columns={columns}
        data={data}
        dataLoading={isLoading}
        forceRefreshKey={forceRefreshKey}
        showHeader
        showEmptyMessage
      >
        <TravelMartCommunityRecommendHeader
          q={q}
          province={province}
          region={region}
          typeEvent={typeEvent}
          requestNotifications={requestNotifications}
          organizationId={organizationId}
          onSearch={(value) => {
            setSearch(value.search);
            setProvinceId(value.provinceId);
            setType(value.type);
            setRegionId(value.communityId);
            setForceRefreshKey(value);
          }}
        />
      </DataTable>
    </div>
  );
};

export default TravelMartCommunityRecommendHeaderList;
