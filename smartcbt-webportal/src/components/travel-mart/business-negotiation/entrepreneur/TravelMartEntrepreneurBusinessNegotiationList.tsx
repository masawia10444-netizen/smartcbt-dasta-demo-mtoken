"use client";

import { useState } from "react";

import { BusinessMatchingCount } from "@/models/travel-mart/travel-mart-business";
import { Schedule } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import TravelMartEntrepreneurBusinessNegotiationListAppointmentRequested from "./TravelMartEntrepreneurBusinessNegotiationListAppointmentRequested";
import TravelMartEntrepreneurBusinessNegotiationListCompleted from "./TravelMartEntrepreneurBusinessNegotiationListCompleted";
import TravelMartEntrepreneurBusinessNegotiationListHistory from "./TravelMartEntrepreneurBusinessNegotiationListHistory";
import TravelMartEntrepreneurBusinessNegotiationListReady from "./TravelMartEntrepreneurBusinessNegotiationListReady";
import { TravelMartEntrepreneurBusinessNegotiationStatusTab } from "./TravelMartEntrepreneurBusinessNegotiationStatusTab";

type TravelMartEntrepreneurBusinessNegotiationListProps = {
  countList: BusinessMatchingCount;
  requests: Schedule[];
  waitingAccept: Schedule[];
  accepted: Schedule[];
  histories: Schedule[];
};

const TravelMartEntrepreneurBusinessNegotiationList = ({
  countList,
  requests,
  waitingAccept,
  accepted,
  histories,
}: TravelMartEntrepreneurBusinessNegotiationListProps) => {
  const t = useTranslations("common");
  const [mode, setMode] = useState<"ready" | "appointmentRequested" | "completed" | "history">("ready");
  return (
    <div className="flex w-full flex-1 flex-col gap-4 px-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("businessNegotiation.entrepreneur.title")}</h1>
      </div>
      <TravelMartEntrepreneurBusinessNegotiationStatusTab
        countList={countList}
        selectedIndex={1}
        onChange={(status) => setMode(status as any)}
      >
        {mode == "ready" && <TravelMartEntrepreneurBusinessNegotiationListReady schedules={requests} />}
        {mode == "appointmentRequested" && (
          <TravelMartEntrepreneurBusinessNegotiationListAppointmentRequested schedules={waitingAccept} />
        )}
        {mode == "completed" && <TravelMartEntrepreneurBusinessNegotiationListCompleted schedules={accepted} />}
        {mode == "history" && <TravelMartEntrepreneurBusinessNegotiationListHistory schedules={histories} />}
      </TravelMartEntrepreneurBusinessNegotiationStatusTab>
    </div>
  );
};

export default TravelMartEntrepreneurBusinessNegotiationList;
