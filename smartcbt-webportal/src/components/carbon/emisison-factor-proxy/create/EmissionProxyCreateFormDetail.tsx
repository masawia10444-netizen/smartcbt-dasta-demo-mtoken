import Flex from "@/components/Flex";
import { InformationCircleIcon } from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { CarbonContext } from "@/contexts/App.context";
import { EmissionFactorProxyStatus, emissionFactorProxyPCRs } from "@/models/emission-factor-proxy";
import { EmissionProxyCreateSchema } from "@/schemas/forms/carbon/emission-proxies/emission-proxy-create-schema";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

type EmissionProxyCreateFormDetailProps = {
  id: number | null;
};

export const EmissionProxyCreateFormDetail = (props: EmissionProxyCreateFormDetailProps) => {
  const t = useTranslations("common");

  const { emissionFactorUnits } = useContext(CarbonContext);

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<EmissionProxyCreateSchema>();

  return (
    <div className="flex flex-col gap-4">
      {props.id != null && (
        <Flex.Container>
          <Flex.Element>
            <FormLabel required>{t("global.status")}</FormLabel>
            <Form.SelectDropDown
              idKey={null}
              values={Object.values(EmissionFactorProxyStatus)}
              displayFunction={(s) => t(`carbon.emissionProxy.status.${s}`)}
              placeholder="-"
              name="status"
              control={control}
              intent="form"
            />
            {errors.status?.message && <FormFieldError error={errors.status.message} />}
          </Flex.Element>
          <Flex.Element />
          <Flex.Element />
        </Flex.Container>
      )}
      <Flex.Container>
        <Flex.Element>
          <div className="flex flex-row">
            <FormLabel required>{t("carbon.emissionProxy.name")}</FormLabel>
            <Tooltip
              className="px-4 xs:hidden sm:block"
              textContainerClassName="w-72 z-40"
              textClassName="text-xs"
              text={t("carbon.create.carbonFootprint.emissionFactorHint")}
            >
              <InformationCircleIcon className="w-h h-5 text-smart-cbt-orange" />
            </Tooltip>
          </div>
          <Form.Input type="text" {...register("name")} />
          {errors.name?.message && <FormFieldError error={errors.name.message} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel required>{t("carbon.emissionProxy.unit")}</FormLabel>
          <Form.Input type="text" {...register("unit")} />
          {errors.unit && <FormFieldError error={errors.unit} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel required>{t("carbon.emissionProxy.pcrType")}</FormLabel>
          <Form.SelectDropDown
            idKey="id"
            values={emissionFactorProxyPCRs}
            displayKey="label"
            placeholder="-"
            name="pcr_type"
            control={control}
            intent="form"
          />
          {errors.pcr_type?.message && <FormFieldError error={errors.pcr_type.message} />}
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("carbon.emissionProxy.emissionFactorValue")}</FormLabel>
          <Form.NumberInput decimalScale={5} control={control} fixedDecimalScale name="emission_factor_value" />
          {errors.emission_factor_value?.message && <FormFieldError error={errors.emission_factor_value.message} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel required>{t("carbon.emissionProxy.emissionFactorUnit")}</FormLabel>
          <Form.SelectDropDown
            name="emission_factor_unit"
            idKey={"id"}
            values={emissionFactorUnits}
            displayFunction={(v) => (v.at(0) === null ? "" : v.at(0)?.label ?? "")}
            placeholder="-"
            control={control}
            intent="form"
          />
          {errors.emission_factor_unit?.message && <FormFieldError error={errors.emission_factor_unit.message} />}
        </Flex.Element>
        <Flex.Element />
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("carbon.emissionProxy.powerUsageCalculationDescription")}</FormLabel>
          <div className="flex flex-row">
            <Form.Input
              type="text"
              placeholder={t("carbon.emissionProxy.usageCalculationFormula")}
              disabled={!watch("isTooltipEnabled")}
              {...register("tooltip")}
            />
            <Form.Checkbox
              id="isTooltipEnabled"
              name={`isTooltipEnabled`}
              control={control}
              label={t("carbon.emissionProxy.enable")}
            />
          </div>
          {errors.tooltip?.message && <FormFieldError error={errors.tooltip.message} />}
        </Flex.Element>
      </Flex.Container>
      {/* Control variable */}
      {/* <div className="mt-6">
        <FormLabel required>{t("carbon.emissionProxy.controlVariable")}</FormLabel>
        <div className="flex flex-wrap gap-10 mt-2">
          <div className="flex flex-col gap-4">
            <div className="flex gap-8">
              <label htmlFor="control-yes" className="flex items-center gap-4 cursor-pointer">
                <input
                  id="control-yes"
                  className="form-radio checked:bg-smart-cbt-green"
                  onChange={() => field.onChange(true)}
                  checked={field.value == true}
                  type="radio"
                />
                <p className="cursor-pointer">{t("global.have")}</p>
              </label>
              <Form.NumberInput name="controlVariableValue" disabled={!field.value} control={control} placeholder={t("carbon.emissionProxy.controlVariableValue")}  />
              <Form.Input disabled={!field.value} type="text" control={control} {...register("controlVariableUnit")} placeholder={t("carbon.emissionProxy.controlVariableUnit")}/>
            </div>
            {errors.controlVariableValue && <FormFieldError error={errors.controlVariableValue} />}
            <label htmlFor="control-no" className="flex items-center gap-4 cursor-pointer">
              <input
                id="control-no"
                className="form-radio checked:bg-smart-cbt-green"
                type="radio"
                value={0}
                onChange={() => {
                  field.onChange(false);
                  setValue("controlVariableValue", null, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
                checked={field.value == false}
              />
              <p className="cursor-pointer">{t("global.notHave")}</p>
            </label>
          </div>
        </div>
      </div> */}
    </div>
  );
};
