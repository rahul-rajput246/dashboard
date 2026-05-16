interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-moss/20 bg-white/75 px-6 py-14 text-center shadow-panel backdrop-blur">
    <p className="font-display text-3xl text-ink">{title}</p>
    <p className="mx-auto mt-3 max-w-md text-sm text-ink/65">{description}</p>
  </div>
);

export default EmptyState;
