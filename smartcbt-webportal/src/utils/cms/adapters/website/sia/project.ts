"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { replaceEmptyObjectsWithNull } from "@/utils/helper";
import { createItem, readItem, readItems, updateItem, uploadFiles } from "@directus/sdk";
import jsonata from "jsonata";
import _ from "lodash";
import { ValueOf } from "next/dist/shared/lib/constants";
import { FINANCIAL_PROXY_LEVEL, FINANCIAL_PROXY_STATUS, PROJECT_STATUS } from "../constants";
import {
  FinancialProxies,
  Project,
  ProjectBasedCaseImpacts,
  ProjectBasedCaseImpactsType,
  ProjectBenefits,
  ProjectExante,
  ProjectLocations,
  ProjectOutcomes,
  ProjectReport,
  ProjectSummaryExAnte,
  ProjectSummaryExPost,
  ProjectUtilizers,
} from "./types/project";
async function getDataProject(projectId: number) {
  const res: Project = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("projects", projectId, {
        fields: ["*", "*.*", "*.*.*", "*.*.*.*", "project_outcomes.benefits.ex_ante.proxy.*"],
      }),
      0
    )
  );
  return transformDataProject(res);
}

async function transformDataProject(data: Project) {
  const expression = jsonata(`$.{
    'id': id,
    'remark': remark,
    'user_created': user_created,
    'cbt_project': cbt_project.{
      'id': id,
      'title': title,
      'organizations': organizations
    },
    'sensitivity_analysis':sensitivity_analysis,
    'featured_image': featured_image,
    'project_galleries': project_galleries,
    'status': status,
    'has_project_strategies': has_project_strategies.{
        'id': id,
        'project_strategies_items_id': project_strategies_items_id.{
            'id':id,
            'strategies_no':strategies_no,
            'title': title,
            'status': status,
            'strategies': strategies.id,
            'strategies_category': strategies_category.id
          }
        }[],
    'dasta_objective': dasta_objective.{'id': id, 'dasta_working_objective_id': dasta_working_objective_id.{
        'id': id,
        'sort': sort,
        'condition': condition,
        'title': title,
        'status': status
    },
    'detail': detail,
    'selected': selected
   }[],
    'project_characteristic': project_characteristic.{
        
    'sort': sort,
    'id': id,
    'title': title,
    'status': status
    },
    'project_characteristic_other': project_characteristic_other,
    'project_type': project_type.{
            'projects_id': projects_id.id,
            'project_types_id': project_types_id.{
        'sort': sort,
        'id': id,
        'status': status,
        'title': title    
    }
          }[],
    'project_status': project_status,
    'related_project_id': related_project_id,
    'project_locations': project_locations.{
    'id': id,
    'sort': sort,
    'address': address,
    'status': status,
    'postalcode': postalcode,
    'latitude': latitude,
    'longitude': longitude,
    'title': title,
    'province': province.{
      'sort': sort,
      'id': id,
      'title': translations[languages_code='th-TH'].title,
      'status': status,
      'country': country.id
    },
    'district': district.{
      'sort': sort,
      'id': id,
      'status': status,
      'title': translations[languages_code='th-TH'].title,
      'province': province.id
    },
    'subdistrict': subdistrict.{
      'sort': sort,
      'id': id,
      'status': status,
      'title': translations[languages_code='th-TH'].title,
      'district': district.id
    },
    'project_id': project_id.id
  },
    'dasta_working_area': dasta_working_area.{
      'id':id,
      'dasta_working_area_id': dasta_working_area_id
    }[],
    'project_owner': project_owner.
    {
    'id': id,
    'require_business_matching': require_business_matching,
    'sort': sort,
    'contacts': contacts,
    'status': status,
    'latitude': latitude,
    'tiktok_id': tiktok_id,
    'website': website,
    'instagram_id': instagram_id,
    'facebook_id': facebook_id,
    'other': other,
    'google_map_url': google_map_url,
    'longitude': longitude,
    'address_2': address_2,
    'address_1': address_1,
    'abbreviation': abbreviation,
    'title': title,
    'line_id': line_id,
    'business_period_unit': business_period_unit,
    'business_period': business_period,
    'registered_no': registered_no,
    'postal_code': postal_code,
    'organization_year': organization_year,
    'communities': communities[],
    'future_tourist_target_groups': future_tourist_target_groups[],
    'require_facilities': require_facilities[],
    'csr_types': csr_types[],
    'attraction_types': attraction_types[],
    'current_tourist_travel_types': current_tourist_travel_types[],
    'future_tourist_travel_types': future_tourist_travel_types[],
    'awards': awards[],
    'selecting_community_choices': selecting_community_choices[],
    'current_tourist_target_groups': current_tourist_target_groups[],
    'registered_attachments': registered_attachments[],
    'association_travel_group': association_travel_group,
    'dasta_business_type': dasta_business_type[],
    'business_type': business_type,
    'district': district,
    'subdistrict': subdistrict,
    'province': province,
    'organization_type': organization_type.{
      'sort': sort,
      'id': id,
      'title': title,
      'scope': scope,
      'type': type,
      'status': status
    }
  },
    'project_owner_other': project_owner_other,
    'duration_type': duration_type,
    'project_start_year': project_start_year,
    'project_end_year': project_end_year,
    'project_duration_year': project_duration_year,
    'project_start_datetime': project_start_datetime,
    'project_end_datetime': project_end_datetime,
    'project_consequence_end_year': project_consequence_end_year,
    'project_budget': project_budget,
    'project_budget_details': project_budget_details,
    'project_objectives': project_objectives,
    'project_activities': project_activities.{
      'sort': sort,
      'title': title,
      'status': status,
      'id': id,
      'project_id': project_id.id    }[],
    'project_outputs': project_outputs.{
      'sort': sort,
      'title': title,
      'status': status,
      'id': id,
      'project_id': project_id.id
    }[],
    'project_outcomes': project_outcomes.{
      'sort': sort,
      'ordering': ordering,
      'title': title,
      'status': status,
      'id': id,
      'reference_documents': reference_documents,
      'impacts': impacts.{
          'sort': sort,
          'id': id,
          'detail': detail,
          'mode': mode,
          'categorie': categorie,
          'title': title,
          'status': status,
          'project': project.id
        }[],
      'benefits': benefits.{
          'sort': sort,
          'title': title,
          'ordering': ordering,
          'status': status,
          'id': id,
          'outcome_id': outcome_id.id,
          'ex_ante': ex_ante.{
                                'proxy': proxy,
                                'id': id,
                                'sort': sort,
                                'year': year,
                                'unit': unit,
                                'present_benefit': present_benefit,
                                'fixed_cost': fixed_cost,
                                'variable_cost': variable_cost,
                                'quantity': quantity,
                                'bestcase': bestcase,
                                'worstcase': worstcase,
                                'status': status
                            }[],
            'ex_post': ex_post.{
                                'id': id,
                                'sort': sort,
                                'year': year,
                                'present_benefit': present_benefit,
                                'status': status
                            }[],
          'based_case_impacts': based_case_impacts.{
                                              'ordering': ordering,
                                'year': year,
                                'type': type,
                                'sort': sort,
                                'title': title,
                                'benefit': benefit,
                                'impact': impact,
                                'status': status,
                                'project_benefit_id': project_benefit_id,
                                'id': id
          }[]
        }[],
      'project_id': project_id.id
    }[],
    'project_utilizers': project_utilizers.{
         'sort':sort,
         'title':title,
         'status':status,
         'id':id,
         'province':province,
         'project_id':project_id.id
    }[],
    'project_sdgs': project_sdgs.{
      'sdgs_id': sdgs_id.{
        'id': id,
        'sort': sort,
        'title': title,
        'status': status
      }
    }[],
    'project_summary_ex_ante': project_summary_ex_ante.{
        'id': id,
        'sort': sort,
        'sroi_ratio': sroi_ratio,
        'npv_sroi': npv_sroi,
        'sroi_irr': sroi_irr,
        'status': status,
        'sroi_ex_ante': sroi_ex_ante.{
                    'year': year,
                    'sort': sort,
                    'id': id,
                    'net_sroi': net_sroi,
                    'status': status
                }[]
    },
    'project_summary_ex_post': project_summary_ex_post.{
        'id': id,
        'sort': sort,
        'sroi_ratio': sroi_ratio,
        'npv_sroi': npv_sroi,
        'sroi_irr': sroi_irr,
        'status': status,
        'sroi_ex_post': sroi_ex_post.{
                    'year': year,
                    'sort': sort,
                    'id': id,
                    'net_sroi': net_sroi,
                    'status': status
                }[]
    }
}`);

  const result = await expression.evaluate(data);
  result.featured_image = !_.isNil(result.featured_image)
    ? {
        id: _.get(result.featured_image, ["id"], null),
        url: _.get(result.featured_image, ["filename_disk"], null),
        type: _.get(result.featured_image, ["type"], null),
        title: _.get(result.featured_image, ["title"], null),
      }
    : null;

  result.project_galleries = !_.isNil(result.project_galleries)
    ? result.project_galleries.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;

  if (!_.isNil(result.project_outcomes)) {
    const projectOutcomes = result.project_outcomes.map((item: ProjectOutcomes) => {
      const referenceDocument =
        item?.reference_documents?.map((item: unknown) => {
          return {
            id: _.get(item, ["directus_files_id", "id"], null),
            url: _.get(item, ["directus_files_id", "filename_disk"], null),
            type: _.get(item, ["directus_files_id", "type"], null),
            title: _.get(item, ["directus_files_id", "title"], null),
          };
        }) ?? [];

      return {
        ...item,
        reference_documents: referenceDocument,
      };
    });

    result.project_outcomes = projectOutcomes;
  }

  return result;
}

