"use client";

import {
  GetPhotoGrapherProfile,
  onboardingPhotoGrapherAction,
  updateOnboardingPhotoGrapherAction,
} from "@/app/[locale]/(authenticated)/profile/photo-bank/action";
import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { CheckIconCircle, WarningCirleIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import FormCheckbox from "@/components/form/FormCheckbox";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { FormLabel } from "@/components/form/FormLabel";
import FormProfileUploadImage from "@/components/form/FormProfileUploadImage";
import { customZodResolver } from "@/schemas/base-schema";
import {
  ProfilePhotoBankRegisterSchema,
  profilePhotoBankRegisterSchema,
} from "@/schemas/forms/profile/profile-photo-bank-register.schema";
import { Consents, PhotoGrapherOnBoardingBody } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfilePhotoBankOnboardingErrorPopup } from "./ProfilePhotoBankOnboardingErrorPopup";
import { ProfilePhotoBankOnboardingSuccessPopup } from "./ProfilePhotoBankOnboardingSuccessPopup";

type ProfilePhotoBankRegisterFormProps = {
  consents: Consents[];
  photographerInfo?: GetPhotoGrapherProfile | null;
};

const ProfilePhotoBankRegisterForm = (props: ProfilePhotoBankRegisterFormProps) => {
  const { consents, photographerInfo } = props;
  const router = useRouter();
  const t = useTranslations("common");
  const photoBankFolder = "Photo Grapher Onboarding";
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboardingSuccessPopup, setShowOnboardingSuccessPopup] = useState<string | null>(null);
  const [showOnboardingErrorPopup, setShowOnboardingErrorPopup] = useState<string | null>(null);

  const {
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfilePhotoBankRegisterSchema>({
    resolver: customZodResolver(profilePhotoBankRegisterSchema),
    defaultValues: {
      consents: consents.map((value) => ({
        checked: false,
        id: value.id,
        detail: value.detail,
        refLink: value.ref_link,
      })),
      files: [],
    },
  });

  const handleCloseConfirmPopup = (didConfirm: boolean) => {
    if (didConfirm) {
    }
    setShowOnboardingSuccessPopup(null);
  };

  const onSubmit = async () => {
    const isValid = trigger();
    if (!isValid) return;
    const data = getValues();
    const body: PhotoGrapherOnBoardingBody = {
      photographer_firstname: data.firstName,
      photographer_lastname: data.lastName,
      photographer_mobile: data.phoneNumber,
      photographer_organization_title: data.organization,
      photographer_attachment: data.files[0]?.id ?? null,
      photographer_profile_image: data.profilePicture.id,
      consents: data.consents.filter((value) => value.checked == true).map((value) => value.id),
    };
    if (photographerInfo != null) {
      const { error } = await updateOnboardingPhotoGrapherAction(body);
      if (error) setShowOnboardingErrorPopup(error.toString());
      else setShowOnboardingSuccessPopup(t("profile.photoBank.create.popup.edited.title"));
    } else {
      const { error } = await onboardingPhotoGrapherAction(body);
      if (error) setShowOnboardingErrorPopup(error.toString());
      else setShowOnboardingSuccessPopup(t("profile.photoBank.create.popup.registered.title"));
    }
  };

  useEffect(() => {
    if (!photographerInfo) return;
    photographerInfo.photographer_firstname && setValue("firstName", photographerInfo.photographer_firstname);
    photographerInfo.photographer_lastname && setValue("lastName", photographerInfo.photographer_lastname);
    photographerInfo.photographer_mobile && setValue("phoneNumber", photographerInfo.photographer_mobile);
    photographerInfo.photographer_organization_title &&
      setValue("organization", photographerInfo.photographer_organization_title);
    photographerInfo.consents &&
      consents.map((consent: any, index: number) => {
        setValue(`consents.${index}.checked`, photographerInfo.consents!.includes(consent.id));
      });
    photographerInfo.photographer_profile_image_info &&
      setValue(`profilePicture`, {
        id: photographerInfo.photographer_profile_image_info.id?.toString() ?? "",
        url: photographerInfo.photographer_profile_image_info.url ?? "",
        type: photographerInfo.photographer_profile_image_info.type ?? "",
      });
    photographerInfo.photographer_attachment_info &&
      setValue(`files`, [
        {
          id: photographerInfo.photographer_attachment_info.id?.toString() ?? "",
          url: photographerInfo.photographer_attachment_info.url ?? "",
          type: photographerInfo.photographer_attachment_info.type ?? "",
        },
      ]);
  }, []);

  return (
    <form className="flex flex-col gap-6 px-4 py-9 lg:flex-row">
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-4">
          <FormProfileUploadImage
            id={"profilePicture"}
            name={"profilePicture"}
            folderName={photoBankFolder}
            control={control}
            onLoading={(loading: boolean) => setIsLoading(loading)}
          />
          {errors.profilePicture?.message && <FormFieldError error={errors.profilePicture.message} />}
        </div>
      </div>
      <div className="flex w-full flex-col gap-8">
        <div>
          {photographerInfo && (
            <Flex.Container>
              <Flex.Element>
                {photographerInfo.status == "published" ? (
                  <div className="flex flex-row items-center gap-2 text-base font-normal text-smart-cbt-green">
                    <CheckIconCircle className="h-5 w-5" /> {t("profile.photoBank.create.status.published")}
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 text-base font-normal text-smart-cbt-orange">
                    <WarningCirleIcon className="h-5 w-5" /> {t("profile.photoBank.create.status.draft")}
                  </div>
                )}
              </Flex.Element>
            </Flex.Container>
          )}
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("profile.photoBank.create.firstName")}
                type="text"
                name="firstName"
                control={control}
                errorMessage={errors?.firstName?.message}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("profile.photoBank.create.lastName")}
                type="text"
                name="lastName"
                control={control}
                errorMessage={errors?.lastName?.message}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("profile.photoBank.create.phoneNumber")}
                type="text"
                name="phoneNumber"
                control={control}
                errorMessage={errors?.phoneNumber?.message}
              />
            </Flex.Element>
            <Flex.Element />
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("profile.photoBank.create.organization")}
                type="text"
                name="organization"
                control={control}
                errorMessage={errors?.organization?.message}
              />
            </Flex.Element>
          </Flex.Container>
          {consents?.map((value: Consents, index: number) => (
            <Flex.Container key={index}>
              <FormCheckbox
                labelClassName="text-smart-cbt-green text-base font-normal"
                label={
                  <Link target="_blank" href={value.ref_link ?? ""}>
                    <div dangerouslySetInnerHTML={{ __html: value.detail }} />
                  </Link>
                }
                name={`consents.${index}.checked`}
                control={control}
              />
            </Flex.Container>
          ))}
          {consents?.length > 0 && errors.consents?.root?.message && (
            <FormFieldError error={errors.consents?.root?.message} />
          )}
          <Flex.Container>
            <Flex.Element>
              <div className="ml-2 flex flex-col gap-4">
                <FormLabel className="font-norma text-base text-smart-cbt-medium-grey">
                  {t("profile.photoBank.create.uploadPortfolio")}
                </FormLabel>
                <Form.ImageInput
                  id="files"
                  control={control}
                  hideTitle
                  labelClassName="rounded-lg text-smart-cbt-medium-grey"
                  labelText={t("profile.photoBank.create.upload")}
                  className="flex-row flex-wrap"
                  name="files"
                  folderName={photoBankFolder}
                  onLoading={(loading: boolean) => setIsLoading(loading)}
                />
              </div>
            </Flex.Element>
          </Flex.Container>
        </div>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Button
            intent="primary"
            size={"small"}
            className="w-full"
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {photographerInfo ? t("profile.photoBank.create.edit") : t("profile.photoBank.create.register")}
          </Button>
          {/* <Button intent="text" size={"small"} className="w-full text-smart-cbt-dark-grey" onClick={() => {}}>
            {t("global.cancel")}
          </Button> */}
        </div>
      </div>
      {showOnboardingSuccessPopup && (
        <ProfilePhotoBankOnboardingSuccessPopup
          isOpen={showOnboardingSuccessPopup != null}
          message={showOnboardingSuccessPopup}
          onClose={() => {
            setShowOnboardingSuccessPopup(null);
            router.refresh();
          }}
        />
      )}
      {showOnboardingErrorPopup && (
        <ProfilePhotoBankOnboardingErrorPopup
          isOpen={showOnboardingErrorPopup != null}
          message={showOnboardingErrorPopup}
          onClose={() => setShowOnboardingErrorPopup(null)}
        />
      )}
    </form>
  );
};

export default ProfilePhotoBankRegisterForm;
