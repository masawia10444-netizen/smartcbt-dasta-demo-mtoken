"use client";

import { MatchingScheduleData } from "@/models/travel-mart/tmp/travel-mart-matching";
import _ from "lodash";
import { useTranslations } from "next-intl";
import TravelMartMatchingExpertTable from "./TravelMartMatchingExpertTable";

type TravelMartMatchingProps = {
  id: string | number;
  data?: MatchingScheduleData[];
};

const TravelMartMatching = ({ id, data }: TravelMartMatchingProps) => {
  const t = useTranslations("common");
  const filteredData = _.chain(data)
    .filter((d) => d?.status == "published")
    .sortBy((d) => [d?.date, d?.start_time])
    .value();
  // console.log(filteredData);
  return (
    <div className="flex flex-col items-center gap-12 px-4 py-2 text-smart-cbt-dark-green md:px-10 md:py-8 lg:px-28 lg:py-10">
      <h1 className="text-center text-3xl font-semibold  lg:text-4xl">{t("travelMart.matching.title")}</h1>
      {/* <div className="flex flex-col items-start gap-4 ">
        <div className="pitching-criteria" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      </div> */}
      {Array.isArray(filteredData) && (
        <div className="flex flex-col items-start gap-4 ">
          <TravelMartMatchingExpertTable dataTable={filteredData} />
        </div>
      )}
    </div>
  );
};

export default TravelMartMatching;
