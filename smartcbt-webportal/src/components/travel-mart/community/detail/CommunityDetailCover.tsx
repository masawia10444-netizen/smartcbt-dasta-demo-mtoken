import { Button } from "@/components/Button";
import { ArrowLeftIcon } from "@/components/Icon";
import { CommunityDetail } from "@/models/travel-mart/travel-mart-community";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useRouter } from "next/navigation";

type CommunityDetailCoverProps = {
  community: CommunityDetail;
  openFormMode?: () => void;
};

export const CommunityDetailCover = (props: CommunityDetailCoverProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const { community } = props;
  return (
    <div className="relative h-[530px] w-full">
      <div className="container absolute z-30 mx-auto text-white -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="flex flex-col items-center gap-4 text-white md:gap-10">
          <p className="text-lg font-medium text-center text-white lg:text-xl">{community.title ?? "-"}</p>
          <p className="text-lg font-medium text-center text-white lg:text-xl">
            {community.tourism_info?.address_info?.province ?? "-"}
          </p>
          <div className="flex flex-row gap-4">
            {
              // TODO: Tags have not been provided by the function yet
              /* {props.community?.tags?.map((value, i) => (
              <p key={i} className="p-2 border-2 border-white rounded-3xl">
                {value}
              </p>
            ))} */
            }
          </div>
        </div>
      </div>
      <div className="relative md:container md:mx-auto">
        <div className="absolute z-20 left-4 top-5">
          <Button
            intent="secondary"
            size="small"
            icon={<ArrowLeftIcon />}
            onClick={() => {
              if (props.openFormMode == null) {
                router.back();
                return;
              }
              props.openFormMode();
            }}
          >
            {t("global.back")}
          </Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 z-10 w-full h-full bg-black/30" />
      <Image
        src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${community.featured_image?.url}`}
        fill
        alt=""
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
