import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";
import CommunityInfoMediaUploaderForm from "./components/CommunityInfoMediaUploaderForm";
import CommunityInfoMediaFeturedImageUploaderForm from "./components/CommunityInfoMediaFeturedImageUploaderForm";

type CommunityInfoStep1MediaFormProps = {
  areFieldsDisabled: boolean;
};

export const CommunityInfoStep1MediaForm = (props: CommunityInfoStep1MediaFormProps) => {
  const t = useTranslations("common");

  const {
    control,
    formState: { errors },
  } = useFormContext<CommunityInfoCreateSchema>();

  return (
    <>
      <CommunityInfoFormHeader header={t("community.info.create.step1.mediaInformation")} />
      <CommunityInfoMediaFeturedImageUploaderForm
        name={"step1.media.featuredImage"}
        mediaType="image"
        control={control}
        disabled={props.areFieldsDisabled}
      />
      <CommunityInfoMediaUploaderForm
        name={"step1.media.images"}
        mediaType="image"
        maximumFiles={20}
        control={control}
        disabled={props.areFieldsDisabled}
      />
      <CommunityInfoMediaUploaderForm
        name={"step1.media.videos"}
        mediaType="video"
        maximumFiles={20}
        control={control}
        disabled={props.areFieldsDisabled}
      />
    </>
  );
};
