"use client";

import { customZodResolver } from "@/schemas/base-schema";
import { ForgotPasswordSchema, forgotPasswordSchema } from "@/schemas/forms/forgot-password-schema";
import { forgetPassword } from "@/utils/cms/adapters/website/users/register";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { ArrowLeftIcon } from "../Icon";
import { NextLink } from "../Link";
import DonePopup from "../carbon/projects/manage/Popup/DonePopup";
import FailPopup from "../carbon/projects/manage/Popup/FailPopup";
import FloatingLabelTextInput from "../form/FormFloatingLabelTextInput";

const ForgotPasswordForm = () => {
  const t = useTranslations("common");

  const [showDonePopup, setDoneShowPopup] = useState(false);
  const [showFailPopup, setFailShowPopup] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: customZodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await forgetPassword(data.email);
      setDoneShowPopup(true);
    } catch (error) {
      console.log(error);
      setFailShowPopup(true);
    }
  });

  return (
    <Fragment>
      <div className="relative h-full">
        <div className="flex h-full flex-col items-start px-4 py-10 md:px-20">
          <NextLink
            className="no-underline md:pl-0"
            href={"/login"}
            icon={<ArrowLeftIcon />}
            intent={"whiteButton"}
            size={"medium"}
          >
            {t("global.back")}
          </NextLink>
          <form className="mt-8 flex w-full flex-col items-center space-y-4 md:mt-20 md:space-y-8" onSubmit={onSubmit}>
            <h1 className="text-center text-2xl font-medium text-smart-cbt-green md:text-4xl">
              {t("forgotPassword.title")}
            </h1>
            <div className="w-full">
              <FloatingLabelTextInput
                placeholder={t("global.email")}
                type="email"
                errorMessage={errors.email?.message}
                name="email"
                control={control}
              />
            </div>
            <div className="w-full px-2">
              <Button
                intent={isSubmitting ? "disabled" : "primary"}
                type="submit"
                disabled={isSubmitting}
                className="md:max-w-full"
              >
                <p className="text-sm">{t("forgotPassword.requestNewPassword")}</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
      {showDonePopup && (
        <Dialog open={showDonePopup} onClose={close} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
              <DonePopup onClose={() => setDoneShowPopup(false)} title={t("forgotPassword.successMessage")} />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
      {showFailPopup && (
        <Dialog open={showFailPopup} onClose={close} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
              <FailPopup onClose={() => setFailShowPopup(false)} />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </Fragment>
  );
};

export default ForgotPasswordForm;
