import { Package, Trash2 } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../redux/slice/cartSlice";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartItem({
  item,
  disabled,
  onQuantityChange,
  checked,
  onSelectChange,
}) {
  const rowSelectedClass = checked ? "bg-secom-50/30" : "";

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeCartItem(item.cartItemId));
  };
  return (
    <>
      <div
        className={`hidden min-h-[120px] items-center gap-4 px-6 py-7 transition hover:bg-secom-50/30 md:flex ${rowSelectedClass}`}
        role="row"
      >
        <div className="flex w-12 justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) =>
              onSelectChange(item.cartItemId, event.target.checked)
            }
            className="h-4 w-4 rounded border-gray-300 text-secom-600 focus:ring-secom-300"
          />
        </div>

        <div className="flex flex-1 items-center gap-5 pr-6">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-gray-100">
            <Package className="text-gray-400" size={24} />
          </div>
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold leading-6 text-slate-900">
              {item.productName || "Unnamed Product"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Seller:{" "}
              <span className="font-medium text-slate-600">
                {item.sellerId}
              </span>
            </p>
          </div>
        </div>

        <div className="w-40 text-right text-sm font-medium tabular-nums text-slate-900">
          {currencyFormatter.format(item.unitPrice || 0)}
        </div>

        <div className="flex w-40 justify-center">
          <QuantitySelector
            quantity={item.quantity}
            disabled={disabled}
            onChange={(quantity) => onQuantityChange(item.cartItemId, quantity)}
          />
        </div>

        <div className="w-44 text-right text-sm font-medium tabular-nums text-slate-900">
          {currencyFormatter.format(item.subtotal || 0)}
        </div>

        <div className="flex w-24 justify-center">
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label={`Remove ${item.productName || "product"} from cart`}
            title="Remove from cart"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div
        className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:hidden ${checked ? "bg-secom-50/30" : ""}`}
      >
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) =>
              onSelectChange(item.cartItemId, event.target.checked)
            }
            className="mt-1 h-4 w-4 rounded border-gray-300 text-secom-600 focus:ring-secom-300"
          />
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-gray-100">
            <Package className="text-gray-400" size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-semibold text-slate-900">
              {item.productName || "Unnamed Product"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Seller: {item.sellerId}
            </p>
            <p className="mt-1 text-xs font-medium tabular-nums text-slate-900">
              {currencyFormatter.format(item.unitPrice || 0)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <QuantitySelector
            quantity={item.quantity}
            disabled={disabled}
            onChange={(quantity) => onQuantityChange(item.cartItemId, quantity)}
          />
          <div className="text-right">
            <p className="text-xs text-slate-500">Subtotal</p>
            <p className="text-sm font-semibold tabular-nums text-slate-900">
              {currencyFormatter.format(item.subtotal || 0)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label={`Remove ${item.productName || "product"} from cart`}
            title="Remove from cart"
            className="flex h-8 w-8 items-center justify-center rounded text-gray-400 disabled:opacity-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
