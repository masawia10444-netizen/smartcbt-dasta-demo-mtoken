import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormCollapsibleCheckboxQuestion from "@/components/form/questions/FormCollapsibleCheckboxQuestion";
import FormRadioQuestion from "@/components/form/questions/FormRadioQuestion";
import { TravelMartRegisterEntrepreneurSchema } from "@/schemas/forms/travel-mart/register/travel-mart-register-entrepreneur-schema";
import { AssociationTravelGroup } from "@/utils/cms/adapters/website/travel-mart/types/on-boarding";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type TravelMartRegisterEntrepreneurStep2Props = {
  associationTravelGroup: AssociationTravelGroup[];
  dastaBusinessType: { id: number; title: string }[];
  mode: "create" | "view";
};

const TravelMartRegisterEntrepreneurStep2 = ({
  associationTravelGroup,
  dastaBusinessType,
  mode,
}: TravelMartRegisterEntrepreneurStep2Props) => {
  const t = useTranslations("common");

  const {
    control,
    formState: { errors },
  } = useFormContext<TravelMartRegisterEntrepreneurSchema>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex-1">
        <h3 className="text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step1")}</h3>
        <Form.FloatingDropSearch
          name="typeOfEstablishment"
          values={dastaBusinessType}
          idKey="id"
          displayKey="title"
          title={t("travelMart.register.entrepreneur.typeOfEstablishment")}
          filterKey={"title"}
          placeholder={t("travelMart.register.entrepreneur.typeOfEstablishment")}
          disabled={mode == "view"}
          hideLabel
          control={control}
        />
        {errors.typeOfEstablishment?.message && <FormFieldError error={errors.typeOfEstablishment.message} />}
      </div>
      <div className="flex-1">
        <h3 className="text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step2")}</h3>
        <Form.FloatingDropSearch
          name="association"
          values={associationTravelGroup}
          idKey="id"
          displayKey="title"
          title={t("travelMart.register.entrepreneur.association")}
          filterKey={"title"}
          placeholder={t("travelMart.register.entrepreneur.association")}
          disabled={mode == "view"}
          hideLabel
          control={control}
        />
        {errors.association?.message && <FormFieldError error={errors.association.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step3")}</h3>
        <FormCollapsibleCheckboxQuestion control={control} disabled={mode == "view"} name="step3" />
        {/* <Form.Input
          className="mt-2"
          intent={!watch("step3").value.hasOwnProperty("3-option-9") ? "disabled" : "primary"}
          disabled={!watch("step3").value.hasOwnProperty("3-option-9")}
          placeholder="อื่น ๆ (โปรดระบุ)"
          {...register(`step3Other`)}
        /> */}
        {errors?.step3?.message && <FormFieldError error={errors?.step3?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step4")}</h3>
        <FormCollapsibleCheckboxQuestion control={control} disabled={mode == "view"} name="step4" />
        {/* <Form.Input
          className="mt-2"
          intent={!watch("step4").value.hasOwnProperty("4-option-11") ? "disabled" : "primary"}
          disabled={!watch("step4").value.hasOwnProperty("4-option-11")}
          placeholder="อื่น ๆ (โปรดระบุ)"
          {...register(`step4Other`)}
        /> */}
        {errors?.step4?.message && <FormFieldError error={errors?.step4?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step5")}</h3>
        <FormCollapsibleCheckboxQuestion disabled={mode == "view"} control={control} name="step5" />
        {/* {watch("step5").value.hasOwnProperty("5-option-1") ? (
          <div className="ml-6">
            {fields.map((f, i) => (
              <div className="relative mt-2" key={f.id}>
                <Form.Input intent={"primary"} placeholder="โปรดระบุ" {...register(`step5Have.${i}.name`)} />
                <TrashIcon className="absolute right-5 top-4 h-5 w-5 text-smart-cbt-red" onClick={() => remove(i)} />
              </div>
            ))}
            <Button
              intent={"secondary"}
              type="button"
              onClick={() => append({ name: "" })}
              className="mt-4 rounded-full md:min-w-fit"
              icon={<PlusIcon className="h-6 w-6" />}
            >
              {t("travelMart.register.entrepreneur.appendReward")}
            </Button>
          </div>
        ) : (
          <></>
        )} */}
        {errors?.step5?.message && <FormFieldError error={errors?.step5?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step6")}</h3>
        <FormCollapsibleCheckboxQuestion disabled={mode == "view"} control={control} name="step6" />
        {/* <Form.Input
          className="mt-2"
          intent={!watch("step6").value.hasOwnProperty("6-option-4") ? "disabled" : "primary"}
          disabled={!watch("step6").value.hasOwnProperty("6-option-4")}
          placeholder="อื่น ๆ (โปรดระบุ)"
          {...register(`step6Other`)}
        /> */}
        {errors?.step6?.message && <FormFieldError error={errors?.step6?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step7")}</h3>
        <FormRadioQuestion disabled={mode == "view"} control={control} name="step7" />
        {errors?.step7?.message && <FormFieldError error={errors?.step7?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step8")}</h3>
        <FormCollapsibleCheckboxQuestion disabled={mode == "view"} control={control} name="step8" />
        {/* <Form.Input
          className="mt-2"
          intent={!watch("step8").value.hasOwnProperty("8-option-7") ? "disabled" : "primary"}
          disabled={!watch("step8").value.hasOwnProperty("8-option-7")}
          placeholder="อื่น ๆ (โปรดระบุ)"
          {...register(`step8Other`)}
        /> */}
        {errors?.step8?.message && <FormFieldError error={errors?.step8?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step9")}</h3>
        <FormCollapsibleCheckboxQuestion disabled={mode == "view"} control={control} name="step9" />
        {/* <Form.Input
          className="mt-2"
          intent={!watch("step9").value.hasOwnProperty("9-option-7") ? "disabled" : "primary"}
          disabled={!watch("step9").value.hasOwnProperty("9-option-7")}
          placeholder="อื่น ๆ (โปรดระบุ)"
          {...register(`step9Other`)}
        /> */}
        {errors?.step9?.message && <FormFieldError error={errors?.step9?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step10")}</h3>
        <FormCollapsibleCheckboxQuestion disabled={mode == "view"} control={control} name="step10" />
        {errors?.step10?.message && <FormFieldError error={errors?.step10?.message} />}
      </div>
      <div className="flex-1">
        <h3 className="mb-6 text-smart-cbt-dark-green">{t("travelMart.register.entrepreneur.step11")}</h3>
        <FormCollapsibleCheckboxQuestion disabled={mode == "view"} control={control} name="step11" />
        {errors?.step11?.message && <FormFieldError error={errors?.step11?.message} />}
      </div>
    </div>
  );
};

export default TravelMartRegisterEntrepreneurStep2;
