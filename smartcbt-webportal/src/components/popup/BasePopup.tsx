import { Button } from "@/components/Button";
import { CheckIconCircle, WarningCirleIcon, WarningIcon, XCircleIcon } from "@/components/Icon";
import { Dialog } from "@headlessui/react";
import { FormEvent, PropsWithChildren } from "react";

type BasePopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
  iconStyle: "checkmark" | "warningTriangle" | "cross" | "warningCircle";
  actionButtonStyle: "green" | "red";
  title: string;
  subTitle?: string;
  actionButtonTitle?: string;
  cancelButtonTitle?: string;
  onSubmit?: (data: FormEvent<HTMLFormElement>) => void;
};

export const BasePopup = (props: PropsWithChildren<BasePopupProps>) => {
  const close = () => {
    props.onClose(false);
  };

  const renderIcon = () => {
    switch (props.iconStyle) {
      case "checkmark":
        return <CheckIconCircle className="h-10 w-10 text-smart-cbt-green" />;
      case "warningTriangle":
        return <WarningIcon className="h-10 w-10 text-smart-cbt-yellow" />;
      case "warningCircle":
        return <WarningCirleIcon className="h-20 w-20 text-smart-cbt-red" />;
      case "cross":
        return <XCircleIcon className="h-10 w-10 text-smart-cbt-red" />;
    }
  };

  const buttonIntent = () => {
    switch (props.actionButtonStyle) {
      case "green":
        return "primary";
      case "red":
        return "danger";
    }
  };

  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
          {renderIcon()}
          <div className="flex flex-col items-center gap-1">
            <h3 className="whitespace-pre-line text-center text-xl font-medium">{props.title}</h3>
            <p className="text-smart-cbt-medium-grey">{props.subTitle}</p>
          </div>
          <form onSubmit={props.onSubmit} className="w-full">
            {props.children}
            {(props.cancelButtonTitle || props.actionButtonTitle) && (
              <div className="mt-4 flex items-center justify-center gap-4">
                {props.cancelButtonTitle && (
                  <Button intent="tertiary" size="small" className="px-6" onClick={close}>
                    {props.cancelButtonTitle}
                  </Button>
                )}
                {props.actionButtonTitle && (
                  <Button
                    intent={buttonIntent()}
                    size="small"
                    className="px-6"
                    type={props.onSubmit ? "submit" : "button"}
                    onClick={props.onSubmit ? undefined : () => props.onClose(true)}
                  >
                    {props.actionButtonTitle}
                  </Button>
                )}
              </div>
            )}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
