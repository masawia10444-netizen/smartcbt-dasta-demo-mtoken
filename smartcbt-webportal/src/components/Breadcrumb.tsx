import Link from "next-intl/link";

interface BreadCrumbProps {
  links: {
    name: string;
    slug: string;
  }[];
  textWhite?: boolean;
}

const BreadCrumb = (props: BreadCrumbProps) => {
  const { links } = props;
  return (
    <nav className="tracking-xl flex items-center gap-2 py-2 text-xs">
      <ul className="inline">
        {links.map((l, i) => (
          <li
            key={i}
            className={`inline cursor-pointer gap-2 ${props.textWhite ? "text-white" : "text-smart-cbt-dark-grey"}`}
          >
            <Link href={`/${l.slug}`} className="hover:text-smart-cbt-green hover:underline">
              {l.name}
            </Link>
            {i % 1 == 0 && i != links.length - 1 && (
              <span className={`mx-2 ${props.textWhite ? "text-white" : "text-smart-cbt-dark-grey"}`}>{"/"}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
