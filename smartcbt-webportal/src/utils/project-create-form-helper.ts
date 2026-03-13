import { QuestionWithSubQuestionSchema, SelectionQuestionSchema } from "@/schemas/forms/projects/question-schema";

import { FinancialProxyCategory, FinancialProxyStatus } from "@/models/financial-proxy";
import { District, Subdistrict } from "@/models/travel-mart/travel-mart-countries";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { Step1Schema } from "@/schemas/forms/projects/create/step1-schema";
import { Step2Schema } from "@/schemas/forms/projects/create/step2-schema";
import { Step4Schema } from "@/schemas/forms/projects/create/step4-schema";
import { BenefitDetailsSchema, Step8Schema } from "@/schemas/forms/projects/create/step8-schema";
import find from "lodash/find";
import get from "lodash/get";
import isNil from "lodash/isNil";
import range from "lodash/range";
import { PROJECT_STATUS } from "./cms/adapters/website/constants";
import { BenefitJson, OrganizationJson, Project, ProjectJson } from "./cms/adapters/website/sia/types/project";
import { CBTProjectJson, ProvinceJSONData } from "./cms/cms-api-adapter";
import { calculateIRR } from "./helper";

export type SocialReturnOnInvestment = ReturnType<typeof socialReturnOnInvestmentData>;
export type ProjectDetailsDocument = ReturnType<typeof projectDetails>;
export type ThoeryOfChangeDocument = ReturnType<typeof thoeryOfChange>;
export type ProjectWithWithoutDocument = ReturnType<typeof effects>;
export type ProjectbudgetDocument = ReturnType<typeof budget>;
export type ProjectImpactDocument = ReturnType<typeof impacts>;
export type SIADocument = ReturnType<typeof sia>;
export type ProjectBenefitDocument = ReturnType<typeof projectBenefitDocument>;
export type SocialImpactPathwayXLXS = ReturnType<typeof socialImpactPathway>;
export type SROIData = ReturnType<typeof sroiTableData>;

export function socialReturnOnInvestmentData(
  project: CreateProjectSchema,
  discountRate: number,
  mode: "base" | "best" | "worst" = "base",
  isExPost: boolean = false
) {
  const availableProjectYears: string[] = [];
  for (
    let year = (project.step2[8].questions[1] as any).value;
    year <= (project.step2[8].questions[2] as any).value;
    year++
  ) {
    availableProjectYears.push(year.toString());
  }

  const availableAfterProjectYears: string[] = [];
  for (
    let year = Number(availableProjectYears.slice(-1)) + 1;
    year <= (project.step2[9].questions[1] as any).value;
    year++
  ) {
    availableAfterProjectYears.push(year.toString());
  }

  const allYears = [...availableProjectYears, ...availableAfterProjectYears];
  const fullTableColSpan = allYears.length + 1;

  const initialInvestment = project.step2[10].value.flatMap((budgetYear) =>
    budgetYear.values.flatMap((budgetYearInfo) => ({
      title: budgetYearInfo.description,
      values: allYears.map((y, yi) => (y == budgetYear.year ? budgetYearInfo.amount : null)),
    }))
  );

  const totalInitialInvestment = allYears.map((year) => {
    return project.step2[10].value.find((v) => v.year == year)?.values.reduce((acc, v) => (acc += v.amount), 0);
  });

  const presentValueOfInvestment = totalInitialInvestment.map((t, i) =>
    t ? t / Math.pow((100 + discountRate) / 100, i) : null
  );

  const totalNPVInitialInvestment = presentValueOfInvestment.reduce(
    (accumulator, currentValue) => (accumulator ?? 0) + (currentValue ?? 0),
    0
  );

  const allAttributions = project.step6.sections.flatMap((section) =>
    section.value.flatMap((sectionValue) => ({
      title: sectionValue.title,
      hasCreatedProxy: sectionValue.benefitDetails.find((bd) => bd.isCreatedProxy == true) != undefined,
      values: sectionValue.benefitDetails.map((bd) =>
        isExPost
          ? bd.netBenefitExPost && bd.attribution?.percentage
            ? bd.netBenefitExPost * (bd.attribution?.percentage / 100)
            : null
          : bd.netBenefit && bd.attribution?.percentage
          ? bd.netBenefit * (bd.attribution?.percentage / 100)
          : null
      ),
    }))
  );

  const allDeadweights = project.step6.sections.flatMap((section) =>
    section.value.flatMap((sectionValue) => ({
      title: sectionValue.title,
      hasCreatedProxy: sectionValue.benefitDetails.find((bd) => bd.isCreatedProxy == true) != undefined,
      values: sectionValue.benefitDetails.map((bd) =>
        isExPost
          ? bd.netBenefitExPost && bd.deadweight?.percentage
            ? bd.netBenefitExPost * (bd.deadweight?.percentage / 100)
            : null
          : bd.netBenefit && bd.deadweight?.percentage
          ? bd.netBenefit * (bd.deadweight?.percentage / 100)
          : null
      ),
    }))
  );

  const allDisplacements = project.step6.sections.flatMap((section) =>
    section.value.flatMap((sectionValue) => ({
      title: sectionValue.title,
      hasCreatedProxy: sectionValue.benefitDetails.find((bd) => bd.isCreatedProxy == true) != undefined,
      values: sectionValue.benefitDetails.map((bd) => {
        isExPost
          ? bd.netBenefitExPost && bd.displacement?.percentage
            ? bd.netBenefitExPost * (bd.displacement?.percentage / 100)
            : null
          : bd.netBenefit && bd.displacement?.percentage
          ? bd.netBenefit * (bd.displacement?.percentage / 100)
          : null;
      }),
    }))
  );

  const totalBaseCaseImpact = allYears.map(
    (_y, yi) =>
      allAttributions.reduce((acc, attr) => (acc += attr.values.at(yi) ?? 0), 0) +
      allDeadweights.reduce((acc, dead) => (acc += dead.values.at(yi) ?? 0), 0) +
      allDisplacements.reduce((acc, dis) => (acc += dis.values.at(yi) ?? 0), 0)
  );

  const presentBaseCaseImpact = totalBaseCaseImpact.map((t, i) =>
    t ? t / Math.pow((100 + discountRate) / 100, i) : null
  );

  const totalPresentBaseCaseImpact = presentBaseCaseImpact.reduce(
    (accumulator, currentValue) => (accumulator ?? 0) + (currentValue ?? 0),
    0
  );

  const benefits = project.step6.sections.map((section) => ({
    title: section.title,
    values: section.value.map((sectionValue) => ({
      title: sectionValue.title,
      values: sectionValue.benefitDetails.flatMap((bd) => {
        const { netBenefit, netBenefitMaximmum, netBenefitMinimum } = benefitCalculations(
          bd,
          bd.isFilled ?? false,
          isExPost
        );
        switch (mode) {
          case "base":
            return netBenefit;
          case "best":
            return netBenefitMaximmum;
          case "worst":
            return netBenefitMinimum;
        }
      }),
    })),
  }));

  const totalBenefit = allYears.map((_y, yi) =>
    benefits.reduce(
      (acc, benefit) => (acc += benefit.values.reduce((acc, value) => (acc += value.values.at(yi) ?? 0), 0)),
      0
    )
  );

  const presentBenefit = totalBenefit.map((t, i) => (t ? t / Math.pow((100 + discountRate) / 100, i) : null));

  const totalPresentBenefit = presentBenefit.reduce(
    (accumulator, currentValue) => (accumulator ?? 0) + (currentValue ?? 0),
    0
  );

  // first iniitial investment
  const firstInitialInvestment = (totalInitialInvestment[0] ?? 0) + totalBaseCaseImpact[0] ?? 0;

  const netSocialReturnOnInvestment = allYears.map(
    (_y, yi) => totalBenefit[yi] - totalBaseCaseImpact[yi] - (totalInitialInvestment[yi] ?? 0)
  );

  const netPresentValue = netSocialReturnOnInvestment.map((t, i) =>
    t ? t / Math.pow((100 + discountRate) / 100, i) : null
  );

  const totalNetNPVSROI = netPresentValue.reduce(
    (accumulator, currentValue) => (accumulator ?? 0) + (currentValue ?? 0),
    0
  );

  const sroiRatio = (totalNetNPVSROI ?? 0) / (totalNPVInitialInvestment ?? 1);
  // first benefit
  const firstBenefit = totalBenefit[0] ?? 0;

  const cashflows = [-firstInitialInvestment, firstBenefit, ...netSocialReturnOnInvestment.slice(1)];
  let sroiIRR = calculateIRR(cashflows);

  sroiIRR = sroiIRR ? sroiIRR * 100 : null;

  return {
    availableProjectYears,
    availableAfterProjectYears,
    allYears,
    fullTableColSpan,
    discountRate,
    initialInvestment,
    totalInitialInvestment,
    presentValueOfInvestment,
    totalNPVInitialInvestment,
    allAttributions,
    allDeadweights,
    allDisplacements,
    totalBaseCaseImpact,
    presentBaseCaseImpact,
    totalPresentBaseCaseImpact,
    benefits,
    totalBenefit,
    presentBenefit,
    totalPresentBenefit,
    netSocialReturnOnInvestment,
    netPresentValue,
    totalNetNPVSROI,
    sroiRatio,
    sroiIRR,
  };
}

