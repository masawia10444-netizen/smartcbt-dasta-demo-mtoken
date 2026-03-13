import { MockCommunity } from "@/models/travel-mart/travel-mart-community";
import { useTranslations } from "next-intl";
import Image from "@/components/image";

type CommunityDetailCommunityResponseProps = {
  community: MockCommunity;
};

export const CommunityDetailCommunityResponse = (props: CommunityDetailCommunityResponseProps) => {
  const t = useTranslations("common");
  return (
    <div className="flex flex-row items-center w-full px-4 gap-9 py-9 md:container md:mx-auto">
      <div className="relative w-20 h-20">
        <Image src="/images/travel-mart/community/partnership-icon.png" fill alt="" style={{ objectFit: "cover" }} />
      </div>
      <div className="text-2xl font-medium text-smart-cbt-green">{t("community.detail.communityResponse")}</div>
    </div>
  );
};
