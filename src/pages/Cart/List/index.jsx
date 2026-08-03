import { useDispatch } from "react-redux";
import { removeCartItem } from "../../../redux/slice/cartSlice";
import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";

export default function CartList({
  items,
  selectedItemIds,
  onSelectItem,
  onSelectAll,
  onQuantityChange,
  allSelected,
  headerCheckboxRef,
  disabled,
}) {
  const dispatch = useDispatch();

  return (
    <div className="cart-list" data-testid="cart-list">
      <div className="cart-list__header">
        <label>
          <input
            ref={headerCheckboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
          Select All
        </label>
      </div>
      <div className="cart-list__body">
        {items.map((item) => (
          <div className="cart-item" data-testid="cart-item" key={item.cartItemId}>
            <input
              type="checkbox"
              checked={selectedItemIds.includes(item.cartItemId)}
              onChange={(e) => onSelectItem(item.cartItemId, e.target.checked)}
            />
            <div className="cart-item__content">
              <h3>{item.productName}</h3>
              <span>Qty: {item.quantity}</span>
              <div className="cart-item__price">
                {formatCurrencyVN(item.subtotal || 0)}
              </div>
              <div className="cart-item__actions">
                <button
                  data-testid="quantity-decrease-btn"
                  type="button"
                  disabled={disabled}
                  onClick={() => onQuantityChange(item.cartItemId, Math.max(1, item.quantity - 1))}
                >
                  -
                </button>
                <button
                  data-testid="quantity-increase-btn"
                  type="button"
                  disabled={disabled}
                  onClick={() => onQuantityChange(item.cartItemId, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  data-testid="remove-cart-item-btn"
                  type="button"
                  disabled={disabled}
                  aria-label={`Remove ${item.productName || "product"} from cart`}
                  onClick={() => dispatch(removeCartItem(item.cartItemId))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
