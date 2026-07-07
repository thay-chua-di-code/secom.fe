import "./style.scss";
import { X } from "lucide-react";
import { formatCurrencyVN, formatDate } from "../../../../utils/fncUtils";

const OrderDetail = ({ open, onClose, order }) => {
  if (!open || !order) return null;

  return (
    <div className="order-detail-overlay" onClick={onClose}>
      <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Order Detail</h2>

            <span>#{order.orderId}</span>
          </div>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="summary">
          <div className="summary-item">
            <span>Status</span>

            <strong className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </strong>
          </div>

          <div className="summary-item">
            <span>Created</span>

            <strong>{formatDate(order.createdAtUtc)}</strong>
          </div>

          <div className="summary-item">
            <span>Total</span>

            <strong>{formatCurrencyVN(order.finalTotal)}</strong>
          </div>

          <div className="summary-item">
            <span>Products</span>

            <strong>{order.items.length}</strong>
          </div>
        </div>

        <div className="product-list">
          {order.items.length === 0 ? (
            <div className="empty">No products in this order.</div>
          ) : (
            order.items.map((item) => (
              <div className="product-card" key={item.productId}>
                <img src={item.productImageUrl} alt={item.productName} />

                <div className="content">
                  <h4>{item.productName}</h4>

                  <p>Quantity: {item.quantity}</p>

                  <p>
                    Unit Price:
                    <strong>{formatCurrencyVN(item.unitPrice)}</strong>
                  </p>
                </div>

                <div className="subtotal">
                  {formatCurrencyVN(item.subtotal)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="footer">
          <div className="total">
            Total
            <strong>{formatCurrencyVN(order.finalTotal)}</strong>
          </div>

          <div className="actions">

            <button className="confirm-btn">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
