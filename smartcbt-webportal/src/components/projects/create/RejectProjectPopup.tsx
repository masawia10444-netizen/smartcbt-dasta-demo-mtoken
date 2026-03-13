import Form from "@/components/form/Form";
import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

type RejectProjectPopupProps = {
  isOpen: boolean;
  onClose: (rejectReason: string | null) => void;
};

type RejectForm = {
  reason: string;
};

export const RejectProjectPopup = (props: RejectProjectPopupProps) => {
  const t = useTranslations("common");
  const { handleSubmit, register } = useForm<RejectForm>({ defaultValues: { reason: "" } });

  const close = () => {
    props.onClose(null);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    props.onClose(data.reason);
  });

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={close}
      onSubmit={onSubmit}
      iconStyle="warningTriangle"
      actionButtonStyle="red"
      title={t("project.create.popupReject.title")}
      actionButtonTitle={t("project.create.popupReject.submit")}
      cancelButtonTitle={t("global.cancel")}
    >
      <Form.TextArea placeholder={t("project.create.popupReject.reasonPlaceholder")} rows={4} {...register("reason")} />
    </BasePopup>
  );
};
