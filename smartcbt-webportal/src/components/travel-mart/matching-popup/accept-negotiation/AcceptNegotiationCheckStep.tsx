"use client";

import { handleAccept } from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import { Button } from "@/components/Button";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { Fragment } from "react";
import { AcceptNegotiationPopupStep } from "./AcceptNegotiationPopup";

type AcceptNegotiationCheckInformationStepProps = {
  eventName: string;
  type?: string;
  entrepreneur?: string;
  scheduleId?: string | number;
  date?: string;
  startTime?: string;
  endTime?: string;
  close: () => void;
  setStep: (step: AcceptNegotiationPopupStep) => void;
};

function formatShowTime(time: string) {
  const timeArray = time.split(":");
  const formattedTime = timeArray.slice(0, 2).join(":");
  return formattedTime;
}

export function displayDate(date?: string, startTime?: string, endTime?: string) {
  const dateDisplay = date
    ? `${new Date(date).toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`
    : "-";

  const startTimeDisplay = startTime ? `${formatShowTime(startTime)} น.` : "";
  const endTimeDisplay = endTime ? `${formatShowTime(endTime)} น.` : "";
  const connectStartAndEnd = startTime && endTime ? "-" : "";

  return `${dateDisplay} ${startTimeDisplay} ${connectStartAndEnd} ${endTimeDisplay}`;
}

const AcceptNegotiationCheckInformationStep = (props: AcceptNegotiationCheckInformationStepProps) => {
  const t = useTranslations("common");

  const contentLine = (title: string, value: string) => {
    return (
      <div className="flex w-full flex-row gap-2">
        <p className="text-smart-cbt-cyan">{title}</p>
        <p className="flex-1">{value}</p>
      </div>
    );
  };

  const onSubmit = async () => {
    try {
      await handleAccept(props.scheduleId);
      props.setStep(AcceptNegotiationPopupStep.done);
    } catch (error) {
      props.setStep(AcceptNegotiationPopupStep.fail);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            alt="business-negotiations"
            src={"/images/travel-mart/menus/business-negotiations.png"}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h3 className="w-full text-center text-xl font-medium text-smart-cbt-dark-green">
          {t("travelMart.matchingPopup.requestNegotiation.titleCheck")}
        </h3>
        <div className="flex flex-col items-center gap-4">
          {contentLine(
            t("travelMart.matchingPopup.acceptNegotiation.date"),
            displayDate(props.date, props.startTime, props.endTime)
          )}
          {contentLine(t("travelMart.matchingPopup.acceptNegotiation.eventName"), props.eventName)}
          {props.entrepreneur &&
            contentLine(t("travelMart.matchingPopup.acceptNegotiation.entrepreneur"), props.entrepreneur)}
          {props.type && contentLine(t("travelMart.matchingPopup.acceptNegotiation.type"), props.type)}
        </div>
        <div className="flex w-full flex-row gap-4">
          <div className="w-full flex-1">
            <Button
              intent={"text"}
              type="button"
              className="w-full items-center text-black hover:underline sm:min-w-full sm:max-w-full"
              onClick={props.close}
            >
              {t("global.cancel")}
            </Button>
          </div>
          <div className="w-full flex-1">
            <Button
              intent={"primary"}
              type={"button"}
              onClick={onSubmit}
              className="w-full items-center sm:min-w-full sm:max-w-full"
            >
              {t("travelMart.matchingPopup.acceptNegotiation.submit")}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AcceptNegotiationCheckInformationStep;
