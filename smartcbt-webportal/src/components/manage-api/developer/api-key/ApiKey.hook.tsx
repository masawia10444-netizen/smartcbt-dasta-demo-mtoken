"use client";
import { useCookies } from "@/hooks/client/useCookies";
import { fetchApiOnBoardingToken, generateToken, getProfile } from "@/utils/cms/cms-api-adapter";
import { useCallback, useMemo, useState } from "react";

export function useManageApiKey() {
  const { token, appCode } = useCookies();
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  const profile = useMemo(async () => {
    const resProfile = await getProfile(token, appCode);

    try {
      const apiToken = await fetchApiOnBoardingToken(resProfile);
      apiToken && setApiKey(apiToken);
    } catch (e) {
      console.log("Error fetchApiOnBoardingToken: ", e);
    } finally {
      setLoading(false);
    }

    return resProfile;
  }, [token, appCode]);

  const handleGenerateToken = useCallback(async () => {
    if (!profile) return;

    try {
      const apiToken = await generateToken(await profile);
      apiToken && setApiKey(apiToken);
    } catch (e) {
      console.log("Error generateToken: ", e);
    }
  }, [profile]);

  const handleCopyToken = useCallback(async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);

    setTimeout(() => setCopied(false), 3000);
  }, [apiKey]);

  return {
    apiKey,
    copied,
    loading,
    handleOnClick: apiKey ? handleCopyToken : handleGenerateToken,
  };
}
