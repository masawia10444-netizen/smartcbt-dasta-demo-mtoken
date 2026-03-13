import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useState } from "react";
import { XMarkIcon } from "../Icon";

type PhotoBankSearchInputProps = {
  keyword: string | null | undefined;
  placeholder: string | null | undefined;
  onSearch: (keyword: string) => void;
};

const PhotoBankSearchInput = ({ keyword, placeholder, onSearch }: PhotoBankSearchInputProps) => {
  const [text, setText] = useState<string>(keyword ?? "");

  return (
    <div className="flex flex-row items-center rounded-lg border border-smart-cbt-medium-grey py-2 pr-4 text-black placeholder-gray-300 focus:outline-none">
      <input
        className="grow bg-transparent px-2 focus:outline-none"
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder ?? ""}
        value={text}
      />
      <div className="flex flex-row gap-3">
        {text.length > 0 && (
          <XMarkIcon className="h-5 w-5 text-gray-500 hover:cursor-pointer" onClick={() => setText("")} />
        )}
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 hover:cursor-pointer" onClick={() => onSearch(text)} />
      </div>
    </div>
  );
};

export default PhotoBankSearchInput;