async function getDataProjectUtilizer(UtilizerId: string) {
  const res: ProjectUtilizers = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("project_utilizers", UtilizerId, {
        fields: ["*", "*.*"],
      }),
      0
    )
  );
  return transformDataProjectUtilizer(res);
}

async function transformDataProjectUtilizer(data: ProjectUtilizers) {
  const expression = jsonata(`
  $.{
    'id': id,
    'sort': sort,
    'status': status,
    'title': title,
    'project_id': project_id.id,
    'province': province
  }`);

  const result = await expression.evaluate(data);
  return result;
}

async function getDataProjectOutcome(outcomeId: string) {
  const res: ProjectOutcomes = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("project_outcomes", outcomeId, {
        fields: ["*", "*.*"],
      }),
      0
    )
  );
  return transformDataProjectOutcome(res);
}

async function transformDataProjectOutcome(data: ProjectOutcomes) {
  const expression = jsonata(`
  $.{
    'id': id,
    'status': status,
    'title': title,
    'impacts': impacts[],
    'benefits': benefits[]
  }`);

  const result = await expression.evaluate(data);
  return result;
}

async function getDataProjectProjectBasedCaseImpact(basedCaseImpactId: string) {
  const res: ProjectBasedCaseImpacts = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("project_based_case_impacts", basedCaseImpactId, {
        fields: ["*", "*.*"],
      }),
      0
    )
  );
  return transformDataProjectProjectBasedCaseImpact(res);
}

