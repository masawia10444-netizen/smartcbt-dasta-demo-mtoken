import AppContextProvider from "@/components/context-provider/AppContextProvider";
import PhotoBankListBySearch from "@/components/photo-bank/PhotoBankListBySearch";
import { PhotoBankCategoryJSONData, fetchPhotoCategory } from "@/utils/cms/adapters/website/photo-bank/albums";
import { fetchCommunities, fetchProvinces } from "@/utils/cms/cms-api-adapter";
import { redirect } from "next/navigation";

const PhotoBankListBySearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const type = searchParams?.type as string;
  const q = searchParams?.q as string;
  const provinceId = searchParams?.provinceId as string;
  const communityId = searchParams?.communityId as string;
  const categoryId = searchParams?.categoryId as string;

  if (type != "search" && type != "category") redirect("/photo-bank");
  if (q == null && provinceId == null && communityId == null && categoryId == null) redirect("/photo-bank");

  var photoBankCategory;
  if (categoryId) {
    const photoBankCategories: PhotoBankCategoryJSONData[] = await fetchPhotoCategory();
    photoBankCategory = photoBankCategories.find((value) => value.id == categoryId);
  }

  const [provinces, communities] = await Promise.all([fetchProvinces(), fetchCommunities()]);

  return (
    <AppContextProvider provinces={provinces} communities={communities}>
      <PhotoBankListBySearch
        type={type}
        q={q}
        provinceId={Number(provinceId)}
        communityId={Number(communityId)}
        photoBankCategory={photoBankCategory}
      />
    </AppContextProvider>
  );
};

export default PhotoBankListBySearchPage;
