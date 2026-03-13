"use server";

import { getApiGatewayUrl } from "@/utils/cms/api-helpers";

import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { readItems, updateItem, updateMe } from "@directus/sdk";
import cryptoRandomString from "crypto-random-string";
import * as _ from "lodash";
import { USER_ROLE_CODE } from ".";
import { Profile } from "../../authen";
import { addRateLimit } from "./rate-limit";

async function generateToken(profile: Profile) {
  // check permission before generate
  const existPermission = profile.roles.find(
    (role) => role.role == USER_ROLE_CODE.EXTERNAL || role.role == USER_ROLE_CODE.INTERNAL
  );

  // if (_.isEmpty(existPermission)) throw new Error("not-authorized");
  if (_.isEmpty(existPermission)) throw "เข้าสู่ระบบไม่สำเร็จ";

  const token = cryptoRandomString({ length: 32 });

  // create consumer
  const consumerId = await createConsumer(profile.email);
  // if (_.isNil(consumerId)) throw new Error("consumer-exist");
  if (_.isNil(consumerId)) throw "ไม่สามารถสร้าง consumer ได้";

  await cmsApi.request(updateMe({ token }));

  await createKey(consumerId, token);

  const apiOnBoarding = await fetchApiOnBoarding(profile);

  // if (_.isNil(apiOnBoarding)) throw new Error("api-on-boarding-not-found");
  if (_.isNil(apiOnBoarding)) throw "ไม่พบสิทธิ์การใช้งาน API";

  await updateApiOnBoardingById(Number(apiOnBoarding.id), { consumer_id: consumerId, token });
  await addRateLimit(consumerId);

  return token;
}

async function fetchApiOnBoarding(profile: Profile) {
  // get onoboarding
  const userRole = profile.roles.find(
    (role) => role.app_code == "APM" && (role.role == USER_ROLE_CODE.EXTERNAL || role.role == USER_ROLE_CODE.INTERNAL)
  );

  // if (_.isNil(userRole)) throw new Error("not-authorized");
  if (_.isNil(userRole)) throw "เข้าสู่ระบบไม่สำเร็จ";

  const userRoleId = userRole.id;
  // find api onboarding
  return await fetchApiOnboardingByUserRoleId(userRoleId);
}

async function fetchApiOnBoardingToken(profile: Profile) {
  const onboarding = await fetchApiOnBoarding(profile);
  return _.isNil(onboarding) ? null : onboarding.token;
}

async function updateApiOnBoardingById(id: number, body: Collection["user_api_management_onboarding"]) {
  try {
    await cmsApi.request(updateItem("user_api_management_onboarding", id, body));
  } catch (e) {}
}

async function fetchApiOnboardingByUserRoleId(id: string) {
  const res: Collection["user_api_management_onboarding"][] = await cmsApi.request(
    // @ts-ignore
    withRevalidate(
      // @ts-ignore
      readItems("user_api_management_onboarding", {
        fields: ["*"],
        filter: {
          user_app: {
            id: {
              _eq: id,
            },
          },
        },
      }),
      0
    )
  );

  if (_.isEmpty(res)) return null;
  return res[0];
}

async function createConsumer(email: string) {
  const url = getApiGatewayUrl();
  const response = await fetch(`${url}/consumers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      tags: ["api-management"],
    }),
  });

  const result = await response.json();

  return _.get(result, ["id"], null);
}

async function createKey(id: string, token: string) {
  const url = getApiGatewayUrl();
  const response = await fetch(`${url}/consumers/${id}/key-auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: `Bearer ${token}` }),
  });

  const result = await response.json();

  return _.get(result, ["id"], null);
}

export { fetchApiOnBoarding, fetchApiOnBoardingToken, generateToken };
