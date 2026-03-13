import { Button } from "@/components/Button";
import { WarningIcon } from "@/components/Icon";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useTranslations } from "next-intl";

type RegisterConfirmPopupProps = {
  onClose: (didConfirm?: any) => void;
  onConfirm: () => void;
  type: "community" | "organization" | "guide";
};

const RegisterConfirmPopup = ({ onClose, onConfirm, type }: RegisterConfirmPopupProps) => {
  const t = useTranslations("common");
  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <WarningIcon className="h-16 w-16 text-smart-cbt-yellow" />
        <h3 className="text-xl font-medium">
          {t(`travelMart.register.popup.confirm.title${capitalizeFirstLetter(type)}`)}
        </h3>
      </div>
      <div className="flex gap-4">
        <Button intent={"tertiary"} size={"small"} className="px-6" onClick={() => onClose(true)}>
          {t("global.cancel")}
        </Button>
        <Button intent={"primary"} size={"small"} className="px-6" onClick={onConfirm}>
          {t("global.confirm")}
        </Button>
      </div>
    </>
  );
};

export default RegisterConfirmPopup;
