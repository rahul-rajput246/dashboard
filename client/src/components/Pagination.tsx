interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => (
  <div className="flex flex-col gap-3 rounded-3xl border border-white/80 bg-white/90 px-4 py-4 shadow-panel backdrop-blur sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
    <p className="text-center text-sm text-ink/65 sm:text-left">
      Page {currentPage} of {Math.max(totalPages, 1)}
    </p>
    <div className="flex w-full gap-2 sm:w-auto">
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex-1 rounded-full border border-moss/20 px-4 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
      >
        Next
      </button>
    </div>
  </div>
);

export default Pagination;
