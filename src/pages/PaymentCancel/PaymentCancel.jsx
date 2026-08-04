import { Link } from "react-router-dom";
import "./style.scss";

export default function PaymentCancel() {
  return (
    <main className="payment-cancel">
      <section className="payment-cancel__card">
        <div className="payment-cancel__icon">⚠️</div>
        <h1>Payment cancelled.</h1>
        <p>The transaction was not completed. You can return to your cart and try again.</p>

        <div className="payment-cancel__actions">
          <Link to="/cart" className="payment-cancel__primary">
            Back to Cart
          </Link>
          <Link to="/products" className="payment-cancel__secondary">
            Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
