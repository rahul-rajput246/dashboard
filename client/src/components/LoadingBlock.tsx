const LoadingBlock = () => (
  <div className="rounded-3xl border border-white/70 bg-white/85 px-6 py-12 text-center shadow-panel backdrop-blur">
    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-moss/20 border-t-moss" />
    <p className="mt-4 text-sm font-medium text-ink/70">Loading leads...</p>
  </div>
);

export default LoadingBlock;
