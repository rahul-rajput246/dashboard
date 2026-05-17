import { CSVLink } from "react-csv";
import { Download, Funnel, Plus, Search } from "lucide-react";
import { leadSources, leadStatuses } from "../utils/constants";
import type { Lead, LeadFilters } from "../types/lead";

interface FilterBarProps {
  filters: LeadFilters;
  onFilterChange: <K extends keyof LeadFilters>(
    key: K,
    value: LeadFilters[K]
  ) => void;
  onCreate: () => void;
  exportRows: Lead[];
}

const inputClasses =
  "h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

const selectClasses =
  "h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

const FilterBar = ({
  filters,
  onFilterChange,
  onCreate,
  exportRows,
}: FilterBarProps) => {
  return (
    <div className="rounded-[30px] border border-white/70 bg-white/75 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl">
      {/* TOP */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <Funnel size={15} />
            Pipeline Controls
          </div>

          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Filter & Manage Leads
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Search, sort, export, and organize your sales pipeline.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCreate}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-violet-500/30"
          >
            <Plus size={18} />
            Add Lead
          </button>

          <CSVLink
            data={exportRows}
            filename="smart-leads-export.csv"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:border-violet-300 hover:text-violet-600"
          >
            <Download size={16} />
            Export
          </CSVLink>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* SEARCH */}
        <div className="relative xl:col-span-2">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={filters.search}
            onChange={(event) =>
              onFilterChange("search", event.target.value)
            }
            placeholder="Search by name or email..."
            className={`pl-11 ${inputClasses}`}
          />
        </div>

        {/* STATUS */}
        <select
          value={filters.status}
          onChange={(event) =>
            onFilterChange("status", event.target.value)
          }
          className={selectClasses}
        >
          <option value="">All Statuses</option>

          {leadStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* SOURCE */}
        <select
          value={filters.source}
          onChange={(event) =>
            onFilterChange("source", event.target.value)
          }
          className={selectClasses}
        >
          <option value="">All Sources</option>

          {leadSources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      {/* SECOND ROW */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* SORT */}
        <select
          value={filters.sort}
          onChange={(event) =>
            onFilterChange(
              "sort",
              event.target.value as LeadFilters["sort"]
            )
          }
          className={selectClasses}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {/* INFO CARD */}
        <div className="flex items-center justify-between rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-violet-500">
              Active Filters
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              Smart filtering enabled
            </p>
          </div>

          <div className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600">
            Live
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;