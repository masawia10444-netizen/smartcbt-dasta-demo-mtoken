"use client";

import { NextLink } from "@/components/Link";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { getIsOnBoarding } from "@/utils/manage-api";
import { useTranslations } from "next-intl";
import Image from "@/components/image";

type ManageApiMainProps = {
  profile?: Profile;
};

const ManageApiMain = ({ profile }: ManageApiMainProps) => {
  const t = useTranslations("common");
  console.log('Profile::', profile)
  const isOnboarding = getIsOnBoarding(profile?.roles) ?? false;

  const buttonUrl = isOnboarding ? `/mapi/developer` : !!profile ? `/mapi/onboarding` : `/mapi/register`;

  return (
    <div className="min-h-screen bg-[url('/images/manage-api/main-bg.png')] bg-contain bg-right-top bg-no-repeat">
      <div className="flex flex-col-reverse items-center gap-4 md:min-h-screen md:flex-row md:gap-10">
        <div className="flex flex-col gap-8 p-8 text-center md:flex-[1_1_40%] md:gap-10">
          <h2 className="text-4xl font-semibold text-smart-cbt-green lg:text-6xl">{t("manageApi.overview.title")}</h2>
          <p className="font-thin text-smart-cbt-dark-green lg:text-lg">{t("manageApi.overview.description")}</p>
          <NextLink
            href={buttonUrl}
            intent={"primaryButton"}
            className="w-fit-content block h-auto w-full rounded-full p-4 py-2"
          >
            {t("manageApi.overview.button")}
          </NextLink>
        </div>
        <div className={`relative mt-16 h-[300px] w-full md:mt-0 md:h-[70vh] md:flex-[1_1_60%]`}>
          <Image src={"/images/manage-api/home.png"} fill alt={"apim-home"} style={{ objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
};

export default ManageApiMain;
