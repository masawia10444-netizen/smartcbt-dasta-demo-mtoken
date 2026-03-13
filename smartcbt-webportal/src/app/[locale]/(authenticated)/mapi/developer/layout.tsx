import RootManageApiLayout from "@/components/manage-api/RootManageApiLayout";
import { getIsOnBoarding } from "@/utils/manage-api";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function ManageApiLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const profile = session?.user;

  if (!profile || !getIsOnBoarding(profile?.roles)) redirect("/mapi");

  return <RootManageApiLayout>{children}</RootManageApiLayout>;
}