export function projectDetails(project: CreateProjectSchema) {
  const projectName = project.step1.name;
  const projectLocations = `${project?.step2[5]?.location ?? ""} ${project?.step2[5]?.subDistrict?.title ?? ""} ${
    project?.step2[5]?.province?.title ?? ""
  } ${project?.step2[5]?.postcode ?? ""}`;
  const projectStatus = `${project?.step2[4]?.value}`;
  const projectTypes = Object.keys(project.step2[3].value)
    .map((key) => {
      const option = project.step2[3]?.options.find((option) => option.key === key);
      return option ? option.label : null;
    })
    .filter((label) => label !== null);
  const dastaWorkingArea = Object.keys(project.step2[6].value)
    .map((key) => {
      const option = (project.step2[6]?.subQuestions[0] as any).options.find(
        (option: { key: string }) => option.key === key
      );
      return option ? option.label : null;
    })
    .filter((label) => label !== null);

  const step2Question0 = project.step2[1].questions[0].value;
  const step2Question1 = project.step2[1].questions[1].value;
  const step2Question2 = project.step2[1].questions[2].value;
  const step2Question3 = project.step2[1].questions[3].value;
  const step2Question4 = project.step2[1].questions[4].value;
  const step2Question5 = project.step2[1].questions[5].value;
  const step2Question6 = project.step2[1].questions[6].value;

  const oneDotOneKeys = Object.keys(step2Question0 ?? {}) as string[];
  const oneDotTwoKeys = Object.keys(step2Question1 ?? {}) as string[];
  const oneDotThreeKeys = Object.keys(step2Question2 ?? {}) as string[];
  const oneDotFourKeys = Object.keys(step2Question3 ?? {}) as string[];
  const oneDotFiveKeys = Object.keys(step2Question4 ?? {}) as string[];
  const oneDotSixKeys = Object.keys(step2Question5 ?? {}) as string[];
  const oneDotSevenKeys = Object.keys(step2Question6 ?? {}) as string[];

  const oneDotOne = oneDotOneKeys.map((key) => {
    const question = project.step2[1].questions[0] as SelectionQuestionSchema;
    return question.options.find((option) => option.value == get(step2Question0, [key, "value"], null))?.label ?? "";
  });
  const oneDotTwo = oneDotTwoKeys.map((key) => {
    const question = project.step2[1].questions[1] as QuestionWithSubQuestionSchema;
    let label = "";
    let items = "";

    for (let i = 0; i < question.subQuestions.length; i++) {
      const subQuestion = question.subQuestions[i];
      const a = (subQuestion as SelectionQuestionSchema).options.find(
        (option) => option.value == get(step2Question1, [key, "value"], null)
      )?.label;

      if (a) {
        label = subQuestion.label;
        items = a;
        break;
      }
    }
    return { label, items };
  });

  const oneDotThree = oneDotThreeKeys.map((key) => {
    const question = project.step2[1].questions[2] as SelectionQuestionSchema;
    return question.options.find((option) => option.value == get(step2Question2, [key, "value"], null))?.label ?? "";
  });

  const oneDotFour = oneDotFourKeys.map((key) => {
    const question = project.step2[1].questions[3] as QuestionWithSubQuestionSchema;
    let label = "";
    let items = "";

    if (!question.subQuestions) return { label, items };
    for (let i = 0; i < question.subQuestions.length; i++) {
      const subQuestion = question.subQuestions[i];
      const a = (subQuestion as SelectionQuestionSchema).options.find(
        (option) => option.value == get(step2Question3, [key, "value"], null)
      )?.label;
      if (a) {
        label = subQuestion.label;
        items = a;
        break;
      }
    }
    return { label, items };
  });
  const oneDotFive = oneDotFiveKeys.map((key) => {
    const question = project.step2[1].questions[4] as SelectionQuestionSchema;
    return question.options.find((option) => option.value == get(step2Question4, [key, "value"], null))?.label ?? "";
  });
  const oneDotSix = oneDotSixKeys.map((key) => {
    const question = project.step2[1].questions[5] as SelectionQuestionSchema;
    return question.options.find((option) => option.value == get(step2Question5, [key, "value"], null))?.label ?? "";
  });

  const oneDotSeven = oneDotSevenKeys.map((key) => {
    const question = project.step2[1].questions[6] as SelectionQuestionSchema;
    return question.options.find((option) => option.value == get(step2Question6, [key, "value"], null))?.label ?? "";
  });

  const ans1 = {
    oneDotOne,
    oneDotTwo,
    oneDotThree,
    oneDotFour,
    oneDotFive,
    oneDotSix,
    oneDotSeven,
    projectLocations,
    projectStatus,
    projectTypes,
    dastaWorkingArea,
  };

  return {
    projectName,
    ans1,
    ans2: projectDetails2(project),
  };
}

export function projectDetails2(project: CreateProjectSchema) {
  const step2One = project.step2[2].value as Record<
    string,
    { value: (string | string[]) & (string | string[] | undefined); customText?: string | undefined }
  >;
  const step2OneKey = get(Object.keys(step2One), ["0"], null);

  let type = "";

  if (step2OneKey) {
    type =
      project.step2[2].options.find((option) => {
        return option.key == step2OneKey;
      })?.label ?? "";
  }

  const projectAgency = project.step2[7].projectAgency?.title;
  const organization = project.step2[7].organization;
  const duration = (project.step2[8].questions.at(0) as any).value;
  const startYear = (project.step2[8].questions.at(1) as any).value;
  const endYear = (project.step2[8].questions.at(2) as any).value;
  const onGoing = (project.step2[9].questions.at(0) as any).value;
  const onGoingEndYear = (project.step2[9].questions.at(1) as any).value;

  const objectives = project.step2[11].value;
  const actitivies = project.step2[12].value;
  const output = project.step2[13].value;
  const outcomes = project.step2[14].value;
  const beneficiaries = project.step2[15].value;
  const sdgsKeys = Object.keys(project.step2[16].value) as string[];
  const sdgs = sdgsKeys.map((key) => {
    return project.step2[16].options.find((option) => option.key == key)?.label ?? "";
  });

  const ans2 = {
    type,
    projectAgency,
    organization,
    duration,
    startYear,
    endYear,
    onGoing,
    onGoingEndYear,
    budget: budget(project),
    objectives,
    actitivies,
    output,
    outcomes,
    beneficiaries,
    sdgs,
  };

  return ans2;
}

