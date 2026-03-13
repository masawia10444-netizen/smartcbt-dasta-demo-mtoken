import { Button } from "@/components/Button";
import { CommunityScheduleSlotsByCommunityIdJSON } from "@/utils/cms/adapters/website/travel-mart";
import { convertDateSelection } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RequestNegotiationPopup from "../../matching-popup/request-negotiation/RequestNegotiationPopup";

type CommunityDetailDescriptionRequestNegotiationProps = {
  communityScheduleSlotsByCommunityId?: CommunityScheduleSlotsByCommunityIdJSON;
};

export const CommunityDetailDescriptionRequestNegotiation = (
  props: CommunityDetailDescriptionRequestNegotiationProps
) => {
  const { communityScheduleSlotsByCommunityId: communityScheduleSlots } = props;
  const t = useTranslations("common");
  const [showRequestNegotiationPopup, setShowRequestNegotiationPopup] = useState(false);

  return (
    <div>
      <div className="flex w-full flex-row justify-center gap-6 px-4 py-9 md:container md:mx-auto">
        <Button
          className="w-full rounded-full shadow-md"
          intent={"primary"}
          onClick={() => setShowRequestNegotiationPopup(true)}
        >
          {t("community.detail.requestAppointment")}
        </Button>
      </div>
      {showRequestNegotiationPopup && (
        <RequestNegotiationPopup
          type="community"
          id={communityScheduleSlots?.community.id ?? ""}
          eventName={communityScheduleSlots?.community.title ?? ""}
          province={communityScheduleSlots?.community.province_title ?? ""}
          dateSection={convertDateSelection(communityScheduleSlots?.slots)}
          onClose={() => {
            setShowRequestNegotiationPopup(false);
            // router.back();
          }}
        />
      )}
    </div>
  );
};
