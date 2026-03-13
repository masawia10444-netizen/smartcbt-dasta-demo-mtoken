import { CallIcon, ProfileIcon } from "@/components/Icon";
import { CommunityDetail } from "@/models/travel-mart/travel-mart-community";
import { useTranslations } from "next-intl";

type ContactLayoutProps = {
  contacts: any[] | null;
};

const ContactLayout = (props: ContactLayoutProps) => {
  const { contacts } = props;
  if (!contacts || contacts.length === 0) return <div>-</div>;
  return (
    <div>
      {contacts.map((value, index) => (
        <div key={index}>
          <div className="flex flex-row items-center gap-4">
            <ProfileIcon />
            {((value.firstname || "") + " " + (value.lastname || "")).trim() || "-"}
          </div>
          <div className="flex flex-row items-center gap-4">
            <CallIcon />
            {value.mobile ?? "-"}
          </div>
        </div>
      ))}
    </div>
  );
};

type CommunityDetailContactProps = {
  community: CommunityDetail;
};

export const CommunityDetailContact = (props: CommunityDetailContactProps) => {
  const t = useTranslations("common");
  const { community } = props;
  const { contacts, tour_agent } = community;
  return (
    <div className="bg-smart-cbt-cyan">
      <div className="flex flex-col items-center gap-6 px-4 py-9 md:container md:mx-auto">
        <h1 className="text-xl font-bold text-white">{t("community.detail.contactInformation")}</h1>
        <div className="flex w-full flex-col justify-evenly gap-4 text-white md:flex-row md:gap-0">
          <div className="flex flex-col gap-4">
            <div>{t("community.detail.coordinatorInformation")}</div>
            <ContactLayout contacts={contacts ?? []} />
          </div>
          <div className="flex flex-col gap-4">
            <div>{t("community.detail.travelProgramBookingContactInformation")}</div>
            <ContactLayout contacts={tour_agent ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
};
