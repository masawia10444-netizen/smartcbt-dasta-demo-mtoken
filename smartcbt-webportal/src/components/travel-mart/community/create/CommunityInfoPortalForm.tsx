"use client";

import { AppContext, TravelMartContext } from "@/contexts/App.context";
import {
  CommunityDetail as CommunityDetailModel,
  CommunityForm,
  CommunityOption,
} from "@/models/travel-mart/travel-mart-community";
import { Step2Schema } from "@/schemas/forms/community-info/create/community-info-create-schema-step2";
import { Step3Schema } from "@/schemas/forms/community-info/create/community-info-create-schema-step3";
import { useContext, useState } from "react";
import { CommunityDetail } from "../detail/CommunityDetail";
import { CommunityInfoForm } from "./CommunityInfoForm";

enum Mode {
  Form,
  Detail,
}

type CommunityInfoPortalFormProps = {
  communityForm?: any | null;
  months: CommunityOption[];
  step2: Step2Schema;
  step3: Step3Schema;
};

export const CommunityInfoPortalForm = (props: CommunityInfoPortalFormProps) => {
  const { provinces, districts, subdistricts } = useContext(AppContext);
  const { attractionTypes } = useContext(TravelMartContext);
  const [communityForm, setCommunityForm] = useState<CommunityForm | null>(props.communityForm ?? null);
  const [communityDetailModel, setCommunityDetailModel] = useState<CommunityDetailModel | null>(null);
  const [mode, setMode] = useState<Mode>(Mode.Form);

  const openPreviewMode = (communityForm: CommunityForm) => {
    // Convert from CommunityForm to CommunityDetailModel
    const presentations: any = {
      files: communityForm.presentations
        ? [{ id: communityForm.presentations, url: communityForm.presentations, type: "" }]
        : null,
      video: communityForm.presentation_video,
      facebook: communityForm.presentation_facebook,
      instagram: communityForm.presentation_instagram,
      tiktok: communityForm.presentation_tiktok,
      other: communityForm.presentation_other,
    };

    const facilities: any[] = [];
    props.step2.forEach((stepItem: any) => {
      if (stepItem.type === "none") {
        const facility = stepItem.facility!;
        const facilityData = communityForm.facilities?.find((value) => value.facility === facility.id);
        if (!facilityData) return;
        facilities.push({
          id: facility.id,
          title: facility.title,
          quantity: facilityData?.quantity,
          quantity_flag: facility.isQuantityEnabled,
          unit_quantity: facility.unit,
          size: facilityData?.size,
          size_flag: facility.isSizeEnabled,
          unit_size: facility.unit,
          group: null,
        });
      } else if (stepItem.type === "group") {
        const groupId = 1;
        const groupTitle = stepItem.title;
        const subFacilities = stepItem.facilities!;
        subFacilities.forEach((subFacility: any) => {
          const facility = subFacility;
          const facilityData = communityForm.facilities?.find((value) => value.facility === facility.id);
          if (!facilityData) return;
          facilities.push({
            id: facility.id,
            title: facility.title,
            quantity: facilityData?.quantity,
            quantity_flag: facility.isQuantityEnabled,
            unit_quantity: facility.unit,
            size: facilityData?.size,
            size_flag: facility.isSizeEnabled,
            unit_size: facility.unit,
            group: {
              id: groupId,
              title: groupTitle,
            },
          });
        });
      }
    });

    const images = communityForm.gallery_infos ?? [];
    const videos = communityForm.video_infos ?? [];
    const medias = [...images, ...videos];

    const attractionTypesFiltered = attractionTypes.filter(
      (value) => value?.id && communityForm.attraction_type?.includes(value?.id)
    );

    const communityDetail: CommunityDetailModel = {
      title: communityForm.title ?? "",
      description: communityForm.description ?? "",
      tourism_info: {
        tourist_accomodate_min: communityForm.tourist_accomodate_min,
        tourist_accomodate_max: communityForm.tourist_accomodate_max,
        traveling_recommended_during: props.months
          .filter((value) => value.id && communityForm.traveling_recommended_during?.includes(value.id))
          .map(({ id, title }) => ({
            id: id?.toString() ?? "",
            title: title ?? "",
          })),
        address_info: {
          address_1: communityForm.address_info?.address ?? "",
          address_2: null,
          province: provinces.find((value: any) => value.id == communityForm.address_info?.province_id)?.title ?? "",
          district: districts.find((value: any) => value.id == communityForm.address_info?.district_id)?.title ?? "",
          subdistrict:
            subdistricts.find((value: any) => value.id == communityForm.address_info?.sub_district_id)?.title ?? "",
          postal_code: communityForm.address_info?.postal_code ?? "",
        },
      },
      tourism_activities: communityForm.tourism_activities?.map(({ title }) => ({ id: null, title })),
      contacts: communityForm.contact_points,
      tour_agent: communityForm.tour_agents,
      awards: communityForm.awards?.map(({ title }) => ({ id: null, title })),
      community_way_of_life: {
        way_of_life: communityForm.community_way_of_life,
        local_language: communityForm.community_local_language,
        food_menus: communityForm.food_menus?.map((value) => value.title).join(", ") ?? "",
        products: communityForm.tourism_products?.map((value) => value.title).join(", ") ?? "",
      },
      presentations: presentations,
      // featured_image: null, // TODO: Need to find the key in CommunityForm
      featured_image: communityForm.featured_image,
      galleries: medias,
      facilities: facilities,
      attraction_type: attractionTypesFiltered,
      highlight: communityForm.highlight,
      traveling_recommended_during: communityForm.traveling_recommended_during ?? [],
    };
    setCommunityForm(communityForm);
    setCommunityDetailModel(communityDetail);
    setMode(Mode.Detail);
  };

  const openFormMode = () => {
    setMode(Mode.Form);
  };

  return (
    <div>
      {mode == Mode.Form && (
        <CommunityInfoForm
          communityForm={communityForm}
          months={props.months}
          step2={props.step2}
          step3={props.step3}
          openPreviewMode={openPreviewMode}
        />
      )}
      {mode == Mode.Detail && communityDetailModel != null && (
        <CommunityDetail
          community={communityDetailModel}
          openFormMode={openFormMode}
          isPreviewMode={true}
          isAppointmentRequestButtonHidden={false}
        />
      )}
    </div>
  );
};
