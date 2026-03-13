import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

const CreateProjectStep3 = () => {
  const t = useTranslations("common");

  const { watch } = useFormContext<CreateProjectSchema>();

  const projectName = watch("step1.cbtProject.title");
  const userGroup = watch("step2.15.value");
  const outcomes = watch("step2.14.value");
  const longTermEffects = watch("step2.11.value");

  return (
    <div className="flex flex-col gap-4">
      <section>
        <Header title={t("project.create.step3.projectName")} />
        <Content contents={[projectName]} indexed={false} />
      </section>
      <section>
        <Header title={t("project.create.step3.userGroup")} />
        <Content contents={userGroup} indexed />
      </section>
      <section>
        <Header title={t("project.create.step3.benefits")} />
        <Content contents={outcomes} indexed />
      </section>
      <section>
        <Header title={t("project.create.step3.longTermEffects")} />
        <Content contents={longTermEffects} indexed />
      </section>
    </div>
  );
};

const Header = ({ title }: { title: string }) => {
  return <p className="p-3 text-sm bg-smart-cbt-very-light-green text-smart-cbt-dark-green">{title}</p>;
};

const Content = ({ contents, indexed }: { contents: string[]; indexed: boolean }) => {
  return (
    <div className="flex flex-col mt-2 ml-2">
      {contents.map((content, i) => {
        const item = indexed ? `${i + 1}. ${content}` : content;
        return (
          <p className="p-2 text-sm" key={i}>
            {item}
          </p>
        );
      })}
    </div>
  );
};

export default CreateProjectStep3;
