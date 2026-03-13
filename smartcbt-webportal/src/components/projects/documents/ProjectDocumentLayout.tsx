import { PropsWithChildren } from "react";
import DocumentHeader from "./Project/DocumentHeader";

const ProjectDocumentLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="min-h-[1122px] w-[794px] bg-white">
      <DocumentHeader />
      <div className="flex h-full flex-col gap-4 p-4">{children}</div>
    </div>
  );
};
export default ProjectDocumentLayout;
