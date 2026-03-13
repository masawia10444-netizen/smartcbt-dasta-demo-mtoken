import ProfilePhotoBank from "@/components/profile/photo-bank/ProfilePhotoBank";
import useCookies from "@/hooks/useCookies";
import { fetchConsentsByAppCode, getProfile } from "@/utils/cms/adapters/authen/authen";
import { getPhotoGrapherProfile } from "./action";

export default async function ProfilePage() {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);
  const [consents] = await Promise.all([fetchConsentsByAppCode("PHOTO")]);
  const { photoGrapher } = await getPhotoGrapherProfile();

  return <ProfilePhotoBank consents={consents ?? []} photographerInfo={photoGrapher} />;
}
