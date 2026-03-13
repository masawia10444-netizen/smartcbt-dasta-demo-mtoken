import { DeleteIcon, PhDotsSixVerticalBoldIcon } from "@/components/Icon";

import CollapseSection from "@/components/CollapseSection";
import { FormFieldError } from "@/components/form/FormFieldError";
import FormTimePicker, { convertTimeStringToDate } from "@/components/form/FormTimePicker";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { cn } from "@/utils/cn";
import { PlusIcon } from "@heroicons/react/24/outline";
import { setHours, setMinutes } from "date-fns";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from "react-hook-form";
import { StrictModeDroppable } from "./StrictModeDroppable";

// please see this issue for more details
// https://github.com/recharts/recharts/issues/3615

interface TravelPlanActivityDetailsProps {
  index: number;
  onClickRemoveButton: () => void;
}
const TravelPlanActivityDetails = (props: TravelPlanActivityDetailsProps) => {
  const { index, onClickRemoveButton } = props;
  const t = useTranslations("common");

  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<TravelProgramSchema>();
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: `travelPlans.${index}.activities`,
  });

  const handleDrag = (dropResult: DropResult) => {
    const { source, destination, type } = dropResult;
    if (destination) {
      move(source.index, destination.index);
    }
  };

  return (
    <CollapseSection
      defaultOpen
      title={`${t("carbon.create.day")} ${index + 1}`}
      showDelete
      onClickRemoveButton={onClickRemoveButton}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 overflow-auto">
          <DragDropContext onDragEnd={handleDrag}>
            <StrictModeDroppable droppableId="droppable">
              {(provided) => (
                <div className="flex w-full flex-col gap-4" {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="flex w-full gap-[90px] whitespace-nowrap">
                    <span className="ml-14 flex-grow">
                      {t("carbon.create.generalInformation.activity.activityName")}
                    </span>
                    {/* startTime */}
                    <div className="flex justify-between gap-6 whitespace-nowrap ">
                      <span className="whitespace-nowrap">
                        {t("carbon.create.generalInformation.activity.startTime")}
                      </span>
                      <span className="whitespace-nowrap">
                        {t("carbon.create.generalInformation.activity.endTime")}
                      </span>
                      <span className="w-[140px]"></span>
                    </div>
                  </div>
                  {fields.map((item, sectionValueIndex) => {
                    const startTimeLast = convertTimeStringToDate(
                      watch(`travelPlans.${index}.activities.${sectionValueIndex}.startTime`)
                    );
                    const timeLast = convertTimeStringToDate(
                      watch(`travelPlans.${index}.activities.${sectionValueIndex - 1}.endTime`)
                    );
                    const endTimeLastHour = timeLast?.getHours();
                    const endTimeLastMinute = timeLast?.getMinutes();

                    const startTimeLastHour = startTimeLast?.getHours();
                    const startTimeLastMinute = startTimeLast?.getMinutes();

                    const minLastTime = setHours(setMinutes(new Date(), endTimeLastMinute ?? 0), endTimeLastHour ?? 0);
                    const minEndTime = setHours(
                      setMinutes(new Date(), startTimeLastMinute ?? 0),
                      startTimeLastHour ?? 0
                    );

                    const maxTime = setHours(setMinutes(new Date(), 55), 23);
                    return (
                      <Draggable
                        key={sectionValueIndex}
                        draggableId={`item-${sectionValueIndex}`}
                        index={sectionValueIndex}
                      >
                        {(provided) => (
                          <Fragment>
                            <div
                              className="flex w-full items-center gap-4"
                              key={item.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.draggableProps}
                            >
                              <div className="flex flex-grow gap-4">
                                <div
                                  className="flex cursor-grabbing items-center justify-stretch gap-2"
                                  {...provided.dragHandleProps}
                                >
                                  <PhDotsSixVerticalBoldIcon className="text-black" />
                                  <label>{sectionValueIndex + 1}</label>
                                </div>
                                <input
                                  className="h-10 flex-grow rounded-md border border-smart-cbt-medium-grey bg-white p-2"
                                  defaultValue={`${item.details}`}
                                  {...register(`travelPlans.${index}.activities.${sectionValueIndex}.details`)}
                                />
                                <div className="flex gap-4 border-r border-smart-cbt-medium-grey pr-4">
                                  <div className="flex items-center justify-between gap-4">
                                    <FormTimePicker
                                      placeholder=""
                                      control={control}
                                      name={`travelPlans.${index}.activities.${sectionValueIndex}.startTime`}
                                      minTime={minLastTime}
                                      maxTime={maxTime}
                                      disabled={getValues(
                                        `travelPlans.${index}.activities.${sectionValueIndex}.noTime`
                                      )}
                                      inputClassName="w-20"
                                    />
                                    <FormTimePicker
                                      placeholder=""
                                      control={control}
                                      name={`travelPlans.${index}.activities.${sectionValueIndex}.endTime`}
                                      minTime={minEndTime}
                                      maxTime={maxTime}
                                      disabled={
                                        getValues(`travelPlans.${index}.activities.${sectionValueIndex}.noTime`) ||
                                        !getValues(`travelPlans.${index}.activities.${sectionValueIndex}.startTime`)
                                      }
                                      inputClassName="w-20"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      id={`travelPlans.${index}.activities.${sectionValueIndex}.noTime`}
                                      type="checkbox"
                                      defaultChecked={getValues(
                                        `travelPlans.${index}.activities.${sectionValueIndex}.noTime`
                                      )}
                                      className={cn("form-checkbox  checked:bg-smart-cbt-green hover:cursor-pointer")}
                                      onChange={(e) => {
                                        setValue(
                                          `travelPlans.${index}.activities.${sectionValueIndex}.noTime`,
                                          e.target.checked
                                        );
                                        setValue(
                                          `travelPlans.${index}.activities.${sectionValueIndex}.startTime`,
                                          null
                                        );
                                        setValue(`travelPlans.${index}.activities.${sectionValueIndex}.endTime`, null);
                                      }}
                                    />
                                    <label
                                      htmlFor={`travelPrograms.${sectionValueIndex}.noTime`}
                                      className="cursor-pointer  text-sm text-black"
                                    >
                                      {"ไม่ระบุเวลา"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <button
                                className="h-5 w-5 whitespace-nowrap"
                                onClick={() => {
                                  remove(sectionValueIndex);
                                }}
                              >
                                <DeleteIcon className="min-w-[20px] text-smart-cbt-red hover:cursor-pointer" />
                              </button>
                            </div>
                            <FormFieldError
                              error={
                                errors.travelPlans?.[index]?.activities?.[sectionValueIndex]?.details?.message ||
                                errors.travelPlans?.[index]?.activities?.[sectionValueIndex]?.startTime?.message
                              }
                            />
                          </Fragment>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
        <button
          type="button"
          onClick={() => {
            append({
              details: "",
              noTime: true,
              startTime: null,
              endTime: null,
              carbonFootprintActivities: [],
            });
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-smart-cbt-dark-grey p-2 text-smart-cbt-dark-grey lg:w-[33%]"
        >
          <PlusIcon className="h-6 w-6" />
          {t("carbon.create.generalInformation.activity.addActivity")}
        </button>
        <FormFieldError error={errors.travelPlans?.[index]?.activities?.message} />
      </div>
    </CollapseSection>
  );
};

export default TravelPlanActivityDetails;
