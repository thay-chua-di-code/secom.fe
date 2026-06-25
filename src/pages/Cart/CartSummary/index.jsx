import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";

export default function CartSummary({
  subtotal,
  discountAmount,
  finalTotal,
  itemCount,
  disabled,
  onCheckout,
  selectedCount,
}) {
  return (
    <aside className="cart-summary">
      <div className="cart-summary__header">
        <h2>Order Summary</h2>
      </div>

      <div className="cart-summary__body">
        <div className="cart-summary__row">
          <span>Selected Products</span>
          <span>{selectedCount}</span>
        </div>

        <div className="cart-summary__row">
          <span>Total Quantity</span>
          <span>{itemCount}</span>
        </div>

        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>{formatCurrencyVN(subtotal || 0)}</span>
        </div>

        <div className="cart-summary__row">
          <span>Discount</span>
          <span className="discount">
            - {formatCurrencyVN(discountAmount || 0)}
          </span>
        </div>

        <div className="cart-summary__divider" />

        <div className="cart-summary__total">
          <span>Total</span>
          <span>{formatCurrencyVN(finalTotal || 0)}</span>
        </div>
      </div>

      <button
        className="cart-summary__checkout"
        disabled={disabled}
        onClick={onCheckout}
      >
        Proceed To Checkout
      </button>
    </aside>
  );
}
