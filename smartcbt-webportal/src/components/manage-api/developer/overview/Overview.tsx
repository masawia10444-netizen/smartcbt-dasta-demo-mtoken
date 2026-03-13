import { useTranslations } from "next-intl";
import Image from "@/components/image";

export default function Overview() {
  const t = useTranslations("common");

  return (
    <>
      <div className="mb-3 text-2xl font-medium text-smart-cbt-dark-green">
        {t("manageApi.developerOverview.title")}
      </div>
      <div className="flex text-smart-cbt-very-dark-grey">{t("manageApi.developerOverview.description")}</div>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {mockUpFeatures.map((feature) => (
          <div key={feature.key} className="flex w-full flex-col items-center p-4 text-center md:w-1/2">
            <div className="my-4 h-[150px] w-[150px] rounded-full bg-smart-cbt-very-light-green p-[25px]">
              <Image
                src={feature.image}
                alt={feature.title}
                width={100}
                height={100}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="my-4 text-md font-medium text-smart-cbt-dark-green">{t(feature.title)}</div>
            <div className="text-smart-cbt-very-dark-grey">{feature.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

const mockUpFeatures = [
  {
    key: "sia-sroi",
    title: "mainMenu.siaSroi",
    image: "/images/shared/sia-sroi.png",
    description:
      "การประเมินผลกระทบทางสังคม และผลตอบแทนทางสังคมจากการ ลงทุนโครงการใช้สำหรับนำมาวิเคราะห์ความคุ้มค่าของการสนับสนุนงบประมาณขององค์การให้สามารถสร้างผลตอบแทนคืนสู่สังคมได้อย่างคุ้มค่า",
  },
  {
    key: "carbon-footprint",
    title: "mainMenu.carbonFootprint",
    image: "/images/shared/carbon-footprint.png",
    description:
      "เป็นการประเมินค่าการปลดปล่อยคาร์บอนไดออกไซด์ของกิจกรรมที่เกิดขึ้นจากชุมชนเป้าหมายของทาง อพท. ที่ช่วยให้ผู้ใช้งานได้ประเมินกิจกรรมของตนเอง ที่จะช่วยให้กิจกรรมของชุมชนนั้นเป็นส่วนหนึ่งที่สนับสนุนการลดภาวะโลกร้อน",
  },
  {
    key: "travelMart",
    title: "mainMenu.travelMart",
    image: "/images/shared/travel-mart.png",
    description:
      "ช่องทางสำหรับการสร้างเสริมโอกาสและเพิ่มศักยภาพทางธุรกิจท่องเที่ยว ให้กับทางวิสาหกิจชุมชนและผู้ประกอบการธุรกิจท่องเที่ยวพร้อมระบบ Recommended List เพื่อตอบโจทย์ความต้องการสำหรับการแนะนำคู่ค้าทางธุรกิจ",
  },
  {
    key: "photoBank",
    title: "mainMenu.photoBank",
    image: "/images/shared/photo-bank.png",
    description:
      "ระบบจัดเก็บคลังภาพภายใต้การดูแลของ องค์การบริหารการพัฒนาพื้นที่พิเศษ จัดทำขึ้นเพื่ออำนวยความสะดวกแก่เจ้าหน้าที่และบุคคลที่เชื่อมโยงกับระบบ พร้อมช่องทางการอัปโหลดภาพสำหรับช่างภาพที่ร่วมกิจกรรมกับทางอพท.",
  },
];
