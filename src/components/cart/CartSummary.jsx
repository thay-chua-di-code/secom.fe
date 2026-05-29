const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartSummary({
  subtotal,
  discountAmount,
  finalTotal,
  itemCount,
  disabled,
  onCheckout,
  selectedCount,
  allSelected,
  partiallySelected,
  onSelectAll,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[80px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(event) => onSelectAll(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-secom-600 focus:ring-secom-300"
              />
              <span className="font-medium text-slate-700">Select All</span>
            </label>

            <span>
              {selectedCount} item{selectedCount !== 1 ? "s" : ""}
            </span>
            <span>
              Subtotal: <span className="font-medium tabular-nums text-slate-700">{currencyFormatter.format(subtotal || 0)}</span>
            </span>
            <span>
              Discount: <span className="font-medium tabular-nums text-slate-700">{currencyFormatter.format(discountAmount || 0)}</span>
            </span>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-2xl font-bold tabular-nums text-secom-600">
                {currencyFormatter.format(finalTotal || 0)}
              </p>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              disabled={disabled}
              className="h-12 rounded-xl bg-secom-500 px-10 text-base font-semibold text-white shadow-sm transition hover:bg-secom-600 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
