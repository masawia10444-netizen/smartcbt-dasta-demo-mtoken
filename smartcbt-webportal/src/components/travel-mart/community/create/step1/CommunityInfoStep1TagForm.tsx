import { FormFieldError } from "@/components/form/FormFieldError";
import FormTagsInput from "@/components/form/FormTagsInput";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";

type CommunityInfoStep1TagFormProps = {
  areFieldsDisabled: boolean;
};

export const CommunityInfoStep1TagForm = (props: CommunityInfoStep1TagFormProps) => {
  const t = useTranslations("common");

  const {
    control,
    formState: { errors },
  } = useFormContext<CommunityInfoCreateSchema>();

  return (
    <>
      <CommunityInfoFormHeader header={t("community.info.create.step1.tags")} />
      <FormFieldError error={errors.step1?.tags?.message} />
      <FormTagsInput control={control} name="step1.tags" disabled={props.areFieldsDisabled} />
    </>
  );
};
