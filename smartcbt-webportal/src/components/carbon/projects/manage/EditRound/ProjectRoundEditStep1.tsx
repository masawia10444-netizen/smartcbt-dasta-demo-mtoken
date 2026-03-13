import Flex from "@/components/Flex";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import FormRangeDatePicker from "@/components/form/FormRangeDatePicker";
import { TravelProgramRoundsSchema, TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { footprintCalculation } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import CarbonProjectRecapDetail from "../../create/recap/CarbonProjectRecapDetail";
import CarbonComparisonTable from "../CarbonComparisonTable";

type ProjectRoundEditStep1Props = {
  selectedIndex: number;
  tabs: TravelProgramSchema[];
  mode: "view" | "edit";
};

const ProjectRoundEditStep1 = ({ selectedIndex, tabs, mode }: ProjectRoundEditStep1Props) => {
  const t = useTranslations("common");
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useFormContext<TravelProgramRoundsSchema>();

  const data = footprintCalculation(watch("rounds")[selectedIndex] as any);

  return (
    <>
      {mode == "view" && <CarbonComparisonTable selectedIndex={selectedIndex} tabs={tabs as any} />}
      <div className="flex w-full flex-col gap-4">
        <Flex.Container>
          <Flex.Element>
            <FormLabel className="whitespace-nowrap text-black">{t("carbon.manage.realNumberOfTourists")}</FormLabel>
            {/* <Form.NumberInput
              name={`rounds.${selectedIndex}.numberOfTourist`}
              control={control}
              placeholder={t("carbon.manage.realNumberOfTourists")}
              allowNegative={false}
              disabled={mode == "view"}
            /> */}
            <Form.Input
              {...register(`rounds.${selectedIndex}.numberOfTourist`)}
              placeholder={t("carbon.manage.realNumberOfTourists")}
              disabled={mode == "view"}
            />
          </Flex.Element>
          <Flex.Element>
            <FormLabel className="whitespace-nowrap text-black" required>
              {t("carbon.manage.activityPeriod")}
            </FormLabel>
            <FormRangeDatePicker
              name={`rounds.${selectedIndex}.dates`}
              control={control}
              disabled={mode == "view"}
              placeholder={t("carbon.manage.activityPeriod")}
              showIcon
            />
            <FormFieldError error={errors.rounds?.[selectedIndex]?.dates?.message} />
          </Flex.Element>
          <Flex.Element />
        </Flex.Container>
        <Flex.Container>
          <Flex.Element>
            <FormLabel className="whitespace-nowrap text-black">{t("carbon.manage.carbonReleaseTotal")}</FormLabel>
            <span className="px-2 py-2 text-lg text-smart-cbt-dark-green">{data.total.toFixed(2)}</span>
          </Flex.Element>
        </Flex.Container>
      </div>
      <CarbonProjectRecapDetail dataOutSide={watch("rounds")[selectedIndex] as any} />
    </>
  );
};

export default ProjectRoundEditStep1;
