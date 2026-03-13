import { OptionsVertical, XCircleIcon } from "@/components/Icon";
import { Menu, Transition } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

type PhotoOptionsDropDownProps = {
  setCoverPhoto: (fileName?: string) => void;
  deleteAction: () => void;
  isCoverPhoto?: boolean;
  canSetHasCover: boolean;
  photoName: string;
};

const PhotoOptionsDropDown = ({
  deleteAction,
  setCoverPhoto,
  canSetHasCover,
  photoName,
  isCoverPhoto,
}: PhotoOptionsDropDownProps) => {
  const t = useTranslations("common");

  return (
    <Menu>
      <Menu.Button>
        <OptionsVertical className={"h-6 w-6 text-white"} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={
            "absolute right-8 top-2 z-40 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-2 shadow-lg"
          }
        >
          {canSetHasCover && (
            <Menu.Item>
              <button
                type="button"
                onClick={(e) => {
                  isCoverPhoto ? setCoverPhoto(undefined) : setCoverPhoto(photoName);
                }}
                className={"flex w-full items-center gap-2 p-2 hover:cursor-pointer hover:bg-smart-cbt-light-grey"}
              >
                {isCoverPhoto ? (
                  <>
                    <XCircleIcon className="h-6 w-6" />
                    {t("carbon.create.photo.unUseToCoverPhoto")}
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-6 w-6" />
                    {t("carbon.create.photo.useToCoverPhoto")}
                  </>
                )}
              </button>
            </Menu.Item>
          )}
          <Menu.Item>
            <button
              type="button"
              onClick={deleteAction}
              className={"flex w-full items-center gap-2 p-2 hover:cursor-pointer hover:bg-smart-cbt-light-grey"}
            >
              <TrashIcon className="h-6 w-6" />
              {t("global.delete")}
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PhotoOptionsDropDown;
