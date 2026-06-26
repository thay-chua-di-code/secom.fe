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

  console.log(items);
  if (!open) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="cart-dropdown">
        <div className="cart-dropdown__header">
          <h3>Cart</h3>
        </div>

        <div className="cart-dropdown__body">
          <div className="cart-dropdown__empty-state">
            <p>Please log in to view your cart.</p>
            <Link to="/login" className="view-cart-btn bg-sky-600">
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
          <h3>Your Cart</h3>
        </div>

        <div className="cart-dropdown__body">
          <div className="cart-dropdown__empty-state">
            <p>Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-dropdown">
        <div className="cart-dropdown__header">
          <h3>Your Cart</h3>
        </div>

        <div className="cart-dropdown__body">
          <div className="cart-dropdown__empty-state">
            <p>{error}</p>
          </div>
        </div>

        <div className="cart-dropdown__footer">
          <Link to="/cart" className="view-cart-btn bg-sky-600">
            <ShoppingBag size={18} />
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
        <h3>Your Cart</h3>
      </div>

      <div className="cart-dropdown__body">
        {items.length === 0 ? (
          <div className="cart-dropdown__empty-state">
            <p>Your cart is empty</p>
            <Link to="/" className="view-cart-btn bg-sky-600">
              Continue Shopping
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <div className="cart-item" key={item.cartItemId}>
              <div className="cart-item__content cart-item__content--full">
                <h4>{item.productName || "Product"}</h4>

                <div className="cart-item__meta">
                  <span>Qty: {item.quantity}</span>
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

      <div className="cart-dropdown__footer">
        <span>
          {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} in cart
        </span>

        <Link to="/cart" className="view-cart-btn bg-sky-600">
          <ShoppingBag size={18} />
          View Cart
        </Link>
      </div>
    </div>
  );
}
