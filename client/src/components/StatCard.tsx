import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint: string;
  icon: ReactNode;
}

const StatCard = ({ label, value, hint, icon }: StatCardProps) => (
  <div className="h-full rounded-[28px] border border-white/80 bg-white p-5 shadow-panel">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-ink/45">{label}</p>
        <p className="mt-3 font-display text-4xl text-ink xl:text-5xl">{value}</p>
      </div>
      <div className="rounded-2xl bg-mint p-3 text-moss">{icon}</div>
    </div>
    <p className="mt-4 text-sm text-ink/60">{hint}</p>
  </div>
);

export default StatCard;
