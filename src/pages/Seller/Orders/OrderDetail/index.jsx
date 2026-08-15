import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  PackageCheck,
  CalendarDays,
  ShoppingBag,
  CircleDollarSign,
  Mail,
  Phone,
  User,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

import "./style.scss";

import { formatCurrencyVN, formatDate } from "../../../../utils/fncUtils";
import {
  confirmOrderThunk,
  confirmOrderDeliveredThunk,
  getSellerOrdersThunk,
  resetConfirmState,
} from "../../../../redux/slice/seller/order/slice";
import {
  getSellerOrderAction,
  getSellerOrderStatusLabel,
  normalizeOrderStatus,
} from "../sellerOrderActions";

const OrderDetail = ({ open, onClose, order, loading = false }) => {
  const dispatch = useDispatch();
  const [pendingAction, setPendingAction] = useState(null);
  const { confirmLoading } = useSelector((state) => state.sellerOrder);

  if (!open || !order) {
    return null;
  }

  const statusClass = normalizeOrderStatus(order.status).replace(/\s+/g, "-");
  const sellerAction = getSellerOrderAction(order.status);

  const handleClose = () => {
    if (confirmLoading) return;
    setPendingAction(null);
    dispatch(resetConfirmState());
    onClose();
  };

  const handleConfirmAction = async () => {
    if (!pendingAction || confirmLoading) return;

    const thunk =
      pendingAction.type === "ship"
        ? confirmOrderThunk
        : confirmOrderDeliveredThunk;
    const result = await dispatch(thunk(order.orderId));

    if (thunk.fulfilled.match(result)) {
      toast.success(result.payload?.message || pendingAction.successMessage);
      await dispatch(getSellerOrdersThunk());
      setPendingAction(null);

      onClose();
    } else {
      toast.error(result.payload || "Update order status failed.");
    }
  };

  const shippingSnapshot = order.shippingAddress || {};
  const buyerFullName =
    shippingSnapshot.receiverName || order.buyerFullName || "Not available";
  const buyerPhoneNumber =
    shippingSnapshot.receiverPhone || order.buyerPhoneNumber || "Not available";
  const buyerEmail = order.buyerEmail || "Not available";
  const buyerShippingAddress =
    shippingSnapshot.shippingAddress || order.shippingAddressText || "Not available";

  return (
    <div className="seller-order-detail-overlay" onClick={handleClose}>
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
            onClick={handleClose}
            aria-label="Close order detail"
            disabled={confirmLoading}
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
                {getSellerOrderStatusLabel(order.status)}
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

        <section className="seller-order-detail-buyer">
          <div className="seller-order-detail-section-heading">
            <div>
              <h3>Buyer Information</h3>

              <p>Customer contact information for this order</p>
            </div>
          </div>

          <div className="seller-order-detail-buyer-card">
            <div className="seller-order-detail-buyer-item">
              <div className="seller-order-detail-buyer-icon">
                <User size={18} />
              </div>

              <div>
                <span>Full name</span>
                <strong>{buyerFullName}</strong>
              </div>
            </div>

            <div className="seller-order-detail-buyer-item">
              <div className="seller-order-detail-buyer-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>Email</span>
                <strong>{buyerEmail}</strong>
              </div>
            </div>

            <div className="seller-order-detail-buyer-item">
              <div className="seller-order-detail-buyer-icon">
                <Phone size={18} />
              </div>

              <div>
                <span>Phone number</span>
                <strong>{buyerPhoneNumber}</strong>
              </div>
            </div>

            <div className="seller-order-detail-buyer-item">
              <div className="seller-order-detail-buyer-icon">
                <MapPin size={18} />
              </div>

              <div>
                <span>Shipping address</span>
                <strong>{buyerShippingAddress}</strong>
              </div>
            </div>
          </div>
        </section>

        {loading && <p className="seller-order-detail-loading">Loading latest order detail...</p>}

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
            <button
              type="button"
              className="seller-order-detail-cancel-btn"
              onClick={handleClose}
              disabled={confirmLoading}
            >
              Close
            </button>

            {sellerAction && (
              <button
                type="button"
                className="seller-order-detail-confirm-btn"
                onClick={() => setPendingAction(sellerAction)}
                disabled={confirmLoading}
              >
                {confirmLoading ? sellerAction.loadingLabel : sellerAction.label}
              </button>
            )}
          </div>
        </footer>

        {pendingAction && (
          <div
            className="seller-order-detail-confirm-overlay"
            role="dialog"
            aria-modal="true"
          >
            <div className="seller-order-detail-confirm-dialog">
              <h3>{pendingAction.label}</h3>
              <p>{pendingAction.confirmMessage}</p>
              <div className="seller-order-detail-confirm-actions">
                <button
                  type="button"
                  className="seller-order-detail-cancel-btn"
                  onClick={() => setPendingAction(null)}
                  disabled={confirmLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="seller-order-detail-confirm-btn"
                  onClick={handleConfirmAction}
                  disabled={confirmLoading}
                >
                  {confirmLoading ? pendingAction.loadingLabel : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
