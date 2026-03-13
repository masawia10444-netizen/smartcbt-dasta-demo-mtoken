import { CloseIcon } from "@/components/Icon";
import { CommunityDetail } from "@/models/travel-mart/travel-mart-community";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useState } from "react";
import Masonry from "react-masonry-css";
import ReactPlayer from "react-player";

type CommunityDetailGalleryProps = {
  community: CommunityDetail;
};

export const CommunityDetailGallery = (props: CommunityDetailGalleryProps) => {
  const t = useTranslations("common");
  const [showImagePopup, setShowImagePopup] = useState<string | null>(null);
  const [showVideoPopup, setShowVideoPopup] = useState<string | null>(null);

  const { community } = props;
  const breakpointColumnsObj = { default: 3, 1024: 2, 640: 1 };

  return (
    <div className="bg-smart-cbt-light-green">
      <div className="flex flex-col gap-6 px-4 py-9 md:container md:mx-auto">
        <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("community.detail.activityImages")}</h1>
        {community.galleries && community.galleries.length > 0 && (
          <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid_column">
            {community.galleries.map((value, index) => {
              return (
                <div key={index}>
                  {value.type?.startsWith("image") && (
                    <picture key={index} onClick={() => setShowImagePopup(value.url ?? "")}>
                      <img src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`} alt={""} />
                    </picture>
                  )}
                  {value.type?.startsWith("video") && (
                    <video
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`}
                      onClick={() => setShowVideoPopup(value.url ?? "")}
                    />
                  )}
                </div>
              );
            })}
          </Masonry>
        )}
      </div>
      {showImagePopup != null && (
        <PreviewMediaPopup
          isOpen={showImagePopup != null}
          mediaType={"image"}
          url={showImagePopup}
          onCloseButtonClicked={() => setShowImagePopup(null)}
        />
      )}
      {showVideoPopup != null && (
        <PreviewMediaPopup
          isOpen={showVideoPopup != null}
          mediaType={"video"}
          url={showVideoPopup}
          onCloseButtonClicked={() => setShowVideoPopup(null)}
        />
      )}
    </div>
  );
};

type PreviewMediaPopupProps = {
  isOpen: boolean;
  mediaType: "image" | "video";
  url: string;
  onCloseButtonClicked: () => void;
};

export const PreviewMediaPopup = (props: PreviewMediaPopupProps) => {
  return (
    <Dialog open={props.isOpen} onClose={() => props.onCloseButtonClicked()} onClick={()=> props.onCloseButtonClicked()} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="flex max-h-[80%] max-w-[90%] flex-col justify-center gap-4">
          <div className="flex flex-row justify-end gap-2">
            <CloseIcon
              className="h-8 w-8 text-white hover:cursor-pointer"
              onClick={() => props.onCloseButtonClicked()}
            />
          </div>
          <div className="flex flex-row gap-2 ">
            {props.mediaType === "image" && (
              <div className="relative h-[624px] w-[832px]">
                <Image
                  style={{ objectFit: "cover" }}
                  src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${props.url}`}
                  layout="fill"
                  alt=""
                />
              </div>
            )}
            {props.mediaType === "video" && (
              <ReactPlayer url={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${props.url}`} controls={true} />
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
