import {
  User,
  Receipt,
  CalendarDays,
  TicketPercent,
  Wallet,
  Truck,
  CircleDollarSign,
  X,
} from "lucide-react";

import "./style.scss";

export default function OrderDetailModal({ open, onClose, order }) {
  if (!open || !order) return null;

  const formatMoney = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="order-detail-overlay">
      <div className="order-detail-modal">
        <div className="modal-header">
          <h2>Order Detail</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Customer */}

          <div className="section">
            <h3>
              <User size={18} />
              Customer Information
            </h3>

            <div className="grid">
              <div>
                <label>Buyer ID</label>
                <p>{order.buyerId}</p>
              </div>

              <div>
                <label>Buyer Name</label>
                <p>{order.buyerFullName}</p>
              </div>
            </div>
          </div>

          {/* Order */}

          <div className="section">
            <h3>
              <Receipt size={18} />
              Order Information
            </h3>

            <div className="grid">
              <div>
                <label>Order ID</label>
                <p>{order.id}</p>
              </div>

              <div>
                <label>Status</label>

                <span className="status">{order.status}</span>
              </div>

              <div>
                <label>
                  <CalendarDays size={15} />
                  Created
                </label>

                <p>{new Date(order.createdAtUtc).toLocaleString()}</p>
              </div>

              <div>
                <label>
                  <CalendarDays size={15} />
                  Cancelled
                </label>

                <p>
                  {order.cancelledAtUtc
                    ? new Date(order.cancelledAtUtc).toLocaleString()
                    : "--"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}

          <div className="section">
            <h3>
              <Wallet size={18} />
              Payment Summary
            </h3>

            <div className="payment-list">
              <div>
                <CircleDollarSign size={18} />

                <span>Subtotal</span>

                <strong>{formatMoney(order.subtotal)}</strong>
              </div>

              <div>
                <Truck size={18} />

                <span>Shipping Fee</span>

                <strong>{formatMoney(order.shippingFee)}</strong>
              </div>

              <div>
                <Wallet size={18} />

                <span>Service Fee</span>

                <strong>{formatMoney(order.serviceFee)}</strong>
              </div>

              <div>
                <TicketPercent size={18} />

                <span>Discount</span>

                <strong className="discount">
                  -{formatMoney(order.discountAmount)}
                </strong>
              </div>

              <div>
                <span>Voucher</span>

                <strong>{order.voucherCode || "--"}</strong>
              </div>

              <div className="total">
                <span>Final Total</span>

                <strong>{formatMoney(order.finalTotal)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
