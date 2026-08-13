import { MapPin, Plus } from "lucide-react";
import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";

const buildAddressLines = (address) => {
  if (!address) return [];

  return [
    address.detailAddress,
    [address.ward, address.district, address.province].filter(Boolean).join(", "),
  ].filter(Boolean);
};

export default function CartSummary({
  subtotal,
  discountAmount,
  finalTotal,
  itemCount,
  disabled,
  checkoutLoading,
  onCheckout,
  selectedCount,
  selectedAddress,
  addresses = [],
  onSelectAddress,
  onAddAddress,
}) {
  const hasAddresses = addresses.length > 0;

  return (
    <aside className="cart-summary">
      <div className="cart-summary__header">
        <h2>Order Summary</h2>
      </div>

      <div className="cart-summary__section">
        <div className="cart-summary__section-header">
          <h3>Shipping Address</h3>
          <button
            type="button"
            className="cart-summary__address-action"
            onClick={onAddAddress}
          >
            <Plus size={15} />
            {hasAddresses ? "Add Address" : "Add Address"}
          </button>
        </div>

        {!hasAddresses ? (
          <div className="cart-summary__empty-state">
            <MapPin size={18} />
            <div>
              <strong>No shipping address found.</strong>
              <p>Add an address before proceeding to checkout.</p>
            </div>
          </div>
        ) : (
          <div className="cart-summary__address-list">
            {addresses.map((address) => {
              const isSelected = selectedAddress?.id === address.id;
              const lines = buildAddressLines(address);

              return (
                <label
                  key={address.id}
                  className={`cart-summary__address-card ${
                    isSelected ? "cart-summary__address-card--selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingAddress"
                    checked={isSelected}
                    onChange={() => onSelectAddress?.(address.id)}
                  />

                  <div className="cart-summary__address-content">
                    <div className="cart-summary__address-heading">
                      <strong>{address.receiverName}</strong>
                      {address.isDefault ? (
                        <span className="cart-summary__address-badge">Default</span>
                      ) : null}
                    </div>
                    <p>{address.phoneNumber}</p>
                    {lines.map((line) => (
                      <p key={`${address.id}-${line}`}>{line}</p>
                    ))}
                  </div>
                </label>
              );
            })}
          </div>
        )}
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
          <span className="discount">- {formatCurrencyVN(discountAmount || 0)}</span>
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
        {checkoutLoading ? "Processing checkout..." : "Proceed To Checkout"}
      </button>
    </aside>
  );
}
