import type { LeadStatus } from "../types/lead";

const tones: Record<LeadStatus, string> = {
  New: "bg-sky-100 text-sky-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-emerald-100 text-emerald-700",
  Lost: "bg-rose-100 text-rose-700",
};

interface StatusBadgeProps {
  status: LeadStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[status]}`}>
    {status}
  </span>
);

export default StatusBadge;
