import { Collection } from "@/utils/cms/cms-type";

export type ApiManagementOnBoarding = Collection["user_api_management_onboarding"];

export type CreateUserExternal = {
  email: string;
  password: string;
  organization: string;
  consents: number[];
};

export type CreateOnBoardingApiManagement = {
  organization: string;
  mobile?: string;
  firstName: string | null;
  lastName: string | null;
  consents?: number[];
};

export type ApiManagementProfile = {
  email: string;
  organization: string | null;
  mobile: string | null;
  firstname: string | null;
  lastname: string | null;
};