export function thoeryOfChange(project: CreateProjectSchema) {
  const projectName = project.step1.name;
  const beneficiaries = project.step2[15].value;
  const outcomes = project.step2[13].value;
  const objectives = project.step2[11].value;

  return {
    projectName,
    beneficiaries,
    outcomes,
    objectives,
  };
}

export function effects(project: CreateProjectSchema) {
  const effects = project.step4.map((projectOverviewEffect) => {
    return {
      title: projectOverviewEffect.title,
      with: projectOverviewEffect.with,
      without: projectOverviewEffect.without,
    };
  });

  return effects;
}

export function budget(project: CreateProjectSchema) {
  const projectName = project.step1.name;
  const availableProjectYears: string[] = [];
  for (
    let year = (project.step2[8].questions[1] as any).value;
    year <= (project.step2[8].questions[2] as any).value;
    year++
  ) {
    availableProjectYears.push(year.toString());
  }

  // const availableAfterProjectYears: string[] = [];
  // for (
  //   let year = Number(availableProjectYears.slice(-1)) + 1;
  //   year <= (project.step2[9].questions[1] as any).value;
  //   year++
  // ) {
  //   availableAfterProjectYears.push(year.toString());
  // }

  // const allYears = [...availableProjectYears, ...availableAfterProjectYears];
  const grandTotal = project.step2[10].value.reduce(
    (acc, value) => (acc += value.values.reduce((acc, value) => (acc += value.amount), 0)),
    0
  );

  const budgetYears = availableProjectYears.map((year, i) => {
    const budgetList = project.step2[10].value.find((v) => v.year == year)?.values ?? [];
    const totalForYear = project.step2[10].value
      .find((v) => v.year == year)
      ?.values.reduce((acc, v) => (acc += v.amount), 0);

    return {
      year,
      projectName,
      budgetList,
      totalForYear,
    };
  });

  return { budgetYears, grandTotal };
}

export function impacts(project: CreateProjectSchema) {
  const allAttributions = project.step6.sections.flatMap((section) =>
    section.value.flatMap((sectionValue) => ({
      title: sectionValue.title,
      values: sectionValue.benefitDetails.map((bd) => {
        return {
          year: bd.year,
          details: bd.attribution?.details ? bd.attribution?.details : "ไม่มี",
          benefitPercentage: bd.attribution?.benefitPercentage ? bd.attribution?.benefitPercentage : 100,
          percentage: bd.attribution?.percentage ? bd.attribution?.percentage : 0,
        };
      }),
    }))
  );

  const allDeadweights = project.step6.sections.flatMap((section) =>
    section.value.flatMap((sectionValue) => ({
      title: sectionValue.title,
      values: sectionValue.benefitDetails.map((bd) => {
        return {
          year: bd.year,
          details: bd.deadweight?.details ? bd.deadweight?.details : "ไม่มี",
          benefitPercentage: bd.deadweight?.benefitPercentage ? bd.deadweight?.benefitPercentage : 100,
          percentage: bd.deadweight?.percentage ? bd.deadweight?.percentage : 0,
        };
      }),
    }))
  );

  const allDisplacements = project.step6.sections.flatMap((section) =>
    section.value.flatMap((sectionValue) => ({
      title: sectionValue.title,
      values: sectionValue.benefitDetails.map((bd) => {
        return {
          year: bd.year,
          details: bd.displacement?.details ? bd.displacement?.details : "ไม่มี",
          benefitPercentage: bd.displacement?.benefitPercentage ? bd.displacement?.benefitPercentage : 100,
          percentage: bd.displacement?.percentage ? bd.displacement?.percentage : 0,
        };
      }),
    }))
  );

  const effect = {
    allAttributions,
    allDeadweights,
    allDisplacements,
  };

  return effect;
}

export function sia(project: CreateProjectSchema) {
  const projectName = project.step1.name;
  const duration = (project.step2[8].questions.at(0) as any).value;
  const startYear = (project.step2[8].questions.at(1) as any).value;

  const availableYears: string[] = [];

  for (
    let year = (project.step2[8].questions[1] as any).value;
    year <= (project.step2[8].questions[2] as any).value;
    year++
  ) {
    availableYears.push(year.toString());
  }

  const projectAgency = project.step2[7].projectAgency;
  const organization = project.step2[7].organization;
  const beneficiaries = project.step2[15].value;
  const actitivies = project.step2[12].value;
  const outcomes = project.step2[13].value;

  const sia = {
    projectName,
    duration,
    startYear,
    projectAgency,
    organization,
    beneficiaries,
    actitivies,
    outcomes,
    effects: effects(project),
    budget: budget(project),
  };

  return {
    sia,
  };
}

export function projectBenefitDocument(project: CreateProjectSchema) {
  const availableProjectYears: string[] = [];
  for (
    let year = (project.step2[8].questions[1] as any).value;
    year <= (project.step2[8].questions[2] as any).value;
    year++
  ) {
    availableProjectYears.push(year.toString());
  }

  const availableAfterProjectYears: string[] = [];
  for (
    let year = Number(availableProjectYears.slice(-1)) + 1;
    year <= (project.step2[9].questions[1] as any).value;
    year++
  ) {
    availableAfterProjectYears.push(year.toString());
  }

  const allYears = [...availableProjectYears, ...availableAfterProjectYears];

  const benefits = project.step6.sections.map((section) => ({
    title: section.title,
    values: section.value.map((sectionValue) => ({
      title: sectionValue.title,
      values: allYears.map((year) => {
        const benefit = sectionValue.benefitDetails.find((bd) => {
          return bd.year == year;
        });
        return {
          year,
          netBenefit: benefit?.netBenefit ?? 0,
        };
      }),
    })),
  }));

  return {
    allYears,
    benefits,
  };
}

export function benefitCalculations(benefitDetail: BenefitDetailsSchema, isFilled: boolean, isExPost?: Boolean) {
  const amount = benefitDetail.amount ?? 0;
  const variableCost = benefitDetail.variableCost ?? 0;
  const nonVariableCost = benefitDetail.nonVariableCost ?? 0;
  const minimumPercentage = benefitDetail.minimumPercentage ?? 0;
  const maximumPercentage = benefitDetail.maximumPercentage ?? 0;
  const adjustedMinimumAmount = amount - (amount * minimumPercentage) / 100;
  const adjustedMaximumAmount = amount + (amount * maximumPercentage) / 100;

  const proxyCalculations = benefitDetail.proxy ? financialProxyCalculation(benefitDetail.proxy) : [];
  const proxyValue = proxyCalculations.find((c) => c.year == Number(benefitDetail.year))?.value ?? 0;

  const totalAmount = proxyValue * amount;
  const totalMinimumAmount = proxyValue * adjustedMinimumAmount;
  const totalMaximumAmount = proxyValue * adjustedMaximumAmount;

  const netBenefit = isExPost
    ? benefitDetail.netBenefitExPost
    : benefitDetail.netBenefit && !isFilled
    ? benefitDetail.netBenefit
    : totalAmount - (variableCost * amount + nonVariableCost);
  const netBenefitMinimum = totalMinimumAmount - (variableCost * adjustedMinimumAmount + nonVariableCost);
  const netBenefitMaximmum = totalMaximumAmount - (variableCost * adjustedMaximumAmount + nonVariableCost);

  return {
    netBenefit,
    netBenefitMaximmum,
    netBenefitMinimum,
    proxyValue,
    totalAmount,
    adjustedMaximumAmount,
    adjustedMinimumAmount,
    totalMinimumAmount,
    totalMaximumAmount,
  };
}

