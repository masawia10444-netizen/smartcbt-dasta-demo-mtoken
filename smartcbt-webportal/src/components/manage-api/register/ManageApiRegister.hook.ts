"use client";

import { customZodResolver } from "@/schemas/base-schema";
import { ManageApiRegisterSchema, manageApiRegisterSchema } from "@/schemas/forms/manage-api/register-schema";
import { registerExternalUser } from "@/utils/cms/adapters/website/api-management";
import { handleAPIError } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useManageApiRegister({ consentId }: { consentId: number }) {
  const t = useTranslations("common");
  const [success, setSuccess] = useState(false);
  const [showConsentPopup, setShowConsentPopup] = useState(false);

  const formContext = useForm<ManageApiRegisterSchema>({
    defaultValues: {},
    resolver: customZodResolver(manageApiRegisterSchema),
  });
  const { watch, handleSubmit } = formContext;

  const checkConsent = watch("consent");

  const onSubmit = handleSubmit(async (data) => {
    const { email, password, organization, consent } = data;
    const payload = { email, password, organization, consents: [consent ? consentId : 0] };

    try {
      await registerExternalUser(payload);

      setSuccess(true);
    } catch (error: unknown) {
      setSuccess(false);
      handleAPIError(t("manageApi.form.register.errorMessage"));
    }
  });

  return {
    formContext,
    onSubmit,
    checkConsent,
    success,
    showConsentPopup,
    setShowConsentPopup,
  };
}
