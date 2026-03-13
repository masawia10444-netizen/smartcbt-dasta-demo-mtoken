import { useFormContext } from "react-hook-form";

import Flex from "@/components/Flex";
import FormDropdown from "@/components/form/FormDropdown";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { OrganizationJson } from "@/utils/cms/adapters/website/sia/types/project";
import { cn } from "@/utils/cn";
import { viewMode } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";

const ProjectOrganizationForm = ({ organizations }: { organizations: OrganizationJson[] }) => {
  const t = useTranslations("common");

  const { register, control, getValues } = useFormContext<CreateProjectSchema>();

  const { viewOnly } = viewMode(getValues());

  return (
    <div className="flex flex-col gap-4">
      <Flex.Container>
        <Flex.Element className="flex flex-col gap-4">
          <label>{t("project.create.step2.projectAgencyDriving")}</label>
          <FormDropdown
            disabled={viewOnly}
            values={organizations.map((organization) => ({
              id: organization.key,
              title: organization.label,
              value: organization.value,
            }))}
            idKey="id"
            displayFunction={(v) => (v === null ? "" : v?.title ?? "")}
            title={t("project.create.step2.projectOrganization")}
            filterKey={"title"}
            placeholder={t("project.create.step2.projectOrganization")}
            inputEditable={true}
            fixed={false}
            {...register("step2.7.projectAgency")}
          />
        </Flex.Element>
        <Flex.Element />
      </Flex.Container>
      <Flex.Container>
        <Flex.Element className="flex flex-col gap-4">
          <label>{"หน่วยงานร่วมขับเคลื่อนโครงการ/หน่วยงานที่รับผิดชอบโครงการ"}</label>
          <input
            disabled={viewOnly}
            className={cn("h-10 w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2")}
            placeholder={t("project.create.step2.projectAgencyDriving")}
            {...register("step2.7.organization")}
          />
        </Flex.Element>
        <Flex.Element />
      </Flex.Container>
    </div>
  );
};

export default ProjectOrganizationForm;
