"use client";

import { useSetCookies } from "@/hooks/client/useCookies";
import { customZodResolver } from "@/schemas/base-schema";
import { ManageApiLoginSchema, manageApiLoginSchema } from "@/schemas/forms/manage-api/login-schema";
import { APP_CODE } from "@/utils/cms/adapters/website/api-management";
import { loginEmail } from "@/utils/cms/cms-api-adapter";
import { handleAPIError } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useManageApiLogin() {
  const router = useRouter();
  const formContext = useForm<ManageApiLoginSchema>({
    defaultValues: { remember: false },
    resolver: customZodResolver(manageApiLoginSchema),
  });
  const { handleSubmit } = formContext;

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      let token = null;
      let expires = null;
      let refreshToken = null;
      const signInResult = await loginEmail(email, password, APP_CODE);

      if (signInResult.access_token) {
        token = signInResult.access_token;
        expires = signInResult.expires;
        refreshToken = signInResult.refresh_token;
      }

      useSetCookies(token, refreshToken, expires, APP_CODE);
      router.replace("/mapi");
    } catch (error: unknown) {
      handleAPIError(error);
    }
  });

  return {
    formContext,
    onSubmit,
  };
}
