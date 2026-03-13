import { Profile, getProfile } from "@/utils/cms/adapters/authen";
import { USER_ROLE_CODE } from "@/utils/cms/adapters/website/api-management";

function getIsOnBoarding(roles?: Profile["roles"]) {
  if (!roles) return false;
  const userRole = roles?.find(
    (role) => role.app_code == "APM" && (role.role == USER_ROLE_CODE.EXTERNAL || role.role == USER_ROLE_CODE.INTERNAL)
  );

  return !!userRole;
}

export { getIsOnBoarding, getProfile };
