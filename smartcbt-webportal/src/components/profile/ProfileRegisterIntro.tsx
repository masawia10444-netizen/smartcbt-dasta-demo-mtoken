"use client";

import { NextLink } from "@/components/Link";
import { useTranslations } from "next-intl";
import Image from "@/components/image";

type ProfileRegisterIntroProps = {
  buttonText: string;
  description: string;
  href: string;
};

const ProfileRegisterIntro = (props: ProfileRegisterIntroProps) => {
  const t = useTranslations("common");
  const { buttonText, description, href } = props;

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 p-4 sm:p-8 md:p-12 lg:p-24 text-center">
      <Image src="/images/photo-bank/question.png" alt="DASTA" width={100} height={100} />
      <span className="text-lg md:text-2xl font-normal whitespace-pre-line">{description}</span>
      <NextLink intent={"primaryButton"} size={"medium"} href={href}>
        {buttonText}
      </NextLink>
    </div>
  );
};

export default ProfileRegisterIntro;
