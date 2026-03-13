"use client";

import { handleConfirmReschedule } from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import { Button } from "@/components/Button";
import Image from "@/components/image";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { ConfirmReschedulePopupStep } from "./ConfirmReschedulePopup";

type ConfirmRescheduleCheckConfirmStepProps = {
  scheduleId: string | number;
  date?: string | undefined;
  time?: string | undefined;
  activity?: string | undefined;
  entrepreneur?: string | undefined;
  type?: "community" | "organization";
  businessType?: string | undefined | null;
  close: () => void;
  setStep: (step: ConfirmReschedulePopupStep) => void;
};

function formatShowTime(time: string) {
  const timeArray = time.split(":");
  const formattedTime = timeArray.slice(0, 2).join(":");
  return formattedTime;
}

export function displayDate(date?: string, time?: string) {
  const t = useTranslations("common");

  const dateDisplay = date
    ? `${new Date(date).toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`
    : "-";

  const timeDisplay = time ? `${formatShowTime(time)}` : "";

  return t("travelMart.matchingPopup.confirmReschedule.time", { date: dateDisplay, time: timeDisplay });
}

const ConfirmRescheduleCheckConfirmStep = (props: ConfirmRescheduleCheckConfirmStepProps) => {
  const t = useTranslations("common");

  const contentLine = (title: string, value: string) => {
    return (
      <div className="flex flex-row w-full gap-2">
        <p className="text-base text-right w-28 text-smart-cbt-green-3">{title}</p>
        <p className="flex-1 ml-2 text-base text-smart-cbt-dark-green">{value}</p>
      </div>
    );
  };

  const onSubmit = async () => {
    try {
      await handleConfirmReschedule(props.scheduleId);
      props.setStep(ConfirmReschedulePopupStep.done);
    } catch (error) {
      props.setStep(ConfirmReschedulePopupStep.fail);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <Image
            alt="business-negotiations"
            src={"/images/travel-mart/menus/business-negotiations.png"}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h3 className="w-full text-xl font-medium text-center text-smart-cbt-dark-green">
          {t("travelMart.matchingPopup.confirmReschedule.title")}
        </h3>
        <div className="flex flex-col items-center gap-4 mt-5">
          {contentLine(t("travelMart.matchingPopup.confirmReschedule.date"), displayDate(props.date, props.time))}
          {props.type == "community" &&
            contentLine(t("travelMart.matchingPopup.confirmReschedule.activity"), props.activity ?? "")}
          {props.type == "organization" &&
            contentLine(t("travelMart.matchingPopup.confirmReschedule.entrepreneur"), props.entrepreneur ?? "")}
          {props.type == "organization" &&
            contentLine(t("travelMart.matchingPopup.confirmReschedule.type"), props.businessType ?? "")}
        </div>
        <div className="flex flex-row w-full gap-4 mt-5">
          <div className="flex-1 w-full">
            <Button
              intent={"text"}
              type="button"
              className="items-center w-full text-black hover:underline sm:min-w-full sm:max-w-full"
              onClick={props.close}
            >
              {t("global.cancel")}
            </Button>
          </div>
          <div className="flex-1 w-full">
            <Button
              intent={"primary"}
              type={"button"}
              onClick={onSubmit}
              className="items-center w-full sm:min-w-full sm:max-w-full"
            >
              {t("travelMart.matchingPopup.confirmReschedule.confirm")}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmRescheduleCheckConfirmStep;
