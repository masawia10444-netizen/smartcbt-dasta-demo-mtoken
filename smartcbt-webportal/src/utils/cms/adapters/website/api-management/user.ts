"use server";

import { getApiRoleId } from "@/utils/cms/api-helpers";
import cmsApi from "@/utils/cms/cms-api";
import { extractAuthErrorMessage } from "@/utils/error";
import { createItem, updateItem } from "@directus/sdk";
import * as _ from "lodash";
import {
  APP_CODE,
  ApiManagementOnBoarding,
  ApiManagementProfile,
  CreateOnBoardingApiManagement,
  CreateUserExternal,
  USER_ROLE_CODE,
  fetchApiOnBoarding,
} from ".";
import { Profile, checkExistApplication, checkPermissionExist, getProfile } from "../../authen";
import { UserApps } from "../travel-mart";
import {
  createUserAccount,
  createUserDirectus,
  ensureDirectusStaticToken,
  fetchApplications,
  getRoleUserAllAppication,
  removeUserDirectus,
} from "../users/register";

async function registerExternalUser(body: CreateUserExternal) {
  cmsApi.setToken(null);

  const createDirectusUser = await createUserDirectus({
    email: body.email,
    password: body.password,
    language: "th-TH",
    status: "active",
    role: getApiRoleId(),
  });

  try {
    const applications = await fetchApplications();
    const apiApp = applications.find((app) => app.code == "APM");

    // if (_.isNil(apiApp)) throw Error("role-api-not-found");
    if (_.isNil(apiApp)) throw("ไม่พบสิทธิ์การใช้งาน API");

    const applicationsRoleUserList = await getRoleUserAllAppication();

    // get only user api
    const roleApiApp = applicationsRoleUserList.find(
      (role) => role.application == Number(apiApp.id) && role.code == "user"
    );

    // if (_.isNil(roleApiApp)) throw Error("role-api-not-found");
    if (_.isNil(roleApiApp)) throw("ไม่พบสิทธิ์การใช้งาน API");

    const createUserAccountData = await createUserAccount({
      email: body.email,
      directus_user: createDirectusUser.id,
      status: "published",
      mobile: null,
      applications: [
        {
          application: roleApiApp?.application,
          user_app_role: roleApiApp?.user_app_role,
          status: "published",
        },
      ],
    });

    if (_.isNil(createUserAccountData)) return null;

    const token = await ensureDirectusStaticToken(createDirectusUser.id);
    const profile = await getProfile(String(token), APP_CODE);

    await onBoardingApiManagement(
      profile,
      {
        organization: body.organization,
        consents: body.consents,
        firstName: null,
        lastName: null,
      },
      USER_ROLE_CODE.EXTERNAL
    );

    return {
      access_token: token,
      refresh_token: null,
      expires: null,
    };
  } catch (error: unknown) {
    await removeUserDirectus(createDirectusUser.id);
    const message = extractAuthErrorMessage(error, "สมัครสมาชิกไม่สำเร็จ");
    throw new Error(message);
  }
}

async function onBoardingApiManagement(profile: Profile, body: CreateOnBoardingApiManagement, roleCode: string) {
  // find business application
  const permission = await checkPermissionExist(APP_CODE, roleCode);

  // add user app
  // check not exist
  const application = Number(permission.applications);

  await checkExistApplication(profile, application, permission);

  let consents: { application_consents_id: number }[] = [];

  if (!_.isNil(body.consents)) {
    consents = body.consents.map((consentId) => ({ application_consents_id: consentId }));
  }

  const onBoarding: ApiManagementOnBoarding = {
    api_email: profile.email,
    api_firstname: body.firstName,
    api_lastname: body.lastName,
    api_organization: body.organization,
    consents,
  };

  const userAppBody: Partial<UserApps> = {
    user: profile.id,
    application: application,
    user_app_role: permission.id,
    api_onboarding: [onBoarding],
  };

  try {
    await cmsApi.request(createItem("user_apps", userAppBody));
    return { status: "success" };
  } catch (e) {
    console.log("error: ", e);
  }
}

async function getProfileApiOnBoarding(profile: Profile): Promise<ApiManagementProfile> {
  const onBoarding = await fetchApiOnBoarding(profile);

  return {
    email: profile.email,
    mobile: profile.mobile,
    organization: !_.isNil(onBoarding) && !_.isNil(onBoarding.api_organization) ? onBoarding.api_organization : null,
    firstname: !_.isNil(onBoarding) && !_.isNil(onBoarding.api_firstname) ? onBoarding.api_firstname : null,
    lastname: !_.isNil(onBoarding) && !_.isNil(onBoarding.api_lastname) ? onBoarding.api_lastname : null,
  };
}

async function updateOnBoarding(profile: Profile, body: CreateOnBoardingApiManagement) {
  // get id onboarding
  const onBoarding = await fetchApiOnBoarding(profile);

  if (!_.isNil(onBoarding)) {
    await cmsApi.request(
      updateItem("users", profile.id, {
        firstname: body.firstName,
        lastname: body.lastName,
        mobile: body.mobile,
      })
    );

    await cmsApi.request(
      updateItem("user_api_management_onboarding", Number(onBoarding.id), {
        api_firstname: body.firstName,
        api_lastname: body.lastName,
      })
    );

    return true;
  }
  return false;
}

export { getProfileApiOnBoarding, onBoardingApiManagement, registerExternalUser, updateOnBoarding };
