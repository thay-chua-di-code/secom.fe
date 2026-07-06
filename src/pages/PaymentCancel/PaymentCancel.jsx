import { Link } from "react-router-dom";
import "./style.scss";

export default function PaymentCancel() {
  return (
    <main className="payment-cancel">
      <section className="payment-cancel__card">
        <div className="payment-cancel__icon">⚠️</div>
        <h1>Bạn đã hủy thanh toán.</h1>
        <p>Giao dịch chưa được hoàn tất. Bạn có thể quay lại giỏ hàng để thử lại.</p>

        <div className="payment-cancel__actions">
          <Link to="/cart" className="payment-cancel__primary">
            Quay lại Cart
          </Link>
          <Link to="/products" className="payment-cancel__secondary">
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>
    </main>
  );
}
