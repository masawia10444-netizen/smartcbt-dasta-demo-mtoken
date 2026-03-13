"use client";

import {
  GetOrganizationProfileJSON,
  getOrganizationProfile,
} from "@/app/[locale]/(authenticated)/travel-mart/profile/actions";
import { CheckOrganizationJSON } from "@/app/[locale]/(authenticated)/travel-mart/recommend/entrepreneur/[id]/action";
import { Button } from "@/components/Button";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import { CallIcon, IconFacebook, IconInstagram, IconTiktok, IconWww } from "@/components/Icon";
import NavigationBar from "@/components/NavigationBar";
import { useSession } from "@/components/context-provider/AuthProvider";
import Image from "@/components/image";
import { AppContext } from "@/contexts/App.context";
import { REQUEST_BY, ScheduleStatus } from "@/utils/cms/adapters/website/constants";
import { getCmsMedia } from "@/utils/cms/api-helpers";
import { CommunityScheduleSlotsByOrganizationIdJSON, Organization } from "@/utils/cms/cms-api-adapter";
import { Collection } from "@/utils/cms/cms-type";
import { convertDateSelection, handleAPIError } from "@/utils/helper";
import { get } from "lodash";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import { TravelMartRescheduleNegotiation } from "../TravelMartRescheduleNegotiation";
import BusinessNegotiationRating from "../business-negotiation/BusinessNegotiationRating";
import RequestNegotiationPopup from "../matching-popup/request-negotiation/RequestNegotiationPopup";
import { EntrepreneurDetailDescriptionResponseNegotiation } from "./EntrepreneurDetailDescriptionResponseNegotiation";

type TravelMartProfileEntrepreneurProps = {
  organization?: Organization;
  checkOrganization?: CheckOrganizationJSON;
  communityScheduleSlotsByOrganizationId?: CommunityScheduleSlotsByOrganizationIdJSON;
  rating: number;
};

