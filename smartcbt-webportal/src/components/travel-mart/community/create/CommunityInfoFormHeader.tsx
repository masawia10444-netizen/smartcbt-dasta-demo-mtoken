type CommunityInfoFormHeaderProps = {
  header: string;
  isRequired?: boolean;
};

export const CommunityInfoFormHeader = (props: CommunityInfoFormHeaderProps) => {
  return (
    <h1 className="w-full bg-[#F6FFED] p-2.5 text-lg font-medium text-smart-cbt-dark-green">
      {props.isRequired && <span className="text-smart-cbt-red">*</span>}
      {props.header}
    </h1>
  );
};
