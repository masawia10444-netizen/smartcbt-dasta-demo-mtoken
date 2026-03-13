import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from 'react'

type DonePopupProps = {
  onClose: (didConfirm: boolean) => void;
  title: string;
  description?: string;
  redirectPath?: string;
};

const DonePopup = (props: DonePopupProps) => {
  const timeout = useRef<NodeJS.Timeout>()
  const router = useRouter();

  useEffect(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      props.onClose(false);
      props.redirectPath ? router.push(props.redirectPath) : router.refresh();
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <CheckCircleIcon className="h-20 w-20 text-smart-cbt-green" />
      <h1 className="text-center text-xl">{props.title}</h1>
      {props.description && <h3 className="text-center text-lg text-[#BFBFBF]">{props.description}</h3>}
    </div>
  );
};

export default DonePopup;
