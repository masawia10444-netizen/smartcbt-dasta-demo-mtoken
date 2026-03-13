"use client";

import { useEffect, useMemo, useState } from "react";

import { DocumentIcon } from "@/components/Icon";
import DataTable from "@/components/data-table/data-table";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

type TravelMartCommunityBusinessNegotiationListAppointmentRequestedProps = {
  requests?: Schedule[];
  tab?: string;
};

const TravelMartCommunityBusinessNegotiationListAppointmentRequested = ({
  requests,
  tab,
}: TravelMartCommunityBusinessNegotiationListAppointmentRequestedProps) => {
  const t = useTranslations("common");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Schedule[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!requests) return;
    setData(requests);
    setIsLoading(false);
  }, [requests]);

  const columnHelper = createColumnHelper<Schedule>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("community", {
        header: () => t("businessNegotiation.community.activity"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("organization", {
        header: () => t("businessNegotiation.community.businessName"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.display({
        id: "action",
        header: () => t("businessNegotiation.community.viewDetail"),
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          return (
            <Link
              key={"registerTravelMart"}
              href={`/travel-mart/recommend/entrepreneur/${row.original.organization_id}?community=${row.original.organization_by_community}`}
            >
              <DocumentIcon className="text-smart-cbt-green" />
            </Link>
          );
        },
      }),
    ],
    [columnHelper]
  );

  return (
    <>
      <DataTable columns={columns} tableName={""} data={data} dataLoading={isLoading} showHeader />
    </>
  );
};

export default TravelMartCommunityBusinessNegotiationListAppointmentRequested;
