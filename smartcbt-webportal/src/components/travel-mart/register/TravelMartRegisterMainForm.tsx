"use client";

import { ArrowLeftIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { TravelMartContext } from "@/contexts/App.context";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import TravelMartRegisterCommunityForm from "./community/TravelMartRegisterCommunityForm";
import TravelMartRegisterEntrepreneurForm from "./entrepreneur/TravelMartRegisterEntrepreneurForm";
import TravelMartRegisterGuideForm from "./guide/TravelMartRegisterGuideForm";
import PrivacyPolicyPopup from "./popup/PrivacyPolicyPopup";
import RegisterPopup from "./popup/RegisterPopup";
import TermsAndConditionsPopup from "./popup/TermsAndConditionsPopup";

type TravelMartRegisterMainFormProps = {
  type: "entrepreneur" | "guide" | "community";
};

const TravelMartRegisterMainForm = (props: TravelMartRegisterMainFormProps) => {
  const { type } = props;
  const t = useTranslations("common");

  const {
    associationTravelGroup,
    attractionTypes,
    awards,
    consents,
    csrTypes,
    dastaBusinessType,
    facilities,
    languageSkills,
    selectingCommunityChoices,
    touristTargetGroups,
    touristTravelType,
  } = useContext(TravelMartContext);

  const [showTermsAndConditionsPopup, setShowTermsAndConditionsPopup] = useState(false);
  const [showPrivacyPolicyPopup, setShowPrivacyPolicyPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<
    { body: any; type: "community" | "organization" | "guide" } | undefined
  >(undefined);

  const openTermsAndConditionsPopup = () => {
    setShowTermsAndConditionsPopup(true);
  };
  const openPrivacyPolicyPopup = () => {
    setShowPrivacyPolicyPopup(true);
  };
  const closeTermsAndConditionsPopup = () => {
    setShowTermsAndConditionsPopup(false);
  };
  const closePrivacyPolicyPopup = () => {
    setShowPrivacyPolicyPopup(false);
  };
  const closeConfirmPopup = () => {
    setShowConfirmPopup(undefined);
  };

  const renderRegisterForm = () => {
    switch (type) {
      case "community":
        return (
          <TravelMartRegisterCommunityForm
            openTermsAndConditions={openTermsAndConditionsPopup}
            openPrivacyPolicy={openPrivacyPolicyPopup}
            setConfirm={setShowConfirmPopup}
            mode="create"
          />
        );
      case "entrepreneur":
        return (
          <TravelMartRegisterEntrepreneurForm
            openTermsAndConditions={openTermsAndConditionsPopup}
            openPrivacyPolicy={openPrivacyPolicyPopup}
            setConfirm={setShowConfirmPopup}
            associationTravelGroup={associationTravelGroup}
            attractionTypes={attractionTypes}
            awards={awards}
            csrTypes={csrTypes}
            dastaBusinessType={dastaBusinessType}
            facilities={facilities}
            selectingCommunityChoices={selectingCommunityChoices}
            touristTargetGroups={touristTargetGroups}
            touristTravelType={touristTravelType}
            consents={consents}
            mode="create"
          />
        );
      case "guide":
        return (
          <TravelMartRegisterGuideForm
            openTermsAndConditions={openTermsAndConditionsPopup}
            openPrivacyPolicy={openPrivacyPolicyPopup}
            setConfirm={setShowConfirmPopup}
            languageSkills={languageSkills}
            mode="create"
          />
        );
    }
  };

  const renderTitle = () => {
    switch (type) {
      case "community":
        return t("travelMart.register.community.title");
      case "entrepreneur":
        return t("travelMart.register.entrepreneur.title");
      case "guide":
        return t("travelMart.register.guide.title");
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col justify-center gap-4 py-5 md:px-20 2xl:px-40">
        <div className="flex items-start">
          <NextLink
            className="items-start no-underline md:pl-0"
            href={"/travel-mart/register/portal"}
            icon={<ArrowLeftIcon />}
            intent={"whiteButton"}
            size={"medium"}
          >
            {t("global.back")}
          </NextLink>
        </div>
        <h1 className="w-full bg-[#F6FFED] py-2 text-center text-lg font-medium text-smart-cbt-dark-green">
          {renderTitle()}
        </h1>
        <div className="px-4">{renderRegisterForm()}</div>
      </div>
      {showTermsAndConditionsPopup && (
        <TermsAndConditionsPopup isOpen={showTermsAndConditionsPopup} onClose={closeTermsAndConditionsPopup} />
      )}
      {showPrivacyPolicyPopup && (
        <PrivacyPolicyPopup isOpen={showPrivacyPolicyPopup} onClose={closePrivacyPolicyPopup} />
      )}
      {showConfirmPopup && <RegisterPopup bodyData={showConfirmPopup} onClose={closeConfirmPopup} />}
    </div>
  );
};

export default TravelMartRegisterMainForm;
