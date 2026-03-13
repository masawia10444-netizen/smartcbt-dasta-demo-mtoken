"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { createItem, readItems } from "@directus/sdk";
import jsonata from "jsonata";
import * as _ from "lodash";
import { Profile } from "../../authen";
import { CbtProject, Project } from "./types/project";

export type OrganizationJson = {
  id: number;
  title: string | null | undefined;
  region_id: number;
  region_title: string;
  province_id: number;
  province_title: string;
  district_id: number;
  district_title: string;
  subdistrict_id: number;
  subdistrict_title: string;
  postal_code: string;
  latitude: string | null;
  longitude: string | null;
};

export type CBTProjectJson = {
  id: number | null;
  title: string;
  organizations: OrganizationJson;
};

function replaceEmptyStringWithNull(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj)) {
        // If it's an array, iterate through each element
        for (let i = 0; i < obj.length; i++) {
          replaceEmptyStringWithNull(obj[i]);
        }
      } else if (typeof obj[key] === "object") {
        // Recursively call the function for nested objects
        if (_.isEmpty(obj[key])) {
          // Replace empty string with null
          obj[key] = null;
        } else {
          replaceEmptyStringWithNull(obj[key]);
        }
      } else {
        obj[key] = null;
      }
    }
  }
  return obj;
}

async function createProject(project: Project) {
  try {
    project = {
      ...project,
      featured_image: project.featured_image?.id ?? null,
      project_locations: {
        title: !_.isEmpty(project.project_locations.title) ? project.project_locations.title : null,
        postalcode: !_.isEmpty(project.project_locations.postalcode) ? project.project_locations.postalcode : null,
        latitude: !_.isEmpty(project.project_locations.latitude) ? project.project_locations.latitude : null,
        longitude: !_.isEmpty(project.project_locations.longitude) ? project.project_locations.longitude : null,
        subdistrict: !_.isEmpty(project.project_locations.subdistrict) ? project.project_locations.subdistrict : null,
        district: !_.isEmpty(project.project_locations.district) ? project.project_locations.district : null,
        province: !_.isEmpty(project.project_locations.province) ? project.project_locations.province : null,
      },
      project_sdgs:
        project?.project_sdgs?.map((item: any) => {
          const idRaw = item.sdgs_id.split("_");
          return { ...item, sdgs_id: parseInt(idRaw[idRaw.length - 1]) };
        }) ?? [],
      project_characteristic: project?.project_characteristic?.id
        ? {
            id: parseInt(
              project.project_characteristic.id.split("_")[project.project_characteristic.id.split("_").length - 1]
            ),
          }
        : null,
      dasta_working_area:
        project?.dasta_working_area?.map((item: { dasta_working_area_id: any }) => {
          const idRaw = item.dasta_working_area_id.split("_");
          return { id: parseInt(idRaw[idRaw.length - 1]) };
        }) ?? [],
    };

    const data = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        createItem("projects", project),
        0
      )
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function createCbtProject(cbtProject: CbtProject) {
  const data = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      createItem("cbt_project", cbtProject),
      0
    )
  );
  return data;
}

async function listCbtProject(profile: Profile) {
  const role = profile.roles.find((item) => item.app_code === "CARBON");
  let filter = {};
  if (role?.role === "user") {
    const organizations = profile.organizations?.map((item) => item.id);
    filter = { organizations: { id: { _in: organizations } } };
  }
  const cbtProject: CbtProject[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("cbt_project", {
        fields: [
          "*",
          "organizations",
          "organizations.*",
          "organizations.province.*",
          "organizations.province.region.*",
          "organizations.province.region.translations.*",
          "organizations.district.*",
          "organizations.subdistrict.*",
        ],
        ...filter,
        limit: -1,
      }),
      0
    )
  );
  // console.log('cbtProject', JSON.stringify(cbtProject));
  // const dataTransform = cbtProject.map((data) => {
  //   return {
  //     ...data,
  //     organizations:
  //       data.organizations && data.organizations.communities[0]?.id
  //         ? {
  //             ...data.organizations,
  //             id: data.organizations.communities[0].id,
  //           }
  //         : null,
  //   };
  // });
  return _.isEmpty(cbtProject) ? [] : Promise.all(cbtProject.map((data) => transformListCbtProject(data)));
}

async function transformListCbtProject(data: CbtProject) {
  const expression = jsonata(`
  $.{
    'id': id,
    'title': title,
    'organizations': organizations.{
      'id': id,
      'title': title,
      'province_id': province.id,
      'province_title': province.title,
      'district_id': district.id,
      'district_title': district.title,
      'subdistrict_id': subdistrict.id,
      'subdistrict_title': subdistrict.title,
      'postal_code': postal_code,
      'latitude': latitude,
      'longitude': latitude
    }
  }`);
  const result = await expression.evaluate(data);

  if (!_.isEmpty(result.organizations)) {
    result.organizations.region_title = !_.isNil(data?.organizations?.province?.region)
      ? _.find(data.organizations.province.region.translations, { languages_code: "th-TH" })?.title
      : null;
    result.organizations.region_id = !_.isNil(data?.organizations?.province?.region)
      ? _.get(data.organizations.province.region, ["id"], null)
      : null;
  } else {
    result.organizations = null;
  }

  return result;
}

export { createCbtProject, createProject, listCbtProject };
