import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { DeleteIcon } from "@/components/Icon";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { validatePhone } from "@/utils/cms/api-helpers";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";

type CommunityInfoStep1CoordinatorFormProps = {
  areFieldsDisabled: boolean;
};

export const CommunityInfoStep1CoordinatorForm = (props: CommunityInfoStep1CoordinatorFormProps) => {
  const t = useTranslations("common");

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CommunityInfoCreateSchema>();

  const { append, remove } = useFieldArray({
    control,
    name: "step1.coordinators",
  });

  const defaultNewOptions: any = {
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    line: "",
  };

  const watchCoordinators = watch(`step1.coordinators`);

  return (
    <>
      <CommunityInfoFormHeader header={t("community.info.create.step1.coordinatorInformation")} />
      {watchCoordinators.map((option, i) => (
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
                    size="small"
                    icon={<DeleteIcon />}
                    intent={props.areFieldsDisabled ? "disabled" : "tertiary"}
                    disabled={props.areFieldsDisabled}
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
                placeholder={t("community.info.create.step1.coordinatorFirstName")}
                type="text"
                name={`step1.coordinators.${i}.firstname`}
                control={control}
                isRequired
                errorMessage={errors?.step1?.coordinators?.[i]?.firstname?.message}
                disabled={props.areFieldsDisabled}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("community.info.create.step1.lastName")}
                type="text"
                name={`step1.coordinators.${i}.lastname`}
                control={control}
                isRequired
                errorMessage={errors?.step1?.coordinators?.[i]?.lastname?.message}
                disabled={props.areFieldsDisabled}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("community.info.create.step1.phoneNumber")}
                type="text"
                name={`step1.coordinators.${i}.mobile`}
                maxLength={10}
                onInput={validatePhone}
                control={control}
                isRequired
                errorMessage={errors?.step1?.coordinators?.[i]?.mobile?.message}
                disabled={props.areFieldsDisabled}
              />
            </Flex.Element>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("community.info.create.step1.lineId")}
                type="text"
                name={`step1.coordinators.${i}.line`}
                control={control}
                isRequired
                errorMessage={errors?.step1?.coordinators?.[i]?.line?.message}
                disabled={props.areFieldsDisabled}
              />
            </Flex.Element>
          </Flex.Container>
          <Flex.Container>
            <Flex.Element>
              <FormFloatingLabelTextInput
                placeholder={t("global.email")}
                type="text"
                name={`step1.coordinators.${i}.email`}
                control={control}
                isRequired
                errorMessage={errors?.step1?.coordinators?.[i]?.email?.message}
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
