import { useMemo, useState } from "react";

import { DocumentIcon } from "@/components/Icon";
import DataTable from "@/components/data-table/data-table";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart/types/travel-mart";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { useEffect } from "react";

type TravelMartEntrepreneurBusinessNegotiationListReadyProps = {
  schedules: Schedule[];
};

const TravelMartEntrepreneurBusinessNegotiationListReady = ({
  schedules,
}: TravelMartEntrepreneurBusinessNegotiationListReadyProps) => {
  const t = useTranslations("common");
  const [data, setData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const columnHelper = createColumnHelper<Schedule>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("community", {
        header: () => t("businessNegotiation.entrepreneur.activity"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("province", {
        header: () => t("businessNegotiation.entrepreneur.province"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("date", {
        header: () => t("businessNegotiation.entrepreneur.requestDate"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.display({
        id: "action",
        header: () => t("businessNegotiation.entrepreneur.viewDetail"),
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          return (
            <Link
              key={"registerTravelMart"}
              onClick={() => setIsLoading(true)}
              href={`/travel-mart/communities/${row.original.community_id}/detail`}
            >
              <DocumentIcon className="text-smart-cbt-green" />
            </Link>
          );
        },
      }),
    ],
    [columnHelper]
  );

  useEffect(() => {
    setIsLoading(true);
    setData(schedules);
    setIsLoading(false);
  }, [data]);

  return <DataTable tableName={""} columns={columns} data={data} dataLoading={isLoading} showHeader />;
};

export default TravelMartEntrepreneurBusinessNegotiationListReady;
