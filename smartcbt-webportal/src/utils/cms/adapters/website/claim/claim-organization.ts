import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { createItem, readItems } from "@directus/sdk";
import { Profile } from "../../authen";
import * as _ from "lodash";
async function listRequestOrganization(profile: Profile) {
  const res: any[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("claim_organization_request", {
        fields: [
          "id",
          "status",
          "organization.title",
          "organization.province.*.*",
          "organization.district.*.*",
          "organization.subdistrict.*.*",
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
  return await Promise.all(res?.map((item: any) => transfromRequestOrganizationList(item)) ?? []);
}

function transfromRequestOrganizationList(data: any, lang = "th-TH") {
  const province = _.find(data.organization?.province?.translations, { languages_code: lang }) ?? null;
  const district = _.find(data.organization?.district?.translations, { languages_code: lang }) ?? null;
  const subdistrict = _.find(data.organization?.subdistrict?.translations, { languages_code: lang }) ?? null;
  return {
    id: _.get(data, "id"),
    status: _.get(data, "status"),
    organization: {
      title: _.get(data, "organization.title") ?? null,
      province: _.get(province, "title") ?? null,
      district: _.get(district, "title") ?? null,
      subdistrict: _.get(subdistrict, "title") ?? null,
    },
  };
}

async function createOrganizationClaim(payload: { organization: number }) {
  const res = await cmsApi.request(
    // @ts-ignore
    createItem("claim_organization_request", payload)
  );

  return res;
}
export { createOrganizationClaim, listRequestOrganization };
