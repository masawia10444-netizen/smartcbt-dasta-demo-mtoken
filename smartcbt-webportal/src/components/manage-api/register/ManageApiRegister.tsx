"use client";

import { Button } from "@/components/Button";
import FormCheckbox from "@/components/form/FormCheckbox";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import ConsentPopup from "@/components/manage-api/popup/ConsentPopup";
import DonePopup from "@/components/manage-api/popup/DonePopup";
import { useManageApiRegister } from "@/components/manage-api/register/ManageApiRegister.hook";
import { Collection } from "@/utils/cms/cms-type";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type ManageApiRegisterProps = { policy?: Collection["policies"][] };

const ManageApiRegister = ({ policy }: ManageApiRegisterProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const { formContext, onSubmit, checkConsent, success, showConsentPopup, setShowConsentPopup } = useManageApiRegister({
    consentId: Number(policy?.[0]?.id),
  });
  const {
    control,
    formState: { errors },
  } = formContext;

  return (
    <div className="grid grid-cols-12 justify-center gap-4 px-5 py-5 md:h-full md:px-20 2xl:px-40">
      <div className="col-span-12 w-full rounded-xl border border-smart-cbt-green bg-white p-4 md:col-span-6 md:col-start-4 md:m-auto">
        <h1 className="w-full py-2 text-center text-lg font-medium text-smart-cbt-green">
          {t("manageApi.form.register.title")}
        </h1>
        <div className="px-4">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex-1">
              <FormFloatingLabelTextInput
                placeholder={t("manageApi.form.register.email")}
                name="email"
                type="text"
                showClearButton
                control={control}
                errorMessage={errors?.email?.message}
              />
              <FormFloatingLabelTextInput
                placeholder={t("manageApi.form.register.password")}
                name="password"
                type="password"
                control={control}
                errorMessage={errors?.password?.message}
              />
              <FormFloatingLabelTextInput
                placeholder={t("manageApi.form.register.confirmPassword")}
                type="password"
                name="confirmPassword"
                control={control}
                useMessage
                errorMessage={errors?.confirmPassword?.message}
              />
              <FormFloatingLabelTextInput
                placeholder={t("manageApi.form.register.organization")}
                name="organization"
                type="text"
                showClearButton
                control={control}
                errorMessage={errors?.organization?.message}
              />
              <FormCheckbox
                label={
                  <div className="inline-block">
                    {t("manageApi.form.register.consent")}
                    <button
                      type="button"
                      className="pl-2 text-smart-cbt-green underline hover:no-underline"
                      onClick={() => setShowConsentPopup(true)}
                    >
                      {t("manageApi.form.privacy_policy")}
                    </button>
                  </div>
                }
                name="consent"
                labelClassName="overflow-auto whitespace-normal text-sm break-words"
                control={control}
              />
              <div className="my-3 px-2">
                <Button
                  className="md:max-w-full"
                  size="medium"
                  type="submit"
                  disabled={!checkConsent}
                  intent={!checkConsent ? "disabled" : "primary"}
                >
                  {t("manageApi.form.register.confirmButton")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showConsentPopup && (
        <ConsentPopup
          detail={policy?.[0]?.detail}
          isOpen={showConsentPopup}
          onClose={() => setShowConsentPopup(false)}
        />
      )}
      {success && (
        <DonePopup
          open={success}
          title={t("manageApi.form.register.popup.done.title")}
          onClose={() => router.replace("/mapi/login")}
        />
      )}
    </div>
  );
};

export default ManageApiRegister;
