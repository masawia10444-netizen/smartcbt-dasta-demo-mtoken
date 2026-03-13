import { Dialog } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const DonePopup = ({ open, title, onClose }: { open: boolean; title?: string; onClose: () => void }) => {
  const t = useTranslations("common");

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center overflow-y-auto scroll-smooth p-4">
        <Dialog.Panel className="relative m-auto flex min-w-[400px] max-w-[38rem] flex-col items-center gap-5 rounded-2xl bg-white p-16 font-prompt text-smart-cbt-dark-green">
          <div className="flex flex-col items-center gap-8">
            <CheckCircleIcon className="h-16 w-16 text-smart-cbt-green" />
            <h3 className="text-xl font-medium">{title}</h3>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DonePopup;
