import AppContextProvider from "@/components/context-provider/AppContextProvider";
import PhotoBankMain from "@/components/photo-bank/main/PhotoBankMain";
import { fetchCommunities, fetchImages, fetchPhotoCategory, fetchProvinces } from "@/utils/cms/cms-api-adapter";

export default async function PhotoBankPage() {
  const photoCategories = await fetchPhotoCategory();
  const image = await fetchImages({ limit: 24, status: "published" });

  const [provinces, communities] = await Promise.all([fetchProvinces(), fetchCommunities()]);

  return (
    <AppContextProvider provinces={provinces} communities={communities}>
      <PhotoBankMain photoCategories={photoCategories} photoBankAlbumsFiles={image} />
    </AppContextProvider>
  );
}
