import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { IcRoundDeleteOutline } from "@/components/Icon";
import Form from "@/components/form/Form";
import FormCheckbox from "@/components/form/FormCheckbox";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { FormLabel } from "@/components/form/FormLabel";
import { CommunityOption } from "@/models/travel-mart/travel-mart-community";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CommunityInfoFormHeader } from "../CommunityInfoFormHeader";

type CommunityInfoStep1ActivityFormProps = {
  areFieldsDisabled: boolean;
  months: CommunityOption[];
};

export const CommunityInfoStep1ActivityForm = (props: CommunityInfoStep1ActivityFormProps) => {
  const t = useTranslations("common");
  const seasons = props.months ?? [];
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext<CommunityInfoCreateSchema>();

  const { append: appendActivity, remove: removeActivity } = useFieldArray({
    control,
    name: "step1.activity.activities",
  });
  const { append: appendTourismProduct, remove: removeTourismProduct } = useFieldArray({
    control,
    name: "step1.activity.tourismProducts",
  });
  const { append: appendFoodMenu, remove: removeFoodMenu } = useFieldArray({
    control,
    name: "step1.activity.foodMenus",
  });
  const { append: appendStandardsOrAwards, remove: removeStandardsOrAwards } = useFieldArray({
    control,
    name: "step1.activity.standardsOrAwards",
  });

  const defaultNewOption = { title: "" };
  const watchActivities = watch(`step1.activity.activities`);
  const watchTourismProducts = watch(`step1.activity.tourismProducts`);
  const watchFoodMenus = watch(`step1.activity.foodMenus`);
  const watchStandardsOrAwards = watch(`step1.activity.standardsOrAwards`);

  return (
    <>
      <CommunityInfoFormHeader header={t("community.info.create.step1.activityInformation")} />
      <Flex.Container>
        <Flex.Element>
          <FormLabel>
            <span className="text-smart-cbt-red">*</span>
            {t("community.info.create.step1.activityOrTravelProgramName")}
          </FormLabel>
          <FormFieldError error={errors.step1?.activity?.activities?.message} />
        </Flex.Element>
      </Flex.Container>
      {watchActivities?.map((option, i) => (
        <div key={i}>
          <ActivityItemLayout
            left={<>{i + 1}</>}
            right={
              <>
                <div className="flex flex-row items-center gap-4">
                  <Form.Input
                    intent={props.areFieldsDisabled ? "disabled" : null}
                    disabled={props.areFieldsDisabled}
                    maxLength={2000}
                    {...register(`step1.activity.activities.${i}.title`)}
                  />
                  <IcRoundDeleteOutline
                    className={`h-6 w-6 text-smart-cbt-red hover:cursor-pointer`}
                    onClick={() => !props.areFieldsDisabled && removeActivity(i)}
                  />
                </div>
                <FormFieldError error={errors.step1?.activity?.activities?.[i]?.title?.message} />
              </>
            }
          />
        </div>
      ))}
      <ActivityItemLayout
        right={
          <>
            <Button
              className="w-fit rounded-[50px]"
              intent={props.areFieldsDisabled ? "disabled" : "secondary"}
              size={"small"}
              icon={<PlusIcon className="w-6 h-6" />}
              onClick={() => appendActivity(defaultNewOption)}
              disabled={props.areFieldsDisabled}
            >
              {t("community.info.create.step1.addActivity")}
            </Button>
          </>
        }
      />
      <Flex.Container>
        <Flex.Element>
          <FormLabel>{t("community.info.create.step1.tourismProductName")}</FormLabel>
          <FormFieldError error={errors.step1?.activity?.tourismProducts?.message} />
        </Flex.Element>
      </Flex.Container>
      {watchTourismProducts?.map((option, i) => (
        <div key={i}>
          <ActivityItemLayout
            left={<>{i + 1}</>}
            right={
              <>
                <div className="flex flex-row items-center gap-4">
                  <Form.Input
                    intent={props.areFieldsDisabled ? "disabled" : null}
                    disabled={props.areFieldsDisabled}
                    maxLength={2000}
                    {...register(`step1.activity.tourismProducts.${i}.title`)}
                  />
                  <IcRoundDeleteOutline
                    className={`h-6 w-6 text-smart-cbt-red hover:cursor-pointer `}
                    onClick={() => !props.areFieldsDisabled && removeTourismProduct(i)}
                  />
                </div>
                <FormFieldError error={errors.step1?.activity?.tourismProducts?.[i]?.title?.message} />
              </>
            }
          />
        </div>
      ))}
      <ActivityItemLayout
        right={
          <>
            <Button
              className="w-fit rounded-[50px]"
              intent={props.areFieldsDisabled ? "disabled" : "secondary"}
              size={"small"}
              icon={<PlusIcon className="w-6 h-6" />}
              onClick={() => appendTourismProduct(defaultNewOption)}
              disabled={props.areFieldsDisabled}
            >
              {t("community.info.create.step1.addTourismProduct")}
            </Button>
          </>
        }
      />
      <Flex.Container>
        <Flex.Element>
          <FormLabel>{t("community.info.create.step1.foodMenuName")}</FormLabel>
          <FormFieldError error={errors.step1?.activity?.foodMenus?.message} />
        </Flex.Element>
      </Flex.Container>
      {watchFoodMenus?.map((option, i) => (
        <div key={i}>
          <ActivityItemLayout
            left={<>{i + 1}</>}
            right={
              <>
                <div className="flex flex-row items-center gap-4">
                  <Form.Input
                    intent={props.areFieldsDisabled ? "disabled" : null}
                    disabled={props.areFieldsDisabled}
                    maxLength={2000}
                    {...register(`step1.activity.foodMenus.${i}.title`)}
                  />
                  <IcRoundDeleteOutline
                    className={`h-6 w-6 text-smart-cbt-red hover:cursor-pointer `}
                    onClick={() => !props.areFieldsDisabled && removeFoodMenu(i)}
                  />
                </div>
                <FormFieldError error={errors.step1?.activity?.foodMenus?.[i]?.title?.message} />
              </>
            }
          />
        </div>
      ))}
      <ActivityItemLayout
        right={
          <>
            <Button
              className="w-fit rounded-[50px]"
              intent={props.areFieldsDisabled ? "disabled" : "secondary"}
              size={"small"}
              icon={<PlusIcon className="w-6 h-6" />}
              onClick={() => appendFoodMenu(defaultNewOption)}
              disabled={props.areFieldsDisabled}
            >
              {t("community.info.create.step1.addFoodMenu")}
            </Button>
          </>
        }
      />
      <Flex.Container>
        <Flex.Element>
          <FormLabel>{t("community.info.create.step1.standardsOrAwards")}</FormLabel>
          <FormFieldError error={errors.step1?.activity?.standardsOrAwards?.message} />
        </Flex.Element>
      </Flex.Container>
      {watchStandardsOrAwards?.map((option, i) => (
        <div key={i}>
          <ActivityItemLayout
            left={<>{i + 1}</>}
            right={
              <>
                <div className="flex flex-row items-center gap-4">
                  <Form.Input
                    intent={props.areFieldsDisabled ? "disabled" : null}
                    disabled={props.areFieldsDisabled}
                    maxLength={2000}
                    {...register(`step1.activity.standardsOrAwards.${i}.title`)}
                  />
                  <IcRoundDeleteOutline
                    className={`h-6 w-6 text-smart-cbt-red hover:cursor-pointer `}
                    onClick={() => !props.areFieldsDisabled && removeStandardsOrAwards(i)}
                  />
                </div>
                <FormFieldError error={errors.step1?.activity?.standardsOrAwards?.[i]?.title?.message} />
              </>
            }
          />
        </div>
      ))}
      <ActivityItemLayout
        right={
          <>
            <Button
              className="w-fit rounded-[50px]"
              intent={props.areFieldsDisabled ? "disabled" : "secondary"}
              size={"small"}
              icon={<PlusIcon className="w-6 h-6" />}
              onClick={() => appendStandardsOrAwards(defaultNewOption)}
              disabled={props.areFieldsDisabled}
            >
              {t("community.info.create.step1.addStandardsOrAwards")}
            </Button>
          </>
        }
      />

      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.activityPrice")}
            name="step1.activity.activityPrice"
            type="number"
            control={control}
            errorMessage={errors?.step1?.activity?.activityPrice?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.accommodateMin")}
            type="number"
            name="step1.activity.accommodateMin"
            control={control}
            errorMessage={errors?.step1?.activity?.accommodateMin?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.accommodateMax")}
            name="step1.activity.accommodateMax"
            type="number"
            control={control}
            errorMessage={errors?.step1?.activity?.accommodateMax?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.lifestyle")}
            name="step1.activity.lifestyle"
            control={control}
            isRequired
            errorMessage={errors?.step1?.activity?.lifestyle?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.languageOfCommunication")}
            name="step1.activity.language"
            control={control}
            isRequired
            errorMessage={errors?.step1?.activity?.language?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel>{t("community.info.create.step1.recommendedSeason")}</FormLabel>
          {seasons.map((value, index) => (
            <FormCheckbox
              key={index}
              name={`step1.activity.season.${index}.value`}
              control={control}
              labelClassName="text-xs xl:text-sm text-smart-cbt-medium-grey font-thin"
              label={value.title}
              disabled={props.areFieldsDisabled}
            />
          ))}
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.communityHighlights")}
            type="text"
            name="step1.activity.communityHighlights"
            control={control}
            isRequired
            errorMessage={errors?.step1?.activity?.communityHighlights?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("community.info.create.step1.organizationalUnit")}
            type="text"
            name="step1.activity.organizationalUnit"
            control={control}
            errorMessage={errors?.step1?.activity?.organizationalUnit?.message}
            disabled={props.areFieldsDisabled}
          />
        </Flex.Element>
      </Flex.Container>
    </>
  );
};

interface ActivityItemLayoutProps {
  left?: JSX.Element;
  right: JSX.Element;
}

const ActivityItemLayout = ({ left, right }: ActivityItemLayoutProps) => {
  return (
    <Flex.Container>
      <Flex.Element>
        <div className="flex flex-row gap-6">
          <div className="flex items-center w-20 px-4">{left != null && left}</div>
          <div className="items-center grow">{right}</div>
        </div>
      </Flex.Element>
    </Flex.Container>
  );
};
