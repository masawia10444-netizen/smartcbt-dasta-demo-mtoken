import Image from "@/components/image";

type PhotoBankMainCategoryMenuProps = {
  title: string;
  backgroundImage: string;
};

const PhotoBankMainCategoryMenu = ({ title, backgroundImage }: PhotoBankMainCategoryMenuProps) => {
  return (
    <div>
      <div className="relative h-48 w-80 overflow-hidden rounded-2xl lg:h-64 lg:w-auto">
        <div className="relative flex h-full w-full items-center justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${backgroundImage}`}
            alt={"DASTA"}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-smart-cbt-dark-green p-4">
          <div className="text-xl font-normal text-white">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default PhotoBankMainCategoryMenu;