async function transformDataProjectProjectBasedCaseImpact(data: ProjectBasedCaseImpacts) {
  const expression = jsonata(`
  $.{
    'id': id,
    'sort': sort,
    'ordering': ordering,
    'status': status,
    'title': title,
    'year': year,
    'impact': impact,
    'benefit': benefit,
    'type': type
  }`);

  const result = await expression.evaluate(data);
  return result;
}

async function listProjectBasedCaseImpactType() {
  const res: ProjectBasedCaseImpactsType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_based_case_impact_type", {
        fields: ["*"],
      }),
      0
    )
  );
  const promiseList = res?.map((item: ProjectBasedCaseImpactsType) =>
    transformDatalistProjectBasedCaseImpactType(item)
  );
  const result = await Promise.all(promiseList);
  return result;
}

async function transformDatalistProjectBasedCaseImpactType(data: ProjectBasedCaseImpactsType) {
  const expression = jsonata(`
  $.{
    'id': id,
    'sort': sort,
    'title': title,
    'status': status
  }`);

  const result = await expression.evaluate(data);
  return result;
}

async function updateProjectData(projectId: number, data: Project): Promise<any> {
  data = {
    ...data,
    featured_image: data.featured_image?.id ?? null,
    project_sdgs:
      data?.project_sdgs?.map((item: any) => {
        const idRaw = item.sdgs_id.split("_");
        return { ...item, sdgs_id: parseInt(idRaw[idRaw.length - 1]) };
      }) ?? [],
    project_characteristic: data?.project_characteristic?.id
      ? {
          id: parseInt(
            data.project_characteristic?.id?.split("_")[data.project_characteristic?.id?.split("_").length - 1]
          ),
        }
      : null,
    dasta_working_area:
      data?.dasta_working_area?.map((item: { dasta_working_area_id: any }) => {
        const idRaw = item.dasta_working_area_id.split("_");
        return { dasta_working_area_id: parseInt(idRaw[idRaw.length - 1]) };
      }) ?? [],
  };

  // replace empty data with null
  const replaceEmptyData = replaceEmptyObjectsWithNull(data);

  const res = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      updateItem("projects", projectId, replaceEmptyData),
      0
    )
  );
  return res;
}

