import { customZodResolver } from "@/schemas/base-schema";

import { updateEmissionFactor } from "@/app/[locale]/(authenticated)/carbon-footprint/emission-factor-proxy/action";
import FormSelectDropDown, { SelectDropDownVariantProps } from "@/components/form/FormSelectDropDown";
import { EmissionFactorProxyStatus } from "@/models/emission-factor-proxy";
import {
  EmissionProxyStatusUpdateSchema,
  emissionProxyStatusUpdateSchema,
} from "@/schemas/forms/carbon/emission-proxies/emission-proxy-status-update-schema";
import { EmissionFactorProxyType } from "@/utils/cms/adapters/website/carbon/types";
import { handleAPIError } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EmissionProxyConfirmPopup } from "./EmissionProxyConfirmPopup";

type EmissionProxyStatusFormProps = {
  id: number;
  initialStatus: EmissionFactorProxyStatus;
  setRefresh: (refresh?: string | number) => void;
  setShowSuccessPopup: (showSuccessPopup: boolean) => void;
  isCarbonAdminRole: boolean;
};

export const EmissionProxyStatusForm = ({
  id,
  initialStatus,
  setRefresh,
  isCarbonAdminRole,
  setShowSuccessPopup,
}: EmissionProxyStatusFormProps) => {
  const t = useTranslations("common");

  const { control, watch, setValue } = useForm<EmissionProxyStatusUpdateSchema>({
    resolver: customZodResolver(emissionProxyStatusUpdateSchema),
    defaultValues: { status: initialStatus },
  });

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const status = watch("status");
  const intents: { [key: string]: SelectDropDownVariantProps["intent"] } = {
    publish: "primary",
    hide: "danger",
    draft: "iddle",
  };

  const submitForm = async ({ status }: EmissionProxyStatusUpdateSchema) => {
    const body: EmissionFactorProxyType = {
      status: status,
    };
    const { error } = await updateEmissionFactor(id, body);
    if (error) {
      handleAPIError(error);
      setShowConfirmPopup(false);
    }
    if (status != EmissionFactorProxyStatus.Publish) {
      setRefresh(status);
      return;
    }
    setShowSuccessPopup(true);
  };

  const handleCloseConfirmPopup = (didConfirm: boolean) => {
    if (didConfirm) {
      setValue("status", EmissionFactorProxyStatus.Publish);
      submitForm({ status: EmissionFactorProxyStatus.Publish });
      setRefresh(EmissionFactorProxyStatus.Publish);
    }
    setShowConfirmPopup(false);
  };

  const onChangeInterceptor = (value: EmissionFactorProxyStatus, next: (v: EmissionFactorProxyStatus) => void) => {
    if (value == status) return;
    if (value == EmissionFactorProxyStatus.Publish) {
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
        values={Object.values(EmissionFactorProxyStatus)}
        displayFunction={(s) => t(`carbon.emissionProxy.status.${s}`)}
        placeholder="-"
        name="status"
        control={control}
        fixed={false}
        intent={intents[status]}
        onChangeInterceptor={onChangeInterceptor}
        disabled={!isCarbonAdminRole}
      />
      {showConfirmPopup && <EmissionProxyConfirmPopup isOpen={showConfirmPopup} onClose={handleCloseConfirmPopup} />}
    </form>
  );
};
