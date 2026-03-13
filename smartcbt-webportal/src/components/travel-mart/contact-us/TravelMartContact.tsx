import { useTranslations } from "next-intl";

type TravelMartContactProps = {
  name: string;
  position?: string | null;
  phoneNumber: string;
  email: string;
};

const TravelMartContact = ({ name, position, phoneNumber, email }: TravelMartContactProps) => {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center gap-6 px-24">
      <div className="text-base font-normal text-smart-cbt-dark-green">{name}</div>
      {position && <div className="text-sm font-normal text-smart-cbt-green">{position}</div>}
      <div className="text-sm font-normal text-smart-cbt-dark-green">
        {t("travelMart.contactUs.phoneNumber", { phoneNumber: phoneNumber })}
      </div>
      <div className="text-sm font-normal text-smart-cbt-dark-green">
        {t("travelMart.contactUs.email", { email: email })}
      </div>
    </div>
  );
};

export default TravelMartContact;
