type CommunityInfoFormQuestionProps = {
  question: string;
};

export const CommunityInfoFormQuestion = (props: CommunityInfoFormQuestionProps) => {
  return <h1 className={"w-full p-2.5 pl-2 text-lg font-medium text-smart-cbt-dark-green"}>{props.question}</h1>;
};
