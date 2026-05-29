export default function CartSkeleton() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden md:grid grid-cols-12 items-center gap-4 border-b border-gray-200 bg-white px-6 py-4">
          <div className="col-span-1 flex justify-center">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="col-span-5 h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="col-span-2 h-4 w-20 animate-pulse rounded bg-gray-200 mx-auto" />
          <div className="col-span-2 h-4 w-20 animate-pulse rounded bg-gray-200 mx-auto" />
          <div className="col-span-2 h-4 w-20 animate-pulse rounded bg-gray-200 mx-auto" />
          <div className="col-span-1 h-4 w-14 animate-pulse rounded bg-gray-200 mx-auto" />
        </div>

        {[1, 2, 3].map((row) => (
          <div key={row} className="hidden md:grid grid-cols-12 items-center gap-4 border-b border-gray-100 px-6 py-5 last:border-b-0">
            <div className="col-span-1 flex justify-center">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="col-span-5 flex items-center gap-4">
              <div className="h-20 w-20 animate-pulse rounded-lg bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
            <div className="col-span-2 h-4 w-20 animate-pulse rounded bg-gray-100 mx-auto" />
            <div className="col-span-2 h-9 w-28 animate-pulse rounded bg-gray-100 mx-auto" />
            <div className="col-span-2 h-4 w-20 animate-pulse rounded bg-gray-100 mx-auto" />
            <div className="col-span-1 h-4 w-4 animate-pulse rounded bg-gray-100 mx-auto" />
          </div>
        ))}

        {[1, 2].map((row) => (
          <div key={`m-${row}`} className="md:hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex gap-3">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200 mt-1" />
              <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-9 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-8 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 h-10 w-full animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}
