import { getGuideProfile } from "@/app/[locale]/(authenticated)/travel-mart/profile/actions";
import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { HourGlassIcon, ShieldCheck } from "@/components/Icon";
import { useSession } from "@/components/context-provider/AuthProvider";
import Form from "@/components/form/Form";
import FormCheckbox from "@/components/form/FormCheckbox";
import FormDatePicker from "@/components/form/FormDatePicker";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import FormProfileUploadImage from "@/components/form/FormProfileUploadImage";
import { AppContext } from "@/contexts/App.context";
import { customZodResolver } from "@/schemas/base-schema";
import {
  TravelMartRegisterGuideSchema,
  travelMartRegisterGuideSchema,
} from "@/schemas/forms/travel-mart/register/travel-mart-register-guide-schema";
import { validatePhone } from "@/utils/cms/api-helpers";
import { XOR, handleAPIError } from "@/utils/helper";
import { isNaN, isNil } from "lodash";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LabelConsentTravelMartForm } from "../community/TravelMartRegisterCommunityForm";

type TravelMartRegisterGuideFormProps = {
  openTermsAndConditions: () => void;
  openPrivacyPolicy: () => void;
  languageSkills: { id: string; title: string }[];
} & XOR<
  { mode: "view" },
  { mode: "create"; setConfirm: (confirm: { body: any; type: "community" | "organization" | "guide" }) => void }
>;

