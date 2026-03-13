"use client";

import { TravelProgramRoundsSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { cn } from "@/utils/cn";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import CoverPhotoRound from "./CoverPhotoRound";
import PhotoGallery from "./PhotoGallery";
import PhotoGalleryRound from "./PhotoGalleryRound";

type PhotographicEvidencesRoundProps = {
  selectedIndex: number;
};

type PhotoCategory = { id: number; title: string; key: string };

export const carbonPhotoEvidenceCategories: PhotoCategory[] = [
  {
    id: 0,
    title: "carbon.create.photo.photo",
    key: "cover",
  },
  {
    id: 1,
    title: "carbon.create.photo.travel",
    key: "travel",
  },
  {
    id: 2,
    title: "carbon.create.photo.accommodation",
    key: "accommodation",
  },
  {
    id: 3,
    title: "carbon.create.photo.foods",
    key: "foods",
  },
  {
    id: 4,
    title: "carbon.create.photo.wastes",
    key: "wastes",
  },
  {
    id: 5,
    title: "carbon.create.photo.documents",
    key: "documents",
  },
];

export const PhotographicEvidencesRound = ({ selectedIndex }: PhotographicEvidencesRoundProps) => {
  return <div>{PhotoTabs(carbonPhotoEvidenceCategories, selectedIndex)}</div>;
};

const PhotoTabs = (photoCategories: PhotoCategory[], selectedIndex: number) => {
  const t = useTranslations("common");
  const [selectedPhotoTabIndex, setSelectedPhotoTabIndex] = useState(0);

  const { control, setValue, watch } = useFormContext<TravelProgramRoundsSchema>();

  const setCoverPhoto = (fileName?: string) => {
    console.log(fileName);
    setValue(`rounds.${selectedIndex}.photographic.isCover`, fileName ? fileName : undefined);
  };

  const coverPhotoName = watch(`rounds.${selectedIndex}.photographic.isCover`);

  return (
    <Tab.Group selectedIndex={selectedPhotoTabIndex} onChange={setSelectedPhotoTabIndex}>
      <div className="flex flex-grow flex-col bg-white">
        <Tab.List className="flex space-x-4 border-b border-smart-cbt-very-light-grey">
          {photoCategories.map((pc) => (
            <Tab
              key={pc.id}
              className={({ selected }) =>
                cn(
                  "w-fit border-b-2 bg-white py-2 text-sm leading-5 text-smart-cbt-dark-green",
                  selected
                    ? "border-smart-cbt-dark-green"
                    : "border-white text-smart-cbt-medium-grey hover:text-smart-cbt-dark-green"
                )
              }
            >
              {t(pc.title)}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {photoCategories.map((pc) => (
            <Tab.Panel key={pc.id} className={cn("h-full bg-white p-3")}>
              {pc.key === "cover" ? (
                <CoverPhotoRound selectedIndex={selectedIndex} key={pc.id} />
              ) : (
                <PhotoGalleryRound
                  control={control}
                  name={`rounds.${selectedIndex}.photographic.${pc.key}` as any}
                  canSetHasCover={pc.id == 0}
                  setCoverPhoto={setCoverPhoto}
                  coverPhotoName={coverPhotoName}
                />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};
