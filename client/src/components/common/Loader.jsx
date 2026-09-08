const Loader = ({ label = 'Loading…' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink/60" role="status">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-navy/20 border-t-navy"
        aria-hidden="true"
      />
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default Loader;
