import { Tab } from "@headlessui/react";

type CarbonFootprintRegionalGraphTabProps = {
  title: string;
  Icon: JSX.Element;
};

const CarbonFootprintRegionalGraphTab = ({ title, Icon }: CarbonFootprintRegionalGraphTabProps) => {
  return (
    <Tab className="flex items-center gap-2 outline-none ui-selected:text-smart-cbt-dark-green ui-not-selected:text-smart-cbt-medium-grey">
      {Icon}
      {title}
    </Tab>
  );
};

export default CarbonFootprintRegionalGraphTab;
