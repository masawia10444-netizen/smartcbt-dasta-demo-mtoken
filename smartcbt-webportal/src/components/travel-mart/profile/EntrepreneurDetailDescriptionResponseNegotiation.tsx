import { CheckOrganizationJSON } from "@/app/[locale]/(authenticated)/travel-mart/recommend/entrepreneur/[id]/action";
import { Button } from "@/components/Button";
import { CommunityScheduleSlotsByOrganizationIdJSON } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AcceptNegotiationPopup from "../matching-popup/accept-negotiation/AcceptNegotiationPopup";
import RejectNegotiationPopup from "../matching-popup/reject-negotiation/RejectNegotiationPopup";
import { convertDateSelection } from "@/utils/helper";

type EntrepreneurDetailDescriptionResponseNegotiationProps = {
  checkOrganization: CheckOrganizationJSON;
  organization?: any; //FIXME: Type this
  communityScheduleSlotsByOrganizationId?: CommunityScheduleSlotsByOrganizationIdJSON;
};

export const EntrepreneurDetailDescriptionResponseNegotiation = (
  props: EntrepreneurDetailDescriptionResponseNegotiationProps
) => {
  const { communityScheduleSlotsByOrganizationId: organizationScheduleSlots, checkOrganization, organization } = props;

  const t = useTranslations("common");
  const [showAcceptNegotiationPopup, setShowAcceptNegotiationPopup] = useState(false);
  const [showRejectNegotiationPopup, setShowRejectNegotiationPopup] = useState(false);

  return (
    <div>
      <div className="flex grid w-full grid-cols-1 gap-8 md:container md:mx-auto">
        <Button
          className="w-full rounded-full shadow-md"
          intent={"primary"}
          size={"medium"}
          onClick={() => setShowAcceptNegotiationPopup(true)}
        >
          {t("community.detail.acceptBusinessNegotiation")}
        </Button>
      </div>
      <div className="flex grid w-full grid-cols-1 gap-4 md:container md:mx-auto">
        <Button
          className="w-full text-black hover:underline"
          intent={"text"}
          size={"medium"}
          onClick={() => setShowRejectNegotiationPopup(true)}
        >
          {t("community.detail.rejectBusinessNegotiation")}
        </Button>
      </div>
      {showAcceptNegotiationPopup && (
        <AcceptNegotiationPopup
          scheduleId={checkOrganization?.id}
          id={organization.id ?? 0}
          eventName={(checkOrganization?.community as string) ?? ""}
          entrepreneur={checkOrganization?.organization}
          date={checkOrganization?.date}
          startTime={checkOrganization?.start_time}
          endTime={checkOrganization?.end_time}
          onClose={() => {
            setShowAcceptNegotiationPopup(false);
            // router.back();
          }}
        />
      )}
      {showRejectNegotiationPopup && (
        <div className="overflow-y-auto">
          <RejectNegotiationPopup
            scheduleId={checkOrganization?.id}
            id={organization.id ?? 0}
            eventName={(organization.title as string) ?? ""}
            province={organization.tourism_info?.address_info?.province ?? ""}
            dateSection={convertDateSelection(organizationScheduleSlots?.slots)}
            onClose={() => {
              setShowRejectNegotiationPopup(false);
              // router.back();
            }}
          />
        </div>
      )}
    </div>
  );
};
