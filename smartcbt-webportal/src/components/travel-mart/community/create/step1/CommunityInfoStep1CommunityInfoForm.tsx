import Flex from "@/components/Flex";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { AppContext } from "@/contexts/App.context";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";

type CommunityInfoStep1CommunityInfoFormProps = {
  areFieldsDisabled: boolean;
};

export const CommunityInfoStep1CommunityInfoForm = (props: CommunityInfoStep1CommunityInfoFormProps) => {
  const t = useTranslations("common");
  const { provinces, districts, subdistricts } = useContext(AppContext);

  const {
    control,
    formState: { errors },
    resetField,
    setValue,
    watch,
  } = useFormContext<CommunityInfoCreateSchema>();

  const province = watch("step1.community.province");
  const district = watch("step1.community.district");
  const subdistrict = watch("step1.community.subdistrict");

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

  useEffect(() => {
    if (!subdistrict) return;
    subdistrict?.postal && setValue("step1.community.postcode", subdistrict.postal);
  }, [subdistrict]);

  return (
    <>
      <CommunityInfoFormHeader header={t("community.info.create.step1.communityInformation")} />
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.communityName")}
            type="text"
            name="step1.community.name"
            control={control}
            isRequired
            errorMessage={errors?.step1?.community?.name?.message}
            disabled={props.areFieldsDisabled}
            maxLength={2000}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("global.address")}
            type="text"
            name="step1.community.address"
            control={control}
            isRequired
            errorMessage={errors?.step1?.community?.address?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <Form.FloatingDropSearch
            name="step1.community.province"
            values={provinces}
            idKey="id"
            displayKey="title"
            title={t("global.province")}
            filterKey={"title"}
            placeholder={t("global.province")}
            control={control}
            isRequired
            disabled={props.areFieldsDisabled}
            onChangeInterceptor={(v, next) => {
              resetField("step1.community.district", { keepDirty: true });
              resetField("step1.community.subdistrict", { keepDirty: true });
              next(v);
            }}
          />
          <FormFieldError error={errors.step1?.community?.province?.message} />
        </Flex.Element>
        <Flex.Element>
          <Form.FloatingDropSearch
            name="step1.community.district"
            searchFunction={searchDistricts}
            idKey="id"
            displayKey="title"
            title={t("global.district")}
            placeholder={t("global.district")}
            control={control}
            isRequired
            disabled={props.areFieldsDisabled || !province?.id}
            onChangeInterceptor={(v, next) => {
              resetField("step1.community.subdistrict", { keepDirty: true });
              next(v);
            }}
          />
          <FormFieldError error={errors.step1?.community?.district?.message} />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <Form.FloatingDropSearch
            name="step1.community.subdistrict"
            searchFunction={searchSubDistricts}
            idKey="id"
            displayKey="title"
            title={t("global.subdistrict")}
            placeholder={t("global.subdistrict")}
            control={control}
            isRequired
            disabled={props.areFieldsDisabled || !district?.id}
          />
          <FormFieldError error={errors.step1?.community?.subdistrict?.message} />
        </Flex.Element>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("global.postcode")}
            type="text"
            name="step1.community.postcode"
            control={control}
            isRequired
            errorMessage={errors?.step1?.community?.postcode?.message}
            disabled={true}
          />
        </Flex.Element>
      </Flex.Container>
    </>
  );
};
