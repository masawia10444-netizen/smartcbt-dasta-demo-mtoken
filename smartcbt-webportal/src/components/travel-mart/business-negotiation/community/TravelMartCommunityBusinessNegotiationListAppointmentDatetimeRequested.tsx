import { useEffect, useMemo, useState } from "react";

import DataTable from "@/components/data-table/data-table";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { NegotiationBadgeCell } from "../NegotiationBadgeCell";

type TravelMartCommunityBusinessNegotiationListAppointmentDatetimeRequestedProps = {
  waitingAccept?: Schedule[];
};

const TravelMartCommunityBusinessNegotiationListAppointmentDatetimeRequested = ({
  waitingAccept,
}: TravelMartCommunityBusinessNegotiationListAppointmentDatetimeRequestedProps) => {
  const t = useTranslations("common");

  const [data, setData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!waitingAccept) return;
    setData(waitingAccept);
    setIsLoading(false);
  }, [waitingAccept]);

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
      columnHelper.accessor("status", {
        header: () => t("businessNegotiation.community.status"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const status = row.original.status;
          const isOwner = row.original.is_owner;
          return <NegotiationBadgeCell status={status} isOwner={isOwner} />;
        },
      }),
    ],
    [columnHelper]
  );

  return (
    <>
      <DataTable
        columns={columns}
        tableName={""}
        data={data}
        dataLoading={isLoading}
        showHeader
      />
    </>
  );
};

export default TravelMartCommunityBusinessNegotiationListAppointmentDatetimeRequested;
