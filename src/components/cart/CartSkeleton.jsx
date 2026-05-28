export default function CartSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-3">
              <div className="h-5 w-56 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
            </div>
            <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-7 w-32 animate-pulse rounded bg-slate-200" />
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-5 w-full animate-pulse rounded bg-slate-100" />
        ))}
        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}
