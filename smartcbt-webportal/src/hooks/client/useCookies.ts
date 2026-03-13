"use client";

import cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "NEXT_TOKEN";
export const REFRESH_TOKEN_KEY = "NEXT_REFRESH_TOKEN";
export const APP_CODE_KEY = "APP_CODE";

function useCookies() {
  const token = cookies.get(ACCESS_TOKEN_KEY);
  const appCode = cookies.get(APP_CODE_KEY);

  return { token: token ?? "", appCode: appCode ?? "" };
}

function useSetCookies(
  accessToken: string | null,
  refreshToken?: string | null,
  expires?: number | null,
  appCode?: string
) {
  if (accessToken) {
    if (expires != null) {
      cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: Date.now() + expires });
      appCode && cookies.set(APP_CODE_KEY, appCode, { expires: Date.now() + expires });
    } else {
      cookies.set(ACCESS_TOKEN_KEY, accessToken);
      appCode && cookies.set(APP_CODE_KEY, appCode);
    }
  }

  if (refreshToken) cookies.set(REFRESH_TOKEN_KEY, refreshToken);
}

function clearSession() {
  cookies.remove("NEXT_TOKEN");
  cookies.remove("NEXT_REFRESH_TOKEN");
  cookies.remove("APP_CODE");
}

export { clearSession, useCookies, useSetCookies };
