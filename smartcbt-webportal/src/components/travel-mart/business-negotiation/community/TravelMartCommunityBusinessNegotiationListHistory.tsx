import { useEffect, useMemo, useState } from "react";

import DataTable from "@/components/data-table/data-table";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { NegotiationBadgeCell } from "../NegotiationBadgeCell";
import BusinessNegotiationRating from "../BusinessNegotiationRating";
import { handleRatingSchedule } from "@/app/[locale]/(authenticated)/travel-mart/business-negotiation/action";
import { ScheduleStatus } from "@/utils/cms/adapters/website/constants";

type TravelMartCommunityBusinessNegotiationListHistoryProps = {
  histories?: Schedule[];
};

const TravelMartCommunityBusinessNegotiationListHistory = ({
  histories,
}: TravelMartCommunityBusinessNegotiationListHistoryProps) => {
  const t = useTranslations("common");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Schedule[]>([]);

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
          const changeSlot = row.original.has_change_slot;
          return <NegotiationBadgeCell status={status} isOwner={isOwner} isChangeSlot={changeSlot} />;
        },
      }),
      columnHelper.accessor("rating", {
        header: () => t("businessNegotiation.community.rating"),
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
        header: () => t("businessNegotiation.community.remark"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
    ],
    [columnHelper]
  );

    const onChangeStar = async (payload: { rowData: Schedule; rating: number }) => {
      const { rating, rowData } = payload;

      //call api success
      const result = await handleRatingSchedule(payload.rowData.id, rating, "community");

      if (!result) {
        return;
      }
      const formatedData = data.map((value) => {
        return {
          ...value,
          rating: value.id === payload.rowData.id ? payload.rating : value.rating,
        };
      });
      setData(formatedData);
      return;
    };

    useEffect(() => {
      setIsLoading(true);
      if (!histories) return;
      setData(histories);
      setIsLoading(false);
    }, [histories]);

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

export default TravelMartCommunityBusinessNegotiationListHistory;
