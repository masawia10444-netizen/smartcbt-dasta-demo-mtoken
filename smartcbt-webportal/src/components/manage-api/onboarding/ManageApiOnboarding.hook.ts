"use client";

import { useCookies } from "@/hooks/client/useCookies";
import { customZodResolver } from "@/schemas/base-schema";
import { ManageApiOnboardingSchema, manageApiOnboardingSchema } from "@/schemas/forms/manage-api/onboarding-schema";
import { getProfile, onBoardingApiManagement, USER_ROLE_CODE } from "@/utils/cms/cms-api-adapter";
import { handleAPIError, toastSuccess } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef, useState } from 'react'
import { useForm } from "react-hook-form";

type FormState = 'idle' | 'submitting'

export function useManageApiOnboarding() {
  const timeout = useRef<NodeJS.Timeout>()
  const router = useRouter();
  const t = useTranslations("common");
  const [formState, setFormState] = useState<FormState>('idle')
  const { token, appCode } = useCookies();
  const [success, setSuccess] = useState(false);

  const formContext = useForm<ManageApiOnboardingSchema>({
    defaultValues: {},
    resolver: customZodResolver(manageApiOnboardingSchema),
  });
  const { handleSubmit } = formContext;
  const isSubmitting = formState === 'submitting'

  const onSubmit = handleSubmit(async (data) => {
    setFormState('submitting')
    try {
      const profile = await getProfile(token, appCode);
      await onBoardingApiManagement(profile, data, USER_ROLE_CODE.INTERNAL);

      setSuccess(true);
      toastSuccess(t("manageApi.form.onboarding.popup.done.title"));
      clearTimeout(timeout.current)
      timeout.current = setTimeout(()=> {
        router.replace("/mapi");
      }, 500)
    } catch (error: unknown) {
      setSuccess(false);
      handleAPIError(t("manageApi.form.onBoarding.errorMessage"));
    } finally {
      setFormState('idle')
    }
  });

  return {
    formContext,
    isSubmitting,
    onSubmit,
    success,
  };
}
