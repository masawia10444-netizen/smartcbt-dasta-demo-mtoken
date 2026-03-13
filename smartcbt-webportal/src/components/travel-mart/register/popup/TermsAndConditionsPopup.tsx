import { Button } from "@/components/Button";
import { TravelMartContext } from "@/contexts/App.context";
import { TermConditions } from "@/models/travel-mart/register/travel-mart-term-conditions";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext } from "react";

export const renderContent = (header: string, description: string) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-medium">{header}</h3>
    <p className="whitespace-pre-line break-words indent-10 text-sm">{description}</p>
  </div>
);

type TermsAndConditionsPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
  termConditions?: TermConditions[];
};

const TermsAndConditionsPopup = (props: TermsAndConditionsPopupProps) => {
  const t = useTranslations("common");

  const { termConditions } = useContext(TravelMartContext);

  //NOTE: If have another condition need to check this again
  const termCondition = props.termConditions
    ? props.termConditions?.find((tc) => tc.id == 1)
    : termConditions?.find((tc) => tc.id == 1);

  const close = () => {
    props.onClose(false);
  };

  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 overflow-y-auto scroll-smooth p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="relative mx-auto flex min-h-full min-w-[400px] max-w-[38rem] flex-col items-center gap-5 bg-white p-8 font-prompt text-smart-cbt-dark-green">
          <div className="flex w-full flex-col gap-6">
            <Dialog.Title>
              <h3 className="w-full bg-[#F6FFED] py-2 text-center text-xl font-medium">{termCondition?.title}</h3>
            </Dialog.Title>
            <div dangerouslySetInnerHTML={{ __html: termCondition?.detail ?? "" }} />
            {/* {renderContent(
              t("travelMart.register.popup.termsAndConditions.header.universalPolicy"),
              t("travelMart.register.popup.termsAndConditions.description.universalPolicy")
            )}
            {renderContent(
              t("travelMart.register.popup.termsAndConditions.header.howDoWeUseInformation"),
              t.rich("travelMart.register.popup.termsAndConditions.description.howDoWeUseInformation", {
                ul: (chunk) => <ul className="relative ml-6 list-outside list-disc indent-0">{chunk}</ul>,
                li: (chunk) => <li>{chunk}</li>,
              }) as string
            )}
            {renderContent(
              t("travelMart.register.popup.termsAndConditions.header.informationCollectedDuringMembership"),
              t("travelMart.register.popup.termsAndConditions.description.informationCollectedDuringMembership")
            )}
            {renderContent(
              t("travelMart.register.popup.termsAndConditions.header.inspectionAndMaintenance"),
              t.rich("travelMart.register.popup.termsAndConditions.description.inspectionAndMaintenance", {
                ul: (chunk) => <ul className="relative ml-6 list-outside list-disc indent-0">{chunk}</ul>,
                li: (chunk) => <li>{chunk}</li>,
              }) as string
            )}
            {renderContent(
              t("travelMart.register.popup.termsAndConditions.header.customerCommunication"),
              t("travelMart.register.popup.termsAndConditions.description.customerCommunication")
            )}
            {renderContent(
              t("travelMart.register.popup.termsAndConditions.header.liability"),
              t("travelMart.register.popup.termsAndConditions.description.liability")
            )} */}
          </div>
          <Button intent={"primary"} className="items-center rounded-full" onClick={close}>
            {t("global.accept")}
          </Button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TermsAndConditionsPopup;
