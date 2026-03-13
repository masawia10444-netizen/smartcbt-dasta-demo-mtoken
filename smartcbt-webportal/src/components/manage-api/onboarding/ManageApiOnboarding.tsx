"use client";

import { Button } from "@/components/Button";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { useManageApiOnboarding } from "@/components/manage-api/onboarding/ManageApiOnboarding.hook";
import DonePopup from "@/components/manage-api/popup/DonePopup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type ManageApiOnboardingProps = {};

const ManageApiOnboarding = (props: ManageApiOnboardingProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const { formContext, isSubmitting, onSubmit, success } = useManageApiOnboarding();
  const {
    control,
    formState: { errors },
  } = formContext;

  return (
    <div className="grid grid-cols-12 justify-center gap-4 px-5 py-5 md:h-full md:px-20 2xl:px-40">
      <div className="col-span-12 w-full rounded-xl border border-smart-cbt-green bg-white p-4 md:col-span-6 md:col-start-4 md:m-auto">
        <h1 className="w-full py-2 text-center text-lg font-medium text-smart-cbt-green">
          {t("manageApi.form.onboarding.title")}
        </h1>
        <div className="px-4">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex-1">
              <FormFloatingLabelTextInput
                name="firstName"
                control={control}
                type="text"
                placeholder={t("manageApi.form.onboarding.firstName")}
                showClearButton
                errorMessage={errors?.firstName?.message}
              />
              <FormFloatingLabelTextInput
                name="lastName"
                control={control}
                type="text"
                placeholder={t("manageApi.form.onboarding.lastName")}
                showClearButton
                errorMessage={errors?.lastName?.message}
              />
              <FormFloatingLabelTextInput
                name="organization"
                control={control}
                type="text"
                placeholder={t("manageApi.form.onboarding.organization")}
                isRequired
                showClearButton
                errorMessage={errors?.organization?.message}
              />
              <div className="my-3 px-2">
                <Button intent={"primary"} className="md:max-w-full" size="medium" type="submit" disabled={isSubmitting}>
                  {t("manageApi.form.onboarding.confirmButton")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/*{success && (*/}
      {/*  <DonePopup*/}
      {/*    open={success}*/}
      {/*    title={t("manageApi.form.onboarding.popup.done.title")}*/}
      {/*    onClose={() => router.replace("/mapi/login")}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default ManageApiOnboarding;
