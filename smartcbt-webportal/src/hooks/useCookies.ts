"use server";

import { cookies } from "next/headers";

function useCookies() {
  const cookieStore = cookies();

  const token = cookieStore.get("NEXT_TOKEN")?.value;
  const appCode = cookieStore.get("APP_CODE")?.value;

  return { token: token ?? "", appCode: appCode ?? "" };
}

export default useCookies;
