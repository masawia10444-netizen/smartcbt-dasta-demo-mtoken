import PhotoBankMyAlbumsForm from "@/components/photo-bank/my-albums/create/PhotoBankMyAlbumsForm";
import useCookies from "@/hooks/useCookies";
import { AlbumDetail } from "@/models/photo-bank/photo-bank-albums";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchRegions } from "@/utils/cms/adapters/master-data/geolocation/regions";
import { fetchImages, fetchPhotoCategory, fethcAlbumById } from "@/utils/cms/adapters/website/photo-bank/albums";

export default async function PhotoBankMyAlbumFormPage({ params }: { params: { id: string } }) {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);
  const [photoCategories, regions, albumDetail, rawImages] = await Promise.all([
    fetchPhotoCategory(),
    fetchRegions(),
    fethcAlbumById(profile, Number(params.id)) as AlbumDetail,
    fetchImages({ albumId: Number(params.id), limit: -1, status: null }),
  ]);

  const images = rawImages.map((image) => {
    return {
      ...image,
      id: image.file_id,
    };
  });

  return (
    <PhotoBankMyAlbumsForm
      photoCategories={photoCategories}
      albumDetail={albumDetail}
      regions={regions}
      images={images ?? []}
    />
  );
}
