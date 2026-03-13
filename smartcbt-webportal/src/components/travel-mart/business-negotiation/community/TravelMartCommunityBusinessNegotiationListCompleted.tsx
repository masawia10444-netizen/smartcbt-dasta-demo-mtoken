import { Button } from "@/components/Button";
import DataTable from "@/components/data-table/data-table";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { NegotiationBadgeCell } from "../NegotiationBadgeCell";

type TravelMartCommunityBusinessNegotiationListCompletedProps = {
  accepted?: Schedule[];
};

const TravelMartCommunityBusinessNegotiationListCompleted = ({
  accepted,
}: TravelMartCommunityBusinessNegotiationListCompletedProps) => {
  const t = useTranslations("common");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Schedule[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!accepted) return;
    setData(accepted);
    setIsLoading(false);
  }, [accepted]);

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
      columnHelper.accessor((row) => `${row.date} ${row.start_time}`, {
        id: "appointmentDate",
        header: () => t("businessNegotiation.community.appointmentDate"),
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
      columnHelper.accessor("meeting_link", {
        header: () => t("businessNegotiation.community.link"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const link = String(row.original.meeting_link);
          return (
            <Link href={link} target="_blank">
              <Button type="button" intent="primary" size="small">
                {t("businessNegotiation.community.click")}
              </Button>
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

export default TravelMartCommunityBusinessNegotiationListCompleted;
