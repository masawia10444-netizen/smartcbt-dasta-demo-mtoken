import { useMemo, useState } from "react";

import { NextLink } from "@/components/Link";
import DataTable from "@/components/data-table/data-table";
import { ScheduleStatus } from "@/utils/cms/adapters/website/constants";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart/types/travel-mart";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { NegotiationBadgeCell } from "../NegotiationBadgeCell";

type TravelMartEntrepreneurBusinessNegotiationListCompletedProps = {
  schedules: Schedule[];
};

const TravelMartEntrepreneurBusinessNegotiationListCompleted = ({
  schedules,
}: TravelMartEntrepreneurBusinessNegotiationListCompletedProps) => {
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
      columnHelper.accessor((row) => `${row.date} ${row.start_time}`, {
        id: "appointmentDate",
        header: () => t("businessNegotiation.entrepreneur.appointmentDate"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.display({
        id: "status",
        header: () => t("businessNegotiation.entrepreneur.status"),
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => <NegotiationBadgeCell status={row.original.status as ScheduleStatus} />,
      }),
      columnHelper.display({
        id: "meeting_link",
        header: () => t("businessNegotiation.entrepreneur.meetingLink"),
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => (
          <NextLink intent="primaryButton" href={row.original.meeting_link ?? ""}>
            {t("businessNegotiation.entrepreneur.click")}
          </NextLink>
        ),
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

export default TravelMartEntrepreneurBusinessNegotiationListCompleted;
