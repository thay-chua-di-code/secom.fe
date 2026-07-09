import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import "./CartEmpty.scss";

export default function CartEmpty() {
  return (
    <section className="cart-empty">
      <div className="cart-empty__card">
        <div className="cart-empty__icon">
          <ShoppingBag size={70} strokeWidth={1.8} />
        </div>

        <h2 className="cart-empty__title">Your cart is empty</h2>

        <p className="cart-empty__description">
          Looks like you haven't added any products yet. Discover thousands of
          amazing products and start shopping today.
        </p>

        <Link to="/" className="cart-empty__button">
          <span>Continue Shopping</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
