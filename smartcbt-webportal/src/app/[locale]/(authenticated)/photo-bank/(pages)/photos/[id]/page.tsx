import PhotoBankPhoto from "@/components/photo-bank/photo/PhotoBankPhoto";
import { fetchImageById, fetchImages } from "@/utils/cms/cms-api-adapter";

export default async function PhotoBankPhotoPage({ params }: { params: { id: number } }) {
  const photo = await fetchImageById(params.id);
  const otherPhotos = await fetchImages({ albumId: photo.album_id, status: "published" });
  return <PhotoBankPhoto photo={photo} otherPhotos={otherPhotos} />;
}
