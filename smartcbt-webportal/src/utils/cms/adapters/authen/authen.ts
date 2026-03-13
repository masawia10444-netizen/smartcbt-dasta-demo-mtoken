"use server";
import cmsApi, { publicApi, setAdminToken, withRevalidate } from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { extractAuthErrorMessage } from "@/utils/error";
import { login, readItems, readMe } from "@directus/sdk";
import jsonata from "jsonata";
import { get, isEmpty, isNil, pick } from "lodash";

type UserInfo = Collection["users"];
type ApplicationRolePermissions = Collection["application_role_permissions"];
type ApplicationConsents = Collection["application_consents"];
export type Consents = Awaited<ReturnType<typeof fetchConsentsByAppCode>>;
type TermConditions = Collection["term_conditions"];
type Policies = Collection["policies"];

export type Profile = {
  id: string;
  user_id: {
    id: string;
    token: string;
  };
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  roles: {
    id: string;
    status: string;
    app_code: string;
    app_title: string;
    app_title_en: string;
    role: string;
    role_title: string;
    firstname: string | null;
    lastname: string | null;
  }[];
  communities: {
    id: number;
    title: string;
  }[];
  organizations: {
    id: number;
    title: string;
  }[];
};

async function loginEmail(email: string, password: string, appCode: string) {
  try {
    const res = await publicApi.request(
      withRevalidate(
        // @ts-ignore
        login(email, password),
        0
      )
    );

    await getProfile(String(res.access_token), appCode);
    return res;
  } catch (e) {
    throw extractAuthErrorMessage(e, "เข้าสู่ระบบไม่สำเร็จ");
  }
}

async function loginMobile(mobile: string, password: string, appCode: string) {
  // find user email with phone number
  await setAdminToken(cmsApi);
  const user = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("users", {
        fields: ["email"],
        filter: { mobile: { _eq: mobile } },
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  const email = get(user, [0, "email"], null);

  if (!isNil(email)) {
    try {
      const res = loginEmail(email, password, appCode);
      return res;
    } catch (e) {
      throw extractAuthErrorMessage(e, "เข้าสู่ระบบไม่สำเร็จ");
    }
  }

  throw "อีเมล/เบอร์โทรศัพท์ หรือรหัสผ่านไม่ถูกต้อง";
}

async function getProfile(token: string, appCode: string) {
  try {
    await cmsApi.setToken(token);

    const cmsUser = await cmsApi.request(withRevalidate(readMe({ fields: ["*"] }), 0));

    let filter: { application: Record<string, any>; status?: Record<string, any> } = {
      application: { code: { _eq: appCode } },
      status: {
        _eq: "published",
      },
    };

    // IF PHOTO delete check status
    if (appCode == "PHOTO") {
      delete filter.status;
    }

    const userInfo = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        readItems("users", {
          fields: [
            "*",
            "applications.*",
            "applications.photographer_onboarding.*",
            "applications.guide_onboarding.*",
            "applications.commu_onboarding.*",
            "applications.org_onboarding.user_app.user.*",
            "applications.api_onboarding.*",
            "applications.application.*",
            "applications.user_app_role.*",
            "organizaitons.organizations_id.*",
            "organizaitons.organizations_id.organization_type.*",
            "organizaitons.organizations_id.communities.id",
            "organizaitons.organizations_id.communities.title",
            "directus_user.token",
            "directus_user.id",
          ],
          // filter: { directus_user: { _eq: cmsUser.id } },
          filter: {
            directus_user: { _eq: cmsUser.id },
            applications: {
              ...filter,
            },
          },
          // sort: "sort, -score, -date_created",
        }),
        0
      )
    );

    // if (isEmpty(userInfo)) throw new Error("not-authorize");
    if (isEmpty(userInfo)) throw "เข้าสู่ระบบไม่สำเร็จ";

    return transformProfile(userInfo[0]);
  } catch (e) {
    // if (isEmpty(userInfo)) throw new Error("not-authorize");
    console.log("get_profile: ", e);
    throw e;
  }
}

