import Flex from "@/components/Flex";
import { ShieldCheck } from "@/components/Icon";
import FormCheckbox from "@/components/form/FormCheckbox";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { LabelConsentTravelMartForm } from "@/components/travel-mart/register/community/TravelMartRegisterCommunityForm";
import PrivacyPolicyPopup from "@/components/travel-mart/register/popup/PrivacyPolicyPopup";
import TermsAndConditionsPopup from "@/components/travel-mart/register/popup/TermsAndConditionsPopup";
import { AppContext } from "@/contexts/App.context";
import { ProfileTravelMartSchema } from "@/schemas/forms/profile/profile-travel-mart-schema";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type ProfileTravelMartFormProps = {
  user?: Profile | null;
};

const ProfileTravelMartForm = ({ user }: ProfileTravelMartFormProps) => {
  const t = useTranslations("common");

  const { termConditions, policies } = useContext(AppContext);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileTravelMartSchema>();

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

  useEffect(() => {
    if (!user) return;
    setValue("email", user.email);
    setValue("password", user.id);
    setValue("firstName", user.first_name);
    setValue("lastName", user.last_name);
    setValue("phoneNumber", user.mobile);
    setValue("organizationName", user.organizations?.map((or) => or.title).join(", "));
    setValue("organizationName", user.organizations?.map((or) => or.title).join(", "));
    setValue("organizationName", user.organizations?.map((or) => or.title).join(", "));
    setValue("organizationName", user.organizations?.map((or) => or.title).join(", "));
    setValue("organizationName", user.organizations?.map((or) => or.title).join(", "));
    setValue("organizationName", user.organizations?.map((or) => or.title).join(", "));
    setValue("organizationName", user.organizations?.map((or) => or.title).join(", "));
  }, [user]);

  return (
    <Fragment>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-smart-cbt-green" />
          <h3 className="font-medium text-smart-cbt-green">{t("profile.travelMart.status.approved")}</h3>
        </div>
        <div className="flex-1">
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.community.firstName")}
                type="text"
                name="firstName"
                control={control}
                isRequired
                disabled={true}
                errorMessage={errors?.firstName?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.community.lastName")}
                type="text"
                name="lastName"
                control={control}
                isRequired
                disabled={true}
                errorMessage={errors?.lastName?.message}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.community.email")}
                type="text"
                showClearButton
                name="email"
                control={control}
                isRequired
                disabled={true}
                errorMessage={errors?.email?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.community.phoneNumber")}
                type="tel"
                name="phoneNumber"
                control={control}
                isRequired
                disabled={true}
                errorMessage={errors?.phoneNumber?.message}
              />
            </Flex.Element>
          </Flex.Container>
        </div>
        <div className="flex-1">
          <h1 className="mb-4 font-medium text-smart-cbt-dark-green">
            {t("profile.travelMart.form.communityInformation")}
          </h1>
          <FormFloatingLabelTextInput
            placeholder={t("profile.travelMart.form.communityName")}
            type="text"
            showClearButton
            name="organizationName"
            control={control}
            disabled={true}
            isRequired
            errorMessage={errors?.address?.message}
          />
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("profile.travelMart.form.address")}
                type="text"
                showClearButton
                name="address"
                disabled={true}
                control={control}
                errorMessage={errors?.communityName?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.address.no")}
                type="text"
                showClearButton
                name="no"
                disabled={true}
                control={control}
                errorMessage={errors?.no?.message}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.address.moo")}
                type="text"
                showClearButton
                name="moo"
                disabled={true}
                control={control}
                errorMessage={errors?.moo?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.address.villageName")}
                type="text"
                showClearButton
                name="communityName"
                disabled={true}
                control={control}
                errorMessage={errors?.communityName?.message}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.address.soi")}
                type="text"
                showClearButton
                name="soi"
                disabled={true}
                control={control}
                errorMessage={errors?.soi?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.address.road")}
                type="text"
                showClearButton
                name="road"
                disabled={true}
                control={control}
                errorMessage={errors?.road?.message}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("global.province")}
                type="text"
                showClearButton
                name="province"
                control={control}
                disabled={true}
                isRequired
                errorMessage={errors?.province?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("global.district")}
                type="text"
                showClearButton
                name="postCode"
                disabled={true}
                control={control}
                isRequired
                errorMessage={errors?.district?.message}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("global.subdistrict")}
                type="text"
                showClearButton
                name="subdistrict"
                control={control}
                disabled={true}
                isRequired
                errorMessage={errors?.subdistrict?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.address.postCode")}
                type="text"
                showClearButton
                name="postCode"
                disabled={true}
                control={control}
                isRequired
                errorMessage={errors?.postCode?.message}
              />
            </Flex.Element>
          </Flex.Container>
        </div>
        <div className="relative flex-1">
          <h1 className="mb-4 font-medium text-smart-cbt-dark-green">
            {t("travelMart.register.community.consentInformation")}
          </h1>
          <div>
            <FormCheckbox
              label={
                <LabelConsentTravelMartForm
                  mainText={t("travelMart.register.community.dataDissemination")}
                  highlighText={t("travelMart.register.community.termsAndConditions")}
                  onClick={openTermsAndConditionsPopup}
                />
              }
              type="checkbox"
              disabled={true}
              name="dataDissemination"
              control={control}
              labelClassName="overflow-auto whitespace-normal text-sm break-words"
              checkboxClassName="items-start"
              className="inline-block"
            />
            <FormCheckbox
              label={
                <LabelConsentTravelMartForm
                  mainText={t("travelMart.register.community.consent")}
                  highlighText={t("travelMart.register.community.privacyPolicy")}
                  onClick={openPrivacyPolicyPopup}
                />
              }
              disabled={true}
              name="consent"
              labelClassName="overflow-auto whitespace-normal text-sm break-words"
              control={control}
            />
          </div>
        </div>
      </div>
      {showTermsAndConditionsPopup && (
        <TermsAndConditionsPopup
          isOpen={showTermsAndConditionsPopup}
          onClose={closeTermsAndConditionsPopup}
          termConditions={termConditions}
        />
      )}
      {showPrivacyPolicyPopup && (
        <PrivacyPolicyPopup isOpen={showPrivacyPolicyPopup} onClose={closePrivacyPolicyPopup} policies={policies} />
      )}
    </Fragment>
  );
};

export default ProfileTravelMartForm;
