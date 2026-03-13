import { Button } from "@/components/Button";
import Footer from "@/components/Footer";
import { EditPencil } from "@/components/Icon";
import { TravelMartContext } from "@/contexts/App.context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Fragment, useContext, useState } from "react";
import TravelMartRegisterCommunityForm from "../register/community/TravelMartRegisterCommunityForm";
import TravelMartRegisterEntrepreneurForm from "../register/entrepreneur/TravelMartRegisterEntrepreneurForm";
import TravelMartRegisterGuideForm from "../register/guide/TravelMartRegisterGuideForm";
import PrivacyPolicyPopup from "../register/popup/PrivacyPolicyPopup";
import RegisterPopup from "../register/popup/RegisterPopup";
import TermsAndConditionsPopup from "../register/popup/TermsAndConditionsPopup";

type TravelMartProfileLayoutProps = {
  toggleMobileMenu: () => void;
  isMobileOpened: boolean;
  type: "community" | "entrepreneur" | "guide";
};

const TravelMartProfileLayout = (props: TravelMartProfileLayoutProps) => {
  const t = useTranslations("common");

  const { isMobileOpened, toggleMobileMenu, type } = props;

  const {
    languageSkills,
    associationTravelGroup,
    attractionTypes,
    awards,
    consents,
    csrTypes,
    dastaBusinessType,
    facilities,
    selectingCommunityChoices,
    touristTargetGroups,
    touristTravelType,
  } = useContext(TravelMartContext);

  const [canEdit, setCanEdit] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<
    { body: any; type: "community" | "organization" | "guide" } | undefined
  >(undefined);

  const [showTermsAndConditionsPopup, setShowTermsAndConditionsPopup] = useState(false);
  const [showPrivacyPolicyPopup, setShowPrivacyPolicyPopup] = useState(false);

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
            mode="view"
          />
        );
      case "entrepreneur":
        return (
          <TravelMartRegisterEntrepreneurForm
            openTermsAndConditions={openTermsAndConditionsPopup}
            setConfirm={setShowConfirmPopup}
            openPrivacyPolicy={openPrivacyPolicyPopup}
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
            mode={!canEdit ? "view" : "create"}
            canEdit={canEdit}
          />
        );
      case "guide":
        return (
          <TravelMartRegisterGuideForm
            languageSkills={languageSkills}
            openTermsAndConditions={openTermsAndConditionsPopup}
            openPrivacyPolicy={openPrivacyPolicyPopup}
            mode="view"
          />
        );
    }
  };

  const renderTitle = () => {
    switch (type) {
      case "community":
        return (
          <h1 className="w-full py-2 text-center text-3xl font-medium text-smart-cbt-dark-green">
            {t("travelMart.register.community.profile")}
          </h1>
        );
      case "entrepreneur":
        return (
          <div className="flex flex-col items-end gap-4">
            {!canEdit ? (
              <Button
                intent={"secondary"}
                onClick={() => setCanEdit(true)}
                size="small"
                className="w-fit rounded-full"
                icon={<EditPencil />}
              >
                {t("global.edit")}
              </Button>
            ) : (
              <Button
                intent={"dangerOutline"}
                onClick={() => setCanEdit(false)}
                size="small"
                className="w-fit rounded-full"
                icon={<XMarkIcon />}
              >
                {t("global.cancel")}
              </Button>
            )}
            <h1 className="w-full bg-[#F6FFED] py-2 text-center text-lg font-medium text-smart-cbt-dark-green">
              {t("travelMart.register.entrepreneur.profile")}
            </h1>
          </div>
        );
    }
  };

  return (
    <Fragment>
      <div className="relative">
        <div className="flex flex-col justify-center gap-4 py-5 md:px-20 2xl:px-40">
          {renderTitle()}
          <div className="px-4">{renderRegisterForm()}</div>
          <Footer className="relative pt-8 md:relative" />
        </div>
        {showTermsAndConditionsPopup && (
          <TermsAndConditionsPopup isOpen={showTermsAndConditionsPopup} onClose={closeTermsAndConditionsPopup} />
        )}
        {showPrivacyPolicyPopup && (
          <PrivacyPolicyPopup isOpen={showPrivacyPolicyPopup} onClose={closePrivacyPolicyPopup} />
        )}
        {showConfirmPopup && (
          <RegisterPopup bodyData={showConfirmPopup} onClose={closeConfirmPopup} canEdit={canEdit} />
        )}
      </div>
    </Fragment>
  );
};

export default TravelMartProfileLayout;
