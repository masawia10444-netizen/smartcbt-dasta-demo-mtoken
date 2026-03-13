import { Button } from "@/components/Button";
import { ArrowLeftIcon, DownloadIcon, SaveDiskIcon, SendIcon } from "@/components/Icon";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import CarbonProjectRecapDetail from "./CarbonProjectRecapDetail";

const CarbonProjectRecapContainer = ({
  handleOnPrevious,
  onDownload,
  onSubmit,
  onSaveDraft,
}: {
  handleOnPrevious: () => void;
  onDownload: () => void;
  onSubmit: () => void;
  onSaveDraft: () => void;
}) => {
  const t = useTranslations("common");
  const { getValues } = useFormContext<TravelProgramSchema>();

  const project = getValues();

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button
          intent="text"
          size="small"
          icon={<ArrowLeftIcon className="h-6 w-6" />}
          className="font-medium text-black"
          onClick={handleOnPrevious}
        >
          {t("carbon.create.recap.back")}
        </Button>
        <div className="flex items-center gap-8">
          <Button type="button" onClick={onDownload} intent={"secondary"} size="small" icon={<DownloadIcon />}>
            {t("carbon.create.recap.download")}
          </Button>
          <Button type="button" onClick={onSaveDraft} intent={"primary"} size="small" icon={<SaveDiskIcon />}>
            {t("carbon.create.recap.saveDraft")}
          </Button>
          <Button type="button" onClick={onSubmit} intent={"primary"} size="small" icon={<SendIcon />}>
            {t("carbon.create.recap.submit")}
          </Button>
        </div>
      </div>
      <div className="flex h-px flex-grow flex-col gap-6 overflow-y-auto rounded-lg border border-smart-cbt-border-green bg-white p-6">
        <CarbonProjectRecapDetail />
      </div>
    </div>
  );
};

export default CarbonProjectRecapContainer;
