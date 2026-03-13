import {
  Profile,
  checkOrganizationAlreadyeRequestByOrganizationId,
  checkOrganizationWaitingAcceptByOrganizationId,
} from "@/utils/cms/cms-api-adapter";
import { isEmpty, isNil } from "lodash";

export type CheckOrganizationJSON = Awaited<ReturnType<typeof fetchCheckOrganization>>;

export async function fetchCheckOrganization(profile: Profile, organizationId: number, communityOrganizationId?: string) {
  if (!isEmpty(profile.organizations)) {
    const waitingAcceptOrganization = await checkOrganizationWaitingAcceptByOrganizationId(
      profile,
      organizationId,
      communityOrganizationId
    );
    const requestByOrganization = await checkOrganizationAlreadyeRequestByOrganizationId(
      profile,
      organizationId,
      communityOrganizationId
    );

    // console.log("waitingAcceptOrganization", waitingAcceptOrganization);
    // console.log("requestByOrganization", requestByOrganization);
    // console.log("isNil(waitingAcceptOrganization)", !isNil(waitingAcceptOrganization));

    const result = !isNil(waitingAcceptOrganization)
      ? { ...waitingAcceptOrganization, is_waiting: true }
      : !isNil(requestByOrganization)
      ? { ...requestByOrganization, is_waiting: false }
      : null;

    return result;
  }
}
