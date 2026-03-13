import RegisterForm from "@/components/register/RegisterForm";
import { getMTokenRegisterProfileCookie } from "@/utils/mtoken";

export const dynamic = "force-dynamic";

export default async function RegisterPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const isMToken = searchParams?.mtoken === "1";
  const mTokenProfile = isMToken ? await getMTokenRegisterProfileCookie() : null;

  return <RegisterForm initialMTokenProfile={isMToken ? mTokenProfile : null} />;
}
