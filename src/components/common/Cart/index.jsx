import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/useCart";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import "./style.scss";

const FALLBACK_IMAGE = "/favicon.svg";

const getCartItemImage = (item = {}) =>
  item.productImageUrl ||
  item.primaryImageUrl ||
  item.imageUrl ||
  item.thumbnailUrl ||
  item.productThumbnailUrl ||
  item.image ||
  item.product?.primaryImageUrl ||
  item.product?.imageUrl ||
  item.product?.thumbnailUrl ||
  FALLBACK_IMAGE;

export default function Cart({ open }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items, loading, error } = useCart();

  if (!open) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="cart-dropdown">
        <div className="cart-dropdown__header">
          <div>
            <span className="cart-dropdown__eyebrow">SHOPPING BAG</span>

            <h3>Your Cart</h3>
          </div>
        </div>

        <div className="cart-dropdown__body">
          <div className="cart-dropdown__empty-state">
            <div className="cart-dropdown__empty-icon">
              <ShoppingBag size={22} />
            </div>

            <strong>Sign in to view your cart</strong>

            <p>Your saved cart items will appear here after you log in.</p>

            <Link to="/login" className="view-cart-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-dropdown">
        <div className="cart-dropdown__header">
          <div>
            <span className="cart-dropdown__eyebrow">SHOPPING BAG</span>

            <h3>Your Cart</h3>
          </div>
        </div>

        <div className="cart-dropdown__body">
          <div className="cart-dropdown__empty-state">
            <span className="cart-dropdown__spinner" />

            <strong>Loading cart</strong>

            <p>Please wait a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-dropdown">
        <div className="cart-dropdown__header">
          <div>
            <span className="cart-dropdown__eyebrow">SHOPPING BAG</span>

            <h3>Your Cart</h3>
          </div>
        </div>

        <div className="cart-dropdown__body">
          <div className="cart-dropdown__empty-state">
            <div className="cart-dropdown__empty-icon">
              <ShoppingBag size={22} />
            </div>

            <strong>Unable to load cart</strong>

            <p>{error}</p>
          </div>
        </div>

        <div className="cart-dropdown__footer">
          <Link to="/cart" className="view-cart-btn">
            <ShoppingBag size={17} />
            View Cart
          </Link>
        </div>
      </div>
    );
  }

  const totalQuantity = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__header">
        <div>
          <span className="cart-dropdown__eyebrow">SHOPPING BAG</span>

          <h3>Your Cart</h3>
        </div>

        <span className="cart-dropdown__count">{totalQuantity}</span>
      </div>

      <div className="cart-dropdown__body">
        {items.length === 0 ? (
          <div className="cart-dropdown__empty-state">
            <div className="cart-dropdown__empty-icon">
              <ShoppingBag size={22} />
            </div>

            <strong>Your cart is empty</strong>

            <p>Browse products and add something you like.</p>

            <Link to="/products" className="view-cart-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-dropdown__items">
            {items.map((item) => (
              <Link
                key={item.cartItemId}
                to={`/product-detail/${item.productId}`}
                className="cart-dropdown-item"
              >
                <div className="cart-dropdown-item__image">
                  <img
                    src={getCartItemImage(item)}
                    alt={item.productName || "Product"}
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                </div>

                <div className="cart-dropdown-item__content">
                  <h4>{item.productName || "Product"}</h4>

                  <div className="cart-dropdown-item__meta">
                    <span>Qty {item.quantity || 0}</span>

                    <span>{formatCurrencyVN(item.unitPrice || 0)}</span>
                  </div>

                  <div className="cart-dropdown-item__bottom">
                    <span>Subtotal</span>

                    <strong>
                      {formatCurrencyVN(item.subtotal || 0)}
                    </strong>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="cart-dropdown__footer">
          <span className="cart-dropdown__summary">
            {totalQuantity} item
            {totalQuantity !== 1 ? "s" : ""}
          </span>

          <Link to="/cart" className="view-cart-btn">
            <ShoppingBag size={17} />
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
}
