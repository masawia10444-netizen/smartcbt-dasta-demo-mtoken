"use client";

import { login, loginWithMToken } from "@/app/[locale]/(index)/(unauthenticated)/login/actions";
import { customZodResolver } from "@/schemas/base-schema";
import { SignInWithEmailSchema, signInWithEmailSchema } from "@/schemas/forms/signin-schema";
import { handleAPIError, toastSuccess } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { LoadingSpinningIcon } from "../Icon";
import { NextLink } from "../Link";
import FormCheckbox from "../form/FormCheckbox";
import FloatingLabelTextInput from "../form/FormFloatingLabelTextInput";

const LoginForm = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const processedMTokenRef = useRef<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isPendingMToken, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInWithEmailSchema>({
    resolver: customZodResolver(signInWithEmailSchema),
    defaultValues: {
      input: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    const appId = searchParams.get("appId");
    const mToken = searchParams.get("mToken");
    const appCode = searchParams.get("appCode") || "PORTAL";
    const requestKey = appId && mToken ? `${appId}:${mToken}:${appCode}` : null;

    if (!requestKey || processedMTokenRef.current === requestKey) return;

    processedMTokenRef.current = requestKey;

    setIsLoading(true);
    console.log("Starting mToken login with:", { appId, mToken });

    startTransition(() => {
      loginWithMToken({
        appId: appId as string,
        mToken: mToken as string,
        appCode,
      })
        .then((result) => {
          console.log("loginWithMToken result:", result);
          
          if (result?.error) {
            console.error("mToken login error:", result.error);
            handleAPIError(result.error);
            setIsLoading(false);
            return;
          }

          if (result?.redirectTo) {
            console.log("Redirecting to:", result.redirectTo);
            if (result.source === "login") {
              toastSuccess(t("login.successMessage"));
            }
            router.replace(result.redirectTo);
            return;
          }

          console.error("No redirectTo in result:", result);
          handleAPIError("ไม่สามารถเข้าสู่ระบบด้วย mToken ได้: โปรดตรวจสอบ appId และ mToken ของคุณ");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("mToken login catch error:", error);
          handleAPIError("ไม่สามารถเข้าสู่ระบบด้วย mToken ได้: โปรดตรวจสอบ appId และ mToken ของคุณ");
          setIsLoading(false);
        });
    });
  }, [router, searchParams, t]);

  const emailRegex = /\S+@\S+\.\S+/;
  const phoneNumberRegex = /^\d{10}$/;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    let input;
    if (emailRegex.test(data.input)) {
      input = { email: data.input };
    } else if (phoneNumberRegex.test(data.input)) {
      input = { phoneNumber: data.input };
    } else {
      handleAPIError(t("login.doNotHaveAccountMessage"));
      setIsLoading(false);
      return;
    }
    const signInResult = await login({
      ...input,
      password: data.password,
      appCode: "PORTAL",
      redirect: false,
    });
    if (signInResult?.error) {
      handleAPIError(signInResult.error);
      setIsLoading(false);
    } else {
      router.replace("/main-menus");
      toastSuccess(t("login.successMessage"));
      setIsLoading(false);
    }
  });

  return (
    <div className="relative mx-auto h-full">
      <div className="flex h-full flex-row items-center px-4 py-6 xl:px-20">
        <form className="mt-4 flex w-full flex-col items-center space-y-2 md:space-y-4" onSubmit={onSubmit}>
          <h1 className="text-center text-2xl font-medium text-smart-cbt-green md:text-4xl">{t("login.title")}</h1>
          <FloatingLabelTextInput
            placeholder={t("login.loginInput")}
            type="input"
            errorMessage={errors?.input?.message}
            control={control}
            name="input"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.keyCode == 32) {
                e.preventDefault();
              }
            }}
          />
          <FloatingLabelTextInput
            placeholder={t("global.password")}
            errorMessage={errors?.password?.message}
            type="password"
            control={control}
            name="password"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.keyCode == 32) {
                e.preventDefault();
              }
            }}
          />
          <div className="flex w-full flex-col items-center justify-between px-2 sm:flex-row">
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
          <Button
            intent={isLoading || isSubmitting || isPendingMToken ? "disabled" : "primary"}
            disabled={isLoading || isSubmitting || isPendingMToken}
            type="submit"
            className="px-2 md:max-w-full"
          >
            <div className="flex w-full flex-row items-center justify-center gap-4">
              {(isLoading || isSubmitting || isPendingMToken) && <LoadingSpinningIcon className="h-6 w-6" />}
              <p className="text-sm">{t("global.login")}</p>
            </div>
          </Button>
          <div className="flex w-full flex-row justify-center gap-2 px-2 pt-4 md:pt-8">
            <p className="text-sm text-smart-cbt-medium-grey">{t("login.doNotHaveAccount")}</p>
            <NextLink
              className="h-auto p-0 text-sm underline"
              href={"/register"}
              intent={"whiteButton"}
              size={"medium"}
            >
              {t("login.register")}
            </NextLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
