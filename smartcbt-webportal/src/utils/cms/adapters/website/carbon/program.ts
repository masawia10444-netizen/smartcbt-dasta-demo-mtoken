"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { QueryFilter, createItem, readItem, readItems, updateItem, uploadFiles } from "@directus/sdk";
import jsonata from "jsonata";
import * as _ from "lodash";

import { ValueOf } from "next/dist/shared/lib/constants";
import { Profile } from "../../authen";
import { CARBON_PROGRAM_STATUS } from "../constants";
import { CarbonCalendarType, CarbonProgramsRoundType, CarbonProgramsType, ProvincesType, RegionType } from "./types";
async function buildFilter(filter?: { status?: string; province?: number; organizations?: number }) {
  let filterData: { [key: string]: unknown } = {};
  if (filter?.status) {
    filterData.status = { _eq: filter.status };
  }
  if (filter?.province) {
    filterData.province = { _eq: filter.province };
  }
  if (filter?.organizations) {
    filterData.cbt_project = { organizations: { _eq: filter.organizations } };
  }

  return filterData;
}

async function listCarbonProgram(
  profile: Profile,
  filter?: {
    status?: string;
    province?: number;
    organizations?: number;
    search?: string;
  }
) {
  const filterRule = await buildFilter({
    status: filter?.status,
    province: filter?.province ? Number(filter.province) : undefined,
    organizations: filter?.organizations ? Number(filter.organizations) : undefined,
  });
  const role = profile.roles.find((item) => item.app_code === "CARBON");
  let filterRole = {};
  if (role?.role === "user") {
    filterRole = {
      user_created: {
        _eq: profile.user_id.id,
      },
    };
  }
  if (!_.isNil(filter) && _.isNil(filter.status)) {
    filterRule["status"] = { _neq: "deleted" };
  }
  let filterSearch = {};
  if (filter?.search) {
    filterSearch = {
      _or: [
        { cbt_project: { title: { _contains: filter?.search } } },
        { province: { title: { _contains: filter?.search } } },
        {
          cbt_project: {
            organizations: {
              title: { _contains: filter?.search },
            },
          },
        },
      ],
    };
  }
  const res: CarbonProgramsType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("carbon_programs", {
        fields: [
          "*",
          "*.*",
          "program_calendar.*",
          "program_calendar.program_activity.*",
          "province.*",
          "province.region.*",
          "carbon_unit.*",
          "scope_assessment.*",
          "user_created.*",
          "round.*",
          "cbt_project.*.*",
          "cover_image.*",
        ],
        filter: {
          ...{
            ...filterRule,
          },
          ...filterRole,
          ...filterSearch,
        },
        limit: -1,
        sort: ["-date_updated", "-id"],
      }),
      0
    )
  );

  return await Promise.all(res.map((item) => transformCarbonProgramForList(item)));
}

async function getCarbonProgram(id: number) {
  const res: CarbonProgramsType = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("carbon_programs", id, {
        fields: [
          "*",
          "*.*",
          "program_calendar.*",
          "program_calendar.program_activity.*",
          "province.*",
          "province.region.*",
          "carbon_unit.*",
          "scope_assessment.*",
          "user_created.*",
          "round.*",
          "round.program_round_activity.*",
          "round.program_round_activity.program_activity_detail.*",
          "round.program_round_activity.program_activity.*",
          "cbt_project.*.*",
          "cbt_project.organizations.province.*",
          "cbt_project.organizations.province.translations.*",
          "cbt_project.organizations.province.region.*",
          "cbt_project.organizations.province.region.translations.*",
          "cbt_project.organizations.subdistrict.*",
          "cbt_project.organizations.subdistrict.translations.*",
          "cbt_project.organizations.district.*",
          "cbt_project.organizations.district.translations.*",
          "cover_image.*",
          "*.directus_files_id.*",
        ],
      }),
      0
    )
  );
  return await transformCarbonProgram(res);
}

