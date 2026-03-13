"use client";

import { useCookies } from "@/hooks/client/useCookies";
import { addIpAddress, getProfile, listIpRestriction, removeIpAddress } from "@/utils/cms/cms-api-adapter";
import { useCallback, useMemo, useState } from "react";

export function useManageApiSecurity() {
  const { token, appCode } = useCookies();
  const [dataIpAddress, setDataIpAddress] = useState([]);
  const profile = useMemo(async () => await getProfile(token, appCode), [token, appCode]);

  const fetchListIP = useCallback(async () => {
    if (!profile) return;

    try {
      const list = await listIpRestriction(await profile);
      setDataIpAddress(list);
    } catch (e) {
      console.log("Error listIpRestriction: ", e);
    }
  }, [profile]);

  const handleAddIpAddress = useCallback(
    async (ipAddress: string) => {
      if (!profile) return;

      try {
        await addIpAddress(await profile, ipAddress);
        await fetchListIP();
      } catch (e) {
        console.log("Error addIpAddress: ", e);
      }
    },
    [profile, fetchListIP]
  );

  const handleRemoveIpAddress = useCallback(
    async (ipAddress: string) => {
      if (!profile) return;

      try {
        await removeIpAddress(await profile, ipAddress);
        await fetchListIP();
      } catch (e) {
        console.log("Error removeIpAddress: ", e);
      }
    },
    [profile, fetchListIP]
  );

  useMemo(async () => {
    if (!profile) return;
    await fetchListIP();
  }, [profile, fetchListIP]);

  return {
    dataIpAddress,
    handleAddIpAddress,
    handleRemoveIpAddress,
  };
}
