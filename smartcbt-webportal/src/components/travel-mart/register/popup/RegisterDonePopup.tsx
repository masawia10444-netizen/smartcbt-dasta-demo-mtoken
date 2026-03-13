import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type RegisterDonePopupProps = {
  onClose: (didConfirm?: any) => void;
};

const RegisterDonePopup = ({onClose}: RegisterDonePopupProps) => {
  const t = useTranslations("common");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      onClose(undefined);
      router.push("/travel-mart");
    }, 3000);
  }, [])

  return (
    <div className="flex flex-col items-center gap-6">
      <CheckCircleIcon className="h-16 w-16 text-smart-cbt-green" />
      <h3 className="text-xl font-medium">{t("travelMart.register.popup.done.title")}</h3>
    </div>
  );
};

export default RegisterDonePopup