async function transformCarbonProgramForList(data: CarbonProgramsType) {
  const expression = jsonata(`
        $.{
        'id': id,
        'cbt_project': cbt_project.{
            'title': title,
            'organizations': organizations
        },
        'status': status,
        'cover_image': cover_image,
        'summary_cf': round[-1].summary_cf,
        'summary_cf_all': round.summary_cf,
        'approve_date': approve_date,
        'user_created': user_created
        }
        `);
  const dataResponse = await expression.evaluate(data);
  dataResponse.cover_image = !_.isNil(dataResponse.cover_image)
    ? {
        id: _.get(dataResponse.cover_image, ["id"], null),
        url: _.get(dataResponse.cover_image, ["filename_disk"], null),
        type: _.get(dataResponse.cover_image, ["type"], null),
        title: _.get(dataResponse.cover_image, ["title"], null),
      }
    : null;

  if (!Array.isArray(dataResponse?.summary_cf_all)) {
    dataResponse.summary_cf_all = dataResponse?.summary_cf_all ? [dataResponse?.summary_cf_all] : [];
  }
  return { ...dataResponse, summary_cf_all: _.sum(_.filter(dataResponse?.summary_cf_all, (el) => !_.isNull(el))) ?? 0 };
}

async function transformCarbonProgram(data: CarbonProgramsType) {
  const expression = jsonata(`
        $.{
        'id': id,
        'cbt_project': cbt_project.{
            'id':id,
            'title': title,
            'organizations': organizations
        },
        'status': status,
        'capacity': capacity,
        'scope_assessment': scope_assessment,
        'province': province,
        'carbon_unit': carbon_unit,
        'request_date': request_date,
        'approve_date': approve_date,
        'program_calendar': program_calendar,
        'round': round,
        'cover_image': cover_image,
        'travel_images': travel_images,
        'accommodation_images': accommodation_images,
        'food_images': food_images,
        'waste_images': waste_images,
        'trip_publicity_documents_images': trip_publicity_documents_images,
        'approve_by': approve_by.user_info[0] ? approve_by.user_info[0] : null,
        'remark': remark
}
`);
  // const result = await expression.evaluate(data);
  const dataResponse = await expression.evaluate(data);
  dataResponse.cover_image = !_.isNil(dataResponse.cover_image)
    ? {
        id: _.get(dataResponse.cover_image, ["id"], null),
        url: _.get(dataResponse.cover_image, ["filename_disk"], null),
        type: _.get(dataResponse.cover_image, ["type"], null),
        title: _.get(dataResponse.cover_image, ["title"], null),
      }
    : null;
  dataResponse.travel_images = !_.isNil(dataResponse.travel_images)
    ? dataResponse.travel_images.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;
  dataResponse.accommodation_images = !_.isNil(dataResponse.accommodation_images)
    ? dataResponse.accommodation_images.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;
  dataResponse.food_images = !_.isNil(dataResponse.food_images)
    ? dataResponse.food_images.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;
  dataResponse.waste_images = !_.isNil(dataResponse.waste_images)
    ? dataResponse.waste_images.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;
  dataResponse.trip_publicity_documents_images = !_.isNil(dataResponse.trip_publicity_documents_images)
    ? dataResponse.trip_publicity_documents_images.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;
  dataResponse.cbt_project.organizations.region_title = !_.isNil(
    dataResponse?.cbt_project?.organizations?.province?.region
  )
    ? _.find(dataResponse.cbt_project.organizations.province.region.translations, { languages_code: "th-TH" })?.title
    : null;
  dataResponse.cbt_project.organizations.region = !_.isNil(dataResponse?.cbt_project?.organizations?.province?.region)
    ? _.get(dataResponse.cbt_project.organizations.province.region, ["id"], null)
    : null;
  dataResponse.cbt_project.organizations.province_title = !_.isNil(dataResponse?.cbt_project?.organizations?.province)
    ? _.find(dataResponse.cbt_project.organizations.province.translations, { languages_code: "th-TH" })?.title
    : null;
  dataResponse.cbt_project.organizations.province = !_.isNil(dataResponse?.cbt_project?.organizations?.province)
    ? _.get(dataResponse.cbt_project.organizations.province, ["id"], null)
    : null;
  dataResponse.cbt_project.organizations.subdistrict_title = !_.isNil(
    dataResponse?.cbt_project?.organizations?.subdistrict
  )
    ? _.find(dataResponse.cbt_project.organizations.subdistrict.translations, { languages_code: "th-TH" })?.title
    : null;
  dataResponse.cbt_project.organizations.subdistrict = !_.isNil(dataResponse?.cbt_project?.organizations?.subdistrict)
    ? _.get(dataResponse.cbt_project.organizations.subdistrict, ["id"], null)
    : null;
  dataResponse.cbt_project.organizations.district_title = !_.isNil(dataResponse?.cbt_project?.organizations?.district)
    ? _.find(dataResponse.cbt_project.organizations.district.translations, { languages_code: "th-TH" })?.title
    : null;
  dataResponse.cbt_project.organizations.district = !_.isNil(dataResponse?.cbt_project?.organizations?.district)
    ? _.get(dataResponse.cbt_project.organizations.district, ["id"], null)
    : null;
  return dataResponse;
}

