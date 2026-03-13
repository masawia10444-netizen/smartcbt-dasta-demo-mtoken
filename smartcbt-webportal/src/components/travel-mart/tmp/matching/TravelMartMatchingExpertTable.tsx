import { NextLink } from "@/components/Link";
import DataTable from "@/components/data-table/data-table";
import { MatchingScheduleData } from "@/models/travel-mart/tmp/travel-mart-matching";
import { createColumnHelper } from "@tanstack/react-table";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type TravelMartMatchingExpertTableProps = {
  // id: string | number;
  // community: string;
  // entreprenuer: string;
  // date: string;
  // start_time: string;
  // end_time: string;
  // meeting_link: string;
  dataTable: MatchingScheduleData[];
};

const TravelMartMatchingExpertTable = ({
  // id,
  // community,
  // entreprenuer,
  // date,
  // start_time,
  // end_time,
  // meeting_link,
  dataTable,
}: TravelMartMatchingExpertTableProps) => {
  const t = useTranslations("common");

  useEffect(() => {
    setData(dataTable);
  }, [dataTable]);

  const [data, setData] = useState<MatchingScheduleData[]>([]);
  const columnHelper = createColumnHelper<MatchingScheduleData>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => "No.",
        enableSorting: false,
        meta: {
          fullWidth: false,
          centerData: false,
        },
        cell: ({ row }) => {
          const id = row.original.id;
          return id;
        },
      }),
      columnHelper.accessor("date", {
        header: () => t("travelMart.matching.table.date"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }: { row: { original: { date: string } } }) => {
          const date: Date = new Date(row.original.date);
          const dateFormatted = date?.toLocaleString("th-TH", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          return `${dateFormatted}`;
        },
      }),
      columnHelper.accessor("start_time", {
        header: () => t("travelMart.matching.table.time"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const parsedTime = parse(row.original.start_time, "HH:mm:ss", new Date());
          const formattedTime = format(parsedTime, "HH:mm");
          return t("travelMart.matching.table.displayTime", { time: formattedTime });
        },
      }),
      columnHelper.accessor("community", {
        header: () => "ชุมชน",
        enableSorting: false,
        meta: {
          fullWidth: false,
          centerData: false,
        },
        cell: ({ row }) => {
          const community = row.original.community?.title;
          return community;
        },
      }),
      columnHelper.accessor("organization_request", {
        header: () => "ผู้ประกอบการ",
        enableSorting: false,
        meta: {
          fullWidth: false,
          centerData: false,
        },
        cell: ({ row }) => {
          const entreprenuer = row.original.organization_request?.title;
          return entreprenuer;
        },
      }),

      columnHelper.accessor("meeting_link", {
        header: () => t("travelMart.matching.table.presentationLink"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const link = row.original.meeting_link;
          return (
            <NextLink target="_blank" intent={"primaryButton"} href={link ?? "/"}>
              {t("travelMart.matching.table.click")}
            </NextLink>
          );
        },
      }),
    ],
    [columnHelper]
  );

  return (
    <div className="w-full flex-1 items-center">
      {/* <div className="flex flex-row items-center justify-center gap-10 lg:gap-20">
        <div className="relative h-44 w-44 md:h-60 md:w-60">
          <Image
            className="aspect-square rounded-full align-middle shadow-lg "
            src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${image}`}
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
      </div> */}
      <div className="mt-12 flex w-full flex-col items-center gap-12">
        {/* <h3 className="text-xl font-semibold lg:text-2xl">
          {`${t("travelMart.sell.sellPresentationTable")} ${title}`}
        </h3> */}
        <div className="w-full flex-1">
          <DataTable
            showHeader={false}
            columns={columns}
            hidePagination
            customPageSize={200}
            data={data}
            dataLoading={data?.length == 0}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelMartMatchingExpertTable;
