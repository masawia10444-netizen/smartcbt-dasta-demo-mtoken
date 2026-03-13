import { Collection } from "@/utils/cms/cms-type";
export type BusinessContacts = Collection["business_contacts"];

export type Contactus = {
  id: string;
  position?: string;
  last_name?: string;
  first_name?: string;
  department: string;
  phone?: string;
  email?: string;
};