async function createCarbonProgram(data: CarbonProgramsType) {
  const round = data.round;
  const res = await cmsApi.request(
    // @ts-ignore
    createItem("carbon_programs", {
      ..._.omit(data, ["round"]),
    })
  );
  if (res.id) {
    const findCarbonProgram: CarbonProgramsType = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        readItem("carbon_programs", res.id, {
          fields: ["*", "program_calendar.*"],
        }),
        0
      )
    );
    if (_.isNil(round)) return res;
    const programCalendar: any = findCarbonProgram.program_calendar?.map((item) => {
      const programCalendarId = item as CarbonCalendarType;
      return programCalendarId.program_activity;
    });
    const programCalendarList = _.flatten(programCalendar);
    round.forEach((item, index) => {
      item = item as CarbonProgramsRoundType;
      item?.program_round_activity?.forEach((activity: any, indexCalendar) => {
        activity.program_activity = programCalendarList[indexCalendar];
      });
    });
    const updateRound: any = await cmsApi.request(
      // @ts-ignore
      updateItem("carbon_programs", res.id, {
        round: round,
      })
    );
    return res;
  }
  return res;
}

async function updateCarbonProgram(id: number, data: CarbonProgramsType) {
  try {
    const round = data.round;
    const res = await cmsApi.request(
      // @ts-ignore
      updateItem("carbon_programs", id, {
        ..._.omit(data, ["cbt_project.organizations", "round"]),
      })
    );
    if (res.id) {
      const findCarbonProgram: CarbonProgramsType = await cmsApi.request(
        withRevalidate(
          // @ts-ignore
          readItem("carbon_programs", res.id, {
            fields: ["*", "program_calendar.*"],
          }),
          0
        )
      );
      if (_.isNil(round)) return res;
      const programCalendar: any = findCarbonProgram.program_calendar?.map((item) => {
        const programCalendarId = item as CarbonCalendarType;
        return programCalendarId.program_activity;
      });
      const programCalendarList = _.flatten(programCalendar);
      round.forEach((item, index) => {
        item = item as CarbonProgramsRoundType;
        item?.program_round_activity?.forEach((activity: any, indexCalendar) => {
          activity.program_activity = programCalendarList[indexCalendar];
        });
      });
      const updateRound: any = await cmsApi.request(
        // @ts-ignore
        updateItem("carbon_programs", res.id, {
          round: round,
        })
      );
      return res;
    }
    return res;
  } catch (error) {
    console.log("data: ", JSON.stringify(_.omit(data, ["cbt_project.organizations"])));
    console.log("error: ", error);
  }
  // const res = await cmsApi.request(
  //   // @ts-ignore
  //   updateItem("carbon_programs", id, {
  //     ..._.omit(data, ["cbt_project.organizations"]),
  //   })
  // );
  // return res;
}

async function adminChangeStatusCarbonProgram(
  id: number,
  status: ValueOf<typeof CARBON_PROGRAM_STATUS>,
  remark?: string
) {
  const res = await cmsApi.request(
    // @ts-ignore
    updateItem("carbon_programs", id, {
      status: status,
      remark: remark,
    })
  );
  return res;
}

async function uploadCarbonAttachments(formData: FormData) {
  // @ts-ignore
  try {
    const result = await cmsApi.request(uploadFiles(formData));
    return result;
  } catch (e) {
    console.log("e: ", e);
  }
}

