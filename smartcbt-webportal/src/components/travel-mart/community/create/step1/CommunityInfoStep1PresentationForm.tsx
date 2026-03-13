import Flex from "@/components/Flex";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";
import CommunityInfoPdfUploaderForm from "./components/CommunityInfoPdfUploaderForm";

type CommunityInfoStep1PresentationFormProps = {
  areFieldsDisabled: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const CommunityInfoStep1PresentationForm = (props: CommunityInfoStep1PresentationFormProps) => {
  const t = useTranslations("common");

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CommunityInfoCreateSchema>();

  const hasYoutube = watch("step1.presentation.hasYoutube");
  const hasFacebook = watch("step1.presentation.hasFacebook");
  const hasInstagram = watch("step1.presentation.hasInstagram");
  const hasTiktok = watch("step1.presentation.hasTiktok");
  const hasDocument = watch("step1.presentation.hasDocument");
  const hasOther = watch("step1.presentation.hasOther");

  return (
    <>
      <CommunityInfoFormHeader header={t("community.info.create.step1.presentation")} />
      <Flex.Container>
        <Flex.Element>
          <div className="flex flex-row items-center">
            <div className="w-44">
              <Form.Checkbox
                name={"step1.presentation.hasYoutube"}
                control={control}
                label={t("community.info.create.step1.youtube")}
                disabled={props.areFieldsDisabled}
              />
            </div>
            <div className="w-full">
              <Form.Input
                intent={props.areFieldsDisabled || !hasYoutube ? "disabled" : "primary"}
                disabled={props.areFieldsDisabled || !hasYoutube}
                {...register(`step1.presentation.youtubeLink`)}
              />
              <FormFieldError error={errors.step1?.presentation?.youtubeLink?.message} />
            </div>
          </div>
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <div className="flex flex-row items-center">
            <div className="w-44">
              <Form.Checkbox
                name={"step1.presentation.hasFacebook"}
                control={control}
                label={t("community.info.create.step1.facebook")}
                disabled={props.areFieldsDisabled}
              />
            </div>
            <div className="w-full">
              <Form.Input
                intent={props.areFieldsDisabled || !hasFacebook ? "disabled" : "primary"}
                disabled={props.areFieldsDisabled || !hasFacebook}
                {...register(`step1.presentation.facebookLink`)}
              />
              <FormFieldError error={errors.step1?.presentation?.facebookLink?.message} />
            </div>
          </div>
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <div className="flex flex-row items-center">
            <div className="w-44">
              <Form.Checkbox
                name={"step1.presentation.hasInstagram"}
                control={control}
                label={t("community.info.create.step1.instagram")}
                disabled={props.areFieldsDisabled}
              />
            </div>
            <div className="w-full">
              <Form.Input
                intent={props.areFieldsDisabled || !hasInstagram ? "disabled" : "primary"}
                disabled={props.areFieldsDisabled || !hasInstagram}
                {...register(`step1.presentation.instagramLink`)}
              />
              <FormFieldError error={errors.step1?.presentation?.instagramLink?.message} />
            </div>
          </div>
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <div className="flex flex-row items-center">
            <div className="w-44">
              <Form.Checkbox
                name={"step1.presentation.hasTiktok"}
                control={control}
                label={t("community.info.create.step1.tiktok")}
                disabled={props.areFieldsDisabled}
              />
            </div>
            <div className="w-full">
              <Form.Input
                intent={props.areFieldsDisabled || !hasTiktok ? "disabled" : "primary"}
                disabled={props.areFieldsDisabled || !hasTiktok}
                {...register(`step1.presentation.tiktokLink`)}
              />
              <FormFieldError error={errors.step1?.presentation?.tiktokLink?.message} />
            </div>
          </div>
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <div className="flex flex-row items-center">
            <div className="w-44">
              <Form.Checkbox
                name={"step1.presentation.hasDocument"}
                control={control}
                label={t("community.info.create.step1.documentFile")}
                disabled={props.areFieldsDisabled}
              />
            </div>
            <div className="w-full">
              <CommunityInfoPdfUploaderForm
                name="step1.presentation.documents"
                className="flex-row flex-wrap"
                control={control}
                icon={<></>}
                labelText={t("community.info.create.step1.attachDocuments")}
                onLoading={(loading) => props.setIsLoading(loading)}
                disabled={props.areFieldsDisabled || !hasDocument}
                hideTitle
              />
              <FormFieldError error={errors.step1?.presentation?.documents?.message} />
            </div>
          </div>
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <div className="flex flex-row items-center">
            <div className="w-44">
              <Form.Checkbox
                name={"step1.presentation.hasOther"}
                control={control}
                label={t("community.info.create.step1.other")}
                disabled={props.areFieldsDisabled}
              />
            </div>
            <div className="w-full">
              <Form.Input
                intent={props.areFieldsDisabled || !hasOther ? "disabled" : "primary"}
                disabled={props.areFieldsDisabled || !hasOther}
                {...register(`step1.presentation.other`)}
              />
              <FormFieldError error={errors.step1?.presentation?.other?.message} />
            </div>
          </div>
        </Flex.Element>
      </Flex.Container>
    </>
  );
};
