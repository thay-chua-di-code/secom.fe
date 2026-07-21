import { X } from "lucide-react";
import "./style.scss";

export default function OrderDetailModal({ open, onClose, order }) {
  if (!open || !order) return null;

  const formatMoney = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="order-detail-overlay" onClick={onClose}>
      <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
       
          <div className="info-grid">
            <div className="info-card">
              <label>Order ID</label>
              <p className="highlight-blue">{order.id}</p>
            </div>

            <div className="info-card">
              <label>Date</label>
              <p>{new Date(order.createdAtUtc).toLocaleDateString("en-CA")}</p>
             
            </div>

            <div className="info-card">
              <label>Customer</label>
              <p>{order.buyerFullName}</p>
            </div>

            <div className="info-card">
              <label>Payment Method</label>
              <p>{order.paymentMethod || "Credit Card"}</p>
            </div>
          </div>

         
          <div className="info-card full-width">
            <label>Product</label>
            <p>{order.productName || "Samsung Galaxy S24 Ultra"}</p>
          </div>

         
          <div className="info-card full-width total-row">
            <div>
              <label>Total Amount</label>
              <p className="price-amount">{formatMoney(order.finalTotal)}</p>
            </div>
            <span
              className={`status-badge ${order.status?.toLowerCase() || ""}`}
            >
              {order.status || "Delivered"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