async function getTableCarbonProgram(filter?: {
  startDate?: string;
  endDate?: string;
  startMonth?: string;
  endMonth?: string;
  startYear?: string;
  endYear?: string;
}) {
  let filterData: QueryFilter<Collection, Collection["program_round"]> | null = null;
  if (!_.isNil(filter?.startDate) && !_.isNil(filter?.endDate)) {
    filterData = { _and: [] };
    filterData._and?.push({ program_start: { _gte: new Date(filter?.startDate!).toISOString() } });
    filterData._and?.push({ program_start: { _lte: new Date(filter?.endDate!).toISOString() } });
  }

  if (!_.isNil(filter?.startMonth) && !_.isNil(filter?.endMonth)) {
    filterData = { _and: [] };
    filterData._and?.push({ program_start: { _gte: new Date(filter?.startMonth!).toISOString() } });
    filterData._and?.push({ program_start: { _lte: new Date(filter?.endMonth!).toISOString() } });
  }

  if (!_.isNil(filter?.startYear) && !_.isNil(filter?.endYear)) {
    filterData = { _and: [] };
    filterData._and?.push({ program_start: { _gte: new Date(filter?.startYear!).toISOString() } });
    filterData._and?.push({ program_start: { _lte: new Date(filter?.endYear!).toISOString() } });
  }
  const res: CarbonProgramsRoundType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("program_round", {
        fields: ["*", "program.province.*"],
        filter: {
          ...filterData,
        },
        sort: ["program_start"],
      }),
      0
    )
  );
  if (!_.isNil(filter?.startYear) && !_.isNil(filter?.endYear)) {
    const startDate = new Date(filter?.startYear!);
    const endDate = new Date(filter?.endYear!);
    return getGraphByMonth(res, startDate, endDate);
  } else if (!_.isNil(filter?.startMonth) && !_.isNil(filter?.endMonth)) {
    const startDate = new Date(filter?.startMonth!);
    const endDate = new Date(filter?.endMonth!);
    return getGraphByDay(res, startDate, endDate);
  } else {
    const startDate = new Date(filter?.startDate ?? new Date().getFullYear() - 1);
    const endDate = new Date(filter?.endDate ?? new Date());
    return getGraphByDay(res, startDate, endDate);
  }
}

async function getGraphByMonth(res: CarbonProgramsRoundType[], startDate: Date, endDate: Date) {
  const groupedData = new Map<string, CarbonProgramsRoundType[]>();
  const allMonthsInYear = [];

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setMonth(currentDate.getMonth() + 1)
  ) {
    allMonthsInYear.push(currentDate.toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" }));
  }

  allMonthsInYear.forEach((item) => {
    if (!groupedData.has(item)) {
      groupedData.set(item, []);
    }
  });
  res.forEach((item) => {
    const roundStartDate = item.program_start
      ? new Date(item.program_start).toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" })
      : "";
    groupedData.get(roundStartDate)?.push(item);
  });

  const groupedDataArray: { program_start: string; data: CarbonProgramsRoundType[] }[] = Array.from(
    groupedData,
    ([program_start, data]) => ({ program_start, data })
  );

  const sumCarbon = groupedDataArray.map((item) => {
    const sumCarbon = item.data.reduce((sum, item) => {
      // return sum + item.summary_cf ?? 0;
      if (item.summary_cf) return sum + item.summary_cf;
      else return sum;
    }, 0);
    return { program_start: item.program_start, sum_carbon: sumCarbon };
  });

  return sumCarbon;
}

async function getGraphByDay(res: CarbonProgramsRoundType[], startDate: Date, endDate: Date) {
  const groupedData = new Map<string, CarbonProgramsRoundType[]>();
  const allDay: string[] = [];

  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    allDay.push(currentDate.toLocaleDateString("en-GB"));
  }
  allDay.forEach((item) => {
    if (!groupedData.has(item)) {
      groupedData.set(item, []);
    }
  });
  res.forEach((item) => {
    const roundStartDate = item.program_start ? new Date(item.program_start).toLocaleDateString("en-GB") : "";
    groupedData.get(roundStartDate)?.push(item);
  });
  const groupedDataArray: { program_start: string; data: CarbonProgramsRoundType[] }[] = Array.from(
    groupedData,
    ([program_start, data]) => ({ program_start, data })
  );

  const sumCarbon = groupedDataArray.map((item) => {
    const sumCarbon = item.data.reduce((sum, item) => {
      if (item.summary_cf) return sum + item.summary_cf;
      else return sum;
    }, 0);
    return { program_start: item.program_start, sum_carbon: sumCarbon };
  });
  return sumCarbon;
}

