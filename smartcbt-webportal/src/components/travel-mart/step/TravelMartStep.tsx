type stateMenu = {
  id: number;
  label: string;
  content: React.ReactElement;
};

type TravelMartStepProps = {
  stateMenu: stateMenu[];
  activeStep: number;
};

const TravelMartStep = ({ stateMenu, activeStep }: TravelMartStepProps) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        {stateMenu.map((sm) => (
          <div key={sm.id} className="relative flex flex-row justify-center">
            <div className="flex flex-col items-center gap-4 align-middle">
              <div
                className={`relative z-10 flex h-10 w-10 flex-row justify-center gap-2 rounded-full md:h-20 md:w-20 ${
                  sm.id <= activeStep
                    ? "bg-smart-cbt-green  text-white"
                    : "border border-smart-cbt-very-dark-grey  text-smart-cbt-very-dark-grey"
                } ${sm.id == activeStep && "transition-all duration-300 ease-in-out"}`}
              >
                <span className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">{sm.id}</span>
              </div>
              <span
                className={`max-w-[20rem] break-words text-center ${
                  sm.id <= activeStep ? "text-smart-cbt-green" : " text-smart-cbt-very-dark-grey"
                }`}
              >
                {sm.label}
              </span>
            </div>
            {sm.id != stateMenu.length && (
              <div
                className={`mt-10 h-1 min-w-[4rem] rounded md:min-w-[8rem] ${
                  sm.id <= activeStep - 1 ? "bg-smart-cbt-green transition-all duration-300" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-16">{stateMenu[activeStep - 1]?.content}</div>
    </div>
  );
};

export default TravelMartStep;
