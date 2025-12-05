export const FullScreenSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-slate-600">
      <div className="flex flex-col items-center gap-3">
        <span className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
        <p className="text-sm font-medium">Bootstrapping experience…</p>
      </div>
    </div>
  );
};
