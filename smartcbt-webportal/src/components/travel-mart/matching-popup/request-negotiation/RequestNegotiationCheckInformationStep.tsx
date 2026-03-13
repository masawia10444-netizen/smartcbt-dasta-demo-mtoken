import { Button } from "@/components/Button";
import Form from "@/components/form/Form";
import { TravelMartRequestNegotiationSchema } from "@/schemas/forms/travel-mart/matching/travel-mart-matching-popup-schema";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useFormContext } from "react-hook-form";

type RequestNegotiationCheckInformationStepProps = {
  eventName: string;
  province: string;
  canNext: boolean;
  type: "community" | "organization";
  onSubmit: () => void;
  close: () => void;
};

const RequestNegotiationCheckInformationStep = (props: RequestNegotiationCheckInformationStepProps) => {
  const t = useTranslations("common");

  const { watch, control } = useFormContext<TravelMartRequestNegotiationSchema>();

  const time = watch("dateSelect").time;
  const dateTimeDisplay = `${new Date(time.dateTime).toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })} น.`;

  const contentLine = (title: string, value: string) => {
    return (
      <div className="flex w-full flex-row  gap-2">
        <p className="w-20 text-end text-smart-cbt-dark-green md:w-48">{title}</p>
        <p className="flex-1">{value}</p>
      </div>
    );
  };

  return (
    <form onSubmit={props.onSubmit}>
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
        {contentLine(t("travelMart.matchingPopup.requestNegotiation.eventName"), props.eventName)}
        {contentLine(t("travelMart.matchingPopup.requestNegotiation.province"), props.province)}
        {contentLine(t("travelMart.matchingPopup.requestNegotiation.date"), dateTimeDisplay)}
        {props.type == "community" && (
          <div className="flex w-full flex-row justify-center">
            <div className="">
              <Form.Checkbox
                checkboxClassName="pl-0"
                className="p-0"
                labelClassName="font-light"
                label={t("travelMart.matchingPopup.requestNegotiation.needGuide")}
                control={control}
                name="dateSelect.needGuide"
              />
            </div>
          </div>
        )}
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
              intent={props.canNext ? "primary" : "disabled"}
              type={"submit"}
              className="w-full items-center sm:min-w-full sm:max-w-full"
              disabled={props.canNext == undefined}
            >
              {t("travelMart.matchingPopup.requestNegotiation.send")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestNegotiationCheckInformationStep;
