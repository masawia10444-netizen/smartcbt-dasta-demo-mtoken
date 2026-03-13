import PhotoBankMyAlbumsForm from "@/components/photo-bank/my-albums/create/PhotoBankMyAlbumsForm";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchRegions } from "@/utils/cms/adapters/master-data/geolocation/regions";
import { fetchPhotoCategory } from "@/utils/cms/adapters/website/photo-bank/albums";

export default async function PhotoBankMyAlbumFormPage() {
  const { token, appCode } = useCookies();
  await getProfile(token, appCode);
  const [photoCategories, regions] = await Promise.all([fetchPhotoCategory(), fetchRegions()]);
  return <PhotoBankMyAlbumsForm photoCategories={photoCategories ?? []} regions={regions ?? []} />;
}
