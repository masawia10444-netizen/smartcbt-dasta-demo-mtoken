"use client";

import { Fragment, useEffect, useState } from "react";

import { BusinessCommunityCountList, Schedule } from "@/utils/cms/adapters/website/travel-mart/types/travel-mart";
import { useTranslations } from "next-intl";
import TravelMartCommunityBusinessNegotiationListAppointmentDatetimeRequested from "./TravelMartCommunityBusinessNegotiationListAppointmentDatetimeRequested";
import TravelMartCommunityBusinessNegotiationListAppointmentRequested from "./TravelMartCommunityBusinessNegotiationListAppointmentRequested";
import TravelMartCommunityBusinessNegotiationListCompleted from "./TravelMartCommunityBusinessNegotiationListCompleted";
import TravelMartCommunityBusinessNegotiationListHistory from "./TravelMartCommunityBusinessNegotiationListHistory";
import { TravelMartCommunityBusinessNegotiationStatusTab } from "./TravelMartCommunityBusinessNegotiationStatusTab";

type TravelMartCommunityBusinessNegotiationListProps = {
  countList?: BusinessCommunityCountList;
  requests?: Schedule[];
  waitingAccept?: Schedule[];
  accepted?: Schedule[];
  histories?: Schedule[];
};

const TravelMartCommunityBusinessNegotiationList = ({
  countList,
  accepted,
  histories,
  requests,
  waitingAccept,
}: TravelMartCommunityBusinessNegotiationListProps) => {
  const t = useTranslations("common");

  const [items, setItems] = useState<{ key: string; name: string; count: number; content?: JSX.Element }[]>();

  const content = (key: string) => {
    switch (key) {
      case "request":
        return <TravelMartCommunityBusinessNegotiationListAppointmentRequested requests={requests} />;
      case "waiting_accept":
        return <TravelMartCommunityBusinessNegotiationListAppointmentDatetimeRequested waitingAccept={waitingAccept} />;

      case "open":
        return <TravelMartCommunityBusinessNegotiationListCompleted accepted={accepted} />;

      case "history":
        return <TravelMartCommunityBusinessNegotiationListHistory histories={histories} />;
    }
  };

  useEffect(() => {
    if (!countList) return;
    const result: any = Object.keys(countList).map((key) => ({
      key: key,
      name: t(`businessNegotiation.community.tabs.status.${key}`),
      count: countList[key as keyof typeof countList],
      content: content(key),
    }));
    setItems(result);
  }, [countList]);

  return (
    <Fragment>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("businessNegotiation.community.title")}</h1>
      </div>
      <TravelMartCommunityBusinessNegotiationStatusTab items={items} />
    </Fragment>
  );
};

export default TravelMartCommunityBusinessNegotiationList;
