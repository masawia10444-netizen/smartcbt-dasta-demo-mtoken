import { Session } from "@/contexts/Auth.context";
import useCookies from "@/hooks/useCookies";
import { cookies } from "next/headers";
import { getProfile } from "./cms/cms-api-adapter";

export async function getSession() {
  const { appCode, token } = useCookies();

  try {
    if (!token || !appCode) return null;

    const user = await getProfile(token, appCode);
    const session = {
      user: user,
      sub: user.id,
    };
    return session as Session;
  } catch (errors: unknown) {
    console.log("session: ", errors);
    clearSession();
    return null;
  }
}

export async function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete("NEXT_TOKEN");
  cookieStore.delete("NEXT_REFRESH_TOKEN");
  cookieStore.delete("APP_CODE");
}
