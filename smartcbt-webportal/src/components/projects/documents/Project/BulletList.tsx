import { cn } from "@/utils/cn";

interface BulletListProps {
  items: string[];
  title?: string;
  listDecimal?: boolean;
  listNone?: boolean;
}

const BulletList = (props: BulletListProps) => {
  const { items, title, listDecimal, listNone } = props;
  return (
    <div className="h-full w-full">
      {title && <label className="text-2xs font-normal text-black">{title}</label>}
      {items.length > 0 && (
        <ul
          className={cn(
            "list-inside  whitespace-normal px-1 text-black",
            listDecimal ? "list-decimal" : "list-disc",
            listNone && "list-none"
          )}
        >
          {items.map((item, i) => (
            <li className="text-2xs font-normal" key={i}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BulletList;
