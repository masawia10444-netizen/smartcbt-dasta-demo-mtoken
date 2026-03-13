"use server";

import { findUserAccountByEmail, loginWithStaticTokenByEmail } from "@/utils/cms/adapters/website/users/register";
import { loginEmail, loginMobile } from "@/utils/cms/cms-api-adapter";
import { fetchMTokenProfile, setMTokenRegisterProfileCookie } from "@/utils/mtoken";
import { extractAuthErrorMessage, extractErrorMessage } from "@/utils/error";
import { clearSession } from "@/utils/session";
import { setCookies } from "@/utils/token";
import { revalidatePath } from "next/cache";

export async function login(body: Record<string, any | string>) {
  try {
    let token = null;
    let expires = null;
    let refreshToken = null;
    if (body.phoneNumber) {
      const mobileData = await loginMobile(body.phoneNumber, body.password.trim(), body.appCode);
      if (mobileData.access_token) {
        token = mobileData.access_token;
        expires = mobileData.expires;
        refreshToken = mobileData.refresh_token;
      }
    } else {
      const emailData = await loginEmail(body.email.trim(), body.password.trim(), body.appCode);
      if (emailData.access_token) {
        token = emailData.access_token;
        expires = emailData.expires;
        refreshToken = emailData.refresh_token;
      }
    }
    if (token == null) return { error: "ไม่มีบัญชีโปรดตรวจสอบ อีเมล/โทรศัพท์ หรือ รหัสผ่าน" };
    await setCookies(token, refreshToken, expires, body.appCode);
    return { success: true };
} catch (error) {
  console.log("login error:", error);
  return {
    error: extractAuthErrorMessage(error, "เข้าสู่ระบบไม่สำเร็จ"),
  };
}
}

export async function loginWithMToken(body: { appId: string; mToken: string; appCode?: string }) {
  const appCode = body.appCode || "PORTAL";

  try {
    console.log("loginWithMToken: Fetching profile for:", body.appId);
    let profile: any;
    
    try {
      profile = await fetchMTokenProfile(body.appId, body.mToken);
    } catch (profileError) {
      console.error("loginWithMToken: fetchMTokenProfile failed:", profileError);
      const errorMsg = extractErrorMessage(profileError, "ไม่สามารถดึงข้อมูลโปรไฟล์จาก mToken ได้");
      return { error: errorMsg };
    }

    console.log("loginWithMToken: Profile fetched:", { userId: profile?.userId, email: profile?.email });
    
    const email = String(profile?.email || "").trim().toLowerCase();

    if (!email) {
      console.log("loginWithMToken: No email found in profile");
      return { error: "ไม่พบอีเมลจากข้อมูล mToken" };
    }

    console.log("loginWithMToken: Looking for existing user with email:", email);
    let existingUser: any;
    
    try {
      existingUser = await findUserAccountByEmail(email);
    } catch (findError) {
      console.error("loginWithMToken: findUserAccountByEmail failed:", findError);
      const errorMsg = extractErrorMessage(findError, "ไม่สามารถค้นหาผู้ใช้ได้");
      return { error: errorMsg };
    }

    console.log("loginWithMToken: Existing user found:", !!existingUser);

    if (existingUser) {
      console.log("loginWithMToken: Getting auth data for existing user");
      let authData: any;
      
      try {
        authData = await loginWithStaticTokenByEmail(email, appCode);
      } catch (authError) {
        console.error("loginWithMToken: loginWithStaticTokenByEmail failed:", authError);
        const errorMsg = extractAuthErrorMessage(authError, "ไม่สามารถสร้าง token ได้");
        return { error: errorMsg };
      }

      console.log("loginWithMToken: Auth data received:", !!authData?.access_token);
      
      if (!authData || !authData?.access_token) {
        console.log("loginWithMToken: No access token from auth data");
        return { error: "ไม่สามารถสร้าง access token สำหรับผู้ใช้ได้" };
      }

      console.log("loginWithMToken: Setting cookies");
      try {
        await setCookies(authData.access_token, authData.refresh_token, authData.expires, appCode);
      } catch (cookieError) {
        console.error("loginWithMToken: setCookies failed:", cookieError);
        const errorMsg = extractErrorMessage(cookieError, "ไม่สามารถตั้งค่า cookies ได้");
        return { error: errorMsg };
      }

      console.log("loginWithMToken: Cookies set, returning redirect to main-menus");
      return { redirectTo: "/main-menus", source: "login" };
    }

    console.log("loginWithMToken: User is new, setting registration profile cookie");
    try {
      await setMTokenRegisterProfileCookie(profile);
    } catch (cookieError) {
      console.error("loginWithMToken: setMTokenRegisterProfileCookie failed:", cookieError);
      const errorMsg = extractErrorMessage(cookieError, "ไม่สามารถตั้งค่า registration cookie ได้");
      return { error: errorMsg };
    }

    console.log("loginWithMToken: Registration profile cookie set, returning redirect to register");
    return { redirectTo: "/register?mtoken=1", source: "register" };
  } catch (error) {
    console.error("loginWithMToken: Unexpected error:", error);
    const message = extractErrorMessage(error, "ไม่สามารถเข้าสู่ระบบด้วย mToken ได้");
    return { error: message };
  }
}

export async function logout() {
  clearSession();
  revalidatePath("/");
}
