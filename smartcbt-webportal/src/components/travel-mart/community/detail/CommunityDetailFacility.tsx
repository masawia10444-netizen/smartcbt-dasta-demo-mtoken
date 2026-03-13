import { CommunityDetail } from "@/models/travel-mart/travel-mart-community";
import { useTranslations } from "next-intl";
import Image from "@/components/image";

const homestayIcon = "/images/travel-mart/community/homestay-icon.png";
const parkingIcon = "/images/travel-mart/community/parking-icon.png";
const cctvIcon = "/images/travel-mart/community/cctv-icon.png";
const restroomIcon = "/images/travel-mart/community/restroom-icon.png";
const meetingRoomIcon = "/images/travel-mart/community/meeting-room-icon.png";
const wifiIcon = "/images/travel-mart/community/wifi-icon.png";
const electricityIcon = "/images/travel-mart/community/electricity-icon.png";
const tapWaterIcon = "/images/travel-mart/community/tap-water-icon.png";
const souvenirShopIcon = "/images/travel-mart/community/souvenir-shop-icon.png";
const convenienceStoreIcon = "/images/travel-mart/community/convenience-store-icon.png";
const guideIcon = "/images/travel-mart/community/guide-icon.png";
const facilitiesDisabilityIcon = "/images/travel-mart/community/facilities-disability-icon.png";
const boatIcon = "/images/travel-mart/community/boat-icon.png";
const motorcycleIcon = "/images/travel-mart/community/motorcycle-icon.png";
const carIcon = "/images/travel-mart/community/car-icon.png";
const vanIcon = "/images/travel-mart/community/van-icon.png";
const tourBusIcon = "/images/travel-mart/community/tour-bus-icon.png";
const otherTransportationIcon = "/images/travel-mart/community/other-transportation-icon.png";

type FacilityLayoutProps = {
  icon: string;
  title: string;
  content?: string;
};

const FacilityLayout = (props: FacilityLayoutProps) => {
  const { icon, title, content } = props;

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row">
      <div className="relative h-16 w-16">
        <Image fill src={icon} alt={title} style={{ objectFit: "cover" }} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold text-smart-cbt-dark-green md:text-xl">{title}</div>
        {content && <div className="text-base text-smart-cbt-dark-green">{content}</div>}
      </div>
    </div>
  );
};

type CommunityDetailFacilityProps = {
  community: CommunityDetail;
};

export const CommunityDetailFacility = (props: CommunityDetailFacilityProps) => {
  const t = useTranslations("common");
  const { community } = props;

  const getIconById = (id: number): string => {
    switch (id) {
      case 1:
        return homestayIcon;
      case 2:
        return boatIcon;
      case 3:
        return motorcycleIcon;
      case 4:
        return carIcon;
      case 5:
        return vanIcon;
      case 6:
        return tourBusIcon;
      case 7:
        return parkingIcon;
      case 8:
        return "";
      case 9:
        return wifiIcon;
      case 10:
        return restroomIcon;
      case 11:
        return meetingRoomIcon;
      case 12:
        return guideIcon;
      case 13:
        return facilitiesDisabilityIcon;
      case 14:
        return electricityIcon;
      case 15:
        return tapWaterIcon;
      case 16:
        return souvenirShopIcon;
      case 17:
        return convenienceStoreIcon;
      case 18:
        return cctvIcon;
      default:
        return "";
    }
  };

  const noGroupFacilities: any[] = (community.facilities ?? [])
    .filter((value: any) => value.group === null)
    .sort((a: any, b: any) => (a.id ?? 0) - (b.id ?? 0));

  const groupFacilities: any[] = (community.facilities ?? [])
    .filter((value: any) => value.group !== null)
    .sort((a: any, b: any) => (a.id ?? 0) - (b.id ?? 0));

  const allGroupFacilities: { [key: string]: any[] } = groupFacilities.reduce(
    (acc: { [key: string]: any[] }, facility: any) => {
      const groupId = facility.group?.title || "Unknown";
      acc[groupId] = acc[groupId] ? [...acc[groupId], facility] : [facility];
      return acc;
    },
    {}
  );

  return (
    <div className="bg-smart-cbt-light-green">
      <div className="flex flex-col gap-12 px-4 py-9 md:container md:mx-auto">
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("community.detail.facility")}</h1>
        <div className="grid grid-cols-3 gap-x-4 gap-y-12">
          {noGroupFacilities.map((value: any, index) => {
            let quantity = value.quantity_flag ? `${value.quantity} ${value.unit_quantity}` : "";
            let size = value.size_flag ? `${t("community.detail.capacity")} ${value.size} ${value.unit_size}` : "";
            const content = `${quantity} ${size}`;
            return <FacilityLayout key={index} icon={getIconById(value.id)} title={value.title} content={content} />;
          })}
        </div>
        {Object.keys(allGroupFacilities).map((groupName: string) => {
          const facilities = allGroupFacilities[groupName];
          return (
            <div key={groupName} className="flex flex-col gap-12">
              <h1 className="text-xl font-bold text-smart-cbt-dark-green">{groupName}</h1>
              <div className="grid grid-cols-3 gap-x-4 gap-y-12">
                {facilities.map((value: any, index: number) => {
                  let quantity = value.quantity_flag ? `${value.quantity} ${value.unit_quantity}` : "";
                  let size = value.size_flag
                    ? `${t("community.detail.capacity")} ${value.size} ${value.unit_size}`
                    : "";
                  const content = `${quantity} ${size}`;
                  return (
                    <FacilityLayout key={index} icon={getIconById(value.id)} title={value.title} content={content} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
