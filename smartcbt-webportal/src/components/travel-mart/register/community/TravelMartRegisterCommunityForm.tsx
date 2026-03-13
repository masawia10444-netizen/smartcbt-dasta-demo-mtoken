"use client";

import { getCommunityProfile, handleUpdateCommunity } from "@/app/[locale]/(authenticated)/travel-mart/profile/actions";
import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { HourGlassIcon, SaveDiskIcon, ShieldCheck } from "@/components/Icon";
import { useSession } from "@/components/context-provider/AuthProvider";
import Form from "@/components/form/Form";
import FormCheckbox from "@/components/form/FormCheckbox";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { AppContext } from "@/contexts/App.context";
import { customZodResolver } from "@/schemas/base-schema";
import {
  TravelMartRegisterCommunitySchema,
  travelMartRegisterCommunitySchema,
} from "@/schemas/forms/travel-mart/register/travel-mart-register-community-schema";
import { XOR, handleAPIError, toastSuccess } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Fragment, MouseEventHandler, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const LabelConsentTravelMartForm = ({
  mainText,
  highlighText,
  onClick,
}: {
  mainText: string;
  highlighText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="inline-block">
      {mainText}
      <button type="button" className="pl-2 text-smart-cbt-green underline hover:no-underline" onClick={onClick}>
        {highlighText}
      </button>
    </div>
  );
};

type TravelMartRegisterCommunityFormProps = {
  openTermsAndConditions: () => void;
  openPrivacyPolicy: () => void;
} & XOR<
  { mode: "view" },
  { mode: "create"; setConfirm: (confirm: { body: any; type: "community" | "organization" | "guide" }) => void }
>;

