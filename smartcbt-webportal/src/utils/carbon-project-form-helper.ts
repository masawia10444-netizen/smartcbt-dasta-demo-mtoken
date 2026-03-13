import { CarbonProjectStatus } from "@/models/carbon-project";
import { PCRDashboardType, PCRType, PCRTypes } from "@/models/emission-factor-proxy";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PieChartCarbon } from "./cms/adapters/website/carbon/types";
import { convertDateToDateFormat } from "./helper";
export type CarbonSummaryData = ReturnType<typeof carbonSummary>;

export function viewMode({ id, status }: { id?: string | number; status?: CarbonProjectStatus }) {
  if (!id || !status)
    return {
      viewOnly: false,
      showExAndPost: false,
      canEditExPost: false,
    };
  switch (status) {
    case CarbonProjectStatus.Draft:
      return {
        viewOnly: false,
        showExAndPost: false,
        canEditExPost: false,
      };
    case CarbonProjectStatus.WaitingForApprove:
      return {
        viewOnly: true,
        showExAndPost: false,
        canEditExPost: false,
      };
    default:
      return {
        viewOnly: true,
        showExAndPost: true,
        canEditExPost: false,
      };
  }
}

export type FootprintCalculationResult = {
  grandTotal: number;
  proportion: number;
};

export type FootprintDashboardCalculationResultWithKeys = {
  [key in PCRDashboardType]: FootprintCalculationResult;
} & { total: number };

export type FootprintCalculationResultWithKeys = {
  [key in PCRTypes]: FootprintCalculationResult;
} & { total: number };

export function footprintDashboardCalculation(
  pieChartCarbon: PieChartCarbon
): FootprintDashboardCalculationResultWithKeys {
  const total =
    pieChartCarbon.travel_cf + pieChartCarbon.food_cf + pieChartCarbon.accommodation_cf + pieChartCarbon.waste_cf;

  return {
    total,
    travel_cf: {
      grandTotal: pieChartCarbon.travel_cf,
      proportion: (100 * pieChartCarbon.travel_cf) / total,
    },
    food_cf: {
      grandTotal: pieChartCarbon.food_cf,
      proportion: (100 * pieChartCarbon.food_cf) / total,
    },
    accommodation_cf: {
      grandTotal: pieChartCarbon.accommodation_cf,
      proportion: (100 * pieChartCarbon.accommodation_cf) / total,
    },
    waste_cf: {
      grandTotal: pieChartCarbon.waste_cf,
      proportion: (100 * pieChartCarbon.waste_cf) / total,
    },
  };
}

export function footprintCalculation(travelProgram: TravelProgramSchema): FootprintCalculationResultWithKeys {
  const data = (travelProgram?.travelPlans ?? [])?.reduce(
    (acc, travelPlan) => {
      const travelPlanSum = travelPlan?.activities?.reduce(
        (acc, activity) => {
          const activitySum = activity?.carbonFootprintActivities?.reduce(
            (acc, carbon) => {
              const value = (carbon?.multiplier ?? 1) * (carbon?.emissionProxy?.emission_factor_value ?? 0);

              return {
                transports: acc.transports + (carbon.pcr_type?.id == PCRType.Transportation ? value : 0),
                accomodations: acc.accomodations + (carbon.pcr_type?.id == PCRType.Accomodation ? value : 0),
                foods: acc.foods + (carbon.pcr_type?.id == PCRType.Food ? value : 0),
                wastes: acc.wastes + (carbon.pcr_type?.id == PCRType.Waste ? value : 0),
              };
            },
            {
              transports: 0,
              accomodations: 0,
              foods: 0,
              wastes: 0,
            }
          );
          return {
            transports: acc.transports + (activitySum?.transports ?? 0),
            accomodations: acc.accomodations + (activitySum?.accomodations ?? 0),
            foods: acc.foods + (activitySum?.foods ?? 0),
            wastes: acc.wastes + (activitySum?.wastes ?? 0),
          };
        },
        {
          transports: 0,
          accomodations: 0,
          foods: 0,
          wastes: 0,
        }
      );
      return {
        transports: acc.transports + travelPlanSum.transports,
        accomodations: acc.accomodations + travelPlanSum.accomodations,
        foods: acc.foods + travelPlanSum.foods,
        wastes: acc.wastes + travelPlanSum.wastes,
      };
    },
    {
      transports: 0,
      accomodations: 0,
      foods: 0,
      wastes: 0,
    }
  );

  const total = data.transports + data.foods + data.accomodations + data.wastes;

  return {
    total: !isNaN(total) ? total : 0,
    transportations: {
      grandTotal: !isNaN(data.transports) ? data.transports : 0,
      proportion: !isNaN(data.transports) ? (100 * data.transports) / total : 0,
    },
    foods: {
      grandTotal: !isNaN(data.foods) ? data.foods : 0,
      proportion: !isNaN(data.foods) ? (100 * data.foods) / total : 0,
    },
    accomodations: {
      grandTotal: !isNaN(data.accomodations) ? data.accomodations : 0,
      proportion: !isNaN(data.accomodations) ? (100 * data.accomodations) / total : 0,
    },
    wastes: {
      grandTotal: !isNaN(data.wastes) ? data.wastes : 0,
      proportion: !isNaN(data.wastes) ? (100 * data.wastes) / total : 0,
    },
  };
}

