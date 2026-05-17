import { useEffect, useState } from "react";
import { CircleDollarSign, ContactRound, Sparkles, UsersRound } from "lucide-react";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import FilterBar from "../components/FilterBar";
import LeadFormModal from "../components/LeadFormModal";
import LeadTable from "../components/LeadTable";
import LoadingBlock from "../components/LoadingBlock";
import Pagination from "../components/Pagination";
import StatCard from "../components/StatCard";
import AppLayout from "../layouts/AppLayout";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead as updateLeadRequest,
} from "../services/leadService";
import { useAuthStore } from "../store/authStore";
import type { Lead, LeadFilters, LeadPayload } from "../types/lead";

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const [filters, setFilters] = useState<LeadFilters>({
    page: 1,
    search: "",
    status: "",
    source: "",
    sort: "latest",
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    void (async () => {
      setLoading(true);

      try {
        const response = await getLeads({ ...filters, search: debouncedSearch });
        setLeads(response.leads);
        setTotalLeads(response.totalLeads);
        setTotalPages(response.totalPages);
      } catch {
        toast.error("Failed to load leads");
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedSearch, filters.page, filters.sort, filters.source, filters.status]);

  const handleFilterChange = <K extends keyof LeadFilters>(key: K, value: LeadFilters[K]) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
      page: key === "page" ? (value as number) : 1,
    }));
  };

  const openCreateModal = () => {
    setActiveLead(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openEditModal = (lead: Lead) => {
    setActiveLead(lead);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const refreshLeads = async () => {
    const response = await getLeads({ ...filters, search: debouncedSearch });
    setLeads(response.leads);
    setTotalLeads(response.totalLeads);
    setTotalPages(response.totalPages);
  };

  const handleSubmit = async (payload: LeadPayload) => {
    setIsSaving(true);

    try {
      if (modalMode === "create") {
        await createLead(payload);
        toast.success("Lead created");
      } else if (activeLead) {
        await updateLeadRequest(activeLead._id, payload);
        toast.success("Lead updated");
      }

      setIsModalOpen(false);
      await refreshLeads();
    } catch {
      toast.error("Could not save lead");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (lead: Lead) => {
    const confirmed = window.confirm(`Delete ${lead.name}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteLead(lead._id);
      toast.success("Lead deleted");
      await refreshLeads();
    } catch {
      toast.error("Only admins can delete leads");
    }
  };

  const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified").length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;

  return (
    <AppLayout>
      <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f8fafc] p-2 sm:p-4 lg:p-5">
        {/* Decorative Blur */}
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

        {/* HERO */}
        <div className="relative rounded-[28px] border border-white/60 bg-white/70 p-4 shadow-[0_10px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="grid gap-6 2xl:grid-cols-[1.5fr_0.7fr] 2xl:items-end">
            {/* LEFT */}
            <div className="min-w-0">
              <span className="inline-flex rounded-full bg-violet-100 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-700 sm:text-xs">
                Smart Leads Dashboard
              </span>

              <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Manage leads faster with a modern sales workflow.
              </h1>

             <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                Organize inbound prospects, filter intelligently, export results,
                and keep your sales pipeline clean with a responsive lead
                management system.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Active Leads
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    {totalLeads}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Qualified
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-emerald-600">
                    {qualifiedLeads}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Conversion
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-violet-600">
                    {totalLeads
                      ? Math.round((qualifiedLeads / totalLeads) * 100)
                      : 0}
                    %
                  </h3>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="rounded-[26px] bg-slate-950 p-5 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                    Current Access
                  </p>

                  <h2 className="mt-2 text-3xl font-semibold capitalize">
                    {user?.role}
                  </h2>
                </div>

                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <UsersRound size={28} />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/70">
                {user?.role === "admin"
                  ? "Admins can create, edit, and permanently delete leads."
                  : "Sales users can manage and update leads securely."}
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">
                    Workspace Status
                  </span>

                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                    Live
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="relative mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Leads"
            value={totalLeads}
            hint="All matched records."
            icon={<UsersRound size={20} />}
          />

          <StatCard
            label="Fresh Leads"
            value={newLeads}
            hint="Recently added opportunities."
            icon={<Sparkles size={20} />}
          />

          <StatCard
            label="Qualified"
            value={qualifiedLeads}
            hint="High intent prospects."
            icon={<ContactRound size={20} />}
          />

          <StatCard
            label="Conversion Pulse"
            value={`${totalLeads
                ? Math.round((qualifiedLeads / totalLeads) * 100)
                : 0
              }%`}
            hint="Based on qualified leads."
            icon={<CircleDollarSign size={20} />}
          />
        </div>

        {/* FILTER BAR */}
        <div className="relative mt-6">
          <div className="rounded-[24px] border border-white/70 bg-white/60 p-3 shadow-lg backdrop-blur-xl sm:p-4">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onCreate={openCreateModal}
              exportRows={leads}
            />
          </div>
        </div>

        {/* TABLE */}
       <div className="relative mt-6 overflow-hidden rounded-[28px] border border-white/70 bg-white/60 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-4">
          {loading ? (
            <LoadingBlock />
          ) : leads.length === 0 ? (
            <EmptyState
              title="No leads found"
              description="Try adjusting your search or filters, or add a new lead to get started."
            />
          ) : (
            <LeadTable
              leads={leads}
              canDelete={user?.role === "admin"}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* PAGINATION */}
        <div className="relative mt-6 flex justify-center">
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onChange={(page) => handleFilterChange("page", page)}
          />
        </div>

        {/* MODAL */}
        <LeadFormModal
          isOpen={isModalOpen}
          mode={modalMode}
          initialLead={activeLead}
          isSubmitting={isSaving}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </section>
    </AppLayout>
  );
};

export default DashboardPage;
