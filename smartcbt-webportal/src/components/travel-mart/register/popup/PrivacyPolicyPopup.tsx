import { Button } from "@/components/Button";
import { TravelMartContext } from "@/contexts/App.context";
import { Policies } from "@/models/travel-mart/register/travel-mart-policies";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext } from "react";

type PrivacyPolicyPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
  policies?: Policies[];
};

const PrivacyPolicyPopup = (props: PrivacyPolicyPopupProps) => {
  const t = useTranslations("common");

  const { policies } = useContext(TravelMartContext);

  //NOTE: If have another condition need to check this again
  const policy = props.policies
    ? props.policies?.find((p) => p.id?.toString() == "1")
    : policies?.find((p) => p.id?.toString() == "1");

  const close = () => {
    props.onClose(false);
  };

  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0  overflow-y-auto scroll-smooth p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="relative mx-auto flex min-h-full min-w-[400px] max-w-[38rem] flex-col items-center gap-5 bg-white p-8 font-prompt text-smart-cbt-dark-green">
          <div className="flex w-full flex-col gap-6">
            <h3 className="w-full bg-[#F6FFED] py-2 text-center text-xl font-medium">{policy?.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: policy?.detail ?? "" }} />
            {/* <p className="whitespace-pre-line break-words indent-10 text-sm">
              {t.rich("travelMart.register.popup.privacyPolicy.subTitle", {
                ul: (chunk) => <ul className="relative ml-6 list-outside list-disc indent-0">{chunk}</ul>,
                li: (chunk) => <li>{chunk}</li>,
              })}
            </p>
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.whoIsThisPrivacyPolicy"),
              t("travelMart.register.popup.privacyPolicy.description.whoIsThisPrivacyPolicy")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.collectingWhatInformation"),
              t.rich("travelMart.register.popup.privacyPolicy.description.collectingWhatInformation", {
                p: (chunk) => <p className="indent-10">{chunk}</p>,
              }) as string
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.howToUsePersonalInformation"),
              t("travelMart.register.popup.privacyPolicy.description.howToUsePersonalInformation")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.whatKindOfSecurity"),
              t("travelMart.register.popup.privacyPolicy.description.whatKindOfSecurity")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.editPersonalInformation"),
              t("travelMart.register.popup.privacyPolicy.description.editPersonalInformation")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.keepYourPersonalInformationSafely"),
              t("travelMart.register.popup.privacyPolicy.description.keepYourPersonalInformationSafely")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.aboutPrivacyPolicy"),
              t("travelMart.register.popup.privacyPolicy.description.aboutPrivacyPolicy")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.otherInformationAboutPrivacyPolicies"),
              t("travelMart.register.popup.privacyPolicy.description.otherInformationAboutPrivacyPolicies")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.changesPrivacyPolicies"),
              t("travelMart.register.popup.privacyPolicy.description.changesPrivacyPolicies")
            )}
            {renderContent(
              t("travelMart.register.popup.privacyPolicy.header.contactUs"),
              t("travelMart.register.popup.privacyPolicy.description.contactUs")
            )} */}
          </div>
          <div className="flex gap-4">
            <Button intent={"primary"} className="items-center rounded-full" onClick={close}>
              {t("global.accept")}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PrivacyPolicyPopup;
