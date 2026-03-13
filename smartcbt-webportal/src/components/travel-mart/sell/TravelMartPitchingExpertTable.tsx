import { NextLink } from "@/components/Link";
import DataTable from "@/components/data-table/data-table";
import { Schedule } from "@/models/travel-mart/travel-mart-pitching";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useEffect, useMemo, useState } from "react";

type TravelMartPitchingExpertTableProps = {
  dataTable: Schedule[];
  title: string;
  name: string;
  description: string;
  image: string;
};

const TravelMartPitchingExpertTable = ({
  dataTable,
  title,
  name,
  description,
  image,
}: TravelMartPitchingExpertTableProps) => {
  const t = useTranslations("common");

  useEffect(() => {
    setData(dataTable);
  }, [dataTable]);

  const [data, setData] = useState<Schedule[]>([]);
  const columnHelper = createColumnHelper<Schedule>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: () => t("travelMart.sell.table.activityName"),
        enableSorting: false,
      }),
      columnHelper.accessor("user.organizaitons", {
        header: () => t("global.province"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const organization = row.original.user.organizaitons.find((or) => or);
          const province = organization?.organizations_id?.province?.title;
          return province;
        },
      }),
      columnHelper.accessor("start_at", {
        header: () => t("travelMart.sell.table.date"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const date = new Date(row.original.start_at);
          const dateFormatted = date?.toLocaleString("th-TH", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          return `${dateFormatted}`;
        },
      }),
      columnHelper.accessor("start_at", {
        header: () => t("travelMart.sell.table.time"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const date = new Date(row.original.start_at);
          const timeFormatted = date?.toLocaleString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return t("travelMart.sell.table.displayTime", { time: timeFormatted });
        },
      }),
      columnHelper.accessor("meeting_link", {
        header: () => t("travelMart.sell.table.presentationLink"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const link = row.original.meeting_link;
          return (
            <NextLink target="_blank" intent={"primaryButton"} href={link ?? "/"}>
              {t("travelMart.sell.table.click")}
            </NextLink>
          );
        },
      }),
    ],
    [columnHelper]
  );

  return (
    <div className="w-full flex-1 items-center">
      <div className="flex flex-row items-center justify-center gap-10 lg:gap-20">
        <div className="relative h-44 w-44 md:h-60 md:w-60">
          <Image
            className="aspect-square rounded-full align-middle shadow-lg "
            src={`https://dmc.smartcbt.dasta.or.th/assets/${image}`}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex w-64 flex-col gap-6 xl:w-[38rem]">
          <h3 className="text-xl font-semibold lg:text-2xl">{`${t("travelMart.sell.expert")} ${title}`}</h3>
          <h4 className="text-lg font-medium">{name}</h4>
          <div dangerouslySetInnerHTML={{ __html: description }} className="break-words text-sm" />
        </div>
      </div>
      <div className="mt-12 flex w-full flex-col items-center gap-12">
        <h3 className="text-xl font-semibold lg:text-2xl">
          {`${t("travelMart.sell.sellPresentationTable")} ${title}`}
        </h3>
        <div className="w-full flex-1">
          <DataTable showHeader={false} columns={columns} hidePagination data={data} dataLoading={data?.length == 0} />
        </div>
      </div>
    </div>
  );
};

export default TravelMartPitchingExpertTable;