async function buildFilter(filter?: {
  status?: string;
  startYear?: string;
  endYear?: string;
  projectLocations?: number;
  dastaWorkingArea?: number;
  province?: number;
}) {
  let filterData: { [key: string]: unknown } = {};
  if (filter?.status) {
    filterData.status = { _eq: filter.status };
  }
  if (filter?.province) {
    filterData.project_locations = { province: { _eq: filter.province } };
  }
  if (filter?.projectLocations) {
    filterData.cbt_project = {
      organizations: {
        communities: {
          _eq: filter.projectLocations,
        },
      },
    };
  }
  if (filter?.startYear) {
    const date = new Date(Number(filter.startYear) - 543, 0).toISOString().substring(0, 10);
    console.log("date", date);
    filterData["_or"] = [
      { project_start_year: { _gte: Number(filter.startYear) } },
      { project_start_datetime: { _gte: date } },
    ];
  }
  if (filter?.endYear) {
    const date = new Date(Number(filter.endYear) - 543, 0).toISOString().substring(0, 10);
    filterData["_or"] = [
      { project_end_year: { _lte: Number(filter.endYear) } },
      { project_end_datetime: { _lte: date } },
    ];
  }

  if (filter?.dastaWorkingArea) {
    filterData.dasta_working_area = { dasta_working_area_id: { _eq: filter.dastaWorkingArea } };
  }

  return filterData;
}

async function buildSort(sort?: { npv_sroi?: string; id?: string }) {
  let sortData: string[] = [];
  if (sort?.npv_sroi === "asc") {
    sortData.push(`project_summary_ex_ante.npv_sroi`);
    // sortData.push(`project_summary_ex_post.npv_sroi ${sort.npv_sroi}`);
  } else if (sort?.npv_sroi === "desc") {
    sortData.push(`-project_summary_ex_ante.npv_sroi`);
  } else if (sort?.id === "asc") {
    sortData.push(`id`);
  } else if (sort?.id === "desc") {
    sortData.push(`-id`);
  }
  return sortData;
}

