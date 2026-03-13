import { BusinessSupport } from "@/models/travel-mart/travel-mart-business-support";

type TravelMartBusinessSupportProps = {
  businessSupport?: BusinessSupport;
};

const TravelMartBusinessSupport = ({ businessSupport }: TravelMartBusinessSupportProps) => {
  const doNotHaveContent = `<h1 style="text-align: center; font-size: 2rem;"><span style="color: rgb(0, 94, 56);">ไม่มีข้อมูล</span></h1>`;

  return (
    <div className="p-5 md:p-10">
      <div dangerouslySetInnerHTML={{ __html: businessSupport?.content ?? doNotHaveContent }} />
    </div>
  );
};

export default TravelMartBusinessSupport;