export type CarbonFootprintActivities = {
  date: string;
  activities: {
    name: string | null | undefined;
    pcrType: { id: number; label: string } | undefined | null;
    emissionProxy: string | undefined;
    emissionFactorValue: number | undefined;
    multiplier: number | null | undefined;
    unit: string | null | undefined;
    ef: number;
  }[];
}[];

export function carbonSummary(travelProgram: TravelProgramSchema) {
  const name = travelProgram.cbtProject?.title;
  const company = travelProgram.cbtProject?.organizations?.title;
  const numberOfTourist = travelProgram?.numberOfTourist;
  const registrationDate = convertDateToDateFormat(travelProgram?.registrationDate);
  const unit = travelProgram.unit?.title;
  const scope = travelProgram?.scopeOfAssessment;
  const status = travelProgram?.status;
  const remark = travelProgram.remark;
  const activities = travelProgram.travelPlans?.map((travelPlan, i) => {
    const activities = travelPlan.activities?.map((activity) => {
      const startTime = activity?.startTime;
      const endTime = activity?.endTime;
      return {
        details: activity.details,
        time: activity.noTime ? "ไม่มีเวลา" : `${startTime} - ${endTime}`,
        pcrs: activity.carbonFootprintActivities
          ?.map((carbonFootprintActivity) => carbonFootprintActivity.pcr_type?.label)
          .join(", "),
      };
    });
    return {
      date: `วันที่ ${i + 1}`,
      activities,
    };
  });

  const transportations: CarbonFootprintActivities = [];
  const foods: CarbonFootprintActivities = [];
  const accomodations: CarbonFootprintActivities = [];
  const wastes: CarbonFootprintActivities = [];
  const photos = travelProgram.photographic;

  const dataCollectionScope = travelProgram.travelPlans?.map((travelPlan, i) => {
    const activities = travelPlan.activities?.map((activity) => {
      return {
        details: activity.details,
        carbonFootprintActivities: activity.carbonFootprintActivities?.map((carbonFootprintActivity) => {
          return {
            name: carbonFootprintActivity.name,
            pcrType: carbonFootprintActivity.pcr_type,
            emissionProxy: carbonFootprintActivity.emissionProxy?.name,
            emissionFactorValue: carbonFootprintActivity.emissionProxy?.emission_factor_value,
            multiplier: carbonFootprintActivity.multiplier,
            unit: carbonFootprintActivity.emissionProxy?.unit,
            ef:
              carbonFootprintActivity.emissionProxy?.emission_factor_value && carbonFootprintActivity?.multiplier
                ? carbonFootprintActivity.emissionProxy?.emission_factor_value * carbonFootprintActivity?.multiplier
                : 0,
          };
        }),
      };
    });

    const date = `วันที่ ${i + 1}`;
    const transportationActivities = activities?.flatMap((activity) => {
      return activity.carbonFootprintActivities?.filter((carbonFootprintActivity) => {
        return carbonFootprintActivity.pcrType?.id === PCRType.Transportation;
      });
    });
    const foodActivities = activities?.flatMap((activity) => {
      return activity.carbonFootprintActivities?.filter((carbonFootprintActivity) => {
        return carbonFootprintActivity.pcrType?.id === PCRType.Food;
      });
    });

    const accomodationActivities = activities?.flatMap((activity) => {
      return activity.carbonFootprintActivities?.filter((carbonFootprintActivity) => {
        return carbonFootprintActivity.pcrType?.id === PCRType.Accomodation;
      });
    });

    const wastesActivities = activities?.flatMap((activity) => {
      return activity.carbonFootprintActivities?.filter((carbonFootprintActivity) => {
        return carbonFootprintActivity.pcrType?.id === PCRType.Waste;
      });
    });

    // console.log("wastesActivities", wastesActivities);
    // console.log("accomodationActivities", accomodationActivities);
    // console.log("foodActivities", foodActivities);
    // console.log("transportationActivities", transportationActivities);

    if (transportationActivities?.length > 0) {
      transportations?.push({
        date,
        activities: transportationActivities,
      });
    }

    if (foodActivities?.length > 0) {
      foods?.push({
        date,
        activities: foodActivities,
      });
    }

    if (accomodationActivities?.length > 0) {
      accomodations?.push({
        date,
        activities: accomodationActivities,
      });
    }

    if (wastesActivities?.length > 0) {
      wastes?.push({
        date,
        activities: wastesActivities,
      });
    }

    return {
      date,
      activities,
    };
  });

  return {
    name,
    company,
    numberOfTourist,
    registrationDate,
    scope,
    unit,
    activities,
    dataCollectionScope,
    transportations,
    foods,
    accomodations,
    wastes,
    graphData: footprintCalculation(travelProgram),
    photos,
    status,
    remark,
  };
}
