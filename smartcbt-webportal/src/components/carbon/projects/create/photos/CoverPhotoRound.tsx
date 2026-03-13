import { FormFieldError } from "@/components/form/FormFieldError";
import Image from "@/components/image";
import { ImagePickerButton } from "@/components/projects/create/step1/CreateProjectStep1";
import { ImageView, TravelProgramRoundsSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PictureSchema } from "@/schemas/forms/shard-schema";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import AddPictureSmallIcon from "public/images/sia/add-picture-small-icon.png";
import { useFormContext } from "react-hook-form";

type CoverPhotoRoundProps = {
  selectedIndex: number;
};

const CoverPhotoRound = ({ selectedIndex }: CoverPhotoRoundProps) => {
  const t = useTranslations("common");

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TravelProgramRoundsSchema>();

  const handleFiles = (files: { file: File }[]) => {
    setValue(`rounds.${selectedIndex}.photographic.cover`, files[0], { shouldValidate: true });
  };

  const coverPicture = watch(`rounds.${selectedIndex}.photographic.cover`);
  const hasCoverPicture = coverPicture != null;
  const timestamp = new Date().getTime();

  return (
    <div className="flex w-full items-center justify-center lg:h-96">
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
              className="absolute bottom-2 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-smart-cbt-very-light-grey bg-white"
            />
          </>
        ) : (
          <ImagePickerButton
            disabled={false}
            id="cover"
            onFiles={handleFiles}
            className="h-full flex-col justify-center gap-2 rounded-lg border border-dashed border-smart-cbt-medium-grey bg-smart-cbt-light-grey text-smart-cbt-dark-grey "
            icon={<PlusIcon className="h-5 w-5" />}
            title={t("project.create.step1.uploadCoverPicture")}
          />
        )}
      </div>
      <FormFieldError error={errors.rounds?.[selectedIndex]?.photographic?.cover?.message} />
    </div>
  );
};

export default CoverPhotoRound;
