import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";

import { ProjectWithWithoutDocument } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import BulletList from "./BulletList";

interface ProjectOverviewEffectDocumentProps {
  projectWithWithoutDocument: ProjectWithWithoutDocument;
}

const ProjectOverviewEffectDocument = (props: ProjectOverviewEffectDocumentProps) => {
  const { projectWithWithoutDocument } = props;

  const t = useTranslations("common");
  return (
    <div className="flex break-after-page flex-col gap-5 ">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">
        {t("project.documents.projectEffectOverview.title")}
      </h1>
      <Table className="table-fixed py-4">
        <Thead>
          <Tr>
            <Th className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.projectEffectOverview.with")}
            </Th>
            <Th className="h-7 bg-smart-cbt-yellow-2 px-2 py-1 text-2xs font-normal text-smart-cbt-brown">
              {t("project.documents.projectEffectOverview.without")}
            </Th>
          </Tr>
        </Thead>
        <TBody>
          {projectWithWithoutDocument.map((projectEffect, index) => (
            <Fragment key={index}>
              <Tr className="brebreak-after-avoid-page border bg-smart-cbt-light-green">
                <Td className="h-7 px-4 py-1 text-2xs font-normal text-black" colSpan={2}>
                  <label className="text-2xs font-normal text-black"> {`${index + 1}. ${projectEffect.title}`}</label>
                </Td>
              </Tr>
              <Tr className="border bg-smart-cbt-light-grey">
                <Td className="h-7 px-8 py-1 text-2xs font-semibold text-black" colSpan={2}>
                  {t("project.documents.projectEffectOverview.economic")}
                </Td>
              </Tr>
              <Tr className="border">
                <Td className="h-7 border px-8 py-1">
                  <BulletList items={[projectEffect.with.economic]} />
                </Td>
                <Td className="h-7 border px-8 py-1">
                  <BulletList items={[projectEffect.without.economic]} />
                </Td>
              </Tr>
              <Tr className="border bg-smart-cbt-light-grey">
                <Td className="h-7 px-8 py-1 text-2xs font-semibold text-black" colSpan={2}>
                  {t("project.documents.projectEffectOverview.social")}
                </Td>
              </Tr>
              <Tr className="border ">
                <Td className="h-7 border px-8 py-1">
                  <BulletList items={[projectEffect.with.social]} />
                </Td>
                <Td className="h-7 border px-8 py-1">
                  <BulletList items={[projectEffect.without.social]} />
                </Td>
              </Tr>
              <Tr className="border bg-smart-cbt-light-grey">
                <Td className="h-7 px-8 py-1 text-2xs font-semibold text-black" colSpan={2}>
                  {t("project.documents.projectEffectOverview.environment")}
                </Td>
              </Tr>
              <Tr className="border">
                <Td className="h-7 border px-8 py-1">
                  <BulletList items={[projectEffect.with.environment]} />
                </Td>
                <Td className="h-7 border px-8 py-1">
                  <BulletList items={[projectEffect.without.environment]} />
                </Td>
              </Tr>
            </Fragment>
          ))}
        </TBody>
      </Table>
    </div>
  );
};

export default ProjectOverviewEffectDocument;
