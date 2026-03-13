import Flex from "@/components/Flex";
import { AddPlusIcon, DeleteIcon } from "@/components/Icon";
import { EmissionProxyCreateForm } from "@/components/carbon/emisison-factor-proxy/create/EmissionProxyCreateForm";
import Form from "@/components/form/Form";
import FormDropdown from "@/components/form/FormDropdown";
import { FormLabel } from "@/components/form/FormLabel";
import { CarbonContext } from "@/contexts/App.context";
import { EmissionFactorProxy, EmissionFactorUnit, emissionFactorProxyPCRs } from "@/models/emission-factor-proxy";
import { EmissionProxyCreateSchema } from "@/schemas/forms/carbon/emission-proxies/emission-proxy-create-schema";
import { TravelProgramRoundsSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PlusIcon } from "@heroicons/react/24/outline";

import { useTranslations } from "next-intl";
import { Fragment, useContext, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface CarbonFootprintActivityRoundProps {
  travelPlanIndex: number;
  activityIndex: number;
  selectedIndex: number;
}
const CarbonFootprintActivityRound = (props: CarbonFootprintActivityRoundProps) => {
  const { travelPlanIndex, activityIndex, selectedIndex } = props;

  const { listEmissionFactorProxy } = useContext(CarbonContext);

  const t = useTranslations("common");
  const { register, control, getValues, setValue, watch } = useFormContext<TravelProgramRoundsSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities`,
  });

  const [showCreateProxyForm, setShowCreateProxyForm] = useState<{
    travelPlanIndex: number;
    activityIndex: number;
    index: number;
    pcrTypeId: number;
  } | null>(null);

  const project = watch("rounds")[selectedIndex];

  const proxies: EmissionFactorProxy[] = [...(project.createdProxy ?? []), ...listEmissionFactorProxy];

  const handleSelectedProxy = (
    data: EmissionFactorProxy,
    next: (p: EmissionFactorProxy) => void,
    params: {
      travelPlanIndex: number;
      activityIndex: number;
      index: number;
    }
  ) => {
    next(data);
    setValue(
      `rounds.${selectedIndex}.travelPlans.${params.travelPlanIndex}.activities.${params.activityIndex}.carbonFootprintActivities.${params.index}.isCreatedProxy`,
      data.id == undefined ? true : false
    );
    setValue(
      `rounds.${selectedIndex}.travelPlans.${params.travelPlanIndex}.activities.${params.activityIndex}.carbonFootprintActivities.${params.index}.pcr_type`,
      data.pcr_type
    );
  };

  const handleNewProxyCreate = (params: {
    travelPlanIndex: number;
    activityIndex: number;
    index: number;
    pcrTypeId: number;
  }) => {
    setShowCreateProxyForm(params);
  };

  const handleNewProxySave = (
    data: EmissionProxyCreateSchema,
    params: { travelPlanIndex: number; activityIndex: number; index: number }
  ) => {
    if (!showCreateProxyForm) return;
    setValue(
      `rounds.${selectedIndex}.travelPlans.${params.travelPlanIndex}.activities.${params.activityIndex}.carbonFootprintActivities.${params.index}.emissionProxy`,
      data
    );
    setValue(
      `rounds.${selectedIndex}.travelPlans.${params.travelPlanIndex}.activities.${params.activityIndex}.carbonFootprintActivities.${params.index}.isCreatedProxy`,
      true
    );
    // Set pcr type to match the selected pcr type
    setValue(
      `rounds.${selectedIndex}.travelPlans.${params.travelPlanIndex}.activities.${params.activityIndex}.carbonFootprintActivities.${params.index}.pcr_type`,
      data.pcr_type
    );
    const oldCreatedProxy = getValues(`rounds.${selectedIndex}.createdProxy`) ?? [];
    setValue(`rounds.${selectedIndex}.createdProxy`, [...oldCreatedProxy, data]);
    setShowCreateProxyForm(null);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-start gap-10">
        <label className="text-smart-cbt-dark-green">{t("carbon.create.generalInformation.activity.activityNo")}</label>
        <label>{activityIndex + 1}</label>
        <label className="text-smart-cbt-dark-green">
          {t("carbon.create.generalInformation.activity.activityName")}
        </label>
        <label>
          {getValues(`rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.details`)}
        </label>
      </div>
      <>
        {fields.map((field, index) => {
          // const carbonFootprintActivity = getValues(`travelPlans.${travelPlanIndex}.activities.${activityIndex}.pcrs.${pcrIndex}.values.${index}`);
          const pcrTypeId = getValues(
            `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.pcr_type.id`
          );
          return (
            <Fragment key={index}>
              <Flex.Container key={index}>
                <Flex.Element>
                  <FormLabel className="whitespace-nowrap text-black" required>
                    {t("carbon.create.carbonFootprint.activityList")}
                  </FormLabel>
                  <Form.Input
                    {...register(
                      `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.name`
                    )}
                  />
                </Flex.Element>
                <Flex.Element className="flex items-center justify-end self-stretch">
                  <DeleteIcon
                    className="min-w-[20px] text-smart-cbt-red hover:cursor-pointer"
                    onClick={() => {
                      remove(index);
                    }}
                  />
                </Flex.Element>
              </Flex.Container>
              <Flex.Container>
                <Flex.Element>
                  <FormLabel className="whitespace-nowrap text-black" required>
                    {t(`carbon.create.carbonFootprint.pcrType`)}
                  </FormLabel>
                  <FormDropdown
                    values={emissionFactorProxyPCRs}
                    idKey="id"
                    displayFunction={(v) => (v === null ? "" : v?.label ?? "")}
                    title={t(`carbon.create.carbonFootprint.pcrType`)}
                    filterKey={"label"}
                    placeholder={t(`carbon.create.carbonFootprint.pcrType`)}
                    inputEditable={true}
                    fixed={false}
                    onChangeInterceptor={(v, next) => {
                      if (
                        v.id !=
                        getValues(
                          `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.emissionProxy.pcr_type.id`
                        )
                      ) {
                        setValue(
                          `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.pcr_type`,
                          v
                        );
                        setValue(
                          `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.emissionProxy`,
                          null
                        );
                      }
                      next(v);
                    }}
                    name={`rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.pcr_type`}
                    control={control}
                  />
                </Flex.Element>
                <Flex.Element>
                  <FormLabel className="whitespace-nowrap text-black" required>
                    {t("carbon.create.carbonFootprint.emissionFactor")}
                  </FormLabel>
                  <Form.DropDownSearch
                    values={[
                      null,
                      ...proxies.filter((v) => {
                        if (pcrTypeId) {
                          return v.pcr_type?.id == pcrTypeId;
                        }
                        return true;
                      }),
                    ]}
                    idKey="id"
                    disabled={false}
                    title=""
                    nullDisplay=""
                    filterKey="name"
                    displayKey="name"
                    itemDisplayFunction={(item) =>
                      item ? (
                        <div key={item.name} className="p-2">
                          {item.name}
                        </div>
                      ) : (
                        <div
                          key="createNewProxy"
                          className="flex h-full w-full items-center gap-4 bg-white p-2 text-smart-cbt-blue"
                        >
                          <AddPlusIcon />
                          {t("carbon.create.carbonFootprint.newProxy")}
                        </div>
                      )
                    }
                    onChangeInterceptor={(v, next) => {
                      const position = {
                        travelPlanIndex,
                        activityIndex,
                        index,
                        pcrTypeId,
                      };
                      v ? handleSelectedProxy(v, next, position) : handleNewProxyCreate(position);
                    }}
                    placeholder=""
                    inputEditable={true}
                    name={`rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.emissionProxy`}
                    control={control}
                    fixed={false}
                  />
                </Flex.Element>
                <Flex.Element>
                  <FormLabel className="whitespace-nowrap text-black" required>
                    {t(`carbon.create.carbonFootprint.multiplier.title`)}
                  </FormLabel>
                  <Form.NumberInput
                    control={control}
                    name={`rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.multiplier`}
                  />
                </Flex.Element>
                <Flex.Element>
                  <FormLabel className="whitespace-nowrap text-black" required>
                    {t(`carbon.create.carbonFootprint.unit`)}
                  </FormLabel>
                  <Form.Input
                    disabled={true}
                    value={watch(
                      `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.emissionProxy.unit`
                    )}
                    // {...register(
                    //   `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.emissionProxy.unit`
                    // )}
                  />
                </Flex.Element>
              </Flex.Container>
              <Flex.Container className="justify-start">
                <Flex.Element>
                  <FormLabel className="whitespace-nowrap text-black">
                    {t("carbon.create.carbonFootprint.ef")}
                  </FormLabel>
                  <p className="text-smart-cbt-dark-green">
                    {getValues(
                      `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.emissionProxy.emission_factor_value`
                    )}
                  </p>
                </Flex.Element>
                <Flex.Element>
                  <FormLabel className="text-black">{t(`carbon.create.carbonFootprint.summary`)}</FormLabel>
                  <p className=" text-smart-cbt-dark-green">
                    {(watch(
                      `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.multiplier`
                    ) ?? 1) *
                      (watch(
                        `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities.${index}.emissionProxy.emission_factor_value`
                      ) ?? 0)}
                  </p>
                </Flex.Element>
                <Flex.Element />
                <Flex.Element />
              </Flex.Container>
            </Fragment>
          );
        })}
      </>
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            multiplier: 0,
            emissionProxy: null,
            isCreatedProxy: false,
            isTooltipEnabled: false,
            tooltip: "",
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-smart-cbt-dark-grey p-2 text-smart-cbt-dark-grey"
      >
        <PlusIcon className="h-6 w-6" />
        {t(`carbon.create.carbonFootprint.addActivity`)}
      </button>
      <div className="bg-smart-cbt-yellow-2 px-4 py-2 text-black">
        {`รวมสรุปปริมาณการปล่อย Carbon footprint ของกิจกรรมที่ ${activityIndex + 1} (kgCO2eq) : ${watch(
          `rounds.${selectedIndex}.travelPlans.${travelPlanIndex}.activities.${activityIndex}.carbonFootprintActivities`
        )
          ?.reduce(
            (accumulator, currentValue) =>
              (accumulator ?? 0) +
              (currentValue.multiplier ?? 1) * (currentValue.emissionProxy?.emission_factor_value ?? 0),
            0
          )
          .toFixed(3)}`}
      </div>
      <div className="my-2 h-px bg-smart-cbt-medium-grey" />
      {showCreateProxyForm && (
        <EmissionProxyCreateForm
          pcrTypeId={showCreateProxyForm.pcrTypeId}
          onClose={() => setShowCreateProxyForm(null)}
          onSubmit={(data) => handleNewProxySave(data, showCreateProxyForm)}
          isOpen={showCreateProxyForm != null}
          id={null}
        />
      )}
    </div>
  );
};

export default CarbonFootprintActivityRound;
