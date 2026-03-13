"use client";

import { CheckCommunityJSON } from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import Footer from "@/components/Footer";
import { CommunityDetail as CommunityDetailModel } from "@/models/travel-mart/travel-mart-community";
import { CommunityScheduleSlotsByCommunityIdJSON } from "@/utils/cms/cms-api-adapter";
import { CommunityDetailContact } from "./CommunityDetailContact";
import { CommunityDetailCover } from "./CommunityDetailCover";
import { CommunityDetailDescription } from "./CommunityDetailDescription";
import { CommunityDetailFacility } from "./CommunityDetailFacility";
import { CommunityDetailGallery } from "./CommunityDetailGallery";
import { CommunityDetailTravelInfo } from "./CommunityDetailTravelInfo";

type CommunityDetailProps = {
  community: CommunityDetailModel;
  checkCommunity?: CheckCommunityJSON;
  communityScheduleSlotsByCommunityId?: CommunityScheduleSlotsByCommunityIdJSON;
  openFormMode?: () => void;
  isPreviewMode: boolean;
  isAppointmentRequestButtonHidden: boolean;
  rating?: number;
};

export const CommunityDetail = (props: CommunityDetailProps) => {
  const {
    community,
    openFormMode,
    communityScheduleSlotsByCommunityId,
    checkCommunity,
    isPreviewMode,
    isAppointmentRequestButtonHidden,
    rating
  } = props;

  return (
    <div className="flex flex-col">
      <CommunityDetailCover community={community} openFormMode={openFormMode} />
      <CommunityDetailDescription
        checkCommunity={checkCommunity}
        community={community}
        communityScheduleSlotsByCommunityId={communityScheduleSlotsByCommunityId}
        isPreviewMode={isPreviewMode}
        isAppointmentRequestButtonHidden={isAppointmentRequestButtonHidden}
        rating={rating}
      />
      <CommunityDetailGallery community={community} />
      <CommunityDetailTravelInfo community={community} />
      <CommunityDetailFacility community={community} />
      <CommunityDetailContact community={community} />
      <Footer className="relative pt-8 md:relative" />
    </div>
  );
};
