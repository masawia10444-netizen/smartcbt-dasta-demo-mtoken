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
    <div className="flex flex-col items-center gap-8 p-24">
      <Image src="/images/photo-bank/question.png" alt="DASTA" width={100} height={100} />
      <span className="text-2xl font-normal">{description}</span>
      <NextLink intent={"primaryButton"} size={"medium"} href={href}>
        {buttonText}
      </NextLink>
    </div>
  );
};

export default ProfileRegisterIntro;
