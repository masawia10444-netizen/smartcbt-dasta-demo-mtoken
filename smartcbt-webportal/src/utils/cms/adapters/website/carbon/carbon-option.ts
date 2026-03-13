"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItems } from "@directus/sdk";
import jsonata from "jsonata";
import { CarbonUnitOptionType, EmissionFactorUnitType, OptionPcrType, ScopeAssessmentType } from "./types";

async function carbonUnitOption() {
  const res: CarbonUnitOptionType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("carbon_unit_option", {
        fields: ["*"],
      }),
      0
    )
  );
  return await Promise.all(res.map((item) => transformCarbonUnitOption(item)));
}

async function transformCarbonUnitOption(data: CarbonUnitOptionType) {
  const expression = jsonata(`
    $.{
      'id': id,
        'title': title
    }
    `);
  return expression.evaluate(data);
}

async function scopeAssessmentOption() {
  const res: ScopeAssessmentType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("scope_assessment", {
        fields: ["*"],
      }),
      0
    )
  );
  return await Promise.all(res.map((item) => transformScopeAssessmentOption(item)));
}

async function transformScopeAssessmentOption(data: ScopeAssessmentType) {
  const expression = jsonata(`
    $.{
      'id': id,
      'title': title
    }
    `);
  return expression.evaluate(data);
}

async function efProxyPcrOption() {
  const res: OptionPcrType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("option_pcr", {
        fields: ["*"],
      }),
      0
    )
  );
  return await Promise.all(res.map((item) => transformEfProxyPcrOption(item)));
}

async function transformEfProxyPcrOption(data: OptionPcrType) {
  const expression = jsonata(`
    $.{
      'id': id,
        'label': label
    }
    `);
  return expression.evaluate(data);
}

async function emissionFactorUnit() {
  const res: EmissionFactorUnitType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("emission_factor_unit", {
        fields: ["*"],
      }),
      0
    )
  );
  return await Promise.all(res.map((item) => transformEmissionFactorUnit(item)));
}

async function transformEmissionFactorUnit(data: EmissionFactorUnitType) {
  const expression = jsonata(`
        $.{
          'id': id,
          'label': label
        }
        `);
  return expression.evaluate(data);
}

export { carbonUnitOption, efProxyPcrOption, emissionFactorUnit, scopeAssessmentOption };