async function getTableCarbonProgramByRegion(filter?: {
  startDate?: string;
  endDate?: string;
  startMonth?: string;
  endMonth?: string;
  startYear?: string;
  endYear?: string;
}) {
  let filterData: QueryFilter<Collection, Collection["program_round"]> | null = null;
  if (!_.isNil(filter?.startDate) && !_.isNil(filter?.endDate)) {
    filterData = { _and: [] };
    filterData._and?.push({ program_start: { _gte: new Date(filter?.startDate!).toISOString() } });
    filterData._and?.push({ program_start: { _lte: new Date(filter?.endDate!).toISOString() } });
  }

  if (!_.isNil(filter?.startMonth) && !_.isNil(filter?.endMonth)) {
    filterData = { _and: [] };
    filterData._and?.push({ program_start: { _gte: new Date(filter?.startMonth!).toISOString() } });
    filterData._and?.push({ program_start: { _lte: new Date(filter?.endMonth!).toISOString() } });
  }

  if (!_.isNil(filter?.startYear) && !_.isNil(filter?.endYear)) {
    filterData = { _and: [] };
    filterData._and?.push({ program_start: { _gte: new Date(filter?.startYear!).toISOString() } });
    filterData._and?.push({ program_start: { _lte: new Date(filter?.endYear!).toISOString() } });
  }

  const getRegion: RegionType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("regions", {
        fields: ["*"],
      }),
      0
    )
  );
  const res = getRegion.map(async (item) => {
    const filterRule = {
      ...filterData,
      program: {
        province: {
          region: {
            id: {
              _eq: item.id,
            },
          },
        },
      },
    };

    const carbonProgram: CarbonProgramsRoundType[] = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        readItems("program_round", {
          fields: ["*", "program.province.*"],
          filter: filterRule,
          sort: ["program_start"],
        }),
        0
      )
    );
    if (!_.isNil(filter?.startYear) && !_.isNil(filter?.endYear)) {
      const startDate = new Date(filter?.startYear!);
      const endDate = new Date(filter?.endYear!);
      return { region: item.title, data: await getGraphByMonth(carbonProgram, startDate, endDate) };
    } else if (!_.isNil(filter?.startMonth) && !_.isNil(filter?.endMonth)) {
      const startDate = new Date(filter?.startMonth!);
      const endDate = new Date(filter?.endMonth!);
      return { region: item.title, data: await getGraphByDay(carbonProgram, startDate, endDate) };
    } else {
      const startDate = new Date(filter?.startDate ?? new Date().getFullYear() - 1);
      const endDate = new Date(filter?.endDate ?? new Date().getFullYear());
      return {
        region: item.title,
        data: await getGraphByDay(carbonProgram, startDate, endDate),
      };
    }
  });
  const result = await Promise.all(res);

  return result;
}

async function getPieChartCarbonProgram(filter?: {
  startDate?: string;
  endDate?: string;
  startMonth?: string;
  endMonth?: string;
  startYear?: string;
  endYear?: string;
}) {
  const res: CarbonProgramsRoundType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("program_round", {
        fields: ["*", "program.province.*"],
      }),
      0
    )
  );
  const travel: number = res.reduce((sum, item) => sum + (item.travel_cf || 0), 0);
  const accommodation: number = res.reduce((sum, item) => sum + (item.accommodation_cf || 0), 0);
  const food: number = res.reduce((sum, item) => sum + (item.food_cf || 0), 0);
  const waste: number = res.reduce((sum, item) => sum + (item.waste_cf || 0), 0);

  const total: number = travel + accommodation + food + waste;
  return {
    travel_cf: total ? (travel / total) * 100 : 0,
    accommodation_cf: total ? (accommodation / total) * 100 : 0,
    food_cf: total ? (food / total) * 100 : 0,
    waste_cf: total ? (waste / total) * 100 : 0,
  };
}

