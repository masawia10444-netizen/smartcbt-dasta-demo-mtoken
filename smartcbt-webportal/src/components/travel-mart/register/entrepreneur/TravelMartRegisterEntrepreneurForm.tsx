import { customZodResolver } from "@/schemas/base-schema";
import {
  TravelMartRegisterEntrepreneurSchema,
  stepEntrepreneurFormSchema,
  travelMartRegisterEntrepreneurSchema,
} from "@/schemas/forms/travel-mart/register/travel-mart-register-entrepreneur-schema";
import { get, isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TravelMartStep from "../../step/TravelMartStep";
import TravelMartStepButton from "../../step/TravelMartStepButton";

import { getOrganizationProfile } from "@/app/[locale]/(authenticated)/travel-mart/profile/actions";
import { useSession } from "@/components/context-provider/AuthProvider";
import FormCheckbox from "@/components/form/FormCheckbox";
import Step from "@/config/travel-mart/register-entrepreneur.json";
import { AppContext } from "@/contexts/App.context";
import { AttractionType } from "@/models/travel-mart/travel-mart-community";
import {
  AssociationTravelGroup,
  Awards,
  CommunityFacilities,
  CsrTypes,
  SelectingCommunityChoices,
  TouristTargetGroups,
} from "@/utils/cms/adapters/website/travel-mart/types/on-boarding";
import { Consents } from "@/utils/cms/cms-api-adapter";
import { convertDataToJsonChoice, handleAPIError } from "@/utils/helper";
import { LabelConsentTravelMartForm } from "../community/TravelMartRegisterCommunityForm";
import TravelMartRegisterEntrepreneurStep1 from "./TravelMartRegisterEntrepreneurStep1";
import TravelMartRegisterEntrepreneurStep2 from "./TravelMartRegisterEntrepreneurStep2";

type TravelMartRegisterEntrepreneurFormProps = {
  openTermsAndConditions: () => void;
  openPrivacyPolicy: () => void;
  associationTravelGroup: AssociationTravelGroup[];
  dastaBusinessType: { id: number; title: string }[];
  attractionTypes: AttractionType[];
  selectingCommunityChoices: SelectingCommunityChoices[];
  awards: Awards[];
  csrTypes: CsrTypes[];
  touristTargetGroups: TouristTargetGroups[];
  facilities: CommunityFacilities[];
  touristTravelType: TouristTargetGroups[];
  consents: Consents[];
  mode: "view" | "create";
  canEdit?: boolean;
  setConfirm?: (confirm: { body: any; type: "community" | "organization" | "guide" }) => void;
};

const TravelMartRegisterEntrepreneurForm = ({
  openTermsAndConditions,
  openPrivacyPolicy,
  setConfirm = () => ({}),
  associationTravelGroup,
  attractionTypes,
  awards,
  csrTypes,
  dastaBusinessType,
  facilities,
  selectingCommunityChoices,
  touristTargetGroups,
  touristTravelType,
  consents,
  mode,
}: TravelMartRegisterEntrepreneurFormProps) => {
  const t = useTranslations("common");

  const { provinces, districts, subdistricts } = useContext(AppContext);

  const step3 = convertDataToJsonChoice(
    attractionTypes,
    "3",
    "checkbox",
    "ท่านสนใจรูปแบบการท่องเที่ยวโดยชุมชนประเภทใด (เลือกได้มากกว่า 1 ข้อ)"
  );
  const step4 = convertDataToJsonChoice(
    selectingCommunityChoices,
    "4",
    "checkbox",
    "สถานประกอบการ/บริษัท ของท่านพิจารณาในการคัดเลือกแหล่งท่องเที่ยวชุมชนและให้ความสำคัญเรื่องใด (เลือกได้มากกว่า 1 ข้อ)"
  );
  const step5 = convertDataToJsonChoice(
    awards,
    "5",
    "checkbox",
    "สถานประกอบการ/บริษัทของท่าน ได้รับมาตรฐานหรือรางวัลอะไรบ้าง (เลือกได้มากกว่า 1 ข้อ)"
  );
  const step6 = convertDataToJsonChoice(
    csrTypes,
    "6",
    "checkbox",
    "สถานประกอบการ/บริษัทของท่าน มีส่วนร่วมในการทำกิจกรรมเพื่อสังคมด้านใดบ้าง (เลือกได้มากกว่า 1 ข้อ)"
  );
  const step8 = convertDataToJsonChoice(
    touristTargetGroups,
    "8",
    "checkbox",
    "กลุ่มนักท่องเที่ยวที่เป็นกลุ่มเป้าหมายหลักของสถานประกอบการ/บริษัทของท่านในปัจจุบัน (เลือกได้มากกว่า 1 ข้อ)"
  );
  const step9 = convertDataToJsonChoice(
    touristTargetGroups,
    "9",
    "checkbox",
    "กลุ่มนักท่องเที่ยวที่เป็นกลุ่มเป้าหมายหลักของสถานประกอบการ/บริษัทของท่านในอนาคต (เลือกได้มากกว่า 1 ข้อ)"
  );
  const step10 = convertDataToJsonChoice(
    touristTravelType,
    "10",
    "checkbox",
    "ตลาดใดบ้าง ที่บริษัทของท่านเคยรับรองการท่องเที่ยวในปัจจุบัน"
  );
  const step11 = convertDataToJsonChoice(
    touristTravelType,
    "11",
    "checkbox",
    "ตลาดใดบ้าง ที่บริษัทของท่านเคยรับรองการท่องเที่ยวในอนาคต"
  );

  const step = stepEntrepreneurFormSchema.strip().parse({
    step: {
      "3": step3,
      "4": step4,
      "5": step5,
      "6": step6,
      "7": Step[7],
      "8": step8,
      "9": step9,
      "10": step10,
      "11": step11,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLastStep, setIsLastStep] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [orgStatus, setOrgStatus] = useState("");

  const formContext = useForm<TravelMartRegisterEntrepreneurSchema>({
    defaultValues: {
      files: [],
      haveOther: false,
      consent: false,
      dataDissemination: false,
      lengthOfBusiness: 0,
      step3: step.step[3],
      step4: step.step[4],
      step5: step.step[5],
      step6: step.step[6],
      step7: step.step[7],
      step8: step.step[8],
      step9: step.step[9],
      step10: step.step[10],
      step11: step.step[11],
      step5Have: [{ name: "" }],
    },
    resolver: customZodResolver(travelMartRegisterEntrepreneurSchema),
  });

  const {
    trigger,
    watch,
    control,
    setValue,
    formState: { errors },
  } = formContext;

  useEffect(() => {
    setIsLastStep(activeStep == stateMenu.length ? true : false);
  }, [activeStep]);

  const stateMenu = [
    {
      id: 1,
      label: t("travelMart.register.entrepreneur.step.informationRegistrant"),
      content: <TravelMartRegisterEntrepreneurStep1 setIsLoading={setIsLoading} mode={mode} />,
    },
    {
      id: 2,
      label: t("travelMart.register.entrepreneur.step.marketAndTourist"),
      content: (
        <TravelMartRegisterEntrepreneurStep2
          associationTravelGroup={associationTravelGroup}
          dastaBusinessType={dastaBusinessType}
          mode={mode}
        />
      ),
    },
  ];

  const handleNext = async () => {
    const isValid = await trigger([
      "companyName",
      "companyLicenseNumber",
      "lengthOfBusiness",
      "files",
      "phoneNumber",
      "email",
      "firstName",
      "lastName",
      "line",
      "address",
      "website",
      "facebook",
      "instagram",
      "tikTok",
      "haveOther",
      "other",
    ]);
    if (isValid) {
      setActiveStep((cur) => cur + 1);
    }
  };

  const onSubmit = formContext.handleSubmit(async (data: TravelMartRegisterEntrepreneurSchema) => {
    if (mode == "create") setConfirm({ body: data, type: "organization" });
  });

  const checkDataDissemination = watch("dataDissemination");
  const checkConsent = watch("consent");

  const { session } = useSession();
  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS" && r.role == "organization");

  const isOrganization = !isEmpty(roles);

  const status = get(roles, [0, "status"], "");

  useEffect(() => {
    if (!isOrganization || mode == "create") {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      const { organization, error } = await getOrganizationProfile();
      if (error) {
        handleAPIError(error);
        setIsLoading(false);
        return;
      }
      if (organization) {
        const province: any = provinces.find((p) => p.id === organization.organizationInfo.provinceId);
        const district: any = districts.find((d) => d.id === organization.organizationInfo.districtId);
        const subdistrict: any = subdistricts.find((s) => s.id === organization.organizationInfo.subDistrictId);

        province && setValue("address.province", province);
        district && setValue("address.district", district);
        subdistrict && setValue("address.subdistrict", subdistrict);
        subdistrict && setValue("address.postCode", subdistrict?.postal);

        setValue("consent", true);
        setValue("dataDissemination", true);
        setValue("companyName", organization.organizationInfo.organizationTitle);
        setValue("companyLicenseNumber", organization.organizationInfo.registeredNo);
        organization.organizationInfo.address &&
          setValue("address.addressDetail", organization.organizationInfo.address);
        organization.organizationInfo.latitude && setValue("address.lat", organization.organizationInfo.latitude);
        organization.organizationInfo.longitude && setValue("address.long", organization.organizationInfo.longitude);
        organization.organizationInfo.googleMapUrl &&
          setValue("address.googleMapUrl", organization.organizationInfo.googleMapUrl);
        setValue("lengthOfBusiness", organization.organizationInfo.organizationYear);

        setValue("firstName", organization.contactPoints[0]?.firstname);
        setValue("lastName", organization.contactPoints[0]?.lastname);
        setValue("phoneNumber", organization.contactPoints[0]?.mobile);
        setValue("email", organization.contactPoints[0]?.email);
        organization.contactPoints[0]?.line && setValue("line", organization.contactPoints[0]?.line);

        organization.organizationInfo.website && setValue("website", organization.organizationInfo.website);
        organization.organizationInfo.facebook && setValue("facebook", organization.organizationInfo.facebook);
        organization.organizationInfo.instagram && setValue("instagram", organization.organizationInfo.instagram);
        organization.organizationInfo.tiktok && setValue("tikTok", organization.organizationInfo.tiktok);
        setValue("haveOther", organization.organizationInfo.other != null);
        organization.organizationInfo.other != null && setValue("other", organization.organizationInfo.other);

        organization.organizationMarketingTourism.dastaBusinessType &&
          setValue("typeOfEstablishment", organization.organizationMarketingTourism.dastaBusinessType);
        organization.organizationMarketingTourism.associationTravelGroup &&
          setValue("association", organization.organizationMarketingTourism.associationTravelGroup);

        const step3Values = step3.options
          .filter((op) =>
            organization.organizationMarketingTourism.attractionTypes.some((at) => at.id === Number(op.value))
          )
          .reduce((result: any, op) => {
            const key = `3-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});
        const step4Values = step4.options
          .filter((op) =>
            organization.organizationMarketingTourism.selectingCommunityChoices.some((at) => at.id === Number(op.value))
          )
          .reduce((result: any, op) => {
            const key = `4-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});
        const step5Values = step5.options
          .filter((op) => organization.organizationMarketingTourism.awards.some((at) => at.id === Number(op.value)))
          .reduce((result: any, op) => {
            const key = `5-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});
        const step6Values = step6.options
          .filter((op) => organization.organizationMarketingTourism.csrTypes.some((at) => at.id === Number(op.value)))
          .reduce((result: any, op) => {
            const key = `6-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});
        const step7Value = organization.organizationMarketingTourism.requireBusinessMatching
          ? "7-option-1"
          : "7-option-2";

        const step8Values = step8.options
          .filter(
            (op: any) =>
              organization.organizationMarketingTourism.currentTouristTargetGroups?.some(
                (at) => at.id === Number(op.value)
              )
          )
          .reduce((result: any, op) => {
            const key = `8-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});
        const step9Values = step9.options
          .filter(
            (op: any) =>
              organization.organizationMarketingTourism.futureTouristTargetGroups?.some(
                (at) => at.id === Number(op.value)
              )
          )
          .reduce((result: any, op) => {
            const key = `9-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});
        const step10Values = step10.options
          .filter((op) =>
            organization.organizationMarketingTourism.currentTouristTravelType.some((at) => at.id === Number(op.value))
          )
          .reduce((result: any, op) => {
            const key = `10-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});
        const step11Values = step11.options
          .filter((op) =>
            organization.organizationMarketingTourism.futureTouristTravelType.some((at) => at.id === Number(op.value))
          )
          .reduce((result: any, op) => {
            const key = `11-option-${op.value}`;
            result[key] = { value: op.value };
            return result;
          }, {});

        step3Values && setValue("step3.value", step3Values);
        step4Values && setValue("step4.value", step4Values);
        step5Values && setValue("step5.value", step5Values);
        step6Values && setValue("step6.value", step6Values);
        step7Value && setValue("step7.value", { [step7Value]: { value: step7Value } } as any);
        step8Values && setValue("step8.value", step8Values);
        step9Values && setValue("step9.value", step9Values);
        step10Values && setValue("step10.value", step10Values);
        step11Values && setValue("step11.value", step11Values);
      }
      setOrgStatus(organization?.organizationInfo?.status ?? "");
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-10">
      {orgStatus == "pending" && (
        <h3 className="mb-10 font-medium text-smart-cbt-orange">{t("travelMart.register.pending")}</h3>
      )}
      {orgStatus == "rejected" && (
        <h3 className="mb-10 font-medium text-smart-cbt-red">{t("travelMart.register.rejected")}</h3>
      )}
      <FormProvider {...formContext}>
        {isLoading ? (
          <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green"></div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <TravelMartStep activeStep={activeStep} stateMenu={stateMenu} />
            {isLastStep && (
              <div className="relative mt-10 flex-1">
                <h1 className="mb-4 font-medium text-smart-cbt-dark-green">
                  {t("travelMart.register.community.consentInformation")}
                </h1>
                <div>
                  <FormCheckbox
                    label={
                      <LabelConsentTravelMartForm
                        mainText={t("travelMart.register.community.dataDissemination")}
                        highlighText={t("travelMart.register.community.termsAndConditions")}
                        onClick={openTermsAndConditions}
                      />
                    }
                    type="checkbox"
                    name="dataDissemination"
                    control={control}
                    labelClassName="overflow-auto whitespace-normal text-sm break-words"
                    checkboxClassName="items-start"
                    className="inline-block"
                    disabled={mode == "view"}
                  />
                  <FormCheckbox
                    label={
                      <LabelConsentTravelMartForm
                        mainText={t("travelMart.register.community.consent")}
                        highlighText={t("travelMart.register.community.privacyPolicy")}
                        onClick={openPrivacyPolicy}
                      />
                    }
                    name="consent"
                    labelClassName="overflow-auto whitespace-normal text-sm break-words"
                    control={control}
                    disabled={mode == "view"}
                  />
                </div>
              </div>
            )}
            <div className="mt-8">
              <TravelMartStepButton
                isLoading={isLoading}
                handleNext={handleNext}
                intentSubmit={!checkConsent || !checkDataDissemination ? "disabled" : "secondary"}
                disabledSubmit={!checkConsent || !checkDataDissemination}
                isLastStep={isLastStep}
                mode={mode}
              />
            </div>
          </form>
        )}
      </FormProvider>
    </div>
  );
};

export default TravelMartRegisterEntrepreneurForm;
