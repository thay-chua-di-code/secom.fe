import { Clock3, PackageCheck, Search, Truck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { orderApi, unwrapApiData } from "../../../api/orderApi";
import { paymentApi } from "../../../api/paymentApi";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import "./style.scss";

const orderStatuses = [
  "all",
  "pending",
  "paid",
  "packed",
  "shipping",
  "delivered",
  "completed",
  "cancelled",
  "refunded",
];

const statusLabels = {
  all: "All",
  pending: "Pending",
  paid: "Paid",
  packed: "Packed",
  shipping: "Shipping",
  delivered: "Delivered",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

const defaultCardInfo = {
  cardName: "JOHN DOE",
  cardNumber: "4242424242424242",
  expirationMonth: "12",
  expirationYear: "2030",
  securityCode: "123",
};

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Đã xảy ra lỗi. Vui lòng thử lại.";

const unwrapList = (response) => {
  const data = unwrapApiData(response);
  const payload = data?.data ?? data;

  if (Array.isArray(payload)) return { items: payload, totalCount: payload.length };
  if (Array.isArray(payload?.items)) return payload;
  if (Array.isArray(payload?.data)) return { ...payload, items: payload.data };

  return { items: [], totalCount: 0 };
};

const unwrapOrder = (response) => {
  const data = unwrapApiData(response);
  return data?.data?.order || data?.data || data?.order || data;
};

const unwrapPayment = (response) => {
  const data = unwrapApiData(response);
  return data?.data?.paymentTransaction || data?.data || data?.paymentTransaction || data;
};

const normalizeStatus = (status) => String(status || "").toLowerCase();

const canPay = (order) => normalizeStatus(order?.status) === "pending";

const canCancel = (order) => {
  const status = normalizeStatus(order?.status);
  return status === "pending" || status === "paid";
};

const getOrderId = (order) => order?.orderId || order?.id;
const getFinalTotal = (order) => order?.finalTotal ?? order?.finalTotalAmount ?? 0;
const getOrderItems = (order) => order?.items || order?.orderItems || order?.products || [];

const loadOmiseScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Omise) {
      resolve(window.Omise);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://cdn.omise.co/omise.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.Omise));
      existingScript.addEventListener("error", () => reject(new Error("Cannot load Omise.js")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.omise.co/omise.js";
    script.async = true;
    script.onload = () => resolve(window.Omise);
    script.onerror = () => reject(new Error("Cannot load Omise.js"));
    document.body.appendChild(script);
  });
};

const createOmiseToken = async () => {
  const publicKey = import.meta.env.VITE_OMISE_PUBLIC_KEY;

  if (!publicKey) {
    throw new Error("Missing VITE_OMISE_PUBLIC_KEY");
  }

  const Omise = await loadOmiseScript();
  Omise.setPublicKey(publicKey);

  return new Promise((resolve, reject) => {
    Omise.createToken(
      "card",
      {
        name: defaultCardInfo.cardName,
        number: defaultCardInfo.cardNumber,
        expiration_month: defaultCardInfo.expirationMonth,
        expiration_year: defaultCardInfo.expirationYear,
        security_code: defaultCardInfo.securityCode,
      },
      (statusCode, response) => {
        if (statusCode === 200 && response?.id) {
          resolve(response);
          return;
        }

        reject(new Error(response?.message || "Không thể tạo token thanh toán."));
      },
    );
  });
};

function StatusBadge({ status }) {
  const normalized = normalizeStatus(status);
  return <span className={`status-badge status-badge--${normalized}`}>{status || "--"}</span>;
}

function OrderDetailModal({ order, payment, loading, onClose, onRefresh }) {
  if (!order) return null;

  const items = getOrderItems(order);

  return (
    <div className="order-detail-backdrop">
      <div className="order-detail-panel">
        <div className="order-detail-panel__header">
          <h2>Order Detail</h2>
          <button type="button" onClick={onClose}>×</button>
        </div>

        {loading && <p className="order-muted">Loading latest order...</p>}

        <section>
          <h3>Order</h3>
          <div className="detail-grid">
            <div><span>Order ID</span><strong>{getOrderId(order)}</strong></div>
            <div><span>Status</span><StatusBadge status={order.status} /></div>
            <div><span>Created At</span><strong>{order.createdAtUtc || order.createdAt ? new Date(order.createdAtUtc || order.createdAt).toLocaleString() : "--"}</strong></div>
            <div><span>Subtotal</span><strong>{formatCurrencyVN(order.subtotal || 0)}</strong></div>
            <div><span>Shipping Fee</span><strong>{formatCurrencyVN(order.shippingFee || 0)}</strong></div>
            <div><span>Service Fee</span><strong>{formatCurrencyVN(order.serviceFee || 0)}</strong></div>
            <div><span>Discount Amount</span><strong>{formatCurrencyVN(order.discountAmount || 0)}</strong></div>
            <div><span>Final Total</span><strong>{formatCurrencyVN(getFinalTotal(order))}</strong></div>
            <div><span>Voucher Code</span><strong>{order.voucherCode || "--"}</strong></div>
          </div>
        </section>

        <section>
          <h3>Items</h3>
          <div className="order-detail-items">
            {items.length === 0 && <p className="order-muted">No items.</p>}
            {items.map((item) => {
              const quantity = item.quantity || 0;
              const unitPrice = item.unitPrice || item.price || 0;
              const subtotal = item.subtotal || unitPrice * quantity;

              return (
                <div className="order-detail-item" key={item.id || item.orderItemId || item.productId}>
                  <div><strong>{item.productName || item.name || "Product"}</strong><span>Status: {item.status || "--"}</span></div>
                  <div><span>Qty: {quantity}</span><span>Unit: {formatCurrencyVN(unitPrice)}</span><strong>{formatCurrencyVN(subtotal)}</strong></div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h3>Payment</h3>
          <div className="detail-grid">
            <div><span>Payment ID</span><strong>{payment?.id || payment?.paymentId || "--"}</strong></div>
            <div><span>Gateway</span><strong>{payment?.gateway || "Omise"}</strong></div>
            <div><span>Gateway Transaction ID</span><strong>{payment?.gatewayTransactionId || payment?.chargeId || "--"}</strong></div>
            <div><span>Payment Status</span><StatusBadge status={payment?.status || order.paymentStatus} /></div>
            <div><span>Amount</span><strong>{formatCurrencyVN(payment?.amount || getFinalTotal(order))}</strong></div>
            <div><span>Currency</span><strong>{payment?.currency || "--"}</strong></div>
          </div>
        </section>

        <div className="order-detail-panel__footer">
          <button type="button" onClick={onRefresh}>Refresh</button>
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function OrderHistory() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, totalCount: 0 });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const loadOrders = useCallback(async ({ page = 1, status = activeStatus } = {}) => {
    try {
      setLoading(true);
      const response = await orderApi.getPurchasedOrdersPaged({
        status: status === "all" ? undefined : status,
        page,
        pageSize: pagination.pageSize,
      });
      const payload = unwrapList(response);
      setOrders(payload.items || []);
      setPagination((prev) => ({
        ...prev,
        page,
        totalCount: payload.totalCount || payload.items?.length || 0,
      }));
      setError("");
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, [activeStatus, pagination.pageSize]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => loadOrders({ page: 1 }), 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadOrders]);

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    loadOrders({ page: 1, status });
  };

  const loadDetail = async (orderId) => {
    try {
      setDetailLoading(true);
      const [orderResponse, paymentResponse] = await Promise.allSettled([
        orderApi.getOrderDetail(orderId),
        paymentApi.getPaymentTransactionByOrderId(orderId),
      ]);

      if (orderResponse.status === "fulfilled") {
        setSelectedOrder(unwrapOrder(orderResponse.value));
      } else {
        setError(getApiErrorMessage(orderResponse.reason));
      }

      if (paymentResponse.status === "fulfilled") {
        setSelectedPayment(unwrapPayment(paymentResponse.value));
      } else {
        setSelectedPayment(null);
      }
    } finally {
      setDetailLoading(false);
    }
  };

  const handlePay = async (order) => {
    if (!canPay(order)) {
      setError("Chỉ có thể thanh toán đơn hàng pending.");
      return;
    }

    const orderId = getOrderId(order);
    const amount = getFinalTotal(order);

    try {
      setActionLoading(orderId);
      const token = await createOmiseToken();
      const paymentRequest = {
        orderId,
        amount,
        currency: "vnd",
        returnUri: `${window.location.origin}/payment-return`,
        tokenId: token.id,
      };

      const response = await paymentApi.createPaymentTransaction(paymentRequest);
      const data = unwrapApiData(response);
      const payment = data?.data ?? data;
      const paymentUrl = payment?.paymentUrl;

      if (paymentUrl) {
        localStorage.setItem("lastOrderId", orderId);
        window.location.assign(paymentUrl);
        return;
      }

      await loadOrders({ page: pagination.page });
    } catch (payError) {
      setError(getApiErrorMessage(payError));
    } finally {
      setActionLoading("");
    }
  };

  const handleCancel = async (order) => {
    if (!canCancel(order)) return;

    const orderId = getOrderId(order);

    try {
      setActionLoading(orderId);
      await orderApi.cancelOrder(orderId);
      await loadOrders({ page: pagination.page });
    } catch (cancelError) {
      setError(getApiErrorMessage(cancelError));
    } finally {
      setActionLoading("");
    }
  };

  return (
    <div className="order-history">
      <div className="order-header">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Tìm theo ID đơn hàng..." />
        </div>

        <button className="filter-btn" type="button" onClick={() => loadOrders({ page: pagination.page })}>
          <Clock3 size={18} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="order-tabs">
        {orderStatuses.map((status) => (
          <button
            key={status}
            type="button"
            className={`tab-item ${activeStatus === status ? "active" : ""}`}
            onClick={() => handleStatusChange(status)}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>

      {error && <div className="payment-error">{error}</div>}
      {loading && <p className="order-muted">Loading orders...</p>}

      <div className="order-list">
        {!loading && orders.length === 0 && <p className="order-muted">No orders found.</p>}

        {orders.map((order) => {
          const orderId = getOrderId(order);
          const isLoading = actionLoading === orderId;

          return (
            <div key={orderId} className="order-card">
              <div className="card-top">
                <div className="shop-info">
                  <PackageCheck size={18} />
                  <span>Order #{orderId}</span>
                </div>

                <div className="status">
                  <Truck size={16} />
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <div className="card-body order-card-summary">
                <div>
                  <p>Created At</p>
                  <strong>{order.createdAtUtc || order.createdAt ? new Date(order.createdAtUtc || order.createdAt).toLocaleString() : "--"}</strong>
                </div>
                <div>
                  <p>Final Total</p>
                  <strong>{formatCurrencyVN(getFinalTotal(order))}</strong>
                </div>
              </div>

              <div className="card-footer">
                <div className="total">
                  Total:<span>{formatCurrencyVN(getFinalTotal(order))}</span>
                </div>

                <div className="actions">
                  <button className="outline-btn detail-btn" type="button" onClick={() => loadDetail(orderId)}>
                    View Detail
                  </button>

                  {canPay(order) && (
                    <button className="primary-btn" type="button" disabled={isLoading} onClick={() => handlePay(order)}>
                      {isLoading ? "Processing..." : "Pay"}
                    </button>
                  )}

                  {canCancel(order) && (
                    <button className="outline-btn danger" type="button" disabled={isLoading} onClick={() => handleCancel(order)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          payment={selectedPayment}
          loading={detailLoading}
          onClose={() => {
            setSelectedOrder(null);
            setSelectedPayment(null);
          }}
          onRefresh={() => loadDetail(getOrderId(selectedOrder))}
        />
      )}
    </div>
  );
}
