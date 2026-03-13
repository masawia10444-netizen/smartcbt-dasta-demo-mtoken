import { Button } from "@/components/Button";
import { ArrowLeftIcon, EyeIcon, PencilIcon, SaveDiskIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import TravelMartStep from "@/components/travel-mart/step/TravelMartStep";
import { AppContext } from "@/contexts/App.context";
import { CommunityForm, CommunityOption, Facility } from "@/models/travel-mart/travel-mart-community";
import { District, Subdistrict } from "@/models/travel-mart/travel-mart-countries";
import { customZodResolver } from "@/schemas/base-schema";
import {
  CommunityInfoCreateSchema,
  communityInfoCreateSchema,
} from "@/schemas/forms/community-info/create/community-info-create-schema";
import { Step2Schema, step2Schema } from "@/schemas/forms/community-info/create/community-info-create-schema-step2";
import { Step3Schema, step3Schema } from "@/schemas/forms/community-info/create/community-info-create-schema-step3";
import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation/provinces";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createCommunityAction, updateCommunityAction } from "../action";
import { CommunityInfoConfirmPopup } from "./CommunityInfoConfirmPopup";
import { CommunityInfoErrorPopup } from "./CommunityInfoErrorPopup";
import { CommunityInfoNextPageButton } from "./CommunityInfoNextPageButton";
import { CommunityInfoSuccessPopup } from "./CommunityInfoSuccessPopup";
import { CommunityInfoStep1Form } from "./step1/CommunityInfoStep1Form";
import { CommunityInfoStep2Form } from "./step2/CommunityInfoStep2Form";
import { CommunityInfoStep3Form } from "./step3/CommunityInfoStep3Form";

type CommunityInfoFormProps = {
  communityForm?: CommunityForm | null;
  months: CommunityOption[];
  step2: Step2Schema;
  step3: Step3Schema;
  openPreviewMode: (communityForm: CommunityForm) => void;
};

export const CommunityInfoForm = (props: CommunityInfoFormProps) => {
  const router = useRouter();
  const t = useTranslations("common");
  const { districts, provinces, subdistricts } = useContext(AppContext);

  const [showCommunityInfoAddConfirmPopup, setShowCommunityInfoAddConfirmPopup] = useState<CommunityForm | null>();
  const [showCommunityInfoUpdateConfirmPopup, setShowCommunityInfoUpdateConfirmPopup] =
    useState<CommunityForm | null>();
  const [showCommunityInfoDraftConfirmPopup, setShowCommunityInfoDraftConfirmPopup] = useState<CommunityForm | null>();
  const [showCommunityInfoSuccessPopup, setShowCommunityInfoSuccessPopup] = useState<string | null>(null);
  const [showCommunityInfoErrorPopup, setShowCommunityInfoErrorPopup] = useState<string | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  const viewMode = useSearchParams().get("mode");
  const seasonsMapped = props.months.map((value) => ({ id: value.id ?? 0, value: false }));
  const areFieldsDisabled = id !== undefined ? viewMode !== "edit" : false;

  const stateMenu = [
    {
      id: 1,
      label: t("community.info.create.step1.stepTitle"),
      content: (
        <CommunityInfoStep1Form
          communityForm={props.communityForm}
          months={props.months}
          areFieldsDisabled={areFieldsDisabled}
        />
      ),
    },
    {
      id: 2,
      label: t("community.info.create.step2.stepTitle"),
      content: <CommunityInfoStep2Form communityForm={props.communityForm} areFieldsDisabled={areFieldsDisabled} />,
    },
    {
      id: 3,
      label: t("community.info.create.step3.stepTitle"),
      content: <CommunityInfoStep3Form areFieldsDisabled={areFieldsDisabled} />,
    },
  ];

  const formContext = useForm<CommunityInfoCreateSchema>({
    resolver: customZodResolver(communityInfoCreateSchema),
    defaultValues: {
      step1: {
        coordinators: props.communityForm?.contact_points
          ? props.communityForm.contact_points.map((value) => ({
              firstname: value.firstname ?? "",
              lastname: value.lastname ?? "",
              mobile: value.mobile ?? "",
              email: value.email ?? "",
              line: value.line ?? "",
            }))
          : [{}],
        travelBookingContacts: props.communityForm?.tour_agents
          ? props.communityForm.tour_agents.map((value) => ({
              firstname: value.firstname ?? "",
              lastname: value.lastname ?? "",
              mobile: value.mobile ?? "",
            }))
          : [{ firstname: "", lastname: "", mobile: "" }],
        activity: {
          activities: [],
          tourismProducts: [],
          foodMenus: [],
          standardsOrAwards: [],
        },
        media: { images: [], videos: [], featuredImage: null },
        tags: [],
      },
      step2: step2Schema.parse(props.step2),
      step3: step3Schema.parse(props.step3),
    },
  });

  const {
    setValue,
    getValues,
    formState: { errors },
  } = formContext;

  const onHandlePrevious = async () => {
    if (activeStep == 0) router.push("/travel-mart/community-infos");
    else setActiveStep(activeStep - 1);
  };

  const onHandleNext = async () => {
    if (!areFieldsDisabled) {
      const stepValidation = `step${activeStep + 1}` as any;
      const isValid = await formContext.trigger([stepValidation]);
      if (!isValid) return;
    }
    if (activeStep === 2) {
      const communityForm = getCommunityInfo();
      if (id == null) setShowCommunityInfoAddConfirmPopup(communityForm);
      else setShowCommunityInfoUpdateConfirmPopup(communityForm);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const renderStep1Data = (communityForm: CommunityForm) => {
    // Coordinators
    communityForm.contact_points &&
      setValue(
        "step1.coordinators",
        communityForm.contact_points.map((value) => ({
          firstname: value.firstname ?? "",
          lastname: value.lastname ?? "",
          mobile: value.mobile ?? "",
          email: value.email ?? "",
          line: value.line ?? "",
        }))
      );

    // Community Info
    communityForm.title && setValue(`step1.community.name`, communityForm.title);
    communityForm.address_info?.address && setValue(`step1.community.address`, communityForm.address_info?.address);
    communityForm.address_info?.postal_code &&
      setValue(`step1.community.postcode`, communityForm.address_info?.postal_code);
    if (communityForm.address_info?.province_id) {
      const province = provinces.find((value: ProvinceJSONData) => value.id == communityForm.address_info?.province_id);
      province && setValue(`step1.community.province`, { id: province.id ?? 0, title: province.title ?? "" });
    }
    if (communityForm.address_info?.district_id) {
      const district = districts.find((value: District) => value.id == communityForm.address_info?.district_id);
      district && setValue(`step1.community.district`, { id: district.id ?? 0, title: district.title ?? "" });
    }
    if (communityForm.address_info?.sub_district_id) {
      const subdistrict = subdistricts.find(
        (value: Subdistrict) => value.id == communityForm.address_info?.sub_district_id
      );
      subdistrict &&
        setValue(`step1.community.subdistrict`, {
          id: subdistrict.id ?? 0,
          title: subdistrict.title ?? "",
          postal: (subdistrict as any).postal,
        });
    }

    // Commmunity Detail
    communityForm?.description && setValue("step1.detail", communityForm.description);

    communityForm.tourism_activities?.forEach((tourismActivity, i) => {
      tourismActivity && setValue(`step1.activity.activities.${i}.title`, tourismActivity?.title ?? "");
    });
    communityForm.tourism_products?.forEach((tourismProduct, i) => {
      tourismProduct && setValue(`step1.activity.tourismProducts.${i}.title`, tourismProduct?.title ?? "");
    });
    communityForm.food_menus?.forEach((foodMenu, i) => {
      foodMenu && setValue(`step1.activity.foodMenus.${i}.title`, foodMenu?.title ?? "");
    });
    communityForm.awards?.forEach((award, i) => {
      award && setValue(`step1.activity.standardsOrAwards.${i}.title`, award?.title ?? "");
    });
    if (communityForm.traveling_recommended_during) {
      communityForm.traveling_recommended_during.forEach((recommendedSeasonId) => {
        const index = seasonsMapped.findIndex((value) => value.id === recommendedSeasonId);
        if (index !== -1) setValue(`step1.activity.season.${index}.value`, true);
      });
    }
    communityForm.tourism_activities_prices &&
      setValue("step1.activity.activityPrice", communityForm.tourism_activities_prices);
    communityForm.tourist_accomodate_min &&
      setValue("step1.activity.accommodateMin", communityForm.tourist_accomodate_min);
    communityForm.tourist_accomodate_max &&
      setValue("step1.activity.accommodateMax", communityForm.tourist_accomodate_max);
    communityForm.community_way_of_life && setValue("step1.activity.lifestyle", communityForm.community_way_of_life);
    communityForm.community_local_language &&
      setValue("step1.activity.language", communityForm.community_local_language);
    communityForm.highlight && setValue("step1.activity.communityHighlights", communityForm.highlight);

    // TODO: Hx asked to remove this
    // setValue("step1.activity.organizationalUnit", activity?.organizationalUnit ?? "");

    communityForm.featured_image &&
      setValue("step1.media.featuredImage", {
        id: communityForm.featured_image.id ?? "",
        url: communityForm.featured_image.url ?? "",
        type: communityForm.featured_image.type ?? "",
      });
    communityForm.gallery_infos &&
      setValue(
        "step1.media.images",
        communityForm.gallery_infos.map((value) => {
          return { id: value.id ?? "", url: value.url ?? "", type: value.type ?? "" };
        })
      );
    communityForm.video_infos &&
      setValue(
        "step1.media.videos",
        communityForm.video_infos.map((value) => {
          return { id: value.id ?? "", url: value.url ?? "", type: value.type ?? "" };
        })
      );

    // Tour
    communityForm.tour_agents &&
      setValue(
        "step1.travelBookingContacts",
        communityForm.tour_agents.map((value) => ({
          firstname: value.firstname ?? "",
          lastname: value.lastname ?? "",
          mobile: value.mobile ?? "",
        }))
      );

    if (communityForm.presentations) {
      setValue("step1.presentation.hasDocument", true);
      setValue("step1.presentation.documents", {
        id: communityForm.presentations,
        url: communityForm.presentations,
        type: "",
      });
    }

    // Presentation
    if (communityForm.presentation_video) {
      setValue("step1.presentation.hasYoutube", true);
      setValue("step1.presentation.youtubeLink", communityForm.presentation_video);
    }
    if (communityForm.presentation_facebook) {
      setValue("step1.presentation.hasFacebook", true);
      setValue("step1.presentation.facebookLink", communityForm.presentation_facebook);
    }
    if (communityForm.presentation_instagram) {
      setValue("step1.presentation.hasInstagram", true);
      setValue("step1.presentation.instagramLink", communityForm.presentation_instagram);
    }
    if (communityForm.presentation_tiktok) {
      setValue("step1.presentation.hasTiktok", true);
      setValue("step1.presentation.tiktokLink", communityForm.presentation_tiktok);
    }
    if (communityForm.presentation_other) {
      setValue("step1.presentation.hasOther", true);
      setValue("step1.presentation.other", communityForm.presentation_other);
    }
  };

  const renderStep2Data = (step2Schema: Step2Schema, communityForm: CommunityForm) => {
    if (!communityForm.facilities) return;
    communityForm.facilities.forEach((facility) => {
      const index = step2Schema.findIndex((value) => value.facility?.id === facility.facility);
      if (index !== -1) {
        setValue(`step2.${index}.facility.isEnabled`, true);
        facility.quantity && setValue(`step2.${index}.facility.quantity`, facility.quantity);
        facility.size && setValue(`step2.${index}.facility.size`, facility.size);
      } else {
        const parentIndex = step2Schema.findIndex(
          (value) => value.type == "group" && value.facilities?.find((value2) => value2.id == facility.facility)
        );
        if (parentIndex == -1) return;

        const childIndex = step2Schema[parentIndex].facilities?.findIndex((value) => value.id == facility.facility);
        if (childIndex == -1) return;

        setValue(`step2.${parentIndex}.isEnabled`, true);
        setValue(`step2.${parentIndex}.facilities.${childIndex!}.isEnabled`, true);
        facility.quantity && setValue(`step2.${parentIndex}.facilities.${childIndex!}.quantity`, facility.quantity);
        facility.size && setValue(`step2.${parentIndex}.facilities.${childIndex!}.size`, facility.size);
      }
    });
  };

  const renderStep3Data = (communityForm: CommunityForm) => {
    // Step3-1
    const step31Values: Record<string, any> = {};
    communityForm.tourist_target_groups?.map((value) => {
      if (!value) return;
      step31Values[value.toString()] = { value: value.toString() };
    });
    setValue("step3.1.value", step31Values);

    // Step3-2-1
    const step321Values: Record<string, any> = {};
    communityForm.tourist_travel_regions?.map((value) => {
      if (!value) return;
      step321Values[value.toString()] = { value: value.toString() };
    });
    setValue("step3.2-1.value", step321Values);

    // Step3-2-2
    const step322Values: Record<string, any> = {};
    communityForm.tourist_travel_countries?.map((value) => {
      if (!value) return;
      step322Values[value.toString()] = { value: value.toString() };
    });
    setValue("step3.2-2.value", step322Values);

    // Step3-2-3
    const step323Values: Record<string, any> = {};
    communityForm.attraction_type?.map((value) => {
      if (!value) return;
      step323Values[value.toString()] = { value: value.toString() };
    });
    setValue("step3.2-3.value", step323Values);
  };

  const getCommunityInfo = (): CommunityForm => {
    const facilities: Facility[] = [];
    getValues("step2").forEach((entry) => {
      if (entry.type === "none") {
        const { id, size, quantity, isEnabled } = entry.facility || {};
        if (isEnabled) {
          facilities.push({
            facility: id!,
            size: size ?? null,
            quantity: quantity ?? null,
          });
        }
      } else {
        const subFacilities = entry.facilities || [];
        subFacilities.forEach((facility) => {
          const { id, size, quantity, isEnabled } = facility || {};
          if (isEnabled) {
            facilities.push({
              facility: id,
              size: size ?? null,
              quantity: quantity ?? null,
            });
          }
        });
      }
    });

    return {
      // Step1
      contact_points: getValues("step1.coordinators"),
      title: getValues("step1.community.name"),
      description: getValues("step1.detail"),
      address_info: {
        address: getValues("step1.community.address"),
        province_id: getValues("step1.community.province.id"),
        district_id: getValues("step1.community.district.id"),
        sub_district_id: getValues("step1.community.subdistrict.id"),
        postal_code: getValues("step1.community.postcode"),
      },
      tourism_activities: getValues("step1.activity.activities"),
      tourism_products: getValues("step1.activity.tourismProducts"),
      food_menus: getValues("step1.activity.foodMenus"),
      awards: getValues("step1.activity.standardsOrAwards"),
      traveling_recommended_during: getValues("step1.activity.season")
        .filter((value: any) => value.value == true)
        .map((value: any) => value.id),
      tourism_activities_prices: getValues("step1.activity.activityPrice"),
      tourist_accomodate_min: getValues("step1.activity.accommodateMin"),
      tourist_accomodate_max: getValues("step1.activity.accommodateMax"),
      community_way_of_life: getValues("step1.activity.lifestyle"),
      highlight: getValues("step1.activity.communityHighlights"),
      community_local_language: getValues("step1.activity.language"),
      tour_agents: getValues("step1.travelBookingContacts"),
      featured_image: getValues("step1.media.featuredImage"),
      galleries: [],
      gallery_infos: getValues("step1.media.images") ?? [],
      videos: [],
      video_infos: getValues("step1.media.videos") ?? [],
      presentations: getValues("step1.presentation.hasDocument") ? getValues("step1.presentation.documents.id") : "",
      presentation_video: getValues("step1.presentation.hasYoutube") ? getValues("step1.presentation.youtubeLink") : "",
      presentation_facebook: getValues("step1.presentation.hasFacebook")
        ? getValues("step1.presentation.facebookLink")
        : "",
      presentation_instagram: getValues("step1.presentation.hasInstagram")
        ? getValues("step1.presentation.instagramLink")
        : "",
      presentation_tiktok: getValues("step1.presentation.hasTiktok") ? getValues("step1.presentation.tiktokLink") : "",
      presentation_other: getValues("step1.presentation.hasOther") ? getValues("step1.presentation.other") : "",
      // Step2
      facilities: facilities,
      // Step3
      tourist_target_groups: Object.keys(getValues("step3.1.value")).map(Number),
      attraction_type: Object.keys(getValues("step3.2-3.value")).map(Number),
      tourist_travel_countries: Object.keys(getValues("step3.2-2.value")).map(Number),
      tourist_travel_regions: Object.keys(getValues("step3.2-1.value")).map(Number),
    };
  };

  useEffect(() => {
    // Activity
    const seasonsMapped = props.months.map((value) => ({ id: value.id ?? 0, value: false }));
    setValue("step1.activity.season", seasonsMapped);

    if (!props.communityForm) return;
    renderStep1Data(props.communityForm);
    renderStep2Data(props.step2, props.communityForm);
    renderStep3Data(props.communityForm);
  }, []);

  return (
    <div className="px-4 py-6 md:container md:mx-auto">
      <div className="flex w-full flex-1 flex-col gap-4">
        <FormProvider {...formContext}>
          <div className="flex justify-between ">
            <div>
              <Button intent={"text"} size="small" icon={<ArrowLeftIcon />} onClick={onHandlePrevious}>
                {t("global.back")}
              </Button>
            </div>
            <div className="flex items-center gap-6 md:justify-end">
              {/* TODO: Need to find the key for the status in CommunityForm */}
              {/* {props.community?.status != MockActivityStatus.WaitingForApprove && (
                <NextLink
                  className={`rounded-3xl ${!areFieldsDisabled ? "hidden" : ""}`}
                  intent="whiteButtonBordered"
                  icon={<PencilIcon />}
                  href={`/travel-mart/community-infos/${id}?mode=edit`}
                >
                  {t("community.info.create.edit")}
                </NextLink>
              )} */}
              <NextLink
                className={`rounded-3xl ${!areFieldsDisabled ? "hidden" : ""}`}
                intent="whiteButtonBordered"
                icon={<PencilIcon />}
                href={`/travel-mart/community-infos/${id}?mode=edit`}
              >
                {t("community.info.create.edit")}
              </NextLink>
              <Button
                className="rounded-3xl"
                intent="secondary"
                size="small"
                icon={<EyeIcon />}
                onClick={async () => props.openPreviewMode(getCommunityInfo())}
              >
                {t("community.info.create.view")}
              </Button>
              <Button
                className={`rounded-3xl ${areFieldsDisabled ? "hidden" : ""}`}
                intent="secondary"
                size="small"
                icon={<SaveDiskIcon />}
                onClick={async () => setShowCommunityInfoDraftConfirmPopup(getCommunityInfo())}
              >
                {t("community.info.create.save")}
              </Button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 ">
            <h1 className="text-xl font-bold text-smart-cbt-dark-green"> {t("community.info.title")}</h1>
            {/* TODO: Find the status in CommunityForm */}
            {/* <CommunityInfoFormStatus community={props.community} /> */}
          </div>
          <TravelMartStep stateMenu={stateMenu} activeStep={stateMenu[activeStep].id} />
          <CommunityInfoNextPageButton
            onNextButtonClicked={onHandleNext}
            currentIndex={stateMenu[activeStep].id}
            total={stateMenu.length}
            isSubmitButtonHidden={areFieldsDisabled}
          />
          {showCommunityInfoAddConfirmPopup != null && (
            <CommunityInfoConfirmPopup
              isOpen={showCommunityInfoAddConfirmPopup != null}
              message={t("community.info.popup.addCommunityInfoConfirm.title")}
              onClose={() => setShowCommunityInfoAddConfirmPopup(null)}
              onConfirm={async () => {
                setShowCommunityInfoAddConfirmPopup(null);
                const { error } = await createCommunityAction(showCommunityInfoAddConfirmPopup, true);
                if (error) setShowCommunityInfoErrorPopup(error.toString());
                else setShowCommunityInfoSuccessPopup(t("community.info.popup.addCommunityInfoSuccess.title"));
              }}
            />
          )}
          {showCommunityInfoUpdateConfirmPopup != null && (
            <CommunityInfoConfirmPopup
              isOpen={showCommunityInfoUpdateConfirmPopup != null}
              message={t("community.info.popup.updateCommunityInfoConfirm.title")}
              onClose={() => setShowCommunityInfoUpdateConfirmPopup(null)}
              onConfirm={async () => {
                setShowCommunityInfoUpdateConfirmPopup(null);
                if (!id) return;
                const { error } = await updateCommunityAction(Number(id), showCommunityInfoUpdateConfirmPopup, true);
                if (error) setShowCommunityInfoErrorPopup(error.toString());
                else setShowCommunityInfoSuccessPopup(t("community.info.popup.updateCommunityInfoSuccess.title"));
              }}
            />
          )}
          {showCommunityInfoDraftConfirmPopup != null && (
            <CommunityInfoConfirmPopup
              isOpen={showCommunityInfoDraftConfirmPopup != null}
              message={t("community.info.popup.draftCommunityInfoConfirm.title")}
              onClose={() => setShowCommunityInfoDraftConfirmPopup(null)}
              onConfirm={async () => {
                setShowCommunityInfoDraftConfirmPopup(null);
                if (!id) {
                const { error } = await createCommunityAction(showCommunityInfoDraftConfirmPopup, false);
                if (error) setShowCommunityInfoErrorPopup(error.toString());
                else setShowCommunityInfoSuccessPopup(t("community.info.popup.draftCommunityInfoSuccess.title"));
                } else {
                  const { error } = await updateCommunityAction(Number(id), showCommunityInfoDraftConfirmPopup, false);
                  if (error) setShowCommunityInfoErrorPopup(error.toString());
                  else setShowCommunityInfoSuccessPopup(t("community.info.popup.draftCommunityInfoSuccess.title"));
                }
              }}
            />
          )}
          {showCommunityInfoSuccessPopup && (
            <CommunityInfoSuccessPopup
              isOpen={showCommunityInfoSuccessPopup != null}
              message={showCommunityInfoSuccessPopup}
              onClose={() => {
                setShowCommunityInfoSuccessPopup(null);
                router.push("/travel-mart/community-infos");
              }}
            />
          )}
          {showCommunityInfoErrorPopup && (
            <CommunityInfoErrorPopup
              isOpen={showCommunityInfoErrorPopup != null}
              message={showCommunityInfoErrorPopup}
              onClose={() => setShowCommunityInfoErrorPopup(null)}
            />
          )}
        </FormProvider>
      </div>
    </div>
  );
};
