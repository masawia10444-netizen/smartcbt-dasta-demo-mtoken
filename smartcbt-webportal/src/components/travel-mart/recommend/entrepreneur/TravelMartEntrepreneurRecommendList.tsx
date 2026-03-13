"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next-intl/link";

import { getOrganizationsByQuery } from "@/app/[locale]/(authenticated)/travel-mart/recommend/entrepreneur/(list)/action";
import DataTable from "@/components/data-table/data-table";
import Image from "@/components/image";
import { AttractionTypeInfo, OrganizationRecommend, Schedule } from "@/utils/cms/cms-api-adapter";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import TravelMartEntrepreneurRecommendHeader from "./TravelMartEntrepreneurRecommendHeader";

type TravelMartEntrepreneurRecommendListProps = {
  organizationId?: number;
  requestNotifications?: Schedule[];
  communityAttractionTypes?: AttractionTypeInfo[];
};

const TravelMartEntrepreneurRecommendList = ({
  organizationId,
  requestNotifications,
  communityAttractionTypes,
}: TravelMartEntrepreneurRecommendListProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  // TODO: Will update the serialization once it is ready.
  const [data, setData] = useState<OrganizationRecommend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [forceRefreshKey, setForceRefreshKey] = useState<number | string>();

  const [search, setSearch] = useState<string | null>(null);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);

  // TODO: Will update the serialization once it is ready.
  const columnHelper = createColumnHelper<OrganizationRecommend>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => t("recommend.entrepreneur.recommended"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          return (
            // row.original?.score != null &&
            // row.original.score > 0 && (
            //   <Image src="/images/travel-mart/recommend-icon.png" width={40} height={40} alt="recommend-icon" />

            // )
            <Link href={`/travel-mart/recommend/entrepreneur/${row.original?.id}`}>
              {row.original?.score != null && row.original.score > 0 && (
                <Image src="/images/travel-mart/recommend-icon.png" width={40} height={40} alt="recommend-icon" />
              )}
            </Link>
          );
        },
      }),
      columnHelper.accessor("title", {
        header: () => t("recommend.entrepreneur.businessName"),
        enableSorting: false,
        meta: {
          fullWidth: true,
        },
        cell: ({ row }) => {
          // return row.original?.title ?? "";
          return (
            <Link href={`/travel-mart/recommend/entrepreneur/${row.original?.id}`}>{row.original?.title ?? ""}</Link>
          );

        },
      }),
      columnHelper.accessor("province", {
        header: () => t("recommend.entrepreneur.province"),
        enableSorting: false,
        meta: {
          fullWidth: true,
        },
        cell: ({ row }) => {
          // return row.original?.province ?? "";
          return (
            <Link href={`/travel-mart/recommend/entrepreneur/${row.original?.id}`}>{row.original?.province ?? ""}</Link>
          );
        },
      }),
    ],
    [columnHelper]
  );

  useEffect(() => {
    const renderOrganizations = async () => {
      setIsLoading(true);
      const response = await getOrganizationsByQuery(regionId, search, provinceId, communityAttractionTypes, type);
      setData(response);
      setIsLoading(false);
    };
    renderOrganizations();
  }, [forceRefreshKey, provinceId, regionId, type, search]);

  const handleRowClick = async (original: any) => {
    router.push(`/travel-mart/recommend/entrepreneur/${original?.id}`);
  };

  return (
    <div className="flex w-full flex-1 flex-col px-2">
      <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("recommend.entrepreneur.title")}</h1>
      <DataTable
        tableName={""}
        columns={columns}
        data={data}
        dataLoading={isLoading}
        forceRefreshKey={forceRefreshKey}
        // onRowClick={(value) => handleRowClick(value)}
        showHeader
      >
        <TravelMartEntrepreneurRecommendHeader
          organizationId={organizationId}
          requestNotifications={requestNotifications}
          onSearch={(value) => {
            setSearch(value.search);
            setRegionId(value.regionId);
            setProvinceId(value.provinceId);
            setType(value.type);
            setRegionId(value.regionId);
            setForceRefreshKey(value);
          }}
        />
      </DataTable>
    </div>
  );
};

export default TravelMartEntrepreneurRecommendList;
