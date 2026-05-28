const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartSummary({
  subtotal,
  discountAmount,
  finalTotal,
  disabled,
  onCheckout,
  children,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-slate-900">
            {currencyFormatter.format(subtotal || 0)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-medium text-slate-900">
            {currencyFormatter.format(discountAmount || 0)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{currencyFormatter.format(finalTotal || 0)}</span>
        </div>
      </div>
      <div className="mt-6">{children}</div>
      <button
        type="button"
        onClick={onCheckout}
        disabled={disabled}
        className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
