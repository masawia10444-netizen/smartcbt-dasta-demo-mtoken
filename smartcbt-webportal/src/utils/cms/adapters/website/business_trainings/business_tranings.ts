import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItems } from "@directus/sdk";
import * as _ from "lodash";
import { BusinessExpertises, BusinessTrainingBusinessExpertises, BusinessTrainings } from "./types";

export async function fetchTrainings() {
  // console.log("fetchBussinessPitching");

  // // Check if id is number and not null return exception handler
  // if (typeof id !== "number" || id === null) {
  //   throw new Error("id must be number and not null");
  // }

  const res: BusinessTrainings[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("business_trainings", {
        fields: ["*.*.*.*"],
        filter: {
          status: {
            _in: ["published"],
          },
          training_status: {
            _nin: ["CLOSED", "CANCELLED"],
          },
        },
      }),
      0
    )
  );

  // group by category

  const groupByCategory: { [key: string]: any } = {};
  res.forEach((data) => {
    const categoryId = _.get(data, ["categories", "id"], null);
    const categoryTitle = _.get(data, ["categories", "title"], null);

    if (_.isNil(groupByCategory[categoryId])) {
      groupByCategory[categoryId] = {
        category_id: categoryId,
        category_title: categoryTitle,
        list: [],
      };
    }

    const lecturers = _.get(data, ["lecturers"], []).map((lecturer: BusinessTrainingBusinessExpertises) => {
      const info = lecturer["business_expertises_id"] as BusinessExpertises;
      if (_.isNil(info)) return null;

      return {
        job_position: _.get(info, ["job_position"], null),
        job_title: _.get(info, ["job_title"], null),
        title: _.get(info, ["title"], null),
        first_name: _.get(info, ["first_name"], null),
        middle_name: _.get(info, ["middle_name"], null),
        last_name: _.get(info, ["last_name"], null),
        nick_name: _.get(info, ["nick_name"], null),
        profile: _.get(info, ["profile"], null),
        organization: _.get(info, ["organization"], null),
        photo: !_.isNil(info.photo)
          ? {
              url: _.get(info.photo, ["filename_disk"], null),
              type: _.get(info.photo, ["type"], null),
              title: _.get(info.photo, ["title"], null),
            }
          : null,
      };
    });

    groupByCategory[categoryId].list.push({
      title: data.title,
      detail: data.detail,
      slug: data.slug,
      preview_link: data.preview_link,
      lecturers,
    });
  });

  return Object.values(groupByCategory);
}
