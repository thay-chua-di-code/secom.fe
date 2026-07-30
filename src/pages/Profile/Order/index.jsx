import { Clock3, PackageCheck, Search, Truck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { orderApi, unwrapApiData } from "../../../api/orderApi";
import { paymentApi } from "../../../api/paymentApi";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { uploadImageToCloudinary } from "../../../services/cloudinaryService";
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
  "Something went wront. try it later!";

const unwrapList = (response) => {
  const data = unwrapApiData(response);
  const payload = data?.data ?? data;

  if (Array.isArray(payload))
    return { items: payload, totalCount: payload.length };
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
  return (
    data?.data?.paymentTransaction ||
    data?.data ||
    data?.paymentTransaction ||
    data
  );
};

const normalizeStatus = (status) => String(status || "").toLowerCase();

const canPay = (order) => normalizeStatus(order?.status) === "pending";

const canCancel = (order) => {
  const status = normalizeStatus(order?.status);
  return status === "pending" || status === "paid";
};

const canConfirmReceived = (order) => {
  const status = normalizeStatus(order?.status);
  return status === "delivered" || status === "shipping";
};

const canRequestReturn = (order) => {
  const status = normalizeStatus(order?.status);
  return status === "delivered" || status === "completed";
};

const getOrderId = (order) => order?.orderId || order?.id;
const getFinalTotal = (order) =>
  order?.finalTotal ?? order?.finalTotalAmount ?? 0;
const getOrderItems = (order) =>
  order?.items || order?.orderItems || order?.products || [];
const getOrderItemId = (item) => item?.orderItemId || item?.id;
const getReturnableItems = (order) =>
  getOrderItems(order).filter((item) => {
    if (typeof item?.canReturn === "boolean") return item.canReturn;
    if (typeof item?.isReturnable === "boolean") return item.isReturnable;

    const itemStatus = normalizeStatus(item?.status || item?.itemStatus);

    if (!itemStatus) return true;

    return ["delivered", "received", "completed"].includes(itemStatus);
  });
const getPurchasedQuantity = (item) =>
  Number(item?.quantity ?? item?.purchasedQuantity ?? item?.qty ?? 0);
const getMaxReturnQuantity = (item) =>
  Number(
    item?.remainingReturnQuantity ?? item?.returnableQuantity ?? getPurchasedQuantity(item),
  );
const getItemUnitPrice = (item) => Number(item?.unitPrice ?? item?.price ?? 0);
const getItemSubtotal = (item) =>
  Number(
    item?.subtotal ??
      item?.totalPrice ??
      getItemUnitPrice(item) * getPurchasedQuantity(item),
  );
const getProductImageUrl = (item) => item?.productImageUrl || item?.imageUrl;

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
      existingScript.addEventListener("error", () =>
        reject(new Error("Cannot load Omise.js")),
      );
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

const createOmiseToken = async (cardInfo) => {
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
        name: cardInfo.cardName.trim(),
        number: cardInfo.cardNumber.trim(),
        expiration_month: cardInfo.expirationMonth.trim(),
        expiration_year: cardInfo.expirationYear.trim(),
        security_code: cardInfo.securityCode.trim(),
      },
      (statusCode, response) => {
        if (statusCode === 200 && response?.id) {
          resolve(response);
          return;
        }

        reject(
          new Error(response?.message || "Không thể tạo token thanh toán."),
        );
      },
    );
  });
};

function StatusBadge({ status }) {
  const normalized = normalizeStatus(status);
  return (
    <span className={`status-badge status-badge--${normalized}`}>
      {status || "--"}
    </span>
  );
}

