"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItems } from "@directus/sdk";

import { Collection } from "@/utils/cms/cms-type";
import jsonata from "jsonata";

export type BusinessPitching = Collection["business_pitching"];

async function fetchPitching() {
  // console.log("fetchBussinessPitching");

  // // Check if id is number and not null return exception handler
  // if (typeof id !== "number" || id === null) {
  //   throw new Error("id must be number and not null");
  // }

  const res: BusinessPitching = (await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("business_pitching", {
        fields: ["*.*.*.*"],
        filter: {
          status: {
            _in: ["published"],
          },
        },
      }),
      0
    )
  )) as unknown as BusinessPitching;

  // console.log("tramsformData", tramsformData);
  return await transform(res);
}

async function transform(_BusinessPitching: BusinessPitching) {
  // console.log("transformBusinessPitching");
  // console.log("transformBusinessPitching", _BusinessPitching);
  const expression = jsonata(`
        {
            'id': id,
            'title': title,
            'slug': slug,
            'status': status,
            'description': description,
            'start_date': start_date,
            'end_date': end_date,
            'featured_image': featured_image{
                'src': filename_disk,
                'title': title,
                'alt': title
            },
            'groups': groups.{
                'id': id,
                'ordering': ordering,
                'title': title,
                'status': status,
                'expertise': expertise. {
                    'name': job_title & ' ' & first_name & ' ' & last_name,
                    'profile': profile,
                    'image': photo.{
                        'src': filename_disk,
                        'title': title,
                        'alt': title
                    }
                }
            },
            'featured_communities': featured_communities.{
                'id': communities_id.id,
                'title': communities_id.organization.title,
                'province': communities_id.organization.province.title,
                'image': communities_id.featured_image.{
                    'src': filename_disk,
                    'title': title,
                    'alt': title
                },
                'link': '#'
            }
        }
    `);

  const result = await expression.evaluate(_BusinessPitching);
  // console.log(result);
  return result;
}

export { fetchPitching };
