"use client";

import { clearSession, useCookies } from "@/hooks/client/useCookies";
import { RemoveAccountSchema, removeAccountSchema } from "@/schemas/forms/profile/remove-account";
import { removeUser } from "@/utils/cms/adapters/website/users/register";
import { getProfile } from "@/utils/cms/cms-api-adapter";
import { handleAPIError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export function useRemoveAccount() {
  const router = useRouter();

  const t = useTranslations("common");
  const { token, appCode } = useCookies();
  const [success, setSuccess] = useState(false);

  const formContext = useForm<RemoveAccountSchema>({
    resolver: zodResolver(removeAccountSchema),
    defaultValues: { confirm: false },
  });
  const { setValue, handleSubmit } = formContext;

  const onSubmit = handleSubmit(async (data) => {
    const { id, email, password } = data;
    const payload = { email, password };

    try {
      const response = await removeUser(id, payload);
      setSuccess(true);
      if (response === true) {
        clearSession();
        router.push("/");
      }
    } catch (error: unknown) {
      setSuccess(false);
      handleAPIError(t("profile.removeAccount.popup.error.title"));
    }
  });

  useMemo(async () => {
    const profile = await getProfile(token, appCode);
    const { user_id, email } = profile;
    setValue("id", user_id?.id);
    setValue("email", email);
  }, [token, appCode, setValue]);

  return {
    onSubmit,
    formContext,
    success,
  };
}
