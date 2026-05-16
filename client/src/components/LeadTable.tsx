import { Pencil, Trash2 } from "lucide-react";
import type { Lead } from "../types/lead";
import { formatDate } from "../utils/format";
import StatusBadge from "./StatusBadge";

interface LeadTableProps {
  leads: Lead[];
  canDelete: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const LeadTable = ({ leads, canDelete, onEdit, onDelete }: LeadTableProps) => (
  <div className="overflow-hidden rounded-[30px] border border-white/80 bg-white/90 shadow-panel backdrop-blur">
    <div className="hidden overflow-x-auto md:block">
      <table className="min-w-full">
        <thead className="bg-sand">
          <tr className="text-left text-xs uppercase tracking-[0.24em] text-ink/45">
            <th className="px-5 py-4 xl:px-6">Lead</th>
            <th className="px-4 py-4 xl:px-6">Source</th>
            <th className="px-4 py-4 xl:px-6">Status</th>
            <th className="px-4 py-4 xl:px-6">Created</th>
            <th className="px-5 py-4 text-right xl:px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-t border-moss/8 text-sm text-ink">
              <td className="px-5 py-5 xl:px-6">
                <p className="font-semibold">{lead.name}</p>
                <p className="mt-1 break-all text-ink/55">{lead.email}</p>
              </td>
              <td className="px-4 py-5 xl:px-6">{lead.source}</td>
              <td className="px-4 py-5 xl:px-6">
                <StatusBadge status={lead.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-5 text-ink/60 xl:px-6">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-5 py-5 xl:px-6">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(lead)}
                    className="rounded-full border border-moss/20 p-2 text-ink transition hover:border-moss hover:text-moss"
                  >
                    <Pencil size={16} />
                  </button>
                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(lead)}
                      className="rounded-full border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="grid gap-4 p-4 md:hidden">
      {leads.map((lead) => (
        <article key={lead._id} className="rounded-3xl border border-moss/10 bg-sand/60 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-ink">{lead.name}</p>
              <p className="mt-1 text-sm text-ink/60">{lead.email}</p>
            </div>
            <StatusBadge status={lead.status} />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-ink/60">
            <span>{lead.source}</span>
            <span>{formatDate(lead.createdAt)}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(lead)}
              className="flex-1 rounded-full border border-moss/20 px-4 py-2 text-sm font-semibold text-ink"
            >
              Edit
            </button>
            {canDelete && (
              <button
                type="button"
                onClick={() => onDelete(lead)}
                className="flex-1 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Delete
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default LeadTable;
