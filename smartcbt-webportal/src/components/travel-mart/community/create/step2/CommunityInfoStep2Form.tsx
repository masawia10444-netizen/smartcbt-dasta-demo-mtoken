import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { CommunityForm } from "@/models/travel-mart/travel-mart-community";
import { CommunityInfoCreateSchema } from "@/schemas/forms/community-info/create/community-info-create-schema";
import { Step2Schema } from "@/schemas/forms/community-info/create/community-info-create-schema-step2";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type CommunityInfoStep2FormProps = {
  communityForm?: CommunityForm | null;
  areFieldsDisabled: boolean;
};

export const CommunityInfoStep2Form = (props: CommunityInfoStep2FormProps) => {
  const t = useTranslations("common");
  const {
    control,
    watch,
    register,
    formState: { errors },
    getValues,
  } = useFormContext<CommunityInfoCreateSchema>();

  const handleInputNumberLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    if (Number(inputValue) > Number(event.target.max)) {
      inputValue = event.target.max;
    }
    event.target.value = inputValue;
  };


  return (
    <div className="flex flex-col gap-4">
      {(getValues("step2") as Step2Schema)?.map((value, index) => {
        if (value.type == "none") {
          const isEnabled = watch(`step2.${index}.facility.isEnabled`);
          return (
            <div key={index} className="flex flex-row items-center gap-4">
              <Form.Checkbox
                className="w-fit"
                name={`step2.${index}.facility.isEnabled`}
                label={value.facility?.title ?? ""}
                control={control}
                disabled={props.areFieldsDisabled}
              />
              {isEnabled && (
                <div className="flex flex-row gap-4">
                  {value.facility!.isQuantityEnabled && (
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex w-fit flex-col items-center gap-4">
                        <Form.Input
                          type="number"
                          onInput={handleInputNumberLimit}
                          max={99999999}
                          intent={props.areFieldsDisabled ? "disabled" : null}
                          disabled={props.areFieldsDisabled}
                          {...register(`step2.${index}.facility.quantity`, { valueAsNumber: true })}
                        />
                        <FormFieldError error={errors.step2?.[index]?.facility?.quantity?.message} />
                      </div>
                      {value.facility!.unit}
                    </div>
                  )}
                  {value.facility!.isSizeEnabled && (
                    <div className="flex flex-row items-center gap-4">
                      {t("community.info.create.step2.maxCapacity")}
                      <div className="flex w-fit flex-col items-center gap-4">
                        <Form.Input
                          type="number"
                          onInput={handleInputNumberLimit}
                          max={99999999}
                          intent={props.areFieldsDisabled ? "disabled" : null}
                          disabled={props.areFieldsDisabled}
                          {...register(`step2.${index}.facility.size`, { valueAsNumber: true })}
                        />
                        <FormFieldError error={errors.step2?.[index]?.facility?.size?.message} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        }
        if (value.type == "group") {
          const isEnabled = watch(`step2.${index}.isEnabled`);
          return (
            <div key={index}>
              <div className="flex flex-row items-center gap-4">
                <Form.Checkbox
                  className="w-fit"
                  name={`step2.${index}.isEnabled`}
                  label={value?.title ?? ""}
                  control={control}
                  disabled={props.areFieldsDisabled}
                />
                <FormFieldError error={errors.step2?.[index]?.isEnabled?.message} />
              </div>
              <div className="flex flex-col gap-4">
                {isEnabled &&
                  value.facilities!.map((value2, index2) => {
                    const isEnabled = watch(`step2.${index}.facilities.${index2}.isEnabled`);
                    return (
                      <div key={index2} className="ml-8 flex flex-row items-center gap-4">
                        <Form.Checkbox
                          className="w-fit"
                          name={`step2.${index}.facilities.${index2}.isEnabled`}
                          label={value2.title ?? ""}
                          control={control}
                          disabled={props.areFieldsDisabled}
                        />
                        {isEnabled && (
                          <div className="flex flex-row gap-4">
                            {value2.isQuantityEnabled && (
                              <div className="flex flex-row items-center gap-4">
                                <div className="flex w-fit flex-col items-center gap-4">
                                  <Form.Input
                                    type="number"
                                    intent={props.areFieldsDisabled ? "disabled" : null}
                                    disabled={props.areFieldsDisabled}
                                    onInput={handleInputNumberLimit}
                                    max={99999999}
                                    {...register(`step2.${index}.facilities.${index2}.quantity`, {
                                      valueAsNumber: true,
                                    })}
                                  />
                                  <FormFieldError
                                    error={errors.step2?.[index]?.facilities?.[index2]?.quantity?.message}
                                  />
                                </div>
                                {value2.unit}
                              </div>
                            )}
                            {value2.isSizeEnabled && (
                              <div className="flex flex-row items-center gap-4">
                                {t("community.info.create.step2.maxCapacity")}
                                <div className="flex w-fit flex-col items-center gap-4">
                                  <Form.Input
                                    type="number"
                                    intent={props.areFieldsDisabled ? "disabled" : null}
                                    disabled={props.areFieldsDisabled}
                                    onInput={handleInputNumberLimit}
                                    max={99999999}
                                    {...register(`step2.${index}.facilities.${index2}.size`, { valueAsNumber: true })}
                                  />
                                  <FormFieldError error={errors.step2?.[index]?.facilities?.[index2]?.size?.message} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        }
        return <div key={index}></div>;
      })}
    </div>
  );
};
