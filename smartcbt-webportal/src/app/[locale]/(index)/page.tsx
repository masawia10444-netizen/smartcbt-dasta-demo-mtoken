"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    const landingUrl = `/landing${params ? `?${params}` : ""}`;
    router.replace(landingUrl);
  }, [router, searchParams]);

  return null;
}