async function transformProfile(userInfo: UserInfo): Promise<Profile> {
  // console.log(JSON.stringify(userInfo));
  const rawOrganizations = get(userInfo, ["organizaitons"], []);
  const communities: any = [];
  const organizations: any = [];
  const roles: any = [];

  rawOrganizations.forEach((org) => {
    organizations.push({
      id: get(org, "organizations_id.id", null),
      organization_type: get(org, "organizations_id.organization_type.type", null),
      title: get(org, "organizations_id.title", null),
    });

    const rawCommunities = get(org, "organizations_id.communities", []);
    if (!isEmpty(rawCommunities)) {
      rawCommunities.forEach((commu) => {
        communities.push({
          id: get(commu, "id"),
          title: get(commu, "title"),
        });
      });
    }
  });

  const applications = get(userInfo, "applications", []);

  applications.forEach((app) => {
    const status: string = get(app, "status", "draft");
    const application = get(app, "application");
    const userAppRole = get(app, "user_app_role", null);
    const userAppRoleStatus: string = get(userAppRole, "status", "draft");

    if (userAppRoleStatus == "published") {
      const applicationCode = get(application, "code");
      const roleCode = get(userAppRole, "code");
      const onboardingData: any = { firstname: null, lastname: null };

      if (applicationCode == "PHOTO" && roleCode == "photographer") {
        onboardingData.firstname = get(app, ["photographer_onboarding", 0, "photographer_firstname"], null);
        onboardingData.lastname = get(app, ["photographer_onboarding", 0, "photographer_lastname"], null);
      } else if (applicationCode == "BUSINESS") {
        if (roleCode == "community") {
          onboardingData.firstname = get(app, ["commu_onboarding", 0, "commu_firstname"], null);
          onboardingData.lastname = get(app, ["commu_onboarding", 0, "commu_lastname"], null);
        } else if (roleCode == "guide") {
          onboardingData.firstname = get(app, ["guide_onboarding", 0, "guide_firstname"], null);
          onboardingData.lastname = get(app, ["guide_onboarding", 0, "guide_lastname"], null);
        } else if (roleCode == "organization") {
          onboardingData.firstname = get(app, ["org_onboarding", 0, "user_app", "user", "firstname"], null);
          onboardingData.lastname = get(app, ["org_onboarding", 0, "user_app", "user", "lastname"], null);
        }
      } else if (applicationCode == "APM" && (roleCode == "internal_user" || roleCode == "external_user")) {
        onboardingData.firstname = get(app, ["api_onboarding", 0, "api_firstname"], null);
        onboardingData.lastname = get(app, ["api_onboarding", 0, "api_lastname"], null);
      }

      const roleData = {
        id: get(app, "id"),
        status,
        app_code: applicationCode,
        app_title: get(application, "title"),
        app_title_en: get(application, "title_en"),
        role: roleCode,
        role_title: get(userAppRole, "title"),
        ...onboardingData,
      };

      roles.push(roleData);
    }
  });

  const transform: Profile = {
    ...pick(userInfo, ["id", "email", "title", "mobile"]),
    id: String(userInfo.id),
    email: String(userInfo.email),
    title: String(userInfo.title),
    mobile: String(userInfo.mobile),
    user_id: get(userInfo, "directus_user") as {
      id: string;
      token: string;
    },
    first_name: get(userInfo, "firstname", "") as string,
    last_name: get(userInfo, "lastname", "") as string,
    roles,
    organizations: isEmpty(organizations) ? null : organizations,
    communities: isEmpty(communities) ? null : communities,
  };

  return transform;
}

async function checkPermissionExist(
  applicationCode: string,
  permissionCode: string
): Promise<ApplicationRolePermissions> {
  // find business application
  const permissions: ApplicationRolePermissions[] = await cmsApi.request(
    // @ts-ignore
    readItems("application_role_permissions", {
      fields: ["id", "applications", "code"],
      filter: {
        status: {
          _eq: "published",
        },
        applications: {
          code: {
            _eq: applicationCode,
          },
        },
        code: {
          _eq: permissionCode,
        },
      },
    })
  );

  // if (isEmpty(permissions)) throw new Error("no-application");
  if (isEmpty(permissions)) throw "ไม่พบสิทธิ์การใช้งาน";

  return permissions[0];
}

async function fetchConsentsByAppCode(appCode: string) {
  const res = await cmsApi.request(
    // @ts-ignore
    readItems("application_consents", {
      fields: ["*"],
      filter: {
        status: {
          _eq: "published",
        },
        application: {
          code: {
            _eq: appCode,
          },
        },
      },
    })
  );

  if (isEmpty(res)) return [];
  return await transformConsents(res);
}

async function transformConsents(res: ApplicationConsents[]) {
  const expression = jsonata(`
    $count($) = 1 ? $.[{
        'id': id,
        'detail': detail,
        'ref_link': ref_link
    }] : $.{
        'id': id,
        'detail': detail,
        'ref_link': ref_link
    }
  `);

  const result = await expression.evaluate(res);
  return result;
}

async function fetchTermConditions(appCode: string) {
  const res: TermConditions[] = await cmsApi.request(
    // @ts-ignore
    readItems("term_conditions", {
      fields: ["*"],
      filter: {
        status: {
          _eq: "published",
        },
        application: {
          code: {
            _eq: appCode,
          },
        },
      },
    })
  );

  if (isEmpty(res)) return;
  return { id: res[0].id, detail: res[0].detail };
}

async function fetchPolicies(appCode: string, type: string) {
  const res: Policies[] = await cmsApi.request(
    // @ts-ignore
    readItems("policies", {
      fields: ["*"],
      filter: {
        status: {
          _eq: "published",
        },
        application: {
          code: {
            _eq: appCode,
          },
        },
        type: {
          _eq: type,
        },
      },
    })
  );

  if (isEmpty(res)) return;
  return { id: res[0].id, detail: res[0].detail };
}

async function checkExistApplication(profile: Profile, application: number, permission: ApplicationRolePermissions) {
  const existApp = await cmsApi.request(
    // @ts-ignore
    readItems("user_apps", {
      filter: {
        user: {
          _eq: profile.id,
        },
        application: {
          _eq: application,
        },
        user_app_role: {
          _eq: permission.id,
        },
      },
    })
  );

  // if (!isEmpty(existApp)) throw new Error("already-on-boarding");
  if (!isEmpty(existApp)) throw "ลงทะเบียนแล้ว";

  return true;
}

export {
  checkExistApplication,
  checkPermissionExist,
  fetchConsentsByAppCode,
  fetchPolicies,
  fetchTermConditions,
  getProfile,
  loginEmail,
  loginMobile,
};
