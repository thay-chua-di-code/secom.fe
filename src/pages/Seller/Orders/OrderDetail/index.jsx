import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  PackageCheck,
  CalendarDays,
  ShoppingBag,
  CircleDollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

import "./style.scss";

import { formatCurrencyVN, formatDate } from "../../../../utils/fncUtils";
import {
  confirmOrderThunk,
  resetConfirmState,
  updateSellerOrderStatusThunk,
} from "../../../../redux/slice/seller/order/slice";

const sellerOrderTransitions = {
  pending: ["Confirmed"],
  paid: ["Confirmed", "Processing"],
  confirmed: ["Processing"],
  processing: ["Packed", "Shipping"],
  packed: ["Shipping"],
  Shipping: ["Delivered"],
};

const OrderDetail = ({ open, onClose, order }) => {
  const dispatch = useDispatch();
  console.log(order);
  const {
    confirmLoading,
    confirmSuccess,
    confirmMessage,
    confirmError,
    statusLoading,
  } = useSelector((state) => state.sellerOrder);

  useEffect(() => {
    if (!confirmSuccess) return;

    toast.success(confirmMessage || "Order confirmed successfully.");

    dispatch(resetConfirmState());

    onClose();
  }, [confirmSuccess, confirmMessage, dispatch, onClose]);

  useEffect(() => {
    if (!confirmError) return;

    toast.error(confirmError);

    dispatch(resetConfirmState());
  }, [confirmError, dispatch]);

  if (!open || !order) {
    return null;
  }

  const statusClass = String(order.status || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const nextStatuses =
    sellerOrderTransitions[String(order.status || "").toLowerCase()] || [];

  const handleConfirm = async () => {
    const result = await dispatch(confirmOrderThunk(order.orderId));

    if (confirmOrderThunk.fulfilled.match(result)) {
      toast.success(result.payload?.message || "Order confirmed successfully.");

      onClose();
    } else {
      toast.error(result.payload || "Confirm order failed.");
    }
  };

  const handleUpdateStatus = async (event) => {
    const status = event.target.value;

    if (!status) return;

    const result = await dispatch(
      updateSellerOrderStatusThunk({
        orderId: order.orderId,
        status,
      }),
    );

    if (updateSellerOrderStatusThunk.fulfilled.match(result)) {
      toast.success("Order status updated successfully.");
      onClose();
    } else {
      toast.error(result.payload || "Update order status failed.");
    }
  };

  return (
    <div className="seller-order-detail-overlay" onClick={onClose}>
      <div
        className="seller-order-detail-modal"
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}
        <header className="seller-order-detail-header">
          <div className="seller-order-detail-heading">
            <div className="seller-order-detail-icon">
              <PackageCheck size={22} />
            </div>

            <div>
              <span className="seller-order-detail-eyebrow">
                Seller Order Management
              </span>

              <h2>Order Details</h2>

              <p>Order #{order.orderId}</p>
            </div>
          </div>

          <button
            type="button"
            className="seller-order-detail-close"
            onClick={onClose}
            aria-label="Close order detail"
          >
            <X size={20} />
          </button>
        </header>

        {/* SUMMARY */}
        <section className="seller-order-detail-summary">
          <div className="seller-order-detail-summary-card">
            <div className="seller-order-detail-summary-icon">
              <PackageCheck size={18} />
            </div>

            <div>
              <span>Status</span>

              <strong className={`seller-order-detail-status ${statusClass}`}>
                {order.status}
              </strong>
            </div>
          </div>

          <div className="seller-order-detail-summary-card">
            <div className="seller-order-detail-summary-icon">
              <CalendarDays size={18} />
            </div>

            <div>
              <span>Created Date</span>

              <strong>{formatDate(order.createdAtUtc)}</strong>
            </div>
          </div>

          <div className="seller-order-detail-summary-card">
            <div className="seller-order-detail-summary-icon">
              <CircleDollarSign size={18} />
            </div>

            <div>
              <span>Order Total</span>

              <strong className="seller-order-detail-price">
                {formatCurrencyVN(order.finalTotal)}
              </strong>
            </div>
          </div>

          <div className="seller-order-detail-summary-card">
            <div className="seller-order-detail-summary-icon">
              <ShoppingBag size={18} />
            </div>

            <div>
              <span>Total Products</span>

              <strong>{order.items?.length || 0}</strong>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="seller-order-detail-products">
          <div className="seller-order-detail-section-heading">
            <div>
              <h3>Order Items</h3>

              <p>Products included in this order</p>
            </div>

            <span>{order.items?.length || 0} items</span>
          </div>

          {order.items?.length === 0 ? (
            <div className="seller-order-detail-empty">
              <ShoppingBag size={32} />

              <p>No products in this order.</p>
            </div>
          ) : (
            <div className="seller-order-detail-product-list">
              {order.items.map((item, index) => (
                <article
                  className="seller-order-detail-product"
                  key={item.productId || `order-product-${index}`}
                >
                  <div className="seller-order-detail-product-image">
                    <img src={item.productImageUrl} alt={item.productName} />
                  </div>

                  <div className="seller-order-detail-product-info">
                    <h4>{item.productName}</h4>

                    <div className="seller-order-detail-product-meta">
                      <span>
                        Quantity:
                        <strong>{item.quantity}</strong>
                      </span>

                      <span>
                        Unit Price:
                        <strong>{formatCurrencyVN(item.unitPrice)}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="seller-order-detail-product-total">
                    <span>Subtotal</span>

                    <strong>{formatCurrencyVN(item.subtotal)}</strong>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="seller-order-detail-footer">
          <div className="seller-order-detail-total">
            <span>Final Total</span>

            <strong>{formatCurrencyVN(order.finalTotal)}</strong>
          </div>

          <div className="seller-order-detail-actions">
            {nextStatuses.length > 0 && (
              <label className="seller-order-detail-status-action">
                <span>Next status</span>
                <select
                  defaultValue=""
                  disabled={statusLoading || confirmLoading}
                  onChange={handleUpdateStatus}
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {nextStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
              type="button"
              className="seller-order-detail-cancel-btn"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="button"
              className="seller-order-detail-confirm-btn"
              onClick={handleConfirm}
              disabled={confirmLoading || statusLoading}
            >
              {confirmLoading ? "Confirming..." : "Confirm Order"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrderDetail;
