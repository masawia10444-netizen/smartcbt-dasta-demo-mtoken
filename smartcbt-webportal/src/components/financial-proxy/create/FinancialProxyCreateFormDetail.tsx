import Flex from "@/components/Flex";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { SiaSroiContext } from "@/contexts/App.context";
import { FinancialProxyCategory, FinancialProxyStatus } from "@/models/financial-proxy";
import { FinancialProxyCreateSchema } from "@/schemas/forms/financial-proxies/financial-proxy-create-schema";
import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation/provinces";
import { generateBuddhistYears } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

type FinancialProxyCreateFormDetailProps = {
  provinces: ProvinceJSONData[];
};

export const FinancialProxyCreateFormDetail = ({ provinces }: FinancialProxyCreateFormDetailProps) => {
  const t = useTranslations("common");

  const { projectTypes } = useContext(SiaSroiContext);

  const {
    control,
    register,
    watch,
    getValues,
    formState: { errors, defaultValues },
  } = useFormContext<FinancialProxyCreateSchema>();

  const startingYear = watch("startingYear");
  const endingYear = watch("endingYear");

  return (
    <div className="flex flex-col gap-4">
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.status")}</FormLabel>
          <Form.SelectDropDown
            idKey={null}
            disabled={getValues("proxyId") == undefined}
            values={Object.values(FinancialProxyStatus)}
            displayFunction={(s) => t(`financialProxy.status.${s}`)}
            placeholder="-"
            name="status"
            control={control}
            intent="form"
          />
          {errors.status?.message && <FormFieldError error={errors.status.message} />}
        </Flex.Element>
        {getValues("proxyId") ? (
          <Flex.Element>
            <FormLabel>{t("financialProxy.create.proxyId")}</FormLabel>
            <Form.Input disabled intent="disabled" type="text" {...register("proxyId")} />
            {errors.proxyId?.message && <FormFieldError error={errors.proxyId.message} />}
          </Flex.Element>
        ) : (
          <Flex.Element />
        )}
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.nameTh")}</FormLabel>
          <Form.Input type="text" {...register("title")} />
          {errors.title?.message && <FormFieldError error={errors.title.message} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel>{t("financialProxy.create.nameEn")}</FormLabel>
          <Form.Input type="text" {...register("titleEn")} />
          {errors.titleEn?.message && <FormFieldError error={errors.titleEn.message} />}
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.category")}</FormLabel>
          <Form.SelectDropDown
            idKey={null}
            values={Object.values(FinancialProxyCategory)}
            displayFunction={(s) => t(`financialProxy.categories.${s}`)}
            placeholder="-"
            name="category"
            control={control}
            intent="form"
          />
          {errors.category?.message && <FormFieldError error={errors.category.message} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.type")}</FormLabel>
          <Form.SelectDropDown
            idKey={null}
            values={projectTypes}
            displayKey={"label"}
            placeholder="-"
            name="type"
            control={control}
            intent="form"
          />
          {errors.type?.message && <FormFieldError error={errors.type.message} />}
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.startingYear")}</FormLabel>
          <Form.SelectDropDown
            idKey={null}
            values={generateBuddhistYears(2543, endingYear)}
            displayKey={null}
            placeholder="-"
            name="startingYear"
            control={control}
            intent="form"
          />
          {errors.startingYear?.message && <FormFieldError error={errors.startingYear.message} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.endingYear")}</FormLabel>
          <Form.SelectDropDown
            idKey={null}
            values={generateBuddhistYears(startingYear, undefined)}
            displayKey={null}
            placeholder="-"
            name="endingYear"
            control={control}
            intent="form"
          />
          {errors.endingYear?.message && <FormFieldError error={errors.endingYear.message} />}
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.value")}</FormLabel>
          <Form.NumberInput decimalScale={2} control={control} fixedDecimalScale name="value" prefix="฿ " />
          {errors.value?.message && <FormFieldError error={errors.value.message} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.unit")}</FormLabel>
          <Form.Input type="text" {...register("unit")} />
          {errors.unit?.message && <FormFieldError error={errors.unit.message} />}
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormLabel required>{t("financialProxy.create.province")}</FormLabel>
          <Form.SelectDropDown
            idKey="id"
            values={[null, ...provinces]}
            displayFunction={(v) => (v.at(0) === null ? t("global.allValues") : v.at(0)?.title ?? "")}
            placeholder="-"
            name="province"
            control={control}
            intent="form"
          />
          {errors.province?.message && <FormFieldError error={errors.province.message} />}
        </Flex.Element>
        <Flex.Element>
          <FormLabel>{t("financialProxy.create.note")}</FormLabel>
          <Form.TextArea rows={1} {...register("note")} />
          {errors.note?.message && <FormFieldError error={errors.note.message} />}
        </Flex.Element>
      </Flex.Container>
    </div>
  );
};
