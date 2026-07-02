import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";

export default function CartSummary({
  subtotal,
  discountAmount,
  finalTotal,
  itemCount,
  disabled,
  checkoutLoading,
  onCheckout,
  selectedCount,
  cardInfo,
  onCardInfoChange,
}) {
  const handleChange = (field) => (event) => {
    onCardInfoChange(field, event.target.value);
  };

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

      <div className="cart-summary__card-form">
        <h3>Card Information</h3>

        <label>
          Card Name
          <input
            type="text"
            value={cardInfo.cardName}
            onChange={handleChange("cardName")}
            placeholder="JOHN DOE"
          />
        </label>

        <label>
          Card Number
          <input
            type="text"
            value={cardInfo.cardNumber}
            onChange={handleChange("cardNumber")}
            placeholder="4242424242424242"
          />
        </label>

        <div className="cart-summary__card-grid">
          <label>
            Month
            <input
              type="text"
              value={cardInfo.expirationMonth}
              onChange={handleChange("expirationMonth")}
              placeholder="12"
            />
          </label>

          <label>
            Year
            <input
              type="text"
              value={cardInfo.expirationYear}
              onChange={handleChange("expirationYear")}
              placeholder="2030"
            />
          </label>

          <label>
            CVV
            <input
              type="password"
              value={cardInfo.securityCode}
              onChange={handleChange("securityCode")}
              placeholder="123"
            />
          </label>
        </div>
      </div>

      <button
        className="cart-summary__checkout"
        disabled={disabled}
        onClick={onCheckout}
      >
        {checkoutLoading ? "Processing checkout..." : "Proceed To Checkout"}
      </button>
    </aside>
  );
}
