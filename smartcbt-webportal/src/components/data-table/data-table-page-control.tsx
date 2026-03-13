import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

interface PageControlProps {
  gotoPage: (pageIndex: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  showCount: number;
}

const PageControl = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageCount,
  pageSize,
  showCount,
}: PageControlProps) => {
  const totalButtons = Math.min(showCount, pageCount);
  let firstPageToShow = Math.max(0, pageIndex - Math.floor(totalButtons / 2));
  const lastPageToShow = Math.min(pageCount - 1, firstPageToShow + totalButtons - 1);

  if (lastPageToShow - firstPageToShow < totalButtons - 1) {
    firstPageToShow = Math.max(0, lastPageToShow - totalButtons + 1);
  }

  const t = useTranslations("common");

  return (
    <div className="mt-8 flex items-center justify-start gap-2">
      <button
        className={cn(
          "rounded-bl-xl rounded-tl-xl border border-smart-cbt-light-grey bg-white p-2 text-smart-cbt-medium-grey",
          canPreviousPage ? "hover:bg-smart-cbt-green hover:text-white" : "cursor-not-allowed"
        )}
        disabled={!canPreviousPage}
        onClick={() => previousPage()}
      >
        {t("global.prev")}
      </button>
      {Array.from({ length: totalButtons }, (_, index) => {
        const pageNumber = firstPageToShow + index;
        return (
          <button
            key={pageNumber}
            className={`w-10 border border-smart-cbt-light-grey ${
              pageNumber === pageIndex
                ? " bg-smart-cbt-green text-white"
                : "bg-white text-smart-cbt-medium-grey hover:bg-smart-cbt-green hover:text-white"
            } p-2`}
            onClick={() => gotoPage(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        );
      })}
      <button
        className={cn(
          "rounded-br-xl rounded-tr-xl border border-smart-cbt-light-grey bg-white p-2 text-smart-cbt-medium-grey",
          canNextPage ? "hover:bg-smart-cbt-green hover:text-white" : "cursor-not-allowed"
        )}
        disabled={!canNextPage}
        onClick={() => nextPage()}
      >
        {t("global.next")}
      </button>
    </div>
  );
};

export default PageControl;
