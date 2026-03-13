"use client";

import { TrainingData } from "@/models/travel-mart/travel-mart-training";
import { getCmsMedia } from "@/utils/cms/api-helpers";
import { cn } from "@/utils/cn";
import { Tab } from "@headlessui/react";
import { get } from "lodash";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TravelMartTrainingItem from "./TravelMartTrainingItem";

type TravelMartTrainingProps = {
  trainingData?: TrainingData[];
};

const TravelMartTraining = ({ trainingData }: TravelMartTrainingProps) => {
  const t = useTranslations("common");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const trainingDataSorted = trainingData?.sort((a, b) => {
    const sortA = a?.sort ?? 0;
    const sortB = b?.sort ?? 0;
    return sortA - sortB;
  });

  const communities = trainingDataSorted?.filter((value) => value.type == "community");
  const organizations = trainingDataSorted?.filter((value) => value.type == "organization");

  const data = [
    {
      title: t("travelMart.training.tabs.title.community"),
      header: t("travelMart.training.tabs.header.community"),
      data: communities,
    },
    {
      title: t("travelMart.training.tabs.title.organization"),
      header: t("travelMart.training.tabs.header.organization"),
      data: organizations,
    },
  ];

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("th-TH", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const formatTime = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderTrainingItem = (training: TrainingData, index: number) => (
    <div className="flex w-full flex-col items-center gap-20 pt-8" key={index}>
      {training?.lecturers?.map((lecturer, li) => {
        const { title, first_name, middle_name, last_name, nick_name, job_title, job_position, organization, photo } =
          lecturer.business_expertises_id;

        const displayName = `${title ?? ""} ${first_name ?? ""} ${middle_name ?? ""} ${last_name ?? ""} ${
          nick_name ? `(${nick_name})` : ""
        }`;
        const displayPosition = `${job_title ?? ""} ${job_position ?? ""} ${organization ?? ""}`;

        const startDateFormatted = training.start_at ? formatDate(training.start_at) : "";
        const startTimeFormatted = training.start_at ? formatTime(training.start_at) : "";
        const endTimeFormatted = training.end_at ? formatTime(training.end_at) : "";
        const videoName = get(training, ["business_trainings_video", "filename_disk"]);
        const videoUrl = getCmsMedia(videoName);

        return (
          <TravelMartTrainingItem
            key={li}
            index={index}
            image={photo.filename_disk}
            alt={photo.filename_download}
            detail={training.detail}
            displayName={displayName}
            displayPosition={displayPosition}
            link={training.preview_link}
            videoType={training.video_type}
            videoUrl={videoUrl}
            endTimeFormatted={endTimeFormatted}
            startDateFormatted={startDateFormatted}
            startTimeFormatted={startTimeFormatted}
            title={training.title}
          />
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-10 px-2 py-10 text-smart-cbt-dark-green lg:px-20">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="flex flex-grow flex-col">
          <Tab.List className="flex items-center justify-between overflow-x-hidden border-b border-smart-cbt-border-green">
            {data.map((value, index) => {
              return (
                <Tab
                  key={index}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 whitespace-nowrap p-4 text-center text-2xl font-medium text-smart-cbt-dark-green",
                    index == selectedIndex
                      ? "border-b-4 border-smart-cbt-green bg-smart-cbt-light-green text-smart-cbt-green"
                      : "text-smart-cbt-dark-grey"
                  )}
                >
                  {value.title}
                </Tab>
              );
            })}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {data.map((value, index) => (
              <Tab.Panel key={index} className={cn("h-full bg-white p-3")}>
                <div className="flex flex-col justify-items-center gap-8 ">
                  <div className="text-center text-3xl font-medium text-smart-cbt-dark-green">{value.header}</div>
                  <div className="flex flex-col gap-12 divide-y-2">
                    {value.data?.map((training, i) => renderTrainingItem(training, i))}
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default TravelMartTraining;
