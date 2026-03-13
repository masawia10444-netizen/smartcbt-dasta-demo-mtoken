"use client";

import { Schedule } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "@/components/image";
import { useEffect, useState } from "react";

type RequestNotificationProps = {
  organizationId?: number;
  requestNotifications?: Schedule[];
  type: "entrepreneur" | "community";
};

const RequestNotification = ({ organizationId, requestNotifications, type }: RequestNotificationProps) => {
  const t = useTranslations("common");

  const [notifications, setNotifications] = useState<Schedule[]>([]);

  const count = notifications?.length;

  const enabled = count > 0;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!requestNotifications) return;
      setNotifications(requestNotifications);
    };
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, [requestNotifications]);

  return (
    <div>
      {count > 0 && type === "community" && (
        <Link href={"/travel-mart/business-negotiation/community"}>
          <div className="relative flex w-52 flex-col items-center gap-4 rounded-3xl border-2 border-smart-cbt-orange bg-smart-cbt-yellow-2 p-4">
            <div className="relative">
              <Image
                src="/images/travel-mart/recommend/bell-icon.png"
                width={40}
                height={40}
                style={{ objectFit: "cover" }}
                alt=""
              />
              {enabled && <p className="absolute -right-2 -top-1 rounded-full bg-red-500 px-2 text-white">{count}</p>}
            </div>
            <div className="text-center text-smart-cbt-orange">{t("recommend.community.businessMeetingRequest")}</div>
          </div>
        </Link>
      )}

      {count > 0 && type === "entrepreneur" && (
        <Link href={"/travel-mart/business-negotiation/entrepreneur?tab=waiting-accept"}>
          <div className="relative flex w-52 flex-col items-center gap-4 rounded-3xl border-2 border-smart-cbt-orange bg-smart-cbt-yellow-2 p-4">
            <div className="relative">
              <Image
                src="/images/travel-mart/recommend/bell-icon.png"
                width={40}
                height={40}
                style={{ objectFit: "cover" }}
                alt=""
              />
              {enabled && <p className="absolute -right-2 -top-1 rounded-full bg-red-500 px-2 text-white">{count}</p>}
            </div>
            <div className="text-center text-smart-cbt-orange">{t("recommend.community.businessMeetingRequest")}</div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default RequestNotification;
