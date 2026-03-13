import { useTranslations } from "next-intl";

type VideoModalProps = {
  isOpen: boolean;
  onClose: Function;
  videoUrl: string;
};

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  if (!isOpen) return null;

  const t = useTranslations("common");

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-3xl font-semibold">{t("travelMart.training.video_title")}</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                onClick={() => onClose()}
              >
                ×
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <video src={videoUrl} controls controlsList="nodownload" style={{ maxWidth: "100%" }} />
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default VideoModal;
