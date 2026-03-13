import { useMemo, useState } from "react";

import DataTable from "@/components/data-table/data-table";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart/types/travel-mart";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { NegotiationBadgeCell } from "../NegotiationBadgeCell";
import BusinessNegotiationRating from "../BusinessNegotiationRating";
import { handleRatingSchedule } from "@/app/[locale]/(authenticated)/travel-mart/business-negotiation/action";
import { ScheduleStatus } from "@/utils/cms/adapters/website/constants";

type TravelMartEntrepreneurBusinessNegotiationListHistoryProps = {
  schedules: Schedule[];
};

const TravelMartEntrepreneurBusinessNegotiationListHistory = ({
  schedules,
}: TravelMartEntrepreneurBusinessNegotiationListHistoryProps) => {
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
      columnHelper.accessor("status", {
        header: () => t("businessNegotiation.entrepreneur.status"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const status = row.original.status;
          const isOwner = row.original.is_owner;
          const changeSlot = row.original.has_change_slot;
          return <NegotiationBadgeCell status={status} isOwner={isOwner} isChangeSlot={changeSlot} />;
        },
      }),
      columnHelper.accessor("rating", {
        header: () => t("businessNegotiation.entrepreneur.rating"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) =>
          row.original.status === ScheduleStatus.COMPLETED || row.original.status === ScheduleStatus.CLOSED ? (
            <BusinessNegotiationRating
              defaultRating={row.original.rating}
              totalStars={5}
              onChange={(rating) => {
                return onChangeStar({ rowData: row.original, rating: rating });
              }}
            />
          ) : (
            ""
          ),
      }),
      columnHelper.accessor("note", {
        header: () => t("businessNegotiation.entrepreneur.remark"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
    ],
    [columnHelper]
  );

  const onChangeStar = async (payload: {rowData: Schedule, rating: number}) => {
    const { rating, rowData } = payload;

    //call api success 
    const result = await handleRatingSchedule(payload.rowData.id, rating, "organization");

    if (!result) {
      return;
    }
    const formatedData = data.map((value) => {
      return {
        ...value,
        rating: value.id === payload.rowData.id ? payload.rating : value.rating,
      };
    })
    setData(formatedData)   
    return; 
  }

  useEffect(() => {
    setIsLoading(true);
    setData(schedules);
    setIsLoading(false);
  }, [schedules]);

  return (
    <>
      <DataTable tableName={""} columns={columns} data={data} dataLoading={isLoading} showHeader />
    </>
  );
};

export default TravelMartEntrepreneurBusinessNegotiationListHistory;
