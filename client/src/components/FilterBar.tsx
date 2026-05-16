import { CSVLink } from "react-csv";
import { Download, Funnel, Plus } from "lucide-react";
import { leadSources, leadStatuses } from "../utils/constants";
import type { Lead, LeadFilters } from "../types/lead";

interface FilterBarProps {
  filters: LeadFilters;
  onFilterChange: <K extends keyof LeadFilters>(key: K, value: LeadFilters[K]) => void;
  onCreate: () => void;
  exportRows: Lead[];
}

const inputClasses =
  "rounded-2xl border border-moss/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-moss";

const FilterBar = ({ filters, onFilterChange, onCreate, exportRows }: FilterBarProps) => (
  <div className="rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-panel backdrop-blur sm:rounded-[28px] sm:p-5">
    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45 sm:text-xs sm:tracking-[0.24em]">
      <Funnel size={16} />
      Pipeline Controls
    </div>
    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
      <input
        value={filters.search}
        onChange={(event) => onFilterChange("search", event.target.value)}
        placeholder="Search by name or email"
        className={`xl:col-span-2 ${inputClasses}`}
      />
      <select
        value={filters.status}
        onChange={(event) => onFilterChange("status", event.target.value)}
        className={inputClasses}
      >
        <option value="">All statuses</option>
        {leadStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <select
        value={filters.source}
        onChange={(event) => onFilterChange("source", event.target.value)}
        className={inputClasses}
      >
        <option value="">All sources</option>
        {leadSources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
      <select
        value={filters.sort}
        onChange={(event) => onFilterChange("sort", event.target.value as LeadFilters["sort"])}
        className={inputClasses}
      >
        <option value="latest">Latest first</option>
        <option value="oldest">Oldest first</option>
      </select>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onCreate}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-moss px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink"
        >
          <Plus size={16} />
          Add Lead
        </button>
        <CSVLink
          data={exportRows}
          filename="smart-leads-export.csv"
          className="flex items-center justify-center rounded-2xl border border-moss/20 px-4 py-3 text-ink transition hover:border-moss hover:text-moss sm:min-w-[56px]"
        >
          <Download size={16} />
        </CSVLink>
      </div>
    </div>
  </div>
);

export default FilterBar;
