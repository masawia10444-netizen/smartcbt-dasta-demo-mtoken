"use client";

import { PhotographerInfo } from "@/models/profile";
import { Consents } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import ProfileRegisterIntro from "../ProfileRegisterIntro";
import ProfilePhotoBankRegisterForm from "./ProfilePhotoBankRegisterForm";
import { GetPhotoGrapherProfile } from "@/app/[locale]/(authenticated)/profile/photo-bank/action";

type ProfilePhotoBankProps = {
  consents: Consents[];
  photographerInfo?: GetPhotoGrapherProfile | null;
};

const ProfilePhotoBank = (props: ProfilePhotoBankProps) => {
  const t = useTranslations("common");

  const searchParams = useSearchParams();
  const register = searchParams.get("register");

  return (
    <div className="m-4 md:m-8 flex flex-col gap-4 rounded-2xl border border-smart-cbt-green bg-white p-4 sm:p-6 md:p-10">
      <div className="text-xl md:text-2xl font-medium text-smart-cbt-dark-green">{t("profile.photoBank.title")}</div>
      {(props.photographerInfo == null && register == "true") || props.photographerInfo != null ? (
        <ProfilePhotoBankRegisterForm consents={props.consents} photographerInfo={props.photographerInfo} />
      ) : (
        <ProfileRegisterIntro
          buttonText={t("profile.photoBank.register")}
          description={t("profile.photoBank.registerDetail")}
          href={"/profile/photo-bank?register=true"}
        />
      )}
    </div>
  );
};

export default ProfilePhotoBank;