const TravelMartProfileEntrepreneur = ({
  organization,
  checkOrganization, // should check org
  communityScheduleSlotsByOrganizationId,
  rating,
}: TravelMartProfileEntrepreneurProps) => {
  const t = useTranslations("common");

  const [organizationProfile, setOrganizationProfile] = useState<GetOrganizationProfileJSON["organization"]>();

  const { provinces, districts, subdistricts } = useContext(AppContext);

  const { session } = useSession();
  const path = usePathname();
  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS").map((r) => r.role);
  const communityId = get(session, ["user", "communities", 0, "id"]);
  const isOrganization = roles?.includes("organization");
  const userCommunityIds = session?.user?.communities?.map((c) => c.id);

  const [showRequestNegotiationPopup, setShowRequestNegotiationPopup] = useState(false);
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  const joinedOrganizationProfileAddress = () => {
    const organizationInfo = organizationProfile?.organizationInfo;
    const province = provinces.find((p) => p.id == organizationInfo?.provinceId);
    const district = districts.find((d) => d.id == organizationInfo?.districtId);
    const subdistrict: any = subdistricts.find((s) => s.id == organizationInfo?.subDistrictId);
    const postal = subdistrict?.postal;

    return `${organizationInfo?.address ?? ""} ${province ? province?.title : ""} ${district ? district?.title : ""} ${
      subdistrict ? subdistrict.title : ""
    } ${subdistrict ? postal : ""}`;
  };

  const joinedAddress = organization
    ? Object.entries(organization?.address_info as any)
        .map(([key, value]) => (value ? `${value}` : ""))
        .join(" ")
    : organizationProfile && organizationProfile.organizationInfo
    ? joinedOrganizationProfileAddress()
    : "-";

  useEffect(() => {
    if (organization) return;
    if (!isOrganization) return;
    const fetchData = async () => {
      setIsLoading(true);
      const { organization: organizationProfile, error } = await getOrganizationProfile();
      if (error) {
        handleAPIError(error);
        setIsLoading(false);
        return;
      }
      if (organizationProfile) {
        setOrganizationProfile(organizationProfile);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      {showRequestNegotiationPopup && (
        <RequestNegotiationPopup
          type="organization"
          id={organization?.id ?? ""}
          eventName={communityScheduleSlotsByOrganizationId?.organization.title ?? ""}
          province={communityScheduleSlotsByOrganizationId?.organization.province_title ?? ""}
          dateSection={convertDateSelection(communityScheduleSlotsByOrganizationId?.slots)}
          communityId={communityId}
          onClose={() => {
            setShowRequestNegotiationPopup(false);
            // router.back();
          }}
        />
      )}
      {organization && <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />}
      {isLoading && !organization ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin border-smart-cbt-green"></div>
        </div>
      ) : (
        <div className="relative h-full">
          <div className="relative w-full h-full">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[65vh]">
              <div className="absolute z-20 px-8 text-white -translate-y-1/2 left-2 top-1/2 sm:container sm:left-1/2 sm:mx-auto sm:-translate-x-1/2">
                <div className="flex flex-col items-start gap-4 text-white md:gap-10">
                  <h1 className="text-5xl font-semibold drop-shadow-md md:text-6xl">
                    {t("travelMart.profile.entrepreneur.title")}
                  </h1>
                  <h3 className="text-3xl font-light text-center md:text-4xl">{organization?.title}</h3>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 z-10 w-full h-full bg-black/60" />
              <Image
                src={
                  organizationProfile
                    ? `${getCmsMedia(organizationProfile.organizationInfo.registeredAttachments)}`
                    : "/images/travel-mart/profile/entrepreneur-bg.png"
                }
                fill
                alt="Entrepreneur"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div className="relative px-8 py-10 sm:container sm:mx-auto">
                <div className="flex flex-col gap-8">
                  {checkOrganization && (
                    <TravelMartRescheduleNegotiation
                      type="organization"
                      scheduleId={checkOrganization.id}
                      activity={checkOrganization.community}
                      entrepreneur={checkOrganization.organization}
                      date={checkOrganization.date}
                      time={checkOrganization.start_time}
                      status={checkOrganization.status}
                      businessType={(organization?.dasta_business_type as Collection["dasta_business_types"])?.title}
                    />
                  )}
                  <div className="flex justify-between">
                    <div>
                      <p className="text-base font-light text-[#006D75]">{t("community.detail.ratingAfterMatching")}</p>
                      <BusinessNegotiationRating defaultRating={rating} totalStars={5} viewOnly={true} />
                    </div>
                    {checkOrganization &&
                      checkOrganization?.status == ScheduleStatus["PENDING"] &&
                      !isOrganization &&
                      checkOrganization?.request_by == REQUEST_BY.ORGANIZATION &&
                      userCommunityIds?.includes(checkOrganization.community_id as number) && (
                        <EntrepreneurDetailDescriptionResponseNegotiation
                          checkOrganization={checkOrganization}
                          organization={organization}
                          communityScheduleSlotsByOrganizationId={communityScheduleSlotsByOrganizationId}
                        />
                      )}
                    {!checkOrganization && path != "/travel-mart/profile" && roles?.includes("community") && (
                      <Button
                        className="w-full rounded-full shadow-md"
                        intent={"primary"}
                        onClick={() => setShowRequestNegotiationPopup(true)}
                      >
                        {t("travelMart.profile.entrepreneur.requestAppointment")}
                      </Button>
                    )}
                  </div>
                  <h3 className="text-3xl font-light text-[#006D75] md:text-4xl">{organization?.title}</h3>

                  <div className="flex flex-col flex-1 w-full gap-2 ">
                    <h5 className="text-xl text-[#08979C]">{t("travelMart.profile.entrepreneur.type")}</h5>
                    <p className="text-smart-cbt-dark-grey">
                      {organization
                        ? organization?.dasta_business_type
                          ? (organization?.dasta_business_type as Collection["dasta_business_types"]).title
                          : "-"
                        : (organizationProfile &&
                            organizationProfile?.organizationMarketingTourism.dastaBusinessType?.title) ??
                          "-"}
                    </p>
                  </div>
                  <div className="flex flex-col flex-1 w-full gap-2 ">
                    <h5 className="text-xl text-[#08979C]">{t("travelMart.profile.entrepreneur.activity")}</h5>
                    <ul className="relative list-decimal list-inside text-smart-cbt-dark-grey">
                      {organization
                        ? organization?.csr_types && organization?.csr_types.length > 0
                          ? (organization?.csr_types as { id: number; title: string }[])?.map((type, i) => (
                              <li key={type.id}>{type.title}</li>
                            ))
                          : "-"
                        : organizationProfile && organizationProfile.organizationMarketingTourism.csrTypes
                        ? organizationProfile.organizationMarketingTourism.csrTypes?.map((type, i) => (
                            <li key={type.id}>{type.title}</li>
                          ))
                        : "-"}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#006D75]">
              <div className="text-white lg:container lg:mx-auto">
                <div className="flex flex-col lg:flex-row ">
                  <div className="flex-1 px-8 py-10">
                    <div className="flex flex-col gap-10 font-thin">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-3xl font-light md:text-4xl">
                          {t("travelMart.profile.entrepreneur.contactUs")}
                        </h3>
                        <div className="flex flex-col flex-1 w-full gap-2 ">
                          <div className="flex flex-row items-center gap-2">
                            <CallIcon className="w-6 h-6" />
                            <h5 className="text-xl">{t("travelMart.profile.entrepreneur.phoneNumber")}</h5>
                          </div>
                          {organization ? (
                            organization?.contacts && organization?.contacts.length > 0 ? (
                              organization?.contacts?.map(
                                (c: { firstname: string; lastname: string; mobile: string }, i: number) => (
                                  <div key={i} className="flex flex-row items-center gap-10 ml-8">
                                    <p>{c.mobile}</p>
                                    <p>{`${c.firstname} ${c.lastname}`}</p>
                                  </div>
                                )
                              )
                            ) : (
                              <div className="ml-8">{"-"}</div>
                            )
                          ) : organizationProfile?.contactPoints && organizationProfile?.contactPoints.length > 0 ? (
                            organizationProfile?.contactPoints?.map(
                              (c: { firstname: string; lastname: string; mobile: string }, i: number) => (
                                <div key={i} className="flex flex-row items-center gap-10 ml-8">
                                  <p>{c.mobile}</p>
                                  <p>{`${c.firstname} ${c.lastname}`}</p>
                                </div>
                              )
                            )
                          ) : (
                            <div className="ml-8">{"-"}</div>
                          )}
                        </div>
                        {/* <div className="flex flex-col flex-1 w-full gap-2 ">
                        <div className="flex flex-row items-center gap-2">
                          <AlternateEmail className="w-6 h-6" />
                          <h5 className="text-xl">{t("travelMart.profile.entrepreneur.email")}</h5>
                        </div>
                        <p className="ml-8">{data.coordinator.email}</p>
                      </div> */}
                        {organization
                          ? organization?.website && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconWww className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.website")}</h5>
                                </div>
                                <p className="ml-8">{organization.website}</p>
                              </div>
                            )
                          : organizationProfile &&
                            organizationProfile?.organizationInfo.website && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconWww className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.website")}</h5>
                                </div>
                                <p className="ml-8">{organizationProfile?.organizationInfo.website}</p>
                              </div>
                            )}
                        {organization
                          ? organization?.facebook_id && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconFacebook className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.facebook")}</h5>
                                </div>
                                <p className="ml-8">{organization.facebook_id}</p>
                              </div>
                            )
                          : organizationProfile &&
                            organizationProfile?.organizationInfo.facebook && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconWww className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.facebook")}</h5>
                                </div>
                                <p className="ml-8">{organizationProfile?.organizationInfo.facebook}</p>
                              </div>
                            )}
                        {organization
                          ? organization.instagram_id && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconInstagram className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.instagram")}</h5>
                                </div>
                                <p className="ml-8">{organization?.instagram_id}</p>
                              </div>
                            )
                          : organizationProfile &&
                            organizationProfile?.organizationInfo.instagram && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconWww className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.instagram")}</h5>
                                </div>
                                <p className="ml-8">{organizationProfile?.organizationInfo.instagram}</p>
                              </div>
                            )}
                        {organization
                          ? organization?.tiktok_id && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconTiktok className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.tikTok")}</h5>
                                </div>
                                <p className="ml-8">{organization.tiktok_id}</p>
                              </div>
                            )
                          : organizationProfile &&
                            organizationProfile?.organizationInfo.tiktok && (
                              <div className="flex flex-col flex-1 w-full gap-2 ">
                                <div className="flex flex-row items-center gap-2">
                                  <IconWww className="w-6 h-6" />
                                  <h5 className="text-xl">{t("travelMart.profile.entrepreneur.tikTok")}</h5>
                                </div>
                                <p className="ml-8">{organizationProfile?.organizationInfo.tiktok}</p>
                              </div>
                            )}
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <h3 className="text-3xl font-light md:text-4xl">
                          {t("travelMart.profile.entrepreneur.address")}
                        </h3>
                        <p className="text-white">{joinedAddress}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-full bg-white">
                      <GoogleMap
                        center={
                          organizationProfile &&
                          organizationProfile.organizationInfo.latitude &&
                          organizationProfile.organizationInfo.longitude
                            ? {
                                lat: Number(organizationProfile.organizationInfo.latitude),
                                lng: Number(organizationProfile.organizationInfo.longitude),
                              }
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer className="relative pt-8 md:relative" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TravelMartProfileEntrepreneur;
