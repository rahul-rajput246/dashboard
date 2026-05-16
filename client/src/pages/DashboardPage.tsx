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
      <section className="rounded-[28px] bg-white/45 p-3 backdrop-blur sm:rounded-[36px] sm:p-4 md:p-6 xl:p-7">
        <div className="rounded-[24px] border border-white/80 bg-white/70 p-4 shadow-panel backdrop-blur sm:rounded-[32px] sm:p-6 xl:p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 sm:text-xs sm:tracking-[0.28em]">
            Command Center
          </p>
          <div className="mt-4 grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.8fr)] xl:items-end">
            <div className="min-w-0">
              <h1 className="max-w-4xl font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[3.4rem] xl:text-[4rem]">
                Convert scattered inbound interest into a cleaner, calmer sales pipeline.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-ink/65 sm:text-[15px] sm:leading-7">
                Search quickly, filter by source and status, export the current results, and manage
                leads from one responsive workspace.
              </p>
            </div>
            <div className="rounded-[24px] bg-ink px-4 py-4 text-white shadow-panel sm:rounded-[28px] sm:px-5 xl:self-stretch">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 sm:text-xs sm:tracking-[0.24em]">
                Role access
              </p>
              <p className="mt-2 text-2xl font-semibold capitalize">{user?.role}</p>
              <p className="mt-1 text-sm text-white/70">
                {user?.role === "admin"
                  ? "You can create, edit, and delete leads."
                  : "You can create and edit leads. Delete stays admin-only."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          <StatCard
            label="Total Leads"
            value={totalLeads}
            hint="All matched records for the active query."
            icon={<UsersRound size={20} />}
          />
          <StatCard
            label="Fresh"
            value={newLeads}
            hint="New opportunities in the current page snapshot."
            icon={<Sparkles size={20} />}
          />
          <StatCard
            label="Qualified"
            value={qualifiedLeads}
            hint="Warm prospects ready for the next step."
            icon={<ContactRound size={20} />}
          />
          <StatCard
            label="Conversion Pulse"
            value={`${totalLeads ? Math.round((qualifiedLeads / totalLeads) * 100) : 0}%`}
            hint="Quick ratio based on qualified leads."
            icon={<CircleDollarSign size={20} />}
          />
        </div>

        <div className="mt-6">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onCreate={openCreateModal}
            exportRows={leads}
          />
        </div>

        <div className="mt-6 rounded-[28px] border border-white/70 bg-white/35 p-2 backdrop-blur sm:p-3">
          {loading ? (
            <LoadingBlock />
          ) : leads.length === 0 ? (
            <EmptyState
              title="No leads found"
              description="Try adjusting your search, filter, or source selections. You can also add a new lead to get the pipeline moving."
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

        <div className="mt-6">
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onChange={(page) => handleFilterChange("page", page)}
          />
        </div>
      </section>

      <LeadFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialLead={activeLead}
        isSubmitting={isSaving}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
};

export default DashboardPage;
