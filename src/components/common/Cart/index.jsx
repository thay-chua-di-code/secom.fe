import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/useCart";
import "./style.scss";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
          items.map((item) => (
            <div className="cart-item" key={item.cartItemId}>
              <div className="cart-item__content">
                <h4>{item.productName || "Product"}</h4>

                <div className="cart-item__meta">
                  <span>Qty {item.quantity}</span>

                  <span>{currencyFormatter.format(item.unitPrice || 0)}</span>
                </div>

                <div className="cart-item__bottom">
                  <span className="price">
                    {currencyFormatter.format(item.subtotal || 0)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="cart-dropdown__footer">
          <span className="cart-dropdown__summary">
            {totalQuantity} item{totalQuantity !== 1 ? "s" : ""}
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
