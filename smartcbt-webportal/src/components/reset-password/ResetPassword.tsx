"use client";

import { customZodResolver } from "@/schemas/base-schema";
import { ResetPasswordSchema, resetPasswordSchema } from "@/schemas/forms/reset-password-schema";
import { resetPassword } from "@/utils/cms/adapters/website/users/register";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import DonePopup from "../carbon/projects/manage/Popup/DonePopup";
import FailPopup from "../carbon/projects/manage/Popup/FailPopup";
import FormFloatingLabelTextInput from "../form/FormFloatingLabelTextInput";

type ResetPasswordProps = {};

const ResetPassword = ({}: ResetPasswordProps) => {
  const t = useTranslations("common");

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [showDonePopup, setDoneShowPopup] = useState(false);
  const [showFailPopup, setFailShowPopup] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: customZodResolver(resetPasswordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!token) {
      setFailShowPopup(true);
      return;
    }
    try {
      await resetPassword(token, data.password);
      setDoneShowPopup(true);
    } catch (error) {
      console.log(error);
      setFailShowPopup(true);
    }
  });

  return (
    <Fragment>
      <form className="flex min-w-[42rem] flex-col items-center gap-10 p-10" onSubmit={onSubmit}>
        <h1 className="text-2xl text-smart-cbt-green">{t("restPassword.title")}</h1>
        <div className=" flex w-full flex-col items-center ">
          <FormFloatingLabelTextInput
            placeholder={t("restPassword.password")}
            type="password"
            errorMessage={errors.password?.message}
            useMessage={errors.password?.type == "invalid_type" ? false : true}
            name="password"
            control={control}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.keyCode == 32) {
                e.preventDefault();
              }
            }}
          />
          <FormFloatingLabelTextInput
            placeholder={t("restPassword.confirmPassword")}
            type="password"
            errorMessage={errors.confirmPassword?.message}
            name="confirmPassword"
            useMessage={errors.confirmPassword?.type == "invalid_type" ? false : true}
            control={control}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.keyCode == 32) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="w-full px-2">
          <Button
            intent={isSubmitting ? "disabled" : "primary"}
            type="submit"
            disabled={isSubmitting}
            className="md:max-w-full"
          >
            <p className="text-sm">{t("restPassword.changePassword")}</p>
          </Button>
        </div>
      </form>
      {showDonePopup && (
        <Dialog open={showDonePopup} onClose={close} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
              <DonePopup
                onClose={() => setDoneShowPopup}
                title={t("restPassword.successMessage")}
                redirectPath="/login"
              />
              <Button intent="primary" size="responsive" onClick={() => router.push("/login")} type="button">
                {t("global.ok")}
              </Button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
      {showFailPopup && (
        <Dialog open={showFailPopup} onClose={close} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
              <FailPopup onClose={() => setFailShowPopup(false)} message={t("restPassword.failMessage")} />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </Fragment>
  );
};

export default ResetPassword;
