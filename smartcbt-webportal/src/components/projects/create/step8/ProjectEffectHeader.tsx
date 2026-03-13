interface ProjectEffectHeaderProps {
  title: string;
  type: string;
}

const ProjectEffectHeader = (props: ProjectEffectHeaderProps) => {
  const { title, type } = props;
  return (
    <div className="flex h-10 items-center gap-1">
      <div className="flex h-full w-40 items-center justify-center bg-smart-cbt-very-light-green text-center text-sm text-smart-cbt-dark-green">
        <label>{"ช่วงปี"}</label>
      </div>
      <div className="flex h-full flex-1 items-center justify-center bg-smart-cbt-very-light-green text-center text-sm text-smart-cbt-dark-green">
        <label>{title}</label>
      </div>
      <div className="flex h-full w-40 items-center justify-center bg-smart-cbt-very-light-green text-center text-sm text-smart-cbt-dark-green">
        <label> {"ประโยชน์ (%)"}</label>
      </div>
      <div className="flex h-full w-40 items-center justify-center bg-smart-cbt-very-light-green text-center text-sm text-smart-cbt-dark-green">
        <label> {type}</label>
      </div>
    </div>
  );
};

export default ProjectEffectHeader;
