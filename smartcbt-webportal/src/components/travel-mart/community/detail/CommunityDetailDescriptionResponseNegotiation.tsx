import { Button } from "@/components/Button";
import { CommunityDetail } from "@/models/travel-mart/travel-mart-community";
import { convertDateSelection } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AcceptNegotiationPopup from "../../matching-popup/accept-negotiation/AcceptNegotiationPopup";
import RejectNegotiationPopup from "../../matching-popup/reject-negotiation/RejectNegotiationPopup";
import { CheckCommunityJSON } from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import { CommunityScheduleSlotsByCommunityIdJSON } from "@/utils/cms/cms-api-adapter";

type CommunityDetailDescriptionResponseNegotiationProps = {
  community: CommunityDetail;
  checkCommunity?: CheckCommunityJSON;
  communityScheduleSlotsByCommunityId?: CommunityScheduleSlotsByCommunityIdJSON;
};

export const CommunityDetailDescriptionResponseNegotiation = (
  props: CommunityDetailDescriptionResponseNegotiationProps
) => {
  const { communityScheduleSlotsByCommunityId: communityScheduleSlots, checkCommunity,community } = props;

  const t = useTranslations("common");
  const [showAcceptNegotiationPopup, setShowAcceptNegotiationPopup] = useState(false);
  const [showRejectNegotiationPopup, setShowRejectNegotiationPopup] = useState(false);

  return (
    <div>
      <div className="flex w-full flex-row gap-6 px-4 py-9 md:container md:mx-auto">
        <Button
          className="w-full rounded-full shadow-md"
          intent={"primary"}
          size={"small"}
          onClick={() => setShowAcceptNegotiationPopup(true)}
        >
          {t("community.detail.acceptBusinessNegotiation")}
        </Button>
        <Button
          className="w-full text-black hover:underline"
          intent={"text"}
          size={"small"}
          onClick={() => setShowRejectNegotiationPopup(true)}
        >
          {t("community.detail.rejectBusinessNegotiation")}
        </Button>
      </div>
      {showAcceptNegotiationPopup && (
        <AcceptNegotiationPopup
          scheduleId={checkCommunity?.id}
          id={community.id ?? 0}
          eventName={(community.title as string) ?? ""}
          entrepreneur={checkCommunity?.organization}
          date={checkCommunity?.date}
          startTime={checkCommunity?.start_time}
          endTime={checkCommunity?.end_time}
          onClose={() => {
            setShowAcceptNegotiationPopup(false);
            // router.back();
          }}
        />
      )}
      {showRejectNegotiationPopup && (
        <RejectNegotiationPopup
          scheduleId={checkCommunity?.id}
          id={community.id ?? 0}
          eventName={(community.title as string) ?? ""}
          province={community.tourism_info?.address_info?.province ?? ""}
          dateSection={convertDateSelection(communityScheduleSlots?.slots)}
          onClose={() => {
            setShowRejectNegotiationPopup(false);
            // router.back();
          }}
        />
      )}
    </div>
  );
};
