import { Button } from "@/components/Button";
import { Collection } from "@/utils/cms/cms-type";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";

type ConsentPopupProps = {
  detail?: Collection["policies"]["detail"];
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

const ConsentPopup = (props: ConsentPopupProps) => {
  const t = useTranslations("common");

  const close = () => {
    props.onClose(false);
  };

  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center overflow-y-auto scroll-smooth p-4">
        <Dialog.Panel className="relative m-auto flex min-w-[400px] max-w-[38rem] flex-col items-center gap-5 bg-white p-8 font-prompt text-smart-cbt-dark-green">
          <div className="flex w-full flex-col gap-6">
            <h3 className="w-full bg-[#F6FFED] py-2 text-center text-xl font-medium">
              {t("manageApi.form.privacy_policy")}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: props.detail ?? "" }} />
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

export default ConsentPopup;
