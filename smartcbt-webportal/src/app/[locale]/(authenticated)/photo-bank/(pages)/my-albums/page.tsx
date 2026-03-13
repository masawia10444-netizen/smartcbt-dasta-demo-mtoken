import PhotoBankMyAlbums from "@/components/photo-bank/my-albums/PhotoBankMyAlbums";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchAlbums } from "@/utils/cms/adapters/website/photo-bank/albums";

export default async function PhotoBankMyAlbumsPage() {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  const albums = await fetchAlbums(profile);
  return <PhotoBankMyAlbums albums={albums ?? []} />;
}
