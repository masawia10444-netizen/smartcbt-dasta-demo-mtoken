import { CommunityForm, CommunityOption } from "@/models/travel-mart/travel-mart-community";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CommunityInfoStep1ActivityForm } from "./CommunityInfoStep1ActivityForm";
import { CommunityInfoStep1CommunityDetailForm } from "./CommunityInfoStep1CommunityDetailForm";
import { CommunityInfoStep1CommunityInfoForm } from "./CommunityInfoStep1CommunityInfoForm";
import { CommunityInfoStep1CoordinatorForm } from "./CommunityInfoStep1CoordinatorForm";
import { CommunityInfoStep1MediaForm } from "./CommunityInfoStep1MediaForm";
import { CommunityInfoStep1PresentationForm } from "./CommunityInfoStep1PresentationForm";
import { CommunityInfoStep1TravelBookingContactForm } from "./CommunityInfoStep1TravelBookingContactForm";

type CommunityInfoStep1FormProps = {
  areFieldsDisabled: boolean;
  communityForm?: CommunityForm | null;
  months: CommunityOption[];
};

export const CommunityInfoStep1Form = (props: CommunityInfoStep1FormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: {},
  } = useFormContext<CommunityInfoCreateSchema>();

  return (
    <div className="flex flex-col gap-2 ">
      <CommunityInfoStep1CoordinatorForm areFieldsDisabled={props.areFieldsDisabled} />
      <CommunityInfoStep1CommunityInfoForm areFieldsDisabled={props.areFieldsDisabled} />
      <CommunityInfoStep1CommunityDetailForm areFieldsDisabled={props.areFieldsDisabled} />
      <CommunityInfoStep1ActivityForm months={props.months} areFieldsDisabled={props.areFieldsDisabled} />
      <CommunityInfoStep1TravelBookingContactForm
        areFieldsDisabled={props.areFieldsDisabled}
        communityForm={props.communityForm}
      />
      <CommunityInfoStep1MediaForm areFieldsDisabled={props.areFieldsDisabled} />
      <CommunityInfoStep1PresentationForm areFieldsDisabled={props.areFieldsDisabled} setIsLoading={setIsLoading} />
      {/* 2023-10-27: Hx requested that we hide the tags field temporarily. */}
      {/* <CommunityInfoStep1TagForm areFieldsDisabled={props.areFieldsDisabled} /> */}
    </div>
  );
};
