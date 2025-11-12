import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFilterStore } from "@/store";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const setFilter = useFilterStore((state) => state.setFilter);

  const handlePageChange = (page: number) => {
    setFilter("page", page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (page) =>
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-light-400 hover:bg-light-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {visiblePages.map((page, index) => {
        const previousPage = visiblePages[index - 1];
        const showEllipsis = previousPage && page - previousPage > 1;

        return (
          <div className="flex items-center gap-2">
            {showEllipsis} && <span className="text-dark-400">...</span>
            <button
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                page === currentPage
                  ? "bg-dark-900 text-white"
                  : "border border-light-400 hover:bg-light-300"
              }`}
            >
              {page}
            </button>
          </div>
        );
      })}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-light-400 hover:bg-light-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
