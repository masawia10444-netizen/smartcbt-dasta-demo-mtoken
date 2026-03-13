import { Button } from "@/components/Button";
import { CheckIconCircle, SaveDiskIcon } from "@/components/Icon";
import { CarbonProjectStatus } from "@/models/carbon-project";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type CreateProjectHeaderProps = {
  onSave: () => void;
  onApprove: () => void;
  onReject: () => void;
  onCancel: () => void;
  onApproveDelete: () => void;
}

const CreateProjectHeader = ({ onSave, onApprove, onReject, onCancel, onApproveDelete }: CreateProjectHeaderProps) => {
  const t = useTranslations("common");
  const { watch, getValues } = useFormContext<{ status: CarbonProjectStatus }>();
  const title = t("carbon.project.create.title");

  const renderButtonsForStatus = (status?: CarbonProjectStatus) => {
    switch (status) {
      case CarbonProjectStatus.Draft:
        return (
          <>
            <Button type="button" onClick={onCancel} intent="danger" size="small">
              {t("global.cancel")}
            </Button>
            <Button type="button" onClick={onSave} intent="primary" size="small" icon={<SaveDiskIcon />}>
              {t("project.create.save")}
            </Button>
          </>
        );
      case CarbonProjectStatus.WaitingForApprove:
        return (
          <>
            <Button type="button" className="text-smart-cbt-dark-grey" onClick={onReject} intent="text" size="small">
              {t("project.create.reject")}
            </Button>
            <Button type="button" onClick={onApprove} intent="primary" size="small" icon={<CheckIconCircle />}>
              {t("project.create.approve")}
            </Button>
          </>
        );
      case CarbonProjectStatus.Rejected:
      case CarbonProjectStatus.PendingDelete:
        return (
          <>
            <Button type="button" onClick={onCancel} intent="danger" size="small">
              {t("global.cancel")}
            </Button>
            <Button type="button" onClick={onApproveDelete} intent="danger" size="small">
              {t("project.create.approveDeleteProject")}
            </Button>
          </>
        );
      default:
        return (
          <>
            <Button type="button" onClick={onCancel} intent="danger" size="small">
              {t("global.cancel")}
            </Button>
            {/* <Button type="button" onClick={onSave} intent="primary" size="small" icon={<SaveDiskIcon />}>
              {t("project.create.save")}
            </Button> */}
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="flex items-center gap-8">{renderButtonsForStatus(getValues("status"))}</div>
    </div>
  );
};

export default CreateProjectHeader;
