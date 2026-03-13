"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItems } from "@directus/sdk";
import jsonata from "jsonata";
import { BusinessContacts, Contactus } from "./types/contact-us";

async function listContactus() {
  const data: BusinessContacts[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("business_contacts", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: "sort",
      }),
      0
    )
  );
  const promiseList = data?.map((item: BusinessContacts) => transformlistContactus(item)) ?? [];
  const result = await Promise.all(promiseList);
  const groupByDepartment: { [key: string]: Contactus[] } = result?.reduce(
    (acc, item) => {
      const department = item.department;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(item);
      return acc;
    },
    {} as { [key: string]: Contactus[] }
  );

  const groupByDepartmentKey = Object.keys(groupByDepartment);
  return groupByDepartmentKey?.map((key) => {
    return {
      departments_title: key,
      contacts: groupByDepartment[key],
    };
  }) ?? [];
}

async function transformlistContactus(data: BusinessContacts): Promise<Contactus> {
  const expression = jsonata(`
  $.{
    'id': id,
    'position': position,
    'last_name': last_name,
    'first_name': first_name,
    'department': department,
    'phone': phone,
    'email': email
  }`);

  const result = await expression.evaluate(data);
  return result;
}

export { listContactus };
