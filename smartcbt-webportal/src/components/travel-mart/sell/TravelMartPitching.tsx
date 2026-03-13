"use client";

import { PitchingData, PitchingScheduleStatus } from "@/models/travel-mart/travel-mart-pitching";
import { useTranslations } from "next-intl";
import TravelMartPitchingExpertTable from "./TravelMartPitchingExpertTable";

type TravelMartPitchingProps = {
  id: string | number;
  data?: PitchingData;
};

const TravelMartPitching = ({ id, data }: TravelMartPitchingProps) => {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center gap-12 px-4 py-2 text-smart-cbt-dark-green md:px-10 md:py-8 lg:px-28 lg:py-10">
      <h1 className="text-center text-3xl font-semibold  lg:text-4xl">{t("travelMart.sell.title")}</h1>
      <div className="flex flex-col items-start gap-4 ">
        <div className="pitching-criteria" dangerouslySetInnerHTML={{ __html: data?.criteria as string }} />
      </div>
      {data?.groups
        ?.sort((a, b) => {
          const orderingA = a?.ordering ?? 0;
          const orderingB = b?.ordering ?? 0;
          return orderingA - orderingB;
        })
        .map((g) => {
          const expertise = g.expertise;
          const name = `${expertise.job_title ?? ""} ${expertise.first_name ?? ""} ${expertise.middle_name ?? ""} ${
            expertise.last_name ?? ""
          }`;

          const pitchingTable = g.schedules
            ?.sort((a, b) => {
              const orderingA = a?.ordering ?? 0;
              const orderingB = b?.ordering ?? 0;
              return orderingA - orderingB;
            })
            .filter((s) => s.status == PitchingScheduleStatus.Published);

          return (
            <TravelMartPitchingExpertTable
              key={g.id}
              title={g.title ?? ""}
              dataTable={pitchingTable}
              name={name}
              description={expertise.profile}
              image={expertise.photo.filename_disk}
            />
          );
        })}
    </div>
  );
};

export default TravelMartPitching;
