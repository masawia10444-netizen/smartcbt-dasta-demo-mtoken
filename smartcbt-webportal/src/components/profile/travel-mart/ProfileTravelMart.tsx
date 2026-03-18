"use client";

import { NextLink } from "@/components/Link";
import { useSession } from "@/components/context-provider/AuthProvider";
import Image from "@/components/image";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import ProfileRegisterIntro from "../ProfileRegisterIntro";
import ProfileTravelMartForm from "./ProfileTravelMartForm";

type ProfileTravelMartProps = {};

const ProfileTravelMart = ({}: ProfileTravelMartProps) => {
  const t = useTranslations("common");

  const { session } = useSession();
  const user = session?.user;

  return (
    <div className="m-4 md:m-8 flex flex-col gap-4 divide-y-2 rounded-2xl border border-smart-cbt-green bg-white p-4 md:p-8">
      {user?.communities !== null || user.organizations !== null ? (
        <Fragment>
          <div className="flex flex-row justify-between">
            <div className="text-2xl font-medium text-smart-cbt-dark-green">{t("profile.travelMart.title")}</div>
            <NextLink intent={"primaryOutlineButton"} href="/travel-mart/profile" size="medium" className="w-fit px-5">
              {t("profile.travelMart.gotoWebsite")}
            </NextLink>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pt-6 lg:pt-10 items-center lg:items-start">
            <div className="w-fit shrink-0">
              <div className="relative h-32 w-32 md:h-60 md:w-60 items-center justify-center rounded-full bg-smart-cbt-orange-2 text-center text-xl uppercase text-black">
                {(session?.user as any)?.image ? (
                  <Image
                    src={(session?.user as any)?.image}
                    alt={(session?.user as any)?.first_name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className="text-center text-7xl">
                      {(session?.user?.first_name ?? "")
                        .split(" ")
                        .slice(0, 2)
                        .map((x: string) => x.charAt(0).toUpperCase())
                        .join("")}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ProfileTravelMartForm user={user} />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="text-2xl font-medium text-smart-cbt-dark-green">{t("profile.travelMart.title")}</div>
          <ProfileRegisterIntro
            buttonText={t("profile.travelMart.registerIntro.buttonText")}
            href="/travel-mart/register/portal"
            description={t("profile.travelMart.registerIntro.description")}
          />
        </Fragment>
      )}
    </div>
  );
};

export default ProfileTravelMart;
