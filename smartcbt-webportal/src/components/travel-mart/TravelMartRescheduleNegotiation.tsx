import { Button } from "@/components/Button";
import Image from "@/components/image";
import { ScheduleStatus } from "@/utils/cms/adapters/website/constants";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ConfirmCancelNegotiationPopup from "./matching-popup/confirm-cancel-negotiation/ConfirmCancelNegotiationPopup";
import { displayDate } from "./matching-popup/confirm-reschedule/ConfirmRescheduleConfirmStep";
import ConfirmReschedulePopup from "./matching-popup/confirm-reschedule/ConfirmReschedulePopup";

type TravelMartNegotiationCardProps = {
  scheduleId: number | undefined;
  date: string | undefined;
  time: string | undefined;
  type: "community" | "organization";
  onCancel: Function;
  onConfirm: Function;
};

const TravelMartNegotiationCard = (props: TravelMartNegotiationCardProps) => {
  const t = useTranslations("common");
  const { scheduleId, date, time, type, onCancel, onConfirm } = props;

  const getRequestTypeText = () => {
    return type == "community"
      ? t("travelMart.rescheduleNegotiation.communityRequest")
      : t("travelMart.rescheduleNegotiation.organizationRequest");
  };

  return (
    <div className="flex flex-row items-center">
      <div className="relative w-24 h-24">
        <Image src="/images/travel-mart/community/time-changes-icon.png" fill alt="" style={{ objectFit: "cover" }} />
      </div>
      <div className="flex flex-col flex-grow gap-6 ml-16 mr-16">
        <div className="flex flex-row items-center">
          <div className="text-xl text-smart-cbt-orange">{t("travelMart.rescheduleNegotiation.title")}</div>
          <div className="ml-4 text-base text-smart-cbt-dark-grey">{getRequestTypeText()}</div>
        </div>
        <div className="text-lg text-smart-cbt-orange">{displayDate(date, time)}</div>
      </div>
      <div className="flex flex-row items-center gap-4 ">
        <Button className="w-full rounded-full shadow-md" intent={"primary"} onClick={() => onConfirm(scheduleId)}>
          {t("travelMart.rescheduleNegotiation.confirm")}
        </Button>
        <Button intent={"text"} size={"small"} className="px-6 text-black" onClick={() => onCancel(scheduleId)}>
          {t("travelMart.rescheduleNegotiation.cancel")}
        </Button>
      </div>
    </div>
  );
};

type TravelMartRescheduleNegotiationProps = {
  scheduleId: number | undefined;
  activity: string | undefined;
  entrepreneur: string | undefined;
  date: string | undefined;
  time: string | undefined;
  type: "community" | "organization";
  businessType: string | undefined | null;
  status: ScheduleStatus | undefined;
};

export const TravelMartRescheduleNegotiation = (props: TravelMartRescheduleNegotiationProps) => {
  const { scheduleId, activity, entrepreneur, date, time, type, businessType, status } = props;

  const [showConfirmReschedulePopup, setShowConfirmReschedulePopup] = useState<number | null>(null);
  const [showCancelNegotiationPopup, setShowCancelNegotiationPopup] = useState<number | null>(null);

  const handleConfirmReschedule = (scheduleId: number) => {
    setShowConfirmReschedulePopup(scheduleId);
  };

  const handleCancelNegotiation = (scheduleId: number) => {
    setShowCancelNegotiationPopup(scheduleId);
  };

  return (
    <div>
      {type == "organization" && status === ScheduleStatus["CHANGE-SLOT"] && (
        <TravelMartNegotiationCard
          scheduleId={scheduleId}
          date={date ?? ""}
          time={time ?? ""}
          type={type}
          onCancel={() => scheduleId && handleCancelNegotiation(scheduleId)}
          onConfirm={() => scheduleId && handleConfirmReschedule(scheduleId)}
        />
      )}
      {type == "community" && status === ScheduleStatus["CHANGE-SLOT"] && (
        <TravelMartNegotiationCard
          scheduleId={scheduleId}
          date={date ?? ""}
          time={time ?? ""}
          type={type}
          onCancel={() => scheduleId && handleCancelNegotiation(scheduleId)}
          onConfirm={() => scheduleId && handleConfirmReschedule(scheduleId)}
        />
      )}
      {showConfirmReschedulePopup && (
        <ConfirmReschedulePopup
          scheduleId={showConfirmReschedulePopup}
          date={date}
          time={time}
          activity={activity}
          entrepreneur={entrepreneur}
          type={type}
          businessType={businessType}
          onClose={() => setShowConfirmReschedulePopup(null)}
        />
      )}
      {showCancelNegotiationPopup && (
        <ConfirmCancelNegotiationPopup
          scheduleId={showCancelNegotiationPopup}
          onClose={() => setShowCancelNegotiationPopup(null)}
        />
      )}
    </div>
  );
};