async function listProjectData(
  profile: Profile,
  filter?: {
    status?: string;
    startYear?: string;
    endYear?: string;
    projectLocations?: number;
    dastaWorkingArea?: number;
    province?: number;
  },
  sort?: {
    npv_sroi?: string;
  },
  search?: string
) {
  const role = profile.roles.find((item) => item.app_code === "SIA/SROI");
  let filterRole = {};
  if (role?.role === "user") {
    filterRole = {
      user_created: {
        _eq: profile.user_id.id,
      },
    };
  }
  const filterData = await buildFilter(filter);
  if (_.isNil(filter?.status)) {
    filterData.status = { _neq: PROJECT_STATUS.DELETED };
  }
  const sortData = await buildSort(sort);
  let seacrhFilter = {};
  if (search) {
    seacrhFilter = {
      _or: [
        { cbt_project: { title: { _contains: search } } },
        { province: { title: { _contains: search } } },
        {
          cbt_project: {
            organizations: {
              title: { _contains: search },
            },
          },
        },
      ],
    };
  }
  const res: Project = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("projects", {
        fields: ["*", "*.*", "*.*.*", "project_galleries.directus_files_id.*"],
        filter: {
          ...filterData,
          ...filterRole,
          ...seacrhFilter,
        },
        // filter:
        sort: sortData,
      }),
      0
    )
  );
  const promiseList = res.map((item: Project) => transformDatalistProjectData(item)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function transformDatalistProjectData(data: Project) {
  const expression = jsonata(`
  $.{
    'id': id,
    'status': status,
    'cbt_project': cbt_project.{
      'id': id,
      'title': title,
      'organizations': organizations
    },
    'sensitivity_analysis':sensitivity_analysis,
    'featured_image': featured_image,
    'project_galleries': project_galleries,
    'duration_type': duration_type,
    'project_start_year': project_start_year,
    'project_owner': project_owner,
    'project_owner_other': project_owner_other,
    'project_end_year': project_end_year,
    'project_duration_year': project_duration_year,
    'project_start_datetime': project_start_datetime,
    'project_end_datetime': project_end_datetime,
    'project_consequence_end_year': project_consequence_end_year,
    'project_consequence_duration_year': project_consequence_duration_year,
    'project_budget': project_budget,
    'project_locations': project_locations.{
    'id': id,
    'sort': sort,
    'address': address,
    'status': status,
    'postalcode': postalcode,
    'latitude': latitude,
    'longitude': longitude,
    'title': title,
    'province': {
      'sort': sort,
      'id': id,
      'title': title,
      'status': status,
      'country': country.id
    },
    'district': {
      'sort': sort,
      'id': id,
      'status': status,
      'title': title,
      'province': province.id
    },
    'subdistrict': {
      'sort': sort,
      'id': id,
      'status': status,
      'title': title,
      'district': district.id
    },
    'project_id': project_id.id
  },
  'dasta_working_area': dasta_working_area.{
      'id':id,
      'dasta_working_area_id': dasta_working_area_id.{
        'id': id,
        'title': title,
        'status': status,
        'provinces': provinces[]
      }
  }[],
  'project_summary_ex_post': project_summary_ex_post.{
    'npv_sroi': npv_sroi,
    'sroi_ratio': sroi_ratio,
    'sroi_irr': sroi_irr
    },
  'project_summary_ex_ante': project_summary_ex_ante.{
    'npv_sroi': npv_sroi,
    'sroi_ratio': sroi_ratio,
    'sroi_irr': sroi_irr
    },
  'user_created': user_created,
  'date_updated': date_updated
}`);

  const result = await expression.evaluate(data);
  result.featured_image = !_.isNil(result.featured_image)
    ? {
        id: _.get(result.featured_image, ["id"], null),
        url: _.get(result.featured_image, ["filename_disk"], null),
        type: _.get(result.featured_image, ["type"], null),
        title: _.get(result.featured_image, ["title"], null),
      }
    : null;

  result.project_galleries = !_.isNil(result.project_galleries)
    ? result.project_galleries.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;
  return result;
}

async function updateProjectStatus(projectId: number, status: ValueOf<typeof PROJECT_STATUS>, remark?: string) {
  let proxyStatusUpdate = undefined;
  if (status === PROJECT_STATUS.APPROVAL) {
    const projectProxy: Project = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        readItem("projects", projectId, {
          fields: ["project_outcomes.*.*.*.*"],
        }),
        0
      )
    );
    proxyStatusUpdate = projectProxy.project_outcomes.map((projectOutcomes: ProjectOutcomes) => {
      const benefits = !_.isNil(projectOutcomes.benefits) ? (projectOutcomes.benefits as ProjectBenefits[]) : [];

      const projectOutcome = benefits.map((benefits) => {
        const exAnteList = !_.isNil(benefits.ex_ante) ? (benefits.ex_ante as ProjectExante[]) : [];

        const benefit = exAnteList.map((exAnte) => {
          if (_.isNil(exAnte) || _.isNil(exAnte.proxy)) return null;

          const proxy = exAnte.proxy as FinancialProxies;

          if (proxy.status === FINANCIAL_PROXY_STATUS.DRAFT) {
            proxy.status = FINANCIAL_PROXY_STATUS.PUBLISHED;
          }
          if (proxy.level === FINANCIAL_PROXY_LEVEL.MINOR) {
            proxy.level = FINANCIAL_PROXY_LEVEL.MAJOR;
          }
          return {
            id: exAnte.id,
            proxy: {
              id: proxy.id,
              status: proxy.status,
              level: proxy.level,
            },
          };
        });

        return {
          id: benefits.id,
          ex_ante: benefit.filter((item) => !_.isNil(item)),
        };
      });

      return {
        id: projectOutcomes.id,
        benefits: projectOutcome,
      };
    });
  }
  // console.log("proxyStatusUpdate", JSON.stringify(proxyStatusUpdate));
  const res = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      updateItem("projects", projectId, { status: status, project_outcomes: proxyStatusUpdate, remark: remark }),
      0
    )
  );
  return res;
  // return proxyStatusUpdate;
}

