import { CheckCommunityJSON } from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import { Button } from "@/components/Button";
import { HourGlassIcon } from "@/components/Icon";
import { useSession } from "@/components/context-provider/AuthProvider";
import Image from "@/components/image";
import BusinessNegotiationRating from "@/components/travel-mart/business-negotiation/BusinessNegotiationRating";
import { CommunityDetail } from "@/models/travel-mart/travel-mart-community";
import { REQUEST_BY, ScheduleStatus } from "@/utils/cms/adapters/website/constants";
import { CommunityScheduleSlotsByCommunityIdJSON } from "@/utils/cms/cms-api-adapter";
import { convertDateSelection } from "@/utils/helper";
import { get } from "lodash";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TravelMartRescheduleNegotiation } from "../../TravelMartRescheduleNegotiation";
import { displayDate } from "../../matching-popup/accept-negotiation/AcceptNegotiationCheckStep";
import RequestNegotiationPopup from "../../matching-popup/request-negotiation/RequestNegotiationPopup";
import { CommunityDetailDescriptionResponseNegotiation } from "./CommunityDetailDescriptionResponseNegotiation";

type CommunityDetailDescriptionProps = {
  community: CommunityDetail;
  checkCommunity?: CheckCommunityJSON;
  communityScheduleSlotsByCommunityId?: CommunityScheduleSlotsByCommunityIdJSON;
  isPreviewMode: boolean;
  isAppointmentRequestButtonHidden: boolean;
  rating?: number;
};

const CommunityWaitingStatus = () => {
  const t = useTranslations("common");
  return (
    <div className="flex flex-row items-center gap-4">
      <HourGlassIcon className="w-8 h-8" />
      <p className="text-lg text-smart-cbt-orange">{t("community.detail.waitingMessage")}</p>
    </div>
  );
};

const CommunityAcceptStatus = ({
  date,
  startTime,
  endTime,
}: {
  date?: string;
  startTime?: string;
  endTime?: string;
}) => {
  const showDate = displayDate(date, startTime, endTime);
  const t = useTranslations("common");
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="relative w-12 h-12">
        <Image src={"/images/travel-mart/community/partnership.png"} alt="partnership" fill objectFit="cover" />
      </div>
      <p className="text-lg text-smart-cbt-green">{t("community.detail.acceptMessage", { date: showDate })}</p>
    </div>
  );
};

export const CommunityDetailDescription = (props: CommunityDetailDescriptionProps) => {
  const {
    community,
    communityScheduleSlotsByCommunityId,
    checkCommunity,
    isPreviewMode,
    isAppointmentRequestButtonHidden,
    rating,
  } = props;
  const [showRequestNegotiationPopup, setShowRequestNegotiationPopup] = useState(false);

  const { session } = useSession();
  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS").map((r) => r.role);
  const userOrganizationIds = session?.user?.organizations?.map((c) => c.id);
  const organizationId = get(userOrganizationIds, [0]);

  const t = useTranslations("common");

  return (
    <div className="flex flex-col gap-6 px-4 py-9 md:container md:mx-auto">
      {checkCommunity && (
        <TravelMartRescheduleNegotiation
          type={"community"}
          scheduleId={checkCommunity.id}
          activity={checkCommunity.community}
          entrepreneur={checkCommunity.organization}
          date={checkCommunity.date}
          time={checkCommunity.start_time}
          status={checkCommunity.status}
          businessType={undefined}
        />
      )}
      <div>
        <p className="text-base font-bold text-smart-cbt-dark-green">{t("community.detail.ratingAfterMatching")}</p>
        <BusinessNegotiationRating defaultRating={rating ?? 0} totalStars={5} viewOnly={true} />
      </div>
      {!isAppointmentRequestButtonHidden && checkCommunity && checkCommunity?.status == ScheduleStatus["COMPLETED"] && (
        <CommunityAcceptStatus
          date={checkCommunity.date}
          startTime={checkCommunity.start_time}
          endTime={checkCommunity.end_time}
        />
      )}
      {!isAppointmentRequestButtonHidden &&
        !isPreviewMode &&
        roles?.includes("organization") &&
        checkCommunity &&
        checkCommunity?.request_by == REQUEST_BY.ORGANIZATION &&
        checkCommunity?.status == ScheduleStatus["PENDING"] && <CommunityWaitingStatus />}
      {/* check flow  */}
      <h1 className="text-xl font-bold text-smart-cbt-dark-green">
        {community.title ?? "-"} {community.tourism_info?.address_info?.province ?? "-"}
      </h1>
      <p>{community.description ?? "-"}</p>
      {!isAppointmentRequestButtonHidden &&
        !isPreviewMode &&
        roles?.includes("organization") &&
        checkCommunity?.status != ScheduleStatus["PENDING"] &&
        checkCommunity?.status != ScheduleStatus["CHANGE-SLOT"] &&
        checkCommunity?.is_waiting == false && (
          <Button
            className="w-full rounded-full shadow-md"
            intent={"primary"}
            onClick={() => setShowRequestNegotiationPopup(true)}
          >
            {t("travelMart.profile.entrepreneur.requestAppointment")}
          </Button>
        )}

      {showRequestNegotiationPopup && (
        <RequestNegotiationPopup
          type="community"
          id={community?.id ?? ""}
          eventName={communityScheduleSlotsByCommunityId?.community.title ?? ""}
          province={communityScheduleSlotsByCommunityId?.community.province_title ?? ""}
          dateSection={convertDateSelection(communityScheduleSlotsByCommunityId?.slots)}
          organizationId={organizationId}
          onClose={() => {
            setShowRequestNegotiationPopup(false);
            // router.back();
          }}
        />
      )}
      {!isAppointmentRequestButtonHidden &&
        !isPreviewMode &&
        checkCommunity &&
        checkCommunity?.status == ScheduleStatus["PENDING"] &&
        roles?.includes("organization") &&
        checkCommunity?.request_by == REQUEST_BY.COMMUNITY &&
        userOrganizationIds?.includes(checkCommunity.organization_id as number) && (
          <CommunityDetailDescriptionResponseNegotiation
            checkCommunity={checkCommunity}
            community={community}
            communityScheduleSlotsByCommunityId={communityScheduleSlotsByCommunityId}
          />
        )}

      <h1 className="text-xl font-bold text-smart-cbt-dark-green">
        {t("community.detail.activitiesAndTourismPrograms")}
      </h1>
      {community.tourism_activities && community.tourism_activities.length > 0 ? (
        community.tourism_activities.map((value, index) => (
          <p key={index}>
            {index + 1}. {value?.title ?? ""}
          </p>
        ))
      ) : (
        <p>-</p>
      )}
    </div>
  );
};
