"use client";

import { Announcement } from "@/components/Icon";
import { AudiowideFont } from "@/config/font";
import { BusinessActivities, ScheduleEvent } from "@/models/travel-mart/travel-mart-schedule-events";
import { cn } from "@/utils/cn";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";

function formatDateRange(startDate: string, endDate: string) {
  const luxonStartDate = DateTime.fromISO(startDate).setLocale("th-TH");
  const luxonEndDate = DateTime.fromISO(endDate).setLocale("th-TH");

  if (!luxonStartDate.isValid || !luxonEndDate.isValid) {
    return "Invalid date";
  }

  if (luxonStartDate.hasSame(luxonEndDate, "day")) {
    return luxonStartDate.toFormat("d LLLL yyyy");
  } else if (luxonStartDate.hasSame(luxonEndDate, "month")) {
    return `${luxonStartDate.toFormat("d")} - ${luxonEndDate.toFormat("d LLLL yyyy")}`;
  } else {
    return `${luxonStartDate.toFormat("d LLLL")} - ${luxonEndDate.toFormat("d LLLL yyyy")}`;
  }
}

type TravelMartScheduleEventProps = {
  scheduleEvent?: BusinessActivities;
};

const TravelMartScheduleEvent = ({ scheduleEvent }: TravelMartScheduleEventProps) => {
  const t = useTranslations("common");

  return (
    <div className="relative h-full">
      <div className="flex h-auto max-w-md flex-row items-center rounded-br-[6.25rem] rounded-tl-2xl bg-smart-cbt-green px-10 py-6 text-2xl text-white">
        {t("travelMart.scheduleEvents.title")}
      </div>
      <div className="flex flex-col items-center gap-10 px-8 py-10 xl:flex-row xl:gap-20 xl:px-20 xl:py-5">
        <h1 className="max-w-md text-center text-xl text-smart-cbt-dark-green xl:text-start">{scheduleEvent?.title}</h1>
        <div className="relative flex flex-col gap-20">
          {(scheduleEvent?.schedules as ScheduleEvent[])
            ?.sort((a, b) => {
              const orderingA = a?.ordering ?? 0;
              const orderingB = b?.ordering ?? 0;
              if (orderingA == orderingB) {
                return new Date(a.start_date ?? "").getTime() - new Date(b.start_date ?? "").getTime();
              } else {
                return orderingA - orderingB;
              }
            })
            ?.map((s, i) => {
              const displayDate = formatDateRange(s?.start_date ?? "", s.end_date ?? "");
              const endDate = new Date(s.end_date ?? "")
              const expired = new Date() > endDate;
              const isLast = i + 1 == scheduleEvent?.schedules.length;
              return (
                <div
                  id={`parent-${i}`}
                  key={i}
                  className={cn(
                    "relative flex flex-row items-center gap-6 text-smart-cbt-green",
                    expired && "text-smart-cbt-dark-grey"
                  )}
                >
                  <div
                    className={cn(
                      `relative flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 align-middle ${
                        isLast ? "border-smart-cbt-orange bg-[#fff7e6]" : "border-smart-cbt-green bg-white "
                      } text-center`,
                      expired && "border-smart-cbt-dark-grey bg-smart-cbt-light-grey"
                    )}
                  >
                    {isLast ? (
                      <Announcement
                        className={cn("h-6 w-6 text-smart-cbt-orange", expired && "text-smart-cbt-dark-grey")}
                      />
                    ) : (
                      <h1 className={cn("text-4xl", AudiowideFont.className)}>{i + 1}</h1>
                    )}
                    {!isLast && (
                      <div
                        className={cn(
                          `absolute left-1/2 top-full h-32 -translate-x-1/2 border border-smart-cbt-green xl:h-[90px]`,
                          expired && "border-smart-cbt-dark-grey"
                        )}
                      />
                    )}
                  </div>
                  <div className="flex max-w-xs  flex-col gap-4 xl:max-w-md">
                    <h2
                      className={cn(
                        `text-xl font-semibold ${isLast ? "text-[#613400]" : ""}`,
                        expired && "text-smart-cbt-dark-grey"
                      )}
                    >
                      {displayDate}
                    </h2>
                    <span
                      className={cn(
                        `text-sm ${isLast ? "text-smart-cbt-orange" : ""}`,
                        expired && "text-smart-cbt-dark-grey"
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TravelMartScheduleEvent;
