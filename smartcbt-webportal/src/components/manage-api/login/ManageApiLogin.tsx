"use client";

import { Button } from "@/components/Button";
import { NextLink } from "@/components/Link";
import FormCheckbox from "@/components/form/FormCheckbox";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { useManageApiLogin } from "@/components/manage-api/login/ManageApiLogin.hook";
import { useTranslations } from "next-intl";

const ManageApiLogin = () => {
  const t = useTranslations("common");
  const { formContext, onSubmit } = useManageApiLogin();
  const {
    control,
    formState: { errors },
  } = formContext;

  return (
    <div className="grid grid-cols-12 justify-center gap-4 px-5 py-5 md:h-full md:px-20 2xl:px-40">
      <div className="col-span-12 w-full rounded-xl border border-smart-cbt-green bg-white p-4 md:col-span-6 md:col-start-4 md:m-auto">
        <h1 className="w-full py-2 text-center text-lg font-medium text-smart-cbt-green">
          {t("manageApi.form.login.title")}
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
              <div className="my-2 flex w-full flex-col items-center justify-between pr-2 sm:flex-row">
                <FormCheckbox
                  name="remember"
                  control={control}
                  labelClassName="text-xs xl:text-sm text-smart-cbt-medium-grey font-thin"
                  label={t("login.rememberUsernamePassword")}
                />
                <NextLink
                  className="my-2 w-full p-0 text-end text-xs xl:text-sm"
                  href={"/forgot-password"}
                  intent={"primary"}
                  size={"medium"}
                >
                  {t("login.forgotPassword")}
                </NextLink>
              </div>
              <div className="my-3 px-2">
                <Button className="md:max-w-full" size="medium" type="submit" intent={"primary"}>
                  {t("global.login")}
                </Button>
              </div>
              <div className="mb-2 mt-6 flex w-full flex-row justify-center gap-2 px-2">
                <p className="text-sm text-smart-cbt-medium-grey">{t("login.doNotHaveAccount")}</p>
                <NextLink
                  className="h-auto p-0 text-sm underline"
                  href={"/mapi/register"}
                  intent={"whiteButton"}
                  size={"medium"}
                >
                  {t("login.register")}
                </NextLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageApiLogin;
