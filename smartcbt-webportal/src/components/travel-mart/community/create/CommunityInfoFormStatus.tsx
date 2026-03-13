import { ShieldCheck, XCircleIcon } from "@/components/Icon";
import { MockActivityStatus, MockCommunity } from "@/models/travel-mart/travel-mart-community";
import { useTranslations } from "next-intl";
import Image from "@/components/image";

type CommunityInfoFormStatusProps = {
  community?: MockCommunity | null;
};

export const CommunityInfoFormStatus = (props: CommunityInfoFormStatusProps) => {
  const t = useTranslations("common");

  return (
    <>
      {props.community?.status == MockActivityStatus.WaitingForApprove && (
        <div className="flex flex-row items-center gap-2 ">
          <div className="relative h-[24px] w-[24px]">
            <Image src="/images/travel-mart/community/deadline-icon.png" fill alt="" style={{ objectFit: "cover" }} />
          </div>
          <div className="text-smart-cbt-orange">{t("community.info.create.waitingForApprove")}</div>
        </div>
      )}
      {props.community?.status == MockActivityStatus.Rejected && (
        <div className="flex flex-row items-center gap-2 text-smart-cbt-red">
          <XCircleIcon className="w-6 text-white fill-smart-cbt-red" />
          <div>{t("community.info.create.rejected")}</div>
          <div>*{t("community.info.create.rejectReason")} : </div>
          <div>{props.community.rejectReason}</div>
        </div>
      )}
      {props.community?.status == MockActivityStatus.Approved && (
        <div className="flex flex-row items-center gap-2">
          <ShieldCheck className="w-6 text-smart-cbt-green" />
          <div className="text-smart-cbt-green">{t("community.status.approved")}</div>
        </div>
      )}
    </>
  );
};
