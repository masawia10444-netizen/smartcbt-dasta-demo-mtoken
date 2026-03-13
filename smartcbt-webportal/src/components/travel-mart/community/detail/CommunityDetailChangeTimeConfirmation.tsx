import { Button } from "@/components/Button";
import { MockCommunity } from "@/models/travel-mart/travel-mart-community";
import { useTranslations } from "next-intl";
import Image from "@/components/image";

type CommunityDetailChangeTimeConfirmationProps = {
  community: MockCommunity;
};

export const CommunityDetailChangeTimeConfirmation = (props: CommunityDetailChangeTimeConfirmationProps) => {
  const t = useTranslations("common");
  return (
    <div className="flex flex-row items-center w-full px-4 gap-9 py-9 md:container md:mx-auto">
      <div className="relative w-32 h-32 ">
        <Image src="/images/travel-mart/community/time-changes-icon.png" fill alt="" style={{ objectFit: "cover" }} />
      </div>
      <div className="grow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <div className="text-xl font-medium text-smart-cbt-red">{t("community.detail.changeNegotiationTime")}</div>
            <div className="text-base text-smart-cbt-dark-grey">{t("community.detail.communityRequestChangeTime")}</div>
          </div>
          <div className="text-lg font-medium text-smart-cbt-red">
            {/* TODO: Will fix this onces the api is ready */}
            วันศุกร์ที่ 4 สิงหาคม 2566 เวลา 9 : 30 น.
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <Button
          intent={"primary"}
          size={"medium"}
          onClick={() => {
            // TODO: Will handle this onces the api is ready
          }}
        >
          {t("community.detail.confirmChangeTime")}
        </Button>
        <Button
          intent={"text"}
          size={"medium"}
          onClick={() => {
            // TODO: Will handle this onces the api is ready
          }}
        >
          {t("community.detail.cancelNegotiation")}
        </Button>
      </div>
    </div>
  );
};
