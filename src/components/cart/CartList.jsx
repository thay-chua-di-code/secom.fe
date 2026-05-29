import CartItem from "./CartItem";
import CartVoucher from "./CartVoucher";

export default function CartList({
  items,
  disabled,
  onQuantityChange,
  voucherCode,
  onApplyVoucher,
  selectedItemIds,
  onSelectItem,
  onSelectAll,
  allSelected,
  partiallySelected,
  headerCheckboxRef,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="hidden h-14 items-center border-b border-gray-200 bg-gray-50 px-6 text-sm font-medium text-gray-500 md:flex">
        <div className="flex w-12 justify-center">
          <input
            ref={headerCheckboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-secom-600 focus:ring-secom-300"
          />
        </div>
        <div className="flex-1">Product</div>
        <div className="w-40 text-right">Unit Price</div>
        <div className="w-40 text-center">Quantity</div>
        <div className="w-44 text-right">Subtotal</div>
        <div className="w-24 text-center">Action</div>
      </div>

      <div className="space-y-4 p-4 md:p-0">
        {items.map((item) => (
          <div key={item.cartItemId} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <CartItem
              item={item}
              disabled={disabled}
              onQuantityChange={onQuantityChange}
              checked={selectedItemIds.includes(item.cartItemId)}
              onSelectChange={onSelectItem}
            />
            <CartVoucher
              defaultValue={voucherCode}
              disabled={disabled || !selectedItemIds.includes(item.cartItemId)}
              onApply={onApplyVoucher}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
