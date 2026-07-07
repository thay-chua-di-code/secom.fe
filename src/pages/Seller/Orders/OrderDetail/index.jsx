import "./style.scss";
import { X } from "lucide-react";
import { formatCurrencyVN, formatDate } from "../../../../utils/fncUtils";
import toast from "react-hot-toast";
import {
  confirmOrderThunk,
  resetConfirmState,
} from "../../../../redux/slice/seller/order/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const OrderDetail = ({ open, onClose, order }) => {
  if (!open || !order) return null;
  const dispatch = useDispatch();

  const { confirmLoading, confirmSuccess, confirmMessage, confirmError } =
    useSelector((state) => state.sellerOrder);

  const handleConfirm = async () => {
    const result = await dispatch(confirmOrderThunk(order.orderId));

    if (confirmOrderThunk.fulfilled.match(result)) {
      toast.success(result.payload.message);
      onClose();
    } else {
      toast.error(result.payload || "Confirm order failed.");
    }
  };

  useEffect(() => {
    if (confirmSuccess) {
      toast.success(confirmMessage);
      dispatch(resetConfirmState());
      onClose();
    }
  }, [confirmSuccess, confirmMessage, dispatch, onClose]);

  useEffect(() => {
    if (confirmError) {
      toast.error(confirmError);
      dispatch(resetConfirmState());
      onClose();
    }
  }, [confirmError, dispatch]);
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
            <button
              className="confirm-btn"
              onClick={handleConfirm}
              disabled={confirmLoading}
            >
              {confirmLoading ? "Confirming..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