async function summaryCarbonProgram() {
  const res: CarbonProgramsRoundType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("program_round", {
        fields: ["*", "program.province.*"],
        filter: {
          program: {
            id: {
              _nnull: true,
            },
          },
        },
      }),
      0
    )
  );
  return {
    totalCarbon: res.reduce((sum, item) => {
      if (item.summary_cf) return sum + item.summary_cf;
      else return sum;
    }, 0),
    totalProgram: res.length,
  };
}

async function groupMapCarbonProgram(lang = "th") {
  let langCode = "th-TH";
  if (lang === "en") {
    langCode = "en-US";
  } else if (lang === "th") {
    langCode = "th-TH";
  }
  const res: CarbonProgramsRoundType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("program_round", {
        fields: ["*", "program.province.*", "program.province.region.*"],
      }),
      0
    )
  );
  const getRegion: RegionType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("regions", {
        fields: ["*", "translations.*"],
      }),
      0
    )
  );
  const groupedData: { [key: string]: any[] } = {};
  getRegion.forEach((item: RegionType) => {
    if (!groupedData[String(item.id)]) {
      groupedData[String(item.id)] = [];
    }
  });
  res.forEach((program) => {
    const programData = program.program as CarbonProgramsType;
    const province = programData?.province as ProvincesType;
    const region = province?.region as RegionType;
    const regionId = region?.id;

    if (regionId) {
      if (groupedData[regionId]) {
        groupedData[regionId].push({
          regionTitle: region?.title,
          program: program,
        });
      } else {
        groupedData[regionId] = [program];
      }
    }
  });
  const sumCarbon = Object.keys(groupedData).map((key) => {
    const sumCarbon = groupedData[key].reduce((sum, item) => {
      if (item.program.summary_cf) return sum + item.program.summary_cf;
      else return sum;
    }, 0);
    return { region: key, sum_carbon: sumCarbon };
  });
  const sumCarbonByRegion = sumCarbon.map((item) => {
    const region = getRegion.find((region) => region.id === Number(item.region));
    const translationRegionObject = _.find(region?.translations, { languages_code: langCode }, undefined);
    return {
      value: item.sum_carbon,
      key: item.region,
      position: { lat: region?.lat, lng: region?.lng },
      // name: region?.title,
      name: _.get(translationRegionObject, "title", null),
      category: "region",
    };
  });

  const getProvince: ProvincesType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("provinces", {
        fields: ["*", "translations.*"],
      }),
      0
    )
  );
  const groupedDataProvince: { [key: string]: CarbonProgramsRoundType[] } = {};
  getProvince.forEach((item: RegionType) => {
    if (!groupedDataProvince[String(item.id)]) {
      groupedDataProvince[String(item.id)] = [];
    }
  });
  res.forEach((program) => {
    const programData = program.program as CarbonProgramsType;
    const province = programData?.province as ProvincesType;
    const provinceId = province?.id;

    if (provinceId) {
      if (groupedDataProvince[provinceId]) {
        groupedDataProvince[provinceId].push(program);
      } else {
        groupedDataProvince[provinceId] = [program];
      }
    }
  });
  const sumCarbonProvince = Object.keys(groupedDataProvince).map((key) => {
    const sumCarbon = groupedDataProvince[key].reduce((sum, item) => {
      if (item.summary_cf) return sum + item.summary_cf;
      else return sum;
    }, 0);
    return { province: key, sum_carbon: sumCarbon };
  });
  const sumCarbonByProvince = sumCarbonProvince.map((item) => {
    const province = getProvince.find((province) => province.id === Number(item.province));
    const translationProvinceObject = _.find(province?.translations, { languages_code: langCode }, undefined);

    return {
      value: item.sum_carbon,
      key: item.province,
      position: { lat: province?.lat, lng: province?.lng },
      // name: province?.title,
      name: _.get(translationProvinceObject, "title", null),
      category: "province",
    };
  });

  return [...sumCarbonByRegion, ...sumCarbonByProvince];
}
export {
  adminChangeStatusCarbonProgram,
  createCarbonProgram,
  getCarbonProgram,
  getPieChartCarbonProgram,
  getTableCarbonProgram,
  getTableCarbonProgramByRegion,
  groupMapCarbonProgram,
  listCarbonProgram,
  summaryCarbonProgram,
  updateCarbonProgram,
  uploadCarbonAttachments,
};