function OrderDetailModal({ order, payment, loading, onClose }) {
  if (!order) return null;
  const items = getOrderItems(order);
  return (
    <div className="order-detail-backdrop">
      <div className="order-detail-panel">
        <div className="order-detail-panel__header">
          <h2>Order Detail</h2>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        {loading && <p className="order-muted">Loading latest order...</p>}

        <section>
          <h3>Order</h3>
          <div className="detail-grid">
            <div>
              <span>Order ID</span>
              <strong>{getOrderId(order)}</strong>
            </div>
            <div>
              <span>Status</span>
              <StatusBadge status={order.status} />
            </div>
            <div>
              <span>Created At</span>
              <strong>
                {order.createdAtUtc || order.createdAt
                  ? new Date(
                      order.createdAtUtc || order.createdAt,
                    ).toLocaleString()
                  : "--"}
              </strong>
            </div>
            <div>
              <span>Subtotal</span>
              <strong>{formatCurrencyVN(order.subtotal || 0)}</strong>
            </div>
            <div>
              <span>Shipping Fee</span>
              <strong>{formatCurrencyVN(order.shippingFee || 0)}</strong>
            </div>
            <div>
              <span>Service Fee</span>
              <strong>{formatCurrencyVN(order.serviceFee || 0)}</strong>
            </div>
            <div>
              <span>Discount Amount</span>
              <strong>{formatCurrencyVN(order.discountAmount || 0)}</strong>
            </div>
            <div>
              <span>Final Total</span>
              <strong>{formatCurrencyVN(getFinalTotal(order))}</strong>
            </div>
            <div>
              <span>Voucher Code</span>
              <strong>{order.voucherCode || "--"}</strong>
            </div>
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
                <div
                  className="order-detail-item"
                  key={item.id || item.orderItemId || item.productId}
                >
                  <div>
                    <strong>
                      {item.productName || item.name || "Product"}
                    </strong>
                    <span>Status: {item.status || "--"}</span>
                  </div>
                  <div>
                    <span>Qty: {quantity}</span>
                    <span>Unit: {formatCurrencyVN(unitPrice)}</span>
                    <strong>{formatCurrencyVN(subtotal)}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h3>Payment</h3>
          <div className="detail-grid">
            <div>
              <span>Payment ID</span>
              <strong>{payment?.id || payment?.paymentId || "--"}</strong>
            </div>
            <div>
              <span>Gateway</span>
              <strong>{payment?.gateway || "Omise"}</strong>
            </div>
            <div>
              <span>Gateway Transaction ID</span>
              <strong>
                {payment?.gatewayTransactionId || payment?.chargeId || "--"}
              </strong>
            </div>
            <div>
              <span>Payment Status</span>
              <StatusBadge status={payment?.status || order.paymentStatus} />
            </div>
            <div>
              <span>Amount</span>
              <strong>
                {formatCurrencyVN(payment?.amount || getFinalTotal(order))}
              </strong>
            </div>
            <div>
              <span>Currency</span>
              <strong>{payment?.currency || "--"}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function OrderActionModal({ type, order, actionLoading, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  if (!order) return null;

  const isReturn = type === "return";
  const isCancel = type === "cancel";
  const returnableItems = isReturn ? getReturnableItems(order) : [];
  const hasSelectedReturnItem = Object.values(selectedItems).some(
    (item) => item.selected && item.quantity > 0,
  );
  const title = isReturn
    ? "Request return/refund"
    : isCancel
      ? "Cancel order"
      : "Confirm received";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isReturn && !description.trim()) {
      return;
    }

    if (isReturn && !hasSelectedReturnItem) {
      toast.error("Please select at least one order item.");
      return;
    }

    onConfirm({
      reason: reason.trim(),
      description: description.trim(),
      evidenceFiles,
      items: Object.entries(selectedItems)
        .filter(([, item]) => item.selected && item.quantity > 0)
        .map(([orderItemId, item]) => ({
          orderItemId,
          quantity: item.quantity,
        })),
    });
  };

  const handleReturnItemToggle = (item, checked) => {
    const orderItemId = getOrderItemId(item);
    const maxQuantity = Math.max(getMaxReturnQuantity(item), 0);

    if (!orderItemId || maxQuantity < 1) return;

    setSelectedItems((prev) => ({
      ...prev,
      [orderItemId]: {
        selected: checked,
        quantity: prev[orderItemId]?.quantity || 1,
      },
    }));
  };

  const handleReturnQuantityChange = (item, value) => {
    const orderItemId = getOrderItemId(item);
    const maxQuantity = Math.max(getMaxReturnQuantity(item), 1);
    const quantity = Math.min(Math.max(Number(value || 1), 1), maxQuantity);

    if (!orderItemId) return;

    setSelectedItems((prev) => ({
      ...prev,
      [orderItemId]: {
        selected: prev[orderItemId]?.selected ?? true,
        quantity,
      },
    }));
  };

  return (
    <div className="order-detail-backdrop">
      <form
        className="order-action-panel"
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
      >
        <div className="order-detail-panel__header">
          <h2>{title}</h2>
          <button type="button" onClick={onClose} disabled={actionLoading}>
            ×
          </button>
        </div>

        <p className="order-muted">Order #{getOrderId(order)}</p>

        {isCancel && (
          <label className="order-action-field">
            Reason
            <textarea
              value={reason}
              maxLength={500}
              placeholder="Optional cancellation reason"
              onChange={(event) => setReason(event.target.value)}
            />
          </label>
        )}

        {isReturn && (
          <>
            <label className="order-action-field">
              Reason code
              <input
                value={reason}
                maxLength={100}
                placeholder="DAMAGED, WRONG_ITEM, OTHER..."
                onChange={(event) => setReason(event.target.value)}
              />
            </label>
            <label className="order-action-field">
              Description <span>*</span>
              <textarea
                value={description}
                maxLength={1000}
                placeholder="Describe the return/refund reason"
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <div className="order-action-field">
              <span>Return items *</span>
              {returnableItems.length === 0 ? (
                <p className="order-muted">
                  No order items are available for this return request.
                </p>
              ) : (
                <div className="return-item-list">
                  {returnableItems.map((item) => {
                    const orderItemId = getOrderItemId(item);
                    const maxQuantity = getMaxReturnQuantity(item);
                    const selectedItem = selectedItems[orderItemId] || {};

                    return (
                      <article className="return-item" key={orderItemId}>
                        <label className="return-item__check">
                          <input
                            type="checkbox"
                            checked={!!selectedItem.selected}
                            disabled={!orderItemId || maxQuantity < 1}
                            onChange={(event) =>
                              handleReturnItemToggle(item, event.target.checked)
                            }
                          />
                          {getProductImageUrl(item) && (
                            <img
                              src={getProductImageUrl(item)}
                              alt={item.productName || "Order item"}
                            />
                          )}
                          <span>
                            <strong>{item.productName || "Order item"}</strong>
                            <small>
                              Bought: {getPurchasedQuantity(item)} · Unit: {formatCurrencyVN(getItemUnitPrice(item))} · Subtotal: {formatCurrencyVN(getItemSubtotal(item))}
                            </small>
                          </span>
                        </label>
                        <label className="return-item__quantity">
                          Qty
                          <input
                            type="number"
                            min="1"
                            max={maxQuantity}
                            value={selectedItem.quantity || 1}
                            disabled={!selectedItem.selected}
                            onChange={(event) =>
                              handleReturnQuantityChange(item, event.target.value)
                            }
                          />
                        </label>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
            <label className="order-action-field">
              Evidence images
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={(event) =>
                  setEvidenceFiles(Array.from(event.target.files || []))
                }
              />
              {evidenceFiles.length > 0 && (
                <small>{evidenceFiles.length} image(s) selected</small>
              )}
            </label>
          </>
        )}

        {!isCancel && !isReturn && (
          <p className="order-muted">
            Confirm that you have received this order. This action will be sent
            to backend and cannot be duplicated after success.
          </p>
        )}

        <div className="order-detail-panel__footer">
          <button type="button" onClick={onClose} disabled={actionLoading}>
            Cancel
          </button>
          <button
            type="submit"
            className="primary-btn"
            disabled={
              actionLoading ||
              (isReturn && (!description.trim() || !hasSelectedReturnItem))
            }
          >
            {actionLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function OrderHistory() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState(defaultCardInfo);
  const [orderAction, setOrderAction] = useState(null);

  const handleCardInfoChange = (field, value) => {
    setCardInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loadOrders = useCallback(
    async ({ page = 1, status = activeStatus } = {}) => {
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
    },
    [activeStatus, pagination.pageSize],
  );

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
      const token = await createOmiseToken(cardInfo);
      const paymentRequest = {
        orderId,
        amount,
        currency: "vnd",
        returnUri: `${window.location.origin}/payment-return`,
        tokenId: token.id,
      };

      const response =
        await paymentApi.createPaymentTransaction(paymentRequest);
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

  const refreshAfterOrderAction = async (orderId) => {
    await loadOrders({ page: pagination.page });

    if (selectedOrder && getOrderId(selectedOrder) === orderId) {
      await loadDetail(orderId);
    }
  };

  const handleCancel = async (order, values = {}) => {
    if (!canCancel(order)) return;

    const orderId = getOrderId(order);

    try {
      setActionLoading(orderId);
      await orderApi.cancelOrder(orderId, { reason: values.reason || null });
      toast.success("Order cancelled successfully");
      setOrderAction(null);
      await refreshAfterOrderAction(orderId);
    } catch (cancelError) {
      setError(getApiErrorMessage(cancelError));
      toast.error(getApiErrorMessage(cancelError));
    } finally {
      setActionLoading("");
    }
  };

  const handleConfirmReceived = async (order) => {
    if (!canConfirmReceived(order)) return;

    const orderId = getOrderId(order);

    try {
      setActionLoading(orderId);
      await orderApi.confirmReceived(orderId);
      toast.success("Order receipt confirmed");
      setOrderAction(null);
      await refreshAfterOrderAction(orderId);
    } catch (confirmError) {
      setError(getApiErrorMessage(confirmError));
      toast.error("Shipping not yet!");
    } finally {
      setActionLoading("");
    }
  };

  const handleReturnRequest = async (order, values) => {
    if (!canRequestReturn(order)) return;

    const orderId = getOrderId(order);
    const items = (values.items || [])
      .map((item) => ({
        orderItemId: item.orderItemId,
        quantity: Number(item.quantity || 0),
        reason: values.reason || null,
      }))
      .filter((item) => item.orderItemId && item.quantity > 0);

    if (items.length === 0) {
      toast.error("No valid order items for return request");
      return;
    }

    try {
      setActionLoading(orderId);
      const evidenceImages = await Promise.all(
        (values.evidenceFiles || []).map(async (file) => {
          const uploadedImage = await uploadImageToCloudinary(file, {
            folder: "secom/returns",
          });

          return {
            imageUrl: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
          };
        }),
      );

      await orderApi.createReturnRequest(orderId, {
        reasonCode: values.reason || null,
        description: values.description,
        items,
        evidenceImages,
      });
      toast.success("Return/refund request created");
      setOrderAction(null);
      await refreshAfterOrderAction(orderId);
    } catch (returnError) {
      setError(getApiErrorMessage(returnError));
      toast.error(getApiErrorMessage(returnError));
    } finally {
      setActionLoading("");
    }
  };

  const handleOpenReturnRequest = async (order) => {
    if (!canRequestReturn(order)) return;

    const orderId = getOrderId(order);

    if (!orderId) {
      toast.error("Order id is missing");
      return;
    }

    try {
      setActionLoading(orderId);
      const response = await orderApi.getOrderDetail(orderId);
      const detailOrder = unwrapOrder(response);
      setOrderAction({ type: "return", order: detailOrder });
    } catch (detailError) {
      setError(getApiErrorMessage(detailError));
      toast.error(getApiErrorMessage(detailError));
    } finally {
      setActionLoading("");
    }
  };

  const handleConfirmOrderAction = (values) => {
    if (!orderAction?.order) return;

    if (orderAction.type === "cancel") {
      handleCancel(orderAction.order, values);
      return;
    }

    if (orderAction.type === "confirm") {
      handleConfirmReceived(orderAction.order);
      return;
    }

    handleReturnRequest(orderAction.order, values);
  };

  return (
    <div className="order-history">
      <div className="order-header">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Tìm theo ID đơn hàng..." />
        </div>

        <button
          className="filter-btn"
          type="button"
          onClick={() => loadOrders({ page: pagination.page })}
        >
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

      {error && <p className="order-error">{error}</p>}

      <div className="order-card-form">
        <h3>Card Information</h3>
        <div className="order-card-form__grid">
          <label>
            Card Name
            <input
              type="text"
              value={cardInfo.cardName}
              onChange={(event) =>
                handleCardInfoChange("cardName", event.target.value)
              }
            />
          </label>
          <label>
            Card Number
            <input
              type="text"
              value={cardInfo.cardNumber}
              onChange={(event) =>
                handleCardInfoChange("cardNumber", event.target.value)
              }
            />
          </label>
          <label>
            Month
            <input
              type="text"
              value={cardInfo.expirationMonth}
              onChange={(event) =>
                handleCardInfoChange("expirationMonth", event.target.value)
              }
            />
          </label>
          <label>
            Year
            <input
              type="text"
              value={cardInfo.expirationYear}
              onChange={(event) =>
                handleCardInfoChange("expirationYear", event.target.value)
              }
            />
          </label>
          <label>
            CVV
            <input
              type="password"
              value={cardInfo.securityCode}
              onChange={(event) =>
                handleCardInfoChange("securityCode", event.target.value)
              }
            />
          </label>
        </div>
      </div>

      {loading && <p className="order-muted">Loading orders...</p>}

      <div className="order-list">
        {!loading && orders.length === 0 && (
          <p className="order-muted">No orders found.</p>
        )}

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
                  <strong>
                    {order.createdAtUtc || order.createdAt
                      ? new Date(
                          order.createdAtUtc || order.createdAt,
                        ).toLocaleString()
                      : "--"}
                  </strong>
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
                  <button
                    className="outline-btn detail-btn"
                    type="button"
                    onClick={() => loadDetail(orderId)}
                  >
                    View Detail
                  </button>

                  {canPay(order) && (
                    <button
                      className="primary-btn"
                      type="button"
                      disabled={isLoading}
                      onClick={() => handlePay(order)}
                    >
                      {isLoading ? "Processing..." : "Pay"}
                    </button>
                  )}

                  {canCancel(order) && (
                    <button
                      className="outline-btn danger"
                      type="button"
                      disabled={isLoading}
                      onClick={() => setOrderAction({ type: "cancel", order })}
                    >
                      Cancel
                    </button>
                  )}

                  {canConfirmReceived(order) && (
                    <button
                      className="primary-btn"
                      type="button"
                      disabled={isLoading}
                      onClick={() => setOrderAction({ type: "confirm", order })}
                    >
                      Confirm Received
                    </button>
                  )}

                  {canRequestReturn(order) && (
                    <button
                      className="outline-btn"
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleOpenReturnRequest(order)}
                    >
                      {isLoading ? "Loading..." : "Return/Refund"}
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
        />
      )}

      {orderAction && (
        <OrderActionModal
          type={orderAction.type}
          order={orderAction.order}
          actionLoading={actionLoading === getOrderId(orderAction.order)}
          onClose={() => setOrderAction(null)}
          onConfirm={handleConfirmOrderAction}
        />
      )}
    </div>
  );
}
