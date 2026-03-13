import {
  handleOnboardingCommunity,
  handleOnboardingGuide,
  handleOnboardingOrganization,
  handleUpdateOnboardingOrganization,
} from "@/app/[locale]/(authenticated)/travel-mart/register/(register)/actions";
import { handleAPIError } from "@/utils/helper";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import RegisterConfirmPopup from "./RegisterConfirmPopup";
import RegisterDonePopup from "./RegisterDonePopup";

enum setPopupState {
  confirm,
  done,
}

type RegisterPopupProps = {
  bodyData: { body: any; type: "community" | "organization" | "guide" };
  onClose: (didConfirm?: any) => void;
  canEdit?: boolean;
};

const RegisterPopup = ({ bodyData, onClose, canEdit = false }: RegisterPopupProps) => {
  const [state, setState] = useState(setPopupState.confirm);

  const confirm = async () => {
    let result: any;
    switch (bodyData.type) {
      case "community":
        result = await handleOnboardingCommunity(bodyData.body);
        break;
      case "guide":
        result = await handleOnboardingGuide(bodyData.body);
        break;
      case "organization":
        console.log("canEdit:", canEdit);

        result = !canEdit
          ? await handleOnboardingOrganization(bodyData.body)
          : await handleUpdateOnboardingOrganization(bodyData.body);
        break;
    }
    if (result?.error) {
      handleAPIError(result?.error);
      onClose(undefined);
      return;
    }
    setState(setPopupState.done);
  };

  const renderPanelForState = () => {
    switch (state) {
      case setPopupState.confirm:
        return <RegisterConfirmPopup onClose={onClose} onConfirm={confirm} type={bodyData.type} />;
      case setPopupState.done:
        return <RegisterDonePopup onClose={onClose} />;
    }
  };

  return (
    <Dialog open={bodyData ? true : false} onClose={close} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
          {renderPanelForState()}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RegisterPopup;
