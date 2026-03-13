import { FormFieldError } from "@/components/form/FormFieldError";
import Image from "@/components/image";
import { ImagePickerButton } from "@/components/projects/create/step1/CreateProjectStep1";
import { ImageView, TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PictureSchema } from "@/schemas/forms/shard-schema";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import AddPictureSmallIcon from "public/images/sia/add-picture-small-icon.png";
import { useFormContext } from "react-hook-form";

type CoverPhotoProps = {};

const CoverPhoto = (props: CoverPhotoProps) => {
  const t = useTranslations("common");

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TravelProgramSchema>();

  const handleFiles = (files: { file: File }[]) => {
    setValue("photographic.cover", files[0], { shouldValidate: true });
  };

  const coverPicture: any = watch("photographic.cover");
  const hasCoverPicture = coverPicture != null;
  const timestamp = new Date().getTime();

  return (
    <div className="flex items-center justify-center w-full lg:h-96">
      <div className="relative h-[180px] w-full overflow-auto rounded-lg lg:w-[434px]">
        {hasCoverPicture ? (
          <>
            <Image
              key={timestamp}
              style={{ objectFit: "cover" }}
              src={
                (coverPicture as ImageView)?.id && (coverPicture as ImageView)?.url
                  ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${(coverPicture as ImageView)?.url}`
                  : URL.createObjectURL((coverPicture as PictureSchema)?.file)
              }
              fill
              alt=""
            />
            <ImagePickerButton
              disabled={false}
              id="cover"
              icon={<Image src={AddPictureSmallIcon} alt="Change cover" />}
              title=""
              onFiles={handleFiles}
              className="absolute flex items-center justify-center w-10 h-10 bg-white border rounded-full bottom-2 right-3 border-smart-cbt-very-light-grey"
            />
          </>
        ) : (
          <ImagePickerButton
            disabled={false}
            id="cover"
            onFiles={handleFiles}
            className="flex-col justify-center h-full gap-2 border border-dashed rounded-lg border-smart-cbt-medium-grey bg-smart-cbt-light-grey text-smart-cbt-dark-grey "
            icon={<PlusIcon className="w-5 h-5" />}
            title={t("project.create.step1.uploadCoverPicture")}
          />
        )}
      </div>
      <FormFieldError error={errors.photographic?.cover?.message} />
    </div>
  );
};

export default CoverPhoto;
