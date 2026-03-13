import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { createItem, readItems } from "@directus/sdk";
import { Profile } from "../../authen";
import * as _ from "lodash"
async function listRequestCommunity(profile: Profile) {
  const res: any[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("claim_community_request", {
        fields: [
          "id",
          "status",
          "community",
          "community.title",
          "community.organization.title",
          "community.organization.province.*.*",
          "community.organization.district.*.*",
          "community.organization.subdistrict.*.*",
        ],
        filter: {
          user_request: {
            _eq: profile.user_id.id,
          },
        },
      }),
      0
    )
  );
  return await Promise.all(res?.map((item: any) => transfromRequestCommunityList(item)) ?? []);
}

function transfromRequestCommunityList(data: any,lang = 'th-TH') {
  const province = _.find(data.community.organization?.province?.translations, { languages_code: lang }) ?? null
  const district = _.find(data.community.organization?.district?.translations, { languages_code: lang }) ?? null
  const subdistrict = _.find(data.community.organization?.subdistrict?.translations, { languages_code: lang }) ?? null
  return {
    id: _.get(data, "id"),
    status: _.get(data, "status"),
    community: {
      title: _.get(data, "community.title") ?? null,
      organization_title: _.get(data, "community.organization.title") ?? null,
      organization_province: _.get(province, "title") ?? null,
      organization_district: _.get(district, "title") ?? null,
      organization_subdistrict: _.get(subdistrict, "title") ?? null,
    },
  };
}

async function createCommunnityClaim(payload: { community: number }) {
  const res = await cmsApi.request(
    // @ts-ignore
    createItem("claim_community_request", payload)
  );

  return res;
}
export { createCommunnityClaim, listRequestCommunity };
