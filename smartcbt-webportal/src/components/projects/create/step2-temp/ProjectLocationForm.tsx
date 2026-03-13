import { useFormContext } from "react-hook-form";

import Flex from "@/components/Flex";
import Form from "@/components/form/Form";
import FormDropdown from "@/components/form/FormDropdown";
import { AppContext } from "@/contexts/App.context";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { useContext } from "react";

const ProjectLocationForm = () => {
  const t = useTranslations("common");

  const { provinces, districts, subdistricts } = useContext(AppContext);

  const {
    register,
    watch,
    control,
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext<CreateProjectSchema>();

  const province = watch("step2.5.province");
  const district = watch("step2.5.district");

  const searchDistricts = async (query?: string) => {
    return Promise.resolve(
      districts?.filter((di) => di.province == province?.id && di.title?.includes(query ?? "")) ?? []
    );
  };

  const searchSubDistricts = async (query?: string) => {
    return Promise.resolve(
      subdistricts?.filter((sub) => sub.district == district?.id && sub.title?.includes(query ?? "")) ?? []
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label>{t("global.location")}</label>
        <input
          className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2")}
          placeholder={t("global.location")}
          {...register("step2.5.location")}
        />
      </div>
      <Flex.Container>
        <Flex.Element>
          <label>{t("global.province")}</label>
          <FormDropdown
            values={provinces}
            idKey="id"
            displayFunction={(v) => (v === null ? "" : v?.title ?? "")}
            title={t("global.province")}
            filterKey={"title"}
            placeholder={t("global.province")}
            inputEditable={true}
            fixed={false}
            onChangeInterceptor={(v, next) => {
              resetField("step2.5.district");
              resetField("step2.5.subDistrict");
              setValue("step2.5.postcode", "");
              next(v);
            }}
            {...register("step2.5.province")}
          />
        </Flex.Element>
        <Flex.Element>
          <label>{t("global.district")}</label>
          <FormDropdown
            searchFunction={searchDistricts}
            idKey="id"
            displayFunction={(v) => (v === null ? "" : v?.title ?? "")}
            title={t("global.district")}
            placeholder={t("global.district")}
            inputEditable={true}
            fixed={false}
            onChangeInterceptor={(v, next) => {
              resetField("step2.5.subDistrict");
              setValue("step2.5.postcode", "");
              next(v);
            }}
            {...register("step2.5.district")}
          />
        </Flex.Element>
        <Flex.Element>
          <label>{t("global.subDistrict")}</label>
          <FormDropdown
            searchFunction={searchSubDistricts}
            idKey="id"
            displayFunction={(v) => (v === null ? "" : v?.title ?? "")}
            title={t("global.subDistrict")}
            placeholder={t("global.subDistrict")}
            inputEditable={true}
            fixed={false}
            onChangeInterceptor={(v, next) => {
              setValue("step2.5.postcode", v.postal);
              next(v);
            }}
            {...register("step2.5.subDistrict")}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <label>{t("global.postcode")}</label>
          <Form.Input
            className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2")}
            placeholder={t("global.postcode")}
            value={watch("step2.5.postcode")}
            disabled
          />
        </Flex.Element>
        <Flex.Element>
          <label>{t("global.latitude")}</label>
          <Form.NumberInput
            className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2")}
            placeholder={t("global.latitude")}
            control={control}
            name="step2.5.latitude"
          />
        </Flex.Element>
        <Flex.Element>
          <label>{t("global.longitude")}</label>
          <Form.NumberInput
            className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2")}
            placeholder={t("global.longitude")}
            control={control}
            name="step2.5.longitude"
          />
        </Flex.Element>
      </Flex.Container>
    </div>
  );
};

export default ProjectLocationForm;
