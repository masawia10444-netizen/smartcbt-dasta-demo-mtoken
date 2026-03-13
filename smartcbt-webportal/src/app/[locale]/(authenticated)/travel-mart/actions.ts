"use server";

import { Policies } from "@/models/travel-mart/register/travel-mart-policies";
import { TermConditions } from "@/models/travel-mart/register/travel-mart-term-conditions";
import { District, Provinces } from "@/models/travel-mart/travel-mart-countries";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { revalidatePath } from "next/cache";

export async function getDistricts() {
  try {
    const url = `${getCmsURL()}/items/district?fields=*.*`;
    const data = await fetch(url, { cache: "force-cache" });
    const json: { data: District[] } = await data.json();
    return json.data;
  } catch (error) {
    console.error(error);
    revalidatePath("/travel-mart");
  }
}

export async function getSubdistricts() {
  try {
    const url = `${getCmsURL()}/items/subdistrict?fields=*.*.*`;
    const data = await fetch(url, { cache: "force-cache" });
    const json: { data: Provinces[] } = await data.json();
    return json.data;
  } catch (error) {
    console.error(error);
    revalidatePath("/travel-mart");
  }
}

export async function getTermConditions() {
  try {
    const url = `${getCmsURL()}/items/term_conditions`;
    const data = await fetch(url, { cache: "force-cache" });
    const json: { data: TermConditions[] } = await data.json();
    return json.data;
  } catch (error) {
    console.error(error);
    revalidatePath("/travel-mart");
  }
}

export async function getPolicies() {
  try {
    const url = `${getCmsURL()}/items/policies`;
    const data = await fetch(url, { cache: "force-cache" });
    const json: { data: Policies[] } = await data.json();
    return json.data;
  } catch (error) {
    console.error(error);
    revalidatePath("/travel-mart");
  }
}