async function getProjectReport(projectId: number) {
  const res: ProjectReport[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_reportings", {
        fields: ["*"],
        filter: {
          project_id: {
            _eq: projectId,
          },
        },
      }),
      0
    )
  );
  return transformDataProjectReport(res[0]);
}
async function transformDataProjectReport(data: ProjectReport) {
  const projectData = data.data;
  if (projectData && !_.isNil(projectData?.project_summary_ex_post)) {
    projectData.project_summary_ex_post = await getSummaryExPost(projectData.project_summary_ex_post);
  }
  if (projectData && !_.isNil(projectData?.project_summary_ex_ante)) {
    projectData.project_summary_ex_ante = await getSummaryExAnte(projectData.project_summary_ex_ante);
  }
  return projectData;
}

async function getSummaryExPost(id: number) {
  const res: ProjectSummaryExPost = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("project_summary_ex_post", id, {
        fields: ["*", "*.*"],
      }),
      0
    )
  );
  return res;
}
async function getSummaryExAnte(id: number) {
  const res: ProjectSummaryExAnte = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("project_summary_ex_ante", id, {
        fields: ["*", "*.*"],
      }),
      0
    )
  );
  return res;
}

async function uploadFileProjectFile(formData: FormData) {
  // @ts-ignore
  try {
    const result = await cmsApi.request(uploadFiles(formData));
    return result;
  } catch (e) {
    console.log("e: ", e);
  }
}

async function listProjectLocation() {
  const res: ProjectLocations[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_locations", {
        fields: ["*"],
      }),
      0
    )
  );

  const promiseList = res?.map((item: ProjectLocations) => transformDatalistProjectLocation(item));
  const result = await Promise.all(promiseList);
  return result;
}

async function transformDatalistProjectLocation(data: ProjectLocations) {
  const expression = jsonata(`
  $.{
    'id': id,
    'title': title,
    'address': address,
    'province': province,
    'district': district,
    'subdistrict': subdistrict,
    'postalcode': postalcode,
    'longitude': longitude,
    'latitude': latitude
}`);

  const result = await expression.evaluate(data);
  return result;
}

async function createProjectLocation(data: ProjectLocations) {
  const res = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      createItem("project_locations", data),
      0
    )
  );
  return res;
}

export {
  createProjectLocation,
  getDataProject,
  getDataProjectOutcome,
  getDataProjectProjectBasedCaseImpact,
  getDataProjectUtilizer,
  getProjectReport,
  listProjectBasedCaseImpactType,
  listProjectData,
  listProjectLocation,
  updateProjectData,
  updateProjectStatus,
  uploadFileProjectFile,
};
