import Flex from "@/components/Flex";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";

type CommunityInfoStep1CommunityDetailFormProps = {
  areFieldsDisabled: boolean;
};

export const CommunityInfoStep1CommunityDetailForm = (props: CommunityInfoStep1CommunityDetailFormProps) => {
  const t = useTranslations("common");

  const {
    register,
    formState: { errors },
  } = useFormContext<CommunityInfoCreateSchema>();

  return (
    <>
      <CommunityInfoFormHeader isRequired header={t("community.info.create.step1.communityAbout")} />
      <Flex.Container>
        <Flex.Element>
          <Form.TextArea
            rows={5}
            placeholder={t("community.info.create.step1.communityDetail")}
            intent={props.areFieldsDisabled ? "disabled" : null}
            disabled={props.areFieldsDisabled}
            {...register("step1.detail")}
          />
          <FormFieldError error={errors.step1?.detail?.message} />
        </Flex.Element>
      </Flex.Container>
    </>
  );
};