const TravelMartRegisterGuideForm = ({
  openPrivacyPolicy,
  openTermsAndConditions,
  mode,
  setConfirm,
  languageSkills,
}: TravelMartRegisterGuideFormProps) => {
  const t = useTranslations("common");

  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [status, setStatus] = useState("");

  const { provinces, districts, subdistricts } = useContext(AppContext);

  const { session } = useSession();
  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS").map((r) => r.role);
  const isGuide = roles?.includes("guide");

  const formContext = useForm<TravelMartRegisterGuideSchema>({
    defaultValues: { languageAbility: "1", haveOtherSocial: false },
    resolver: customZodResolver(travelMartRegisterGuideSchema),
  });

  const {
    control,
    watch,
    resetField,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, dirtyFields },
  } = formContext;

  const onError = (errors: any) => {
    console.error(errors);
  };

  const onSubmit = handleSubmit((data) => {
    if (mode == "create") setConfirm({ body: data, type: "guide" });
  }, onError);

  // const onSubmit = async () => {
  //   const isValid = await formContext.trigger();
  //   if (!isValid) return;

  //   const data = watch();

  //   console.log('dataa: ', JSON.stringify(data))

  //   if (mode == "create") setConfirm({ body: data, type: "guide" });
  // };

  const checkOtherSocial = watch("haveOtherSocial");

  const numberLanguage = Number(watch("languageAbility"));

  const checkDataDissemination = watch("dataDissemination");
  const checkConsent = watch("consent");

  const province = watch("guideAddress.province");
  const district = watch("guideAddress.district");
  const subdistrict = watch("guideAddress.subdistrict");

  const showSubmitButton = mode == "create" || (mode == "view" && canEdit);

  useEffect(() => {
    if (!(dirtyFields.guideAddress?.province || dirtyFields.guideAddress?.district)) return;
    resetField("guideAddress.district", { keepDirty: true });
  }, [province]);

  useEffect(() => {
    if (!(dirtyFields.guideAddress?.province || dirtyFields.guideAddress?.district)) return;
    resetField("guideAddress.subdistrict", { keepDirty: true });
  }, [district]);

  useEffect(() => {
    subdistrict?.postal && setValue("guideAddress.postCode", subdistrict.postal);
  }, [subdistrict]);

  useEffect(() => {
    const number = [];
    for (let i = 1; i <= numberLanguage; i++) {
      number.push(i);
    }
    setNumberArray(number);

    // slice language array to numberLanguage
    const languages = getValues("language") ?? [];
    if (!isNaN(numberLanguage)) setValue("language", languages.slice(0, numberLanguage));
  }, [numberLanguage]);

  useEffect(() => {
    if (!isGuide || mode == "create") {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      const { guide, error } = await getGuideProfile();
      if (error) {
        handleAPIError(error);
        setIsLoading(false);
        return;
      }
      if (guide) {
        setStatus(guide.status ?? "");

        const province: any = provinces.find((p) => p.id === guide.addressInfo.provinceId);
        const district: any = districts.find((d) => d.id === guide.addressInfo.districtId);
        const subdistrict: any = subdistricts.find((s) => s.id === guide.addressInfo.subDistrictId);
        const provinceGuide: any = provinces.find((p) => p.id === guide.guideInfo.workProvinceId);
        const guideLanguageSkills = guide.guideInfo.languageSkills;

        const languageSkillsMain = languageSkills
          .filter((ls) => guideLanguageSkills.includes(ls.id))
          .map((ls) => ({ name: ls }));

        setValue("email", guide.email);
        setValue("consent", true);
        setValue("dataDissemination", true);
        guide.facebook && setValue("facebook", guide.facebook);
        guide.instagram && setValue("instagram", guide.instagram);

        if (!isNil(guide.profileImageInfo)) setValue("files", guide.profileImageInfo);

        setValue("firstName", guide.firstname);
        setValue("lastName", guide.lastname);
        setValue("phoneNumber", guide.mobile);
        setValue("identification", guide.thaiNationalId);
        setValue("licenseNumber", guide.guideInfo.licenseNumber);
        setValue("expiateDate", guide.guideInfo.licenseExpiredDate);
        setValue("identification", guide.thaiNationalId);
        setValue("haveOtherSocial", guide.other ? true : false);
        setValue("language", languageSkillsMain);
        setValue("languageAbility", guideLanguageSkills.length);
        setValue("lengthOfGuide", guide.guideInfo.yearExperience);
        setValue("companyWork", guide.guideInfo.organizationTitle);
        setValue("affiliatedWith", guide.guideInfo.communityTitle);
        guide.addressInfo.address && setValue("guideAddress.addressDetail", guide.addressInfo.address);
        provinceGuide && setValue("provinceGuide", provinceGuide);
        province && setValue("guideAddress.province", province);
        district && setValue("guideAddress.district", district);
        subdistrict && setValue("guideAddress.subdistrict", subdistrict);
        subdistrict && setValue("guideAddress.postCode", subdistrict.postal);
        guide.other && setValue("otherSocial", guide.other);

        for (let i = 1; i <= guideLanguageSkills.length; i++) {
          numberArray.push(i);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const searchDistricts = async (query?: string) => {
    return Promise.resolve(
      districts?.filter((di) => di.province == province?.id && di.title?.includes(query ?? "")) ?? []
    );
  };

  const searchSubDistricts = async (query?: string) => {
    return Promise.resolve(
      subdistricts?.filter((sub) => sub.district == district?.id && sub.title?.includes(query ?? "")) ?? []
    );
  };

  const renderStatusRegister = () => {
    switch (status) {
      case "draft":
        return (
          <div className="flex flex-row items-center gap-2">
            <HourGlassIcon className="h-6 w-6" />
            <h3 className="font-medium text-smart-cbt-orange">{t("travelMart.register.guide.status.waiting")}</h3>
          </div>
        );
      case "published":
        return (
          <div className="flex flex-row items-center gap-2 text-smart-cbt-green">
            <ShieldCheck className="h-6 w-6" />
            <h3 className="font-medium">{t("travelMart.register.guide.status.completed")}</h3>
          </div>
        );
    }
  };

  const onInputNumberChange = (e: any) => {
    if (Number(e.target.value) > Number(e.target.max)) e.target.value = Number(e.target.max);
  };

  return isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green"></div>
    </div>
  ) : (
    <form className="mt-6 flex flex-col gap-8" onSubmit={onSubmit}>
      {mode == "view" && <div className="flex-1">{renderStatusRegister()}</div>}
      <div className="flex flex-col items-center justify-center gap-2">
        <FormProfileUploadImage
          id={"profileGuide"}
          name={"files"}
          folderName={"Guide Profile Image"}
          control={control}
          disabled={(mode == "view" && !canEdit) || isImageLoading}
          onLoading={(loading: boolean) => setIsImageLoading(loading)}
        />
        {errors.files?.message && <FormFieldError error={errors.files?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="text-smart-cbt-dark-green">{t("travelMart.register.guide.contactInformation")}</h3>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="firstName"
              control={control}
              type="text"
              isRequired
              placeholder={t("travelMart.register.guide.firstName")}
              showClearButton={mode == "create" && canEdit}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              errorMessage={errors?.firstName?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="lastName"
              control={control}
              type="text"
              isRequired
              placeholder={t("travelMart.register.guide.lastName")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.lastName?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="identification"
              control={control}
              maxLength={13}
              type="text"
              isRequired
              placeholder={t("travelMart.register.guide.identification")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.identification?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="nationality"
              control={control}
              type="text"
              isRequired
              placeholder={t("travelMart.register.guide.nationality")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.nationality?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="guideAddress.addressDetail"
              control={control}
              type="text"
              isRequired
              placeholder={t("travelMart.register.guide.addressDetail")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.guideAddress?.addressDetail?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <Form.FloatingDropSearch
              name="guideAddress.province"
              values={provinces ?? []}
              idKey="id"
              displayKey="title"
              title={t("travelMart.register.address.province")}
              filterKey={"title"}
              placeholder={t("travelMart.register.address.province")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              control={control}
              isRequired
            />
            {errors.guideAddress?.province?.message && <FormFieldError error={errors.guideAddress.province.message} />}
          </Flex.Element>
          <Flex.Element>
            <Form.FloatingDropSearch
              name="guideAddress.district"
              searchFunction={searchDistricts}
              idKey="id"
              displayKey="title"
              title={t("travelMart.register.address.district")}
              placeholder={t("travelMart.register.address.district")}
              disabled={(mode == "view" && !canEdit) || !province?.id}
              control={control}
              isRequired
            />
            {errors.guideAddress?.district?.message && <FormFieldError error={errors.guideAddress.district.message} />}
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <Form.FloatingDropSearch
              name="guideAddress.subdistrict"
              searchFunction={searchSubDistricts}
              idKey="id"
              displayKey="title"
              title={t("travelMart.register.address.subdistrict")}
              disabled={(mode == "view" && !canEdit) || !district?.id}
              placeholder={t("travelMart.register.address.subdistrict")}
              control={control}
              onChangeInterceptor={(v, next) => {
                setValue("guideAddress.postCode", v.postal);
                next(v);
              }}
              isRequired
            />
            {errors.guideAddress?.subdistrict?.message && (
              <FormFieldError error={errors.guideAddress.subdistrict.message} />
            )}
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.postCode")}
              type="text"
              name="guideAddress.postCode"
              control={control}
              disabled={true}
              isRequired
              errorMessage={errors?.guideAddress?.postCode?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="phoneNumber"
              control={control}
              type="text"
              isRequired
              maxLength={10}
              onInput={validatePhone}
              placeholder={t("travelMart.register.guide.phoneNumber")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.phoneNumber?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="email"
              control={control}
              type="text"
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              isRequired
              placeholder={t("travelMart.register.guide.email")}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.email?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="line"
              control={control}
              type="text"
              placeholder={t("travelMart.register.guide.line")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.line?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="facebook"
              control={control}
              type="text"
              placeholder={t("travelMart.register.guide.facebook")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.facebook?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="instagram"
              control={control}
              type="text"
              placeholder={t("travelMart.register.guide.instagram")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.instagram?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormCheckbox
              label={t("travelMart.register.guide.other")}
              name="haveOtherSocial"
              labelClassName="text-sm"
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              control={control}
            />
          </Flex.Element>
        </Flex.Container>
        {checkOtherSocial && (
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                name="otherSocial"
                control={control}
                type="text"
                placeholder={t("travelMart.register.guide.other")}
                disabled={(mode == "view" && !canEdit) || isImageLoading}
                showClearButton={mode == "create" && canEdit}
                errorMessage={errors?.otherSocial?.message}
              />
            </Flex.Element>
          </Flex.Container>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-smart-cbt-dark-green">{t("travelMart.register.guide.contactInformation")}</h3>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="licenseNumber"
              control={control}
              type="text"
              maxLength={7}
              isRequired
              placeholder={t("travelMart.register.guide.licenseNumber")}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.licenseNumber?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormDatePicker
              name="expiateDate"
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              control={control}
              isRequired
              showFloatingLabel
              showIcon
              placeholder={t("travelMart.register.guide.expiateDate")}
            />
            {errors.expiateDate?.message && <FormFieldError error={errors.expiateDate.message} />}
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="affiliatedWith"
              control={control}
              type="text"
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              isRequired
              placeholder={t("travelMart.register.guide.affiliatedWith")}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.affiliatedWith?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <div className="grid grid-cols-2">
          <FormFloatingLabelTextInput
            name="languageAbility"
            control={control}
            type="number"
            min={1}
            isRequired
            placeholder={t("travelMart.register.guide.languageAbility")}
            disabled={mode == "view" && !canEdit}
            showClearButton={mode == "create" && canEdit}
            errorMessage={errors?.languageAbility?.message}
          />
          {numberArray.length != 0 && (
            <div className="flex flex-col">
              {numberArray.map((number, i) => (
                <Form.FloatingDropSearch
                  key={i}
                  name={`language.${i}.name`}
                  values={languageSkills}
                  idKey="id"
                  displayKey="title"
                  filterKey="title"
                  disabled={mode == "view" && !canEdit}
                  title={""}
                  placeholder={t("travelMart.register.guide.language", { number: number })}
                  control={control}
                  isRequired
                />
              ))}
            </div>
          )}
        </div>
        <Flex.Container>
          <Flex.Element>
            <Form.FloatingDropSearch
              name="provinceGuide"
              values={provinces ?? []}
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              idKey="id"
              displayKey="title"
              title={t("travelMart.register.guide.provinceGuide")}
              filterKey={"title"}
              placeholder={t("travelMart.register.guide.provinceGuide")}
              control={control}
              isRequired
            />
            {errors.provinceGuide?.message && <FormFieldError error={errors.provinceGuide?.message} />}
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="companyWork"
              control={control}
              type="text"
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              isRequired
              placeholder={t("travelMart.register.guide.companyWork")}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.companyWork?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="lengthOfGuideMonth"
              control={control}
              min={1}
              type="number"
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              isRequired
              max={11}
              maxLength={2}
              placeholder={t("travelMart.register.guide.lengthOfGuideMonth")}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.lengthOfGuideMonth?.message}
              onInput={onInputNumberChange}
            />
          </Flex.Element>
          
          <Flex.Element>
            <FormFloatingLabelTextInput
              name="lengthOfGuide"
              control={control}
              min={1}
              type="number"
              disabled={(mode == "view" && !canEdit) || isImageLoading}
              isRequired
              max={100}
              maxLength={2}
              placeholder={t("travelMart.register.guide.lengthOfGuide")}
              showClearButton={mode == "create" && canEdit}
              errorMessage={errors?.lengthOfGuide?.message}
              onInput={onInputNumberChange}
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
                onClick={openTermsAndConditions}
              />
            }
            type="checkbox"
            name="dataDissemination"
            disabled={(mode == "view" && !canEdit) || isImageLoading}
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
                onClick={openPrivacyPolicy}
              />
            }
            disabled={(mode == "view" && !canEdit) || isImageLoading}
            name="consent"
            labelClassName="overflow-auto whitespace-normal text-sm break-words"
            control={control}
          />
        </div>
      </div>
      {showSubmitButton && (
        <Button
          intent={!checkConsent || !checkDataDissemination ? "disabled" : "primary"}
          disabled={!checkConsent || !checkDataDissemination}
          className="rounded-full md:max-w-full"
          size="medium"
          type="submit"
        >
          {mode == "view" && canEdit ? t("global.save") : t("travelMart.register.confirmRegistration")}
        </Button>
      )}
    </form>
  );
};

export default TravelMartRegisterGuideForm;
