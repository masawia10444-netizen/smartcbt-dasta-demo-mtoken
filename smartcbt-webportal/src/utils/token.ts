import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import cmsApi from "./cms/cms-api";

enum Cookies {
  AccessToken = "NEXT_TOKEN",
  RefreshToken = "NEXT_REFRESH_TOKEN",
}

export const ACCESS_TOKEN_KEY = "NEXT_TOKEN";
export const REFRESH_TOKEN_KEY = "NEXT_REFRESH_TOKEN";
export const APP_CODE_KEY = "APP_CODE";
export const MTOKEN_SESSION_KEY = "MTOKEN_SESSION";

export async function setTokens(res: NextResponse, accessToken: string, refreshToken: string) {
  res.cookies.set(Cookies.AccessToken, accessToken);
  await cmsApi.setToken(accessToken);
  if (refreshToken) res.cookies.set(Cookies.RefreshToken, refreshToken);
}

export async function setCookies(
  accessToken: string | null,
  refreshToken?: string | null,
  expires?: number | null,
  appCode?: string
) {
  const cookieStore = cookies();
  const maxAge = 60 * 60 * 24 * 30; /* 30 Days */
  const refreshTokenMaxAge = 7 * 24 * 60 * 60; /* 7 Days */

  if (accessToken) {
    await cmsApi.setToken(accessToken);
    if (expires != null) {
      cookieStore.set(ACCESS_TOKEN_KEY, accessToken, { expires: Date.now() + expires });
      appCode && cookieStore.set(APP_CODE_KEY, appCode, { expires: Date.now() + expires });
    } else {
      cookieStore.set(ACCESS_TOKEN_KEY, accessToken, { maxAge: maxAge });
      appCode && cookieStore.set(APP_CODE_KEY, appCode, { maxAge: maxAge });
    }
  }
  if (refreshToken) cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, { maxAge: refreshTokenMaxAge });
}

export function setMTokenSession(isMToken: boolean) {
  const cookieStore = cookies();
  const maxAge = 60 * 60 * 24 * 30; /* 30 Days */
  
  if (isMToken) {
    cookieStore.set(MTOKEN_SESSION_KEY, "true", { maxAge });
  } else {
    cookieStore.delete(MTOKEN_SESSION_KEY);
  }
}
