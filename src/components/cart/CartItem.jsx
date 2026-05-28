import QuantitySelector from "./QuantitySelector";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartItem({ item, disabled, onQuantityChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">{item.productName}</h2>
        <p className="text-sm text-slate-500">Seller ID: {item.sellerId}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span>Unit price: {currencyFormatter.format(item.unitPrice || 0)}</span>
          <span>Subtotal: {currencyFormatter.format(item.subtotal || 0)}</span>
        </div>
      </div>

      <QuantitySelector
        quantity={item.quantity}
        disabled={disabled}
        onChange={(quantity) => onQuantityChange(item.cartItemId, quantity)}
      />
    </div>
  );
}
