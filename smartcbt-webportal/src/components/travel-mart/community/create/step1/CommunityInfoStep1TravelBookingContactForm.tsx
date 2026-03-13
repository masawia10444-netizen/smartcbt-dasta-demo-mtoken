import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { DeleteIcon } from "@/components/Icon";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { CommunityForm } from "@/models/travel-mart/travel-mart-community";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";
import { validatePhone } from "@/utils/cms/api-helpers";

type CommunityInfoStep1TravelBookingContactFormProps = {
  areFieldsDisabled: boolean;
  communityForm?: CommunityForm | null;
};

export const CommunityInfoStep1TravelBookingContactForm = (props: CommunityInfoStep1TravelBookingContactFormProps) => {
  const t = useTranslations("common");

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CommunityInfoCreateSchema>();

  const { append, remove } = useFieldArray({
    control,
    name: "step1.travelBookingContacts",
  });

  const defaultNewOptions = {
    firstname: "",
    lastname: "",
    mobile: "",
  };

  const watchTravelBookingContacts = watch(`step1.travelBookingContacts`);

  return (
    <>
      <CommunityInfoFormHeader header={t("community.info.create.step1.travelProgramBookingContactInformation")} />
      {watchTravelBookingContacts?.map((option, i) => (
        <div key={i}>
          <Flex.Container>
            <Flex.Element>
              <div className="flex p-2">{t("community.info.create.step1.coordinator", { number: i + 1 })}</div>
            </Flex.Element>
            <Flex.Element>
              {i != 0 && (
                <div className="flex justify-end">
                  <Button
                    className="border-smart-cbt-red text-smart-cbt-red"
                    intent={props.areFieldsDisabled ? "disabled" : "tertiary"}
                    disabled={props.areFieldsDisabled}
                    size="small"
                    icon={<DeleteIcon />}
                    onClick={() => remove(i)}
                  >
                    {t("community.info.create.step1.deleteCoordinator")}
                  </Button>
                </div>
              )}
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("community.info.create.step1.firstName")}
                type="text"
                name={`step1.travelBookingContacts.${i}.firstname`}
                control={control}
                isRequired
                errorMessage={errors?.step1?.travelBookingContacts?.[i]?.firstname?.message}
                disabled={props.areFieldsDisabled}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("community.info.create.step1.lastName")}
                type="text"
                name={`step1.travelBookingContacts.${i}.lastname`}
                control={control}
                isRequired
                errorMessage={errors?.step1?.travelBookingContacts?.[i]?.lastname?.message}
                disabled={props.areFieldsDisabled}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("community.info.create.step1.phoneNumber")}
                type="text"
                onInput={validatePhone}
                maxLength={10}
                name={`step1.travelBookingContacts.${i}.mobile`}
                control={control}
                isRequired
                errorMessage={errors?.step1?.travelBookingContacts?.[i]?.mobile?.message}
                disabled={props.areFieldsDisabled}
              />
            </Flex.Element>
            <Flex.Element />
          </Flex.Container>
        </div>
      ))}
      <Flex.Container>
        <Flex.Element>
          <Button
            className="w-full"
            intent={props.areFieldsDisabled ? "disabled" : "secondary"}
            disabled={props.areFieldsDisabled}
            size={"small"}
            icon={<PlusIcon className="h-5 w-5" />}
            onClick={() => append(defaultNewOptions)}
          >
            {t("community.info.create.step1.addCoordinator")}
          </Button>
        </Flex.Element>
      </Flex.Container>
    </>
  );
};