export function financialProxyCalculation(
  proxy: Partial<{ startingYear: number; endingYear: number; value: number; discountRate: number }>
) {
  if (!proxy.startingYear || !proxy.endingYear || !proxy.discountRate || !proxy.value) return [];
  const data = [];
  let offset = -5;
  const discountRate = proxy.discountRate / 100; // Convert discount rate percentage to decimal
  const initialValue = proxy.value;
  for (let year = proxy.startingYear + offset; year <= proxy.endingYear; year++) {
    const compoundedValue = initialValue / Math.pow(1 + discountRate, -offset);
    const row = { year, offset, value: compoundedValue };
    offset++;
    data.push(row);
  }
  return data;
}

export function viewMode({ id, status }: { id?: string; status?: PROJECT_STATUS }) {
  if (!id || !status)
    return {
      viewOnly: false,
      showExAndPost: false,
      canEditExPost: false,
    };
  switch (status) {
    case PROJECT_STATUS.IN_PROGRESS:
      return {
        viewOnly: true,
        showExAndPost: true,
        canEditExPost: true,
      };
    case PROJECT_STATUS.DRAFT:
      return {
        viewOnly: false,
        showExAndPost: false,
        canEditExPost: false,
      };
    case PROJECT_STATUS.REJECTED:
      return {
        viewOnly: false,
        showExAndPost: false,
        canEditExPost: false,
      };
    case PROJECT_STATUS.PENDING_FOR_APPROVAL:
      return {
        viewOnly: true,
        showExAndPost: false,
        canEditExPost: false,
      };
    case PROJECT_STATUS.APPROVAL:
      return {
        viewOnly: false,
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

export function socialImpactPathway(project: CreateProjectSchema) {
  const actitivies = project.step2[12].value;
  const output = project.step2[13].value;
  const outcomes = project.step2[14].value;
  const beneficiaries = project.step2[15].value;
  const economics = project.step4.map((projectOverviewEffect) => projectOverviewEffect.with.economic);
  const socials = project.step4.map((projectOverviewEffect) => projectOverviewEffect.with.social);
  const environments = project.step4.map((projectOverviewEffect) => projectOverviewEffect.with.environment);
  const impacts = economics.concat(socials, environments);
  const budgetList = project.step2[10].value.map((budgetYear) => {
    const totalForYear = budgetYear.values.reduce((acc, v) => (acc += v.amount), 0);
    return totalForYear.toLocaleString(undefined, { minimumFractionDigits: 2 });
  });
  const duration = (project.step2[8].questions.at(0) as any).value;
  const startYear = (project.step2[8].questions.at(1) as any).value;
  const institution = (project.step2[7].projectAgency?.title as string) ?? "";
  const yearLabels = budgetList.map((_, i) => `งบประมาณขับเคลื่อนโครงการ ปีที่ ${i + 1} (บาท)`);
  const inputTitles = ["ระยะเวลาขับเคลื่อนโครงการ (ปี)", "ปีที่เริ่มขับเคลื่อนโครงการ (พ.ศ.)"].concat(
    yearLabels,
    "หน่วยงานที่ขับเคลื่อนโครงการ"
  );
  const inputs = [duration, startYear].concat(budgetList, institution);

  const maxLength = Math.max(
    inputTitles.length,
    inputs.length,
    actitivies.length,
    output.length,
    outcomes.length,
    beneficiaries.length,
    impacts.length
  );

  const data: {
    inputTitle: string;
    input: string;
    projectName: string | undefined;
    activity: string;
    output: string;
    beneficiary: string;
    outcome: string;
    impactTitle: string;
    impact: string;
  }[] = [];

  for (let index = 0; index < maxLength; index++) {
    let projectName = index == 0 ? project.step1.name : "";
    let inputTitle = inputTitles[index] ?? "";
    let input = inputs[index] ?? "";
    let activity = project.step2[12].value[index] ?? "";
    let output = project.step2[13].value[index] ?? "";
    let beneficiary = project.step2[15].value[index] ?? "";
    let outcome = project.step2[14].value[index] ?? "";
    let impact = impacts[index] ?? "";
    let impactTitle = "";

    if (index == 0) {
      impactTitle = "ด้านเศรษฐกิจ";
    } else if (index == economics.length) {
      impactTitle = "ด้านสังคม";
    } else if (index == economics.length + socials.length) {
      impactTitle = "ด้านสิ่งแวดล้อม";
    }

    data.push({
      inputTitle,
      input,
      projectName,
      activity,
      output,
      beneficiary,
      outcome,
      impactTitle,
      impact,
    });
  }

  return data;
}

export function sroiTableData(project: CreateProjectSchema, discountRate: number) {
  const exAnteBase = socialReturnOnInvestmentData(project, discountRate, "base", false);
  const exAnteBest = socialReturnOnInvestmentData(project, discountRate, "best", false);
  const exAnteWorst = socialReturnOnInvestmentData(project, discountRate, "worst", false);
  const exPostBase = socialReturnOnInvestmentData(project, discountRate, "base", true);

  return {
    exAnteBase,
    exAnteBest,
    exAnteWorst,
    exPostBase,
  };
}

export function transformProjectBody(
  status: PROJECT_STATUS,
  createProjectSchema: CreateProjectSchema,
  discountRate: number
): Project {
  const values = createProjectSchema;

  // Step1
  const cbtProjectId = values.step1.cbtProject?.id;
  const featuredImage = { id: values.step1.coverPicture?.file.id };
  const projectGalleries = values.step1.album.map((value: any) => ({ directus_files_id: value.file.id }));

  // Step2-1
  const hasProjectStrategiesValues: any[] = [];
  const dastaObjectiveValues: any[] = [];
  for (var i = 0; i < values.step2[1].questions.length; i++) {
    const key = values.step2[1].questions[i].key;
    if (key == "dasta_objective") {
      const value = values.step2[1].questions[i].value as { [key: string]: { customText: string; value: string } };
      Object.keys(value).forEach((key) => {
        const subValue = value[key];
        dastaObjectiveValues.push({ dasta_working_objective_id: subValue.value, detail: subValue.customText });
      });
    } else {
      const value = values.step2[1].questions[i].value as { [key: string]: { value: string } };
      Object.keys(value).forEach((key) => {
        const subValue = value[key];
        hasProjectStrategiesValues.push({ project_strategies_items_id: subValue.value });
      });
    }
  }

  // Step2-2
  var projectCharacteristicId;
  var projectCharacteristicCustomText;
  const projectCharacteristic = values.step2[2].value;
  if (projectCharacteristic && Object.keys(projectCharacteristic).length > 0) {
    const key = Object.keys(projectCharacteristic)[0];
    projectCharacteristicId = projectCharacteristic[key].value;
    projectCharacteristicCustomText = projectCharacteristic[key].customText;
  }

  // Step2-3
  var projectTypeId: any[] = [];
  const projectType = values.step2[3].value;
  if (projectType && Object.keys(projectType).length > 0) {
    Object.keys(projectType).forEach((key) => {
      const subValue = projectType[key];
      projectTypeId.push({ project_types_id: subValue.value });
    });
  }

  // Step2-4
  const projectStatus = values.step2[4].value;
  const relatedProjectId = values.step2[4].project?.id;

  // Step2-5
  const postalcode = values.step2[5].postcode;
  const latitude = values.step2[5].latitude;
  const longitude = values.step2[5].longitude;
  const title = values.step2[5].location;
  const provinceId = values.step2[5].province?.id;
  const districtId = values.step2[5].district?.id;
  const subdistrictId = values.step2[5].subDistrict?.id;

  // Step2-6
  const dastaWorkingArea: any[] = [];
  const dastaWorkingAreaValues = values.step2[6].value;
  if (dastaWorkingAreaValues && Object.keys(dastaWorkingAreaValues).length > 0) {
    const value = dastaWorkingAreaValues as { [key: string]: { value: string } };
    Object.keys(value).forEach((key) => {
      const subValue = value[key];
      dastaWorkingArea.push({ dasta_working_area_id: subValue.value });
    });
  }

  // Step2-7
  const projectOwner = values.step2[7].projectAgency?.value;
  const projectOwnerOther = values.step2[7].organization;

  // Step2-8
  const projectDurationYear = values.step2[8].questions.find((value: any) => value.key === "project_duration_year")
    ?.value;

  const projectStartYear = values.step2[8].questions.find((value: any) => value.key == "project_start_year")?.value;
  const projectEndYear = values.step2[8].questions.find((value: any) => value.key == "project_end_year")?.value;

  // Step2-9
  const projectConsequenceDurationYear = values.step2[9].questions.find(
    (value: any) => value.key == "project_consequence_duration_year"
  )?.value;
  const projectConsequenceEndYear = values.step2[9].questions.find(
    (value: any) => value.key == "project_consequence_end_year"
  )?.value;

  // Step2-10
  var projectBudget = 0;
  const projectBudgetDetails: any[] = [];
  values.step2[10].value.forEach((value: any, index: number) => {
    value.values.forEach((item: any) => {
      projectBudgetDetails.push({
        year_no: value.year,
        detail: item.description,
        amount: item.amount,
      });
      projectBudget = projectBudget + item.amount;
    });
  });

  // Step2-11
  const projectObjectives = values.step2[11].value.map((value: string, index: number) => ({
    no: index + 1,
    objective: value,
  }));

  // Step2-12
  const projectActivities = values.step2[12].value.map((value: string) => ({ title: value }));

  // Step2-13
  const projectOutputs = values.step2[13].value.map((value: string) => ({ title: value }));

  // Step2-14
  const projectOutcomes = values.step2[14].value.map((value1: string, index1: number) => {
    const impactsData = values.step4[index1];
    const benefitsData = values.step6?.sections[index1]?.value;

    const benefits = benefitsData?.map((benefit: any, index: number) => {
      const exAnte = benefit.benefitDetails
        .filter((value: any) => value.proxy != null)
        .map((benefitDetail: any) => {
          const { netBenefit } = benefitCalculations(benefitDetail, true);
          const {
            proxy,
            year,
            unitPerYear,
            nonVariableCost,
            variableCost,
            amount,
            maximumPercentage,
            minimumPercentage,
            id,
          } = benefitDetail;

          const data = {
            proxy: { id: proxy!.id },
            year,
            unit: unitPerYear,
            present_benefit: netBenefit,
            fixed_cost: nonVariableCost, // ต้นทุนไม่ผันแปร (บาท/หน่วย)
            variable_cost: variableCost, // ต้นทุนผันแปร (บาท/หน่วย)
            quantity: amount, // จำนวน
            bestcase: maximumPercentage, // เปลี่ยนแปลง(%) ในแท็บ ผลประโยชน์กรณีสูงสุด ( +%)
            worstcase: (minimumPercentage ?? 0) * -1, // เปลี่ยนแปลง(%) ในแท็บ ผลประโยชน์กรณีต่ำสุด ( +%)
          } as any;

          if (id) {
            data.id = id;
          }

          return data;
        });

      const exPost = benefit.benefitDetails
        .map((benefitDetail: any) => {
          const { netBenefit } = benefitCalculations(benefitDetail, true, true);
          const { year } = benefitDetail;
          return { year, present_benefit: netBenefit };
        })
        .filter((value: any) => value.present_benefit != null);

      const basedCaseImpacts = [];

      const processImpactDetails = (details: any, type: number) => {
        return benefit.benefitDetails
          .filter(
            (value: any) => value[details] != null && value[details].details != null && value[details].details != "-"
          )
          .map((benefitDetails: any) => {
            const impactDetail = benefitDetails[details];
            return {
              year: benefitDetails.year,
              type,
              title: impactDetail.details,
              benefit: impactDetail.benefitPercentage,
              impact: impactDetail.percentage,
            };
          });
      };

      const attributions = processImpactDetails("attribution", 1);
      const deadweights = processImpactDetails("deadweight", 2);
      const displacements = processImpactDetails("displacement", 3);

      basedCaseImpacts.push(...attributions, ...deadweights, ...displacements);

      return {
        title: benefit.title,
        ordering: (index + 1).toString(),
        ex_ante: exAnte,
        ex_post: exPost,
        based_case_impacts: basedCaseImpacts,
      };
    });

    const impacts = impactsData
      ? [
          { detail: impactsData.with.economic, mode: "with", categorie: "economic", title: null },
          { detail: impactsData.with.social, mode: "with", categorie: "social", title: null },
          { detail: impactsData.with.environment, mode: "with", categorie: "environment", title: null },
          { detail: impactsData.without.economic, mode: "withoout", categorie: "economic", title: null },
          { detail: impactsData.without.social, mode: "withoout", categorie: "social", title: null },
          { detail: impactsData.without.environment, mode: "withoout", categorie: "environment", title: null },
        ]
      : [];

    const referenceDocuments =
      values.step6?.sections[index1]?.referenceDocuments?.map((item: any) => ({
        directus_files_id: item.id,
      })) ?? [];

    return {
      ordering: (index1 + 1).toString(),
      title: value1,
      impacts: impacts,
      benefits: benefits,
      reference_documents: referenceDocuments,
    };
  });

  // Step2-15
  const projectUtilizers = values.step2[15].value.map((value: any) => ({ title: value }));

  // Step2-16
  const projectSdgs: any[] = [];
  const projectSdgsValues = values.step2[16].value as
    | { [key: string]: { value: string | string[] | undefined; customText?: string | undefined } }
    | null
    | undefined;
  if (projectSdgsValues) {
    Object.keys(projectSdgsValues).forEach((key) => {
      const subValue = projectSdgsValues[key];
      projectSdgs.push({ sdgs_id: subValue.value });
    });
  }

  // Step3 : Don't need to do it because all fields have been completed in step2

  // Step4 : Don't need to do it because it has been merged with step2-14

  // Step5 : Don't need to do it because all fields have been completed in step2-10

  // Step6
  const sensitivityAnalysis = values.step6.sensitivityAnalysis;

  // Step9
  const exAnteBase = socialReturnOnInvestmentData(createProjectSchema, discountRate, "base", false);
  const sroiExAnte = exAnteBase.allYears.map((year, i) => ({
    year: parseInt(year),
    net_sroi: exAnteBase.netSocialReturnOnInvestment[i],
  }));

  const exPostBase = socialReturnOnInvestmentData(createProjectSchema, discountRate, "base", true);
  const sroiExPost = exPostBase.allYears.map((year, i) => ({
    year: parseInt(year),
    net_sroi: exPostBase.netSocialReturnOnInvestment[i],
  }));

  const body: Project = {
    status: status,
    cbt_project: cbtProjectId,
    featured_image: featuredImage,
    project_galleries: projectGalleries,
    has_project_strategies: hasProjectStrategiesValues,
    dasta_objective: dastaObjectiveValues,
    project_characteristic: { id: projectCharacteristicId },
    project_characteristic_other: projectCharacteristicCustomText,
    project_type: projectTypeId,
    project_status: projectStatus,
    related_project_id: relatedProjectId,
    project_locations: {
      postalcode: postalcode,
      latitude: latitude,
      longitude: longitude,
      title: title,
      province: { id: provinceId },
      district: { id: districtId },
      subdistrict: { id: subdistrictId },
    },
    dasta_working_area: dastaWorkingArea,
    project_owner: { id: projectOwner },
    project_owner_other: projectOwnerOther,
    duration_type: "year",
    project_start_year: projectStartYear,
    project_end_year: projectEndYear,
    project_duration_year: projectDurationYear,
    project_consequence_duration_year: projectConsequenceDurationYear,
    project_consequence_end_year: projectConsequenceEndYear,
    project_budget: projectBudget.toString(),
    project_budget_details: projectBudgetDetails,
    project_objectives: projectObjectives,
    project_activities: projectActivities,
    project_outputs: projectOutputs,
    sensitivity_analysis: sensitivityAnalysis,
    project_outcomes: projectOutcomes,
    project_utilizers: projectUtilizers,
    project_sdgs: projectSdgs,
    project_summary_ex_ante: {
      sroi_ratio: exAnteBase.sroiRatio,
      npv_sroi: exAnteBase.totalNetNPVSROI,
      sroi_irr: exAnteBase.sroiIRR,
      sroi_ex_ante: sroiExAnte,
    },
    project_summary_ex_post: {
      sroi_ratio: exPostBase.sroiRatio,
      npv_sroi: exPostBase.totalNetNPVSROI,
      sroi_irr: exPostBase.sroiIRR,
      sroi_ex_ante: sroiExPost,
    },
  };
  return body;
}

export function convertBenefitData(benefit: BenefitJson, discountRate: number) {
  const convertedData = [];

  // Group data by year and type
  const groupedData = benefit.based_case_impacts.reduce((acc: { [year: string]: any }, item) => {
    const year = item.year.toString();
    if (!acc[year]) {
      acc[year] = {
        year: year,
        attribution: { benefitPercentage: 0, percentage: 0 },
        deadweight: { benefitPercentage: 0, percentage: 0 },
        displacement: { benefitPercentage: 0, percentage: 0 },
      };
    }

    switch (item.type) {
      case 1:
        acc[year].attribution.benefitPercentage += item.benefit;
        acc[year].attribution.percentage += item.impact;
        break;
      case 2:
        acc[year].deadweight.benefitPercentage += item.benefit;
        acc[year].deadweight.percentage += item.impact;
        break;
      case 3:
        acc[year].displacement.benefitPercentage += item.benefit;
        acc[year].displacement.percentage += item.impact;
        break;
    }

    return acc;
  }, {});

  // Convert grouped data to the desired format
  for (const year in groupedData) {
    const ex_ant = benefit.ex_ante?.find((e) => e.year == Number(year));
    const ex_port = benefit.ex_post?.find((e) => e.year == Number(year));
    const data = groupedData[year];

    convertedData.push({
      isCreatedProxy: false,
      year: data.year,
      amount: ex_ant ? ex_ant.quantity : 0,
      unitPerYear: "บาท",
      maximumPercentage: ex_ant ? ex_ant.bestcase : 0,
      minimumPercentage: ex_ant ? ex_ant.worstcase : 0,
      variableCost: ex_ant?.variable_cost,
      nonVariableCost: ex_ant?.fixed_cost,
      isFilled: true,
      netBenefitExPost: ex_port ? ex_port.present_benefit : null,
      netBenefit: ex_ant
        ? ex_ant.quantity * Number(ex_ant.proxy.value) - ex_ant.quantity * ex_ant.variable_cost - ex_ant.fixed_cost
        : 0,
      attribution: {
        hasAdditionalInfo: false,
        details: "-",
        benefitPercentage: data.attribution.benefitPercentage,
        percentage: data.attribution.percentage,
      },
      deadweight: {
        hasAdditionalInfo: true,
        details: "-",
        benefitPercentage: data.deadweight.benefitPercentage,
        percentage: data.deadweight.percentage,
      },
      displacement: {
        hasAdditionalInfo: false,
        details: "-",
        benefitPercentage: data.displacement.benefitPercentage,
        percentage: data.displacement.percentage,
      },
      proxy: {
        startingYear: ex_ant?.proxy.start_year
          ? new Date(ex_ant?.proxy.start_year ?? "").getFullYear() + 543
          : undefined,
        endingYear: ex_ant?.proxy.end_year ? new Date(ex_ant?.proxy.end_year ?? "").getFullYear() + 543 : undefined,
        value: ex_ant?.proxy.value,
        discountRate: discountRate,
      },
    } as BenefitDetailsSchema);
  }

  return convertedData;
}

export function getQuestionsInStep2(step2: any): Step2Schema {
  const step2WithValues = step2;
  for (var i = 0; i < step2WithValues[1].questions.length; i++) {
    step2WithValues[1].questions[i].value = {};
  }
  step2WithValues[3].value = {};
  step2WithValues[4].value = "new";
  step2WithValues[6].value = {};
  step2WithValues[7].type = "customComponent";
  step2WithValues[10].value = [];
  step2WithValues[11].value = [];
  step2WithValues[12].value = [];
  step2WithValues[13].value = [];
  step2WithValues[14].value = [];
  step2WithValues[15].value = [];
  step2WithValues[16].value = {};
  return step2WithValues;
}

export function getStep1WithValuesFromProject(cbtProjects: CBTProjectJson[], project: ProjectJson): Step1Schema {
  const coverPicture = project.featured_image
    ? {
        file: {
          id: project.featured_image.id ?? "",
          url: project.featured_image.url ?? "",
          type: project.featured_image.type ?? "",
          title: project.featured_image.title ?? "",
        },
      }
    : null;
  const selectedCbtProject = cbtProjects.find((value) => value.id == project.cbt_project?.id) ?? null;
  const cbtProject = selectedCbtProject
    ? {
        id: selectedCbtProject.id ?? 0,
        title: selectedCbtProject.title ?? "",
        organizations: selectedCbtProject.organizations?.id
          ? {
              title: selectedCbtProject.organizations?.title ?? "",
              province_title: selectedCbtProject.organizations?.province_title ?? "",
              district_title: selectedCbtProject.organizations?.district_title ?? "",
              subdistrict_title: selectedCbtProject.organizations?.subdistrict_title ?? "",
              province_id: selectedCbtProject.organizations?.province_id ?? 0,
              district_id: selectedCbtProject.organizations?.district_id ?? 0,
              subdistrict_id: selectedCbtProject.organizations?.subdistrict_id ?? 0,
              postal_code: selectedCbtProject.organizations?.postal_code ?? 0,
              latitude: selectedCbtProject.organizations?.latitude,
              longitude: selectedCbtProject.organizations?.longitude,
            }
          : null,
      }
    : null;

  const album =
    project.project_galleries?.map((value) => ({
      file: { id: value.id ?? "", url: value.url ?? "", type: value.type ?? "", title: value.title ?? "" },
    })) || [];

  const step1WithValues: Step1Schema = {
    coverPicture,
    createdCBTProject: [],
    createdOrganization: [],
    cbtProject,
    name: cbtProject?.title ?? "",
    album,
  };

  return step1WithValues;
}

function processOptions(options: any[], hasProjectStrategiesValues: any[]) {
  const stepWithValues: Record<string, { value: string }> = {};
  for (const option of options) {
    if (hasProjectStrategiesValues.includes(option.value)) {
      stepWithValues[option.key] = { value: option.value };
    }
  }
  return stepWithValues;
}

export function getStep2WithValuesFromProject(
  schema: Step2Schema,
  project: ProjectJson,
  projects: ProjectJson[],
  provinces: ProvinceJSONData[],
  districts: District[],
  subdistricts: Subdistrict[],
  organizations: OrganizationJson[]
): Step2Schema {
  // Set values for Step2-1, Step2-1-1 to Step2-1-6 if `has_project_strategies` exists
  if (project.has_project_strategies) {
    // Collect all ids from has_project_strategies`
    const ids = project.has_project_strategies
      .map((value) => value.project_strategies_items_id?.id?.toString())
      .filter((id) => id !== null);

    // Filter questions only if the key is not 'dasta_objective'
    const filterQuestions = schema[1].questions.filter((value: any) => value.key != "dasta_objective");
    const questions = filterQuestions.slice(0, filterQuestions.length);

    questions.forEach((question: any) => {
      const options = question.options || [];

      // Set the value with an option structure based on ids
      question.value = processOptions(options, ids);

      // Set a value in each sub-question when there are sub-questions
      if (question.subQuestions) {
        const subQuestions = question.subQuestions.slice(0, question.subQuestions.length);
        const subQuestionValue: Record<string, { value: string }> = {};
        for (const subQuestion of subQuestions) {
          const options = subQuestion.options || [];
          Object.entries(processOptions(options, ids)).forEach(([key, value]) => {
            subQuestionValue[key] = value;
          });
        }
        question.value = subQuestionValue;
      }
    });
  }

  // Set values for Step2-1 and Step2-1-7 if `dasta_objective` exists
  if (project.dasta_objective) {
    // Filter questions only if the key is only 'dasta_objective'
    const filterQuestions: any = schema[1].questions.find((value: any) => value.key == "dasta_objective");

    if (filterQuestions) {
      // Initialize value for setting values for Step2-1 and Step2-1-7
      const value: Record<string, { value: string; customText: string }> = {};

      // Collect all values which is related to specific id
      for (const option of filterQuestions.options) {
        const dastaObjectiveValue = project.dasta_objective.find(
          (value) => value.dasta_working_objective_id?.id == option.value
        );
        if (dastaObjectiveValue) {
          value[option.key] = { value: option.value, customText: dastaObjectiveValue.detail ?? "" };
        }
      }

      filterQuestions.value = value;
    }
  }

  // Set values for Step2-2 if `project_characteristic` exists
  if (project.project_characteristic) {
    // Find a key in the options whose value is equal to the given id
    const value = schema[2].options?.find(
      (o: { value: string }) => o.value == project.project_characteristic?.id?.toString()
    );

    // Set value
    if (value?.key) {
      schema[2].value = { [value.key]: { value: value.value, customText: project.project_characteristic_other ?? "" } };
    }
  }

  // Set values for Step2-3 if `project_type` exists
  if (project.project_type) {
    // Collect all ids from project_type`
    const ids: any[] = project.project_type.map((value: any) => value.project_types_id.id.toString());
    const options = schema[3].options?.filter((option: any) => ids.includes(option.value));

    // Collect all values which is related to specific id
    const value: Record<string, { value: string }> = {};
    for (var i = 0; i < options.length; i++) {
      value[options[i].key] = { value: options[i].value };
    }
    schema[3].value = value;
  }

  // Set values for Step2-4 if `project_status` exists
  if (project.project_status) {
    schema[4].value = project.project_status as "new" | "continue";
    const relatedProject = projects.find((value) => value.id == project.related_project_id?.id);
    if (relatedProject) {
      schema[4].project = { id: relatedProject.id ?? 0, name: relatedProject.cbt_project?.title ?? "" };
    }
  }

  // Set values for Step2-5 if `project_locations` exists
  if (project.project_locations) {
    if (project.project_locations.title) schema[5].location = project.project_locations.title;
    if (project.project_locations.postalcode) schema[5].postcode = project.project_locations.postalcode;
    if (project.project_locations.latitude) schema[5].latitude = Number(project.project_locations.latitude);
    if (project.project_locations.longitude) schema[5].longitude = Number(project.project_locations.longitude);

    const province = provinces.find((value: any) => value.id == project.project_locations!.province!.id);
    if (province) schema[5].province = province;

    const district = districts.find((value: any) => value.id == project.project_locations?.district?.id);
    if (district) schema[5].district = district;

    const subDistrict = subdistricts.find((value: any) => value.id == project.project_locations?.subdistrict?.id);
    if (subDistrict) schema[5].subDistrict = subDistrict;
  }

  // Set values for Step2-6 if `dasta_working_area` exists
  if (project.dasta_working_area) {
    // Collect all ids from `dasta_working_area
    const ids = project.dasta_working_area
      ?.map((value) => value.dasta_working_area_id?.id?.toString())
      .filter((id) => id !== null);

    // Collect all values which is related to specific id
    const value: Record<string, any> = {};
    ids.forEach((id) => {
      const option = (schema[6].subQuestions[0] as any).options.find((o: { value: string }) => o.value === id);
      if (option) value[option.key] = { value: option.value };
    });
    schema[6].value = value;
  }

  // Set values for Step2-7 if `project_owner` exists
  if (project.project_owner?.id) {
    const organization = organizations.find((value) => Number(value.value) == project.project_owner!.id!);
    if (organization) {
      schema[7].projectAgency = {
        id: organization.key,
        title: organization.label,
        value: organization.value,
      };
    }
  }

  // Set values for Step2-7-other if `project_owner_other` exists
  if (project.project_owner_other) {
    schema[7].organization = project.project_owner_other;
  }

  // Set values for Step2-8
  const projectDuration =
    project.project_duration_year ?? (project.project_end_year ?? 0) - (project.project_start_year ?? 0);
  if (projectDuration) {
    const position = schema[8].questions.findIndex((o: { key: string }) => o.key === "project_duration_year");
    if (position !== -1) {
      schema[8].questions[position].value = projectDuration;
    }
  }
  if (project.project_start_year) {
    const position = schema[8].questions.findIndex((o: { key: string }) => o.key === "project_start_year");
    if (position !== -1) {
      schema[8].questions[position].value = project.project_start_year;
    }
  }
  if (project.project_end_year) {
    const position = schema[8].questions.findIndex((o: { key: string }) => o.key === "project_end_year");
    if (position !== -1) {
      schema[8].questions[position].value = project.project_end_year;
    }
  }

  // Set values for Step2-9
  const projectConsequenceDuration =
    project.project_consequence_duration_year ??
    (project.project_consequence_end_year ?? 0) - (project.project_end_year ?? 0);
  if (projectConsequenceDuration) {
    const position = schema[9].questions.findIndex(
      (o: { key: string }) => o.key === "project_consequence_duration_year"
    );
    if (position !== -1) {
      schema[9].questions[position].value = projectConsequenceDuration;
    }
  }
  if (project.project_consequence_end_year) {
    const position = schema[9].questions.findIndex((o: { key: string }) => o.key === "project_consequence_end_year");
    if (position !== -1) {
      schema[9].questions[position].value = project.project_consequence_end_year;
    }
  }

  // Set values for Step2-10 if `project_budget_details` exists
  if (project.project_budget_details) {
    const value = project.project_budget_details.reduce((acc: any, project_budget_detail) => {
      const { year_no, amount, detail } = project_budget_detail;
      if (!year_no) return;
      const year =
        project.project_start_year && year_no < project.project_start_year
          ? project.project_start_year + year_no - 1
          : year_no;

      acc[year] = acc[year] || [];
      acc[year].push({ amount, description: detail, unit: "บาท" });
      return acc!;
    }, {});
    const values: any = Object.entries(value).map(([year, values]) => ({ year, values }));
    schema[10].value = values;
  }

  // Set values for Step2-11 if `project_objectives` exists
  if (project.project_objectives) {
    schema[11].value = project.project_objectives.map((value) => value.objective ?? "");
  }

  // Set values for Step2-12 if `project_activities` exists
  if (project.project_activities) {
    schema[12].value = project.project_activities.map((value) => value.title ?? "");
  }

  // Set values for Step2-13 if `project_outputs` exists
  if (project.project_outputs) {
    schema[13].value = project.project_outputs.map((value) => value.title ?? "");
  }

  // Set values for Step2-14 if `project_outcomes` exists
  if (project.project_outcomes) {
    schema[14].value = project.project_outcomes
      .sort((a, b) => Number(a.ordering) - Number(b.ordering))
      .map((value) => value.title ?? "");
  }

  // Set values for Step2-15 if `project_utilizers` exists
  if (project.project_utilizers) {
    schema[15].value = project.project_utilizers.map((value) => value.title ?? "");
  }

  // Set values for Step2-16 if `project_sdgs` exists
  if (project.project_sdgs) {
    // Collect all values which is related to specific id
    const ids = project.project_sdgs.map((value) => value.sdgs_id?.id?.toString()).filter((id) => id !== null);
    const value: Record<string, any> = {};
    ids.forEach((id) => {
      const option = schema[16].options.find((o: { value: string }) => o.value === id);
      if (option) value[option.key] = { value: option.value };
    });
    schema[16].value = value;
  }

  return schema;
}

export function getStep4WithValuesFromProject(project: ProjectJson): Step4Schema {
  const step4WithValues = (project.project_outcomes || []).map((outcome) => {
    const title = outcome.title ?? "";
    const impacts = outcome.impacts ?? [];
    const findDetail = (mode: string, category: string) =>
      impacts?.find((value) => value.mode === mode && value.categorie === category)?.detail ?? "";
    return {
      title: title,
      with: {
        economic: findDetail("with", "economic"),
        social: findDetail("with", "social"),
        environment: findDetail("with", "environment"),
      },
      without: {
        economic: findDetail("withoout", "economic"),
        social: findDetail("withoout", "social"),
        environment: findDetail("withoout", "environment"),
      },
    };
  });
  return step4WithValues;
}

export function getStep6WithValuesFromProject(project: ProjectJson, discountRate: number): Step8Schema {
  const years =
    !isNil(project?.project_start_year) && !isNil(project?.project_consequence_end_year)
      ? range(Number(project.project_start_year), Number(project.project_consequence_end_year) + 1)
      : [];

  const step6WithValues: Step8Schema = {
    sensitivityAnalysis: project.sensitivity_analysis ?? false,
    proxyCreated: [],
    sections: (project.project_outcomes ?? []).map((outcome) => ({
      title: outcome.title ?? "",
      referenceDocuments: outcome.reference_documents ?? [],
      value: (outcome.benefits ?? [])
        .sort((a, b) => parseInt(a.ordering) - parseInt(b.ordering))
        .map((benefit) => {
          // build ex ante data
          const exanteList: any[] = [];
          years.forEach((year, index) => {
            const exante = find(benefit.ex_ante, (value) => value.year == year);
            const expost = find(benefit.ex_post, (value) => value.year == year);

            const attributions: any = benefit.based_case_impacts?.find(
              (value) => value.type == 1 && value.year == exante?.year
            );
            const deadweights: any = benefit.based_case_impacts?.find(
              (value) => value.type == 2 && value.year == exante?.year
            );
            const displacements: any = benefit.based_case_impacts?.find(
              (value) => value.type == 3 && value.year == exante?.year
            );

            if (exante?.id)
              exanteList.push({
                id: exante?.id,
                isFilled: true,
                isCreatedProxy: false,
                year: String(year),
                amount: exante?.quantity,
                unitPerYear: exante?.unit.toString(),
                variableCost: isNil(exante?.variable_cost) ? 0 : exante?.variable_cost,
                nonVariableCost: isNil(exante?.fixed_cost) ? 0 : exante?.fixed_cost,
                netBenefit: exante?.present_benefit,
                netBenefitExPost: get(expost, ["present_benefit"], 0),
                minimumPercentage: (exante?.worstcase ?? 0) * -1,
                maximumPercentage: exante?.bestcase ?? 0,
                attribution: attributions
                  ? {
                      hasAdditionalInfo: attributions.title != null,
                      details: attributions.title,
                      benefitPercentage: attributions.benefit,
                      percentage: attributions.impact,
                    }
                  : { hasAdditionalInfo: false, benefitPercentage: 100, percentage: 0 },
                deadweight: deadweights
                  ? {
                      hasAdditionalInfo: deadweights.title != null,
                      details: deadweights.title,
                      benefitPercentage: deadweights.benefit,
                      percentage: deadweights.impact,
                    }
                  : { hasAdditionalInfo: false, benefitPercentage: 100, percentage: 0 },
                displacement: displacements
                  ? {
                      hasAdditionalInfo: displacements.title != null,
                      details: displacements.title,
                      benefitPercentage: displacements.benefit,
                      percentage: displacements.impact,
                    }
                  : { hasAdditionalInfo: false, benefitPercentage: 100, percentage: 0 },
                proxy: exante?.proxy
                  ? {
                      ...exante?.proxy,
                      discountRate: discountRate,
                      status: FinancialProxyStatus.Publish,
                      title: exante?.proxy.title,
                      titleEn: exante?.proxy.title_en,
                      category: exante?.proxy.categories as FinancialProxyCategory,
                      type: { key: "", value: "", label: "" },
                      startingYear: new Date(exante?.proxy.start_year).getFullYear() + 543,
                      endingYear: new Date(exante?.proxy.end_year).getFullYear() + 543,
                      value: exante?.proxy.value,
                      unit: exante?.proxy.unit?.toString() ?? "",
                      province: { id: exante?.proxy.province, title: null },
                      files: exante?.proxy.attachments.map((attachment: number) => ({
                        id: attachment.toString(),
                        url: "",
                        type: "",
                      })),
                    }
                  : null,
                proxies: [],
              });
          });

          return {
            title: benefit.title ?? "",
            benefitDetails: exanteList,
          };
        }),
    })),
  };

  return step6WithValues;
}

export function convertProjectJsonToCreateProjectSchema(
  project: ProjectJson,
  projects: ProjectJson[],
  step2: any,
  provinces: ProvinceJSONData[],
  districts: District[],
  subdistricts: Subdistrict[],
  listCBTProject: CBTProjectJson[],
  organizations: OrganizationJson[],
  discountRate?: number
) {
  // Step1
  const step1WithValues = getStep1WithValuesFromProject(listCBTProject, project);

  // Step2
  var step2WithValues = getQuestionsInStep2(step2);
  step2WithValues = getStep2WithValuesFromProject(
    step2WithValues,
    project,
    projects,
    provinces,
    districts,
    subdistricts,
    organizations
  );

  // Step4
  const step4WithValues = getStep4WithValuesFromProject(project);

  // Step6
  const step6WithValues = getStep6WithValuesFromProject(project, discountRate ?? 0);

  const projectConverted: CreateProjectSchema = {
    id: project.id?.toString(),
    status: project.status,
    remark: project.remark,
    referenceDocuments: [],
    step1: step1WithValues,
    step2: step2WithValues,
    step4: step4WithValues,
    step6: step6WithValues,
  };

  return projectConverted;
}
