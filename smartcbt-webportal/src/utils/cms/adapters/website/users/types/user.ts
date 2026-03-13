import { Collection } from "@/utils/cms/cms-type";

export type UsersAccount = Collection["users"];
export type RegisterUser = {
  email: string;
  password: string;
  mobile: string | null;
  firstName?: string | null;
  lastName?: string | null;
  citizenId?: string | null;
};

export type DirectusUser = {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  language?: string;
  theme?: string;
  status?: string;
  role?: string;
};

export type ApiOnBoarding = {
  api_organization: string;
  consents: { application_consents_id: number }[];
};

// export type UserAccount = Collection["users"];
export type UserAccount = {
  email: string;
  directus_user: string;
  status: string;
  mobile: string | null;
  firstname?: string | null;
  lastname?: string | null;
  thai_national_id_card?: string | null;
  applications: {
    application: number;
    user_app_role: string;
    api_onboarding?: ApiOnBoarding[];
    status?: string;
  }[];
};
export type UserAppRole = Collection["application_role_permissions"];

export type UpdateProfile = {
  first_name?: string;
  last_name?: string;
  password?: string;
};
