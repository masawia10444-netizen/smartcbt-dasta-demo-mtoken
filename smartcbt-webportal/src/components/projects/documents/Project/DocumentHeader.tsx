import Image from "@/components/image";

const DocumentHeader = () => {
  return (
    <div className="flex h-10 flex-row-reverse bg-smart-cbt-green px-4 print:hidden">
      <div className="bg-white">
        <Image src="/images/logo.png" alt="CBT Logo" width={100} height={20} />
      </div>
    </div>
  );
};

export default DocumentHeader;
