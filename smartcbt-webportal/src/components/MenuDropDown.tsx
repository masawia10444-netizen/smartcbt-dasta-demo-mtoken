import { cn } from "@/utils/cn";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PhDotsThreeVerticalBold } from "./Icon";

interface MenuProps {
  menuItems: { key: string; href?: string; label: string; icon?: JSX.Element; onClick?: () => void }[];
  className?: string;
  itemsClassName?: string;
}
export const MenuDropDown = (props: MenuProps) => {
  const { menuItems } = props;
  return (
    <Menu as={"div"} className={cn("relative flex", props.className)}>
      <Menu.Button>
        <PhDotsThreeVerticalBold />
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
          className={cn(
            "absolute right-0 top-6 z-50 flex w-fit flex-col items-start rounded-sm bg-white shadow-lg focus:outline-none",
            props.itemsClassName
          )}
        >
          {menuItems?.map((item) => (
            <Menu.Item key={item.key}>
              {({ active }) => {
                return item.href ? (
                  <a
                    className={cn(
                       active
                        ? "text-smart-cbt-very-dark-grey hover:bg-smart-cbt-light-grey hover:text-smart-cbt-green"
                        : "text-smart-cbt-very-dark-grey",
                      "flex items-center justify-start gap-2 whitespace-nowrap p-2"
                    )}
                    href={item.href}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ) : (
                  <span
                    onClick={item.onClick}
                    className={cn(
                      active
                        ? "text-smart-cbt-very-dark-grey hover:bg-smart-cbt-light-grey hover:text-smart-cbt-green"
                        : "text-smart-cbt-very-dark-grey",

                      "flex w-full cursor-pointer items-center gap-2 bg-white p-2 text-center text-sm text-smart-cbt-very-dark-grey hover:bg-smart-cbt-light-grey"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                );
              }}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
