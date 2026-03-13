import { updateManageFinancialProxyStatusById } from "@/app/[locale]/(authenticated)/sia-sroi/financial-proxy/actions";
import { FinancialProxyStatus } from "@/models/financial-proxy";
import { customZodResolver } from "@/schemas/base-schema";
import {
  FinancialProxyStatusUpdateSchema,
  financialProxyStatusUpdateSchema,
} from "@/schemas/forms/financial-proxies/financial-proxy-status-update-schema";
import { handleAPIError } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormSelectDropDown, { SelectDropDownVariantProps } from "../form/FormSelectDropDown";
import { FinancialProxyConfirmPopup } from "./FinancialProxyConfirmPopup";
import { FinancialProxyPublishSuccessPopup } from "./FinancialProxyPublishSuccessPopup";

type FinancialProxyStatusFormProps = {
  id: number;
  initialStatus: FinancialProxyStatus;
  setRefresh: (refresh?: string | number) => void;
  isSiaAdminRole: boolean;
};

export const FinancialProxyStatusForm = ({
  id,
  initialStatus,
  isSiaAdminRole,
  setRefresh,
}: FinancialProxyStatusFormProps) => {
  const router = useRouter();
  const {
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FinancialProxyStatusUpdateSchema>({
    resolver: customZodResolver(financialProxyStatusUpdateSchema),
    defaultValues: { status: initialStatus },
  });

  const t = useTranslations("common");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const status = watch("status");
  const intents: { [key: string]: SelectDropDownVariantProps["intent"] } = {
    publish: "primary",
    hide: "danger",
    draft: "iddle",
  };

  const submitForm = async ({ status }: FinancialProxyStatusUpdateSchema) => {
    const { response, error } = await updateManageFinancialProxyStatusById(Number(id), status);
    if (error) {
      handleAPIError(error);
      setShowConfirmPopup(false);
      return;
    }
    if (status != FinancialProxyStatus.Publish) {
      setRefresh(status);
      router.refresh();
    }
    setShowSuccessPopup(true);
  };

  const handleCloseConfirmPopup = (didConfirm: boolean) => {
    if (didConfirm) {
      setValue("status", FinancialProxyStatus.Publish);
      submitForm({ status: FinancialProxyStatus.Publish });
      setRefresh(FinancialProxyStatus.Publish);
      router.refresh();
    }
    setShowConfirmPopup(false);
  };

  const onChangeInterceptor = (value: FinancialProxyStatus, next: (v: FinancialProxyStatus) => void) => {
    if (value == status) return;
    if (value == FinancialProxyStatus.Publish) {
      setShowConfirmPopup(true);
      return;
    }
    next(value);
    submitForm({ status: value });
  };

  return (
    <form className="w-[110px]">
      <FormSelectDropDown
        idKey={null}
        values={Object.values(FinancialProxyStatus)}
        displayFunction={(s) => t(`financialProxy.status.${s}`)}
        placeholder="-"
        name="status"
        control={control}
        intent={intents[status]}
        onChangeInterceptor={onChangeInterceptor}
        disabled={!isSiaAdminRole}
      />
      {showConfirmPopup && <FinancialProxyConfirmPopup isOpen={showConfirmPopup} onClose={handleCloseConfirmPopup} />}
      {showSuccessPopup && (
        <FinancialProxyPublishSuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
      )}
    </form>
  );
};
