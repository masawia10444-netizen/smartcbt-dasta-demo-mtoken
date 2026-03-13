import { useEffect, useMemo, useState } from "react";

import DataTable from "@/components/data-table/data-table";
import { Community } from "@/utils/cms/adapters/website/travel-mart/types/travel-mart";
import { convertFromDateToString } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ActivityActionCell } from "./ActivityActionCell";

type CommunityListRejectedProps = {
  communities?: Community[];
};

const CommunityListRejected = ({ communities }: CommunityListRejectedProps) => {
  const t = useTranslations("common");
  const [data, setData] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const columnHelper = createColumnHelper<Community>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: () => t("community.info.activity"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("approve_request_at", {
        header: () => t("community.info.approvalRequestDate"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) =>
          row.original.approve_request_at ? convertFromDateToString(new Date(row.original.approve_request_at)) : "-",
      }),
      columnHelper.accessor("reject_reason", {
        header: () => t("community.info.rejectReason"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => <div className="text-smart-cbt-red">{row.original.reject_reason}</div>,
      }),
      columnHelper.display({
        id: "action",
        header: () => t("community.info.action"),
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => <ActivityActionCell activity={row.original} />,
      }),
    ],
    [columnHelper]
  );

  useEffect(() => {
    setIsLoading(true);
    if (!communities) return;
    setData(communities);
    setIsLoading(false);
  }, [communities]);

  return <DataTable columns={columns} tableName={""} data={data} dataLoading={isLoading} showHeader />;
};

export default CommunityListRejected;