const TravelMartRegisterCommunityForm = ({
  openTermsAndConditions,
  openPrivacyPolicy,
  mode,
  setConfirm,
}: TravelMartRegisterCommunityFormProps) => {
  const t = useTranslations("common");

  const { provinces, districts, subdistricts } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [status, setStatus] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<TravelMartRegisterCommunitySchema>({
    resolver: customZodResolver(travelMartRegisterCommunitySchema),
    defaultValues: { dataDissemination: false, consent: false },
  });
    const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (mode == "create") {
      setConfirm({ body: data, type: "community" })
      router.refresh();
  };
    if (mode == "view") {
      const { error, result } = await handleUpdateCommunity(data);
      if (error) handleAPIError(error);
      toastSuccess(t("profile.user.saveSuccessMessage"));
      setCanEdit(false);
    }
  });

  const province = watch("communityAddress.province");
  const district = watch("communityAddress.district");
  const subdistrict = watch("communityAddress.subdistrict");

  const checkDataDissemination = watch("dataDissemination");
  const checkConsent = watch("consent");

  const { session } = useSession();
  const roles = session?.user?.roles.filter((r) => r.app_code == "BUSINESS").map((r) => r.role);
  const isCommunity = roles?.includes("community");

  useEffect(() => {
    if (canEdit) return;
    if (provinces.length === 0 || districts.length === 0 || subdistricts.length === 0) return;
    if (!isCommunity || mode == "create") {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      const { community, error } = await getCommunityProfile();
      if (error) {
        handleAPIError(error);
        setIsLoading(false);
        return;
      }
      if (community) {
        // console.log(community);
        const province: any = provinces.find((p) => p.id === community.addressInfo.provinceId);
        const district: any = districts.find((d) => d.id === community.addressInfo.districtId);
        const subdistrict: any = subdistricts.find((s) => s.id === community.addressInfo.subDistrictId);

        setStatus(community.status ?? "");

        setValue("consent", true);
        setValue("dataDissemination", true);
        setValue("firstName", community.firstname);
        setValue("lastName", community.lastname);
        setValue("email", community.email);
        setValue("phoneNumber", community.mobile);
        community.addressInfo.address && setValue("communityAddress.addressDetail", community.addressInfo.address);
        province && setValue("communityAddress.province", province);
        district && setValue("communityAddress.district", district);
        subdistrict && setValue("communityAddress.subdistrict", subdistrict);
        subdistrict && setValue("communityAddress.postCode", subdistrict.postal);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [provinces, canEdit]);

  const renderStatusRegister = () => {
    switch (status) {
      case "draft":
        return (
          <div className="flex flex-row items-center gap-2">
            <HourGlassIcon className="h-6 w-6" />
            <h3 className="font-medium text-smart-cbt-orange">{t("travelMart.register.community.status.waiting")}</h3>
          </div>
        );
      case "published":
        return (
          <div className="flex flex-row items-center gap-2 text-smart-cbt-green">
            <ShieldCheck className="h-6 w-6" />
            <h3 className="font-medium">{t("travelMart.register.community.status.completed")}</h3>
          </div>
        );
    }
  };

  useEffect(() => {
    if (!(dirtyFields?.communityAddress?.province || dirtyFields.communityAddress?.district)) return;
    resetField("communityAddress.district", { keepDirty: true });
  }, [province]);

  useEffect(() => {
    if (!(dirtyFields.communityAddress?.province || dirtyFields.communityAddress?.district)) return;
    resetField("communityAddress.subdistrict", { keepDirty: true });
  }, [district]);

  useEffect(() => {
    subdistrict?.postal && setValue("communityAddress.postCode", subdistrict.postal);
  }, [subdistrict]);

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

  return isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green"></div>
    </div>
  ) : (
    <Fragment>
      {/* {mode == "view" && !canEdit && (
        <div className="flex flex-row justify-end">
          <Button
            intent={"secondary"}
            onClick={() => setCanEdit(true)}
            size="small"
            className="w-fit px-5"
            icon={<EditPencil />}
            type="button"
          >
            {t("global.edit")}
          </Button>
        </div>
      )} */}
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {mode == "view" && <div className="flex-1">{renderStatusRegister()}</div>}
        <div className="flex-1">
          <h1 className="mb-4 font-medium text-smart-cbt-dark-green">
            {t("travelMart.register.community.coordinatorInformation")}
          </h1>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.community.firstName")}
                type="text"
                name="firstName"
                control={control}
                isRequired
                disabled={mode == "view" && !canEdit}
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
                disabled={mode == "view" && !canEdit}
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
                disabled={mode == "view" && !canEdit}
                errorMessage={errors?.email?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.community.phoneNumber")}
                type="text"
                name="phoneNumber"
                control={control}
                isRequired
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value;
                  setValue("phoneNumber", value);
                }}
                disabled={mode == "view" && !canEdit}
                errorMessage={errors?.phoneNumber?.message}
              />
            </Flex.Element>
          </Flex.Container>
        </div>
        <div className="flex-1">
          <h1 className="mb-4 font-medium text-smart-cbt-dark-green">
            {t("travelMart.register.community.communityInformation")}
          </h1>
          <FormFloatingLabelTextInput
            placeholder={t("travelMart.register.community.addressDetail")}
            type="text"
            showClearButton
            name="communityAddress.addressDetail"
            control={control}
            disabled={mode == "view" && !canEdit}
            isRequired
            errorMessage={errors?.communityAddress?.addressDetail?.message}
          />
          {/* <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.community.addressDetail")}
              type="text"
              showClearButton
              name="communityAddress.addressDetail"
              disabled={mode == "view" && !canEdit}
              control={control}
              errorMessage={errors?.communityAddress?.addressDetail?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.no")}
              type="text"
              showClearButton
              name="communityAddress.no"
              disabled={mode == "view" && !canEdit}
              control={control}
              errorMessage={errors?.communityAddress?.no?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.moo")}
              type="text"
              showClearButton
              name="communityAddress.moo"
              disabled={mode == "view" && !canEdit}
              control={control}
              errorMessage={errors?.communityAddress?.moo?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.villageName")}
              type="text"
              showClearButton
              name="communityAddress.villageName"
              disabled={mode == "view" && !canEdit}
              control={control}
              errorMessage={errors?.communityAddress?.villageName?.message}
            />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.soi")}
              type="text"
              showClearButton
              name="communityAddress.soi"
              disabled={mode == "view" && !canEdit}
              control={control}
              errorMessage={errors?.communityAddress?.soi?.message}
            />
          </Flex.Element>
          <Flex.Element>
            <FormFloatingLabelTextInput
              placeholder={t("travelMart.register.address.road")}
              type="text"
              showClearButton
              name="communityAddress.road"
              disabled={mode == "view" && !canEdit}
              control={control}
              errorMessage={errors?.communityAddress?.road?.message}
            />
          </Flex.Element>
        </Flex.Container> */}
          <Flex.Container>
            <Flex.Element>
              <Form.FloatingDropSearch
                name="communityAddress.province"
                values={provinces}
                idKey="id"
                displayKey="title"
                title={t("travelMart.register.address.province")}
                filterKey={"title"}
                placeholder={t("travelMart.register.address.province")}
                control={control}
                isRequired
                disabled={mode == "view" && !canEdit}
              />
              {errors.communityAddress?.province?.message && (
                <FormFieldError error={errors.communityAddress.province.message} />
              )}
            </Flex.Element>
            <Flex.Element>
              <Form.FloatingDropSearch
                name="communityAddress.district"
                searchFunction={searchDistricts}
                idKey="id"
                displayKey="title"
                title={t("travelMart.register.address.district")}
                placeholder={t("travelMart.register.address.district")}
                disabled={(mode == "view" && !canEdit) || !province?.id}
                control={control}
                isRequired
              />
              {errors.communityAddress?.district?.message && (
                <FormFieldError error={errors.communityAddress.district.message} />
              )}
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <Form.FloatingDropSearch
                name="communityAddress.subdistrict"
                searchFunction={searchSubDistricts}
                idKey="id"
                displayKey="title"
                title={t("travelMart.register.address.subdistrict")}
                placeholder={t("travelMart.register.address.subdistrict")}
                disabled={(mode == "view" && !canEdit) || !district?.id}
                control={control}
                isRequired
              />
              {errors.communityAddress?.subdistrict?.message && (
                <FormFieldError error={errors.communityAddress.subdistrict.message} />
              )}
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("travelMart.register.address.postCode")}
                type="text"
                name="communityAddress.postCode"
                disabled={true}
                control={control}
                isRequired
                errorMessage={errors?.communityAddress?.postCode?.message}
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
              disabled={mode == "view"}
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
                  onClick={openPrivacyPolicy}
                />
              }
              disabled={mode == "view"}
              name="consent"
              labelClassName="overflow-auto whitespace-normal text-sm break-words"
              control={control}
            />
          </div>
        </div>
        {mode == "create" && (
          <Button
            intent={!checkConsent || !checkDataDissemination ? "disabled" : "primary"}
            disabled={!checkConsent || !checkDataDissemination}
            className="rounded-full md:max-w-full"
            size="medium"
            type="submit"
          >
            {t("travelMart.register.confirmRegistration")}
          </Button>
        )}
        {mode == "view" && canEdit && (
          <Button
            intent={!checkConsent || !checkDataDissemination ? "disabled" : "primary"}
            disabled={!checkConsent || !checkDataDissemination}
            className="rounded-full md:max-w-full"
            size="medium"
            type="submit"
            icon={<SaveDiskIcon />}
          >
            {t("global.save")}
          </Button>
        )}
      </form>
    </Fragment>
  );
};

export default TravelMartRegisterCommunityForm;
