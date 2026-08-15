import { Clock3, PackageCheck, Search, ShoppingBag, Truck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import { orderApi, unwrapApiData } from "../../../api/orderApi";
import { paymentApi } from "../../../api/paymentApi";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { uploadImageToCloudinary } from "../../../services/cloudinaryService";
import OrderProductImage from "../../../components/order/OrderProductImage";
import {
  getOrderItemId as getAdapterOrderItemId,
  getOrderItemName,
  getOrderItemProductId,
  getOrderItemProductPath,
  getOrderItemQuantity,
  getOrderItems as getAdapterOrderItems,
  getOrderItemTotalPrice,
  getOrderItemUnitPrice,
} from "../../../components/order/orderItemAdapter";
import {
  getReturnStatusBadgeClass,
  getReturnStatusLabel,
  normalizeReturnStatus,
} from "../../../utils/returnRequestUtils";
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

const normalizeStatus = (status) =>
  String(status || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

const RETURN_LOCKED_ORDER_STATUSES = new Set([
  "waiting_return_approval",
  "return_approved",
  "partially_returned",
  "returned",
  "refunded",
]);

const ACTIVE_RETURN_STATUSES = new Set([
  "pending",
  "approved",
  "waiting_buyer_return",
  "item_returned",
  "seller_received_return",
  "inspection_passed",
  "replacement_shipped",
]);

const ORDER_STATUS_LABELS = {
  pending: "Pending",
  paid: "Paid",
  packed: "Packed",
  shipping: "Shipping",
  delivered: "Delivered",
  received: "Received",
  completed: "Completed",
  cancelled: "Cancelled",
  waiting_return_approval: "Return request pending approval",
  return_approved: "Return request approved",
  return_rejected: "Return request rejected",
  partially_returned: "Partially returned",
  returned: "Item returned",
  refunded: "Refunded",
};

const hasActiveReturnRequest = (order) => {
  const request = getLatestReturnRefundRequest(order);
  const returnStatus = normalizeReturnStatus(
    getReturnRequestStatus(request, order),
  );
  return ACTIVE_RETURN_STATUSES.has(returnStatus);
};

const isReturnLockedOrder = (order) =>
  RETURN_LOCKED_ORDER_STATUSES.has(normalizeStatus(order?.status));

const canPay = (order) => normalizeStatus(order?.status) === "pending";

const canCancel = (order) => {
  const status = normalizeStatus(order?.status);
  return status === "pending" || status === "paid";
};

const canConfirmReceived = (order) => {
  if (isReturnLockedOrder(order) || hasActiveReturnRequest(order)) return false;
  const status = normalizeStatus(order?.status);
  return status === "delivered" || status === "shipping";
};

const canRequestReturn = (order) => {
  if (isReturnLockedOrder(order) || hasActiveReturnRequest(order)) return false;
  const status = normalizeStatus(order?.status);
  return status === "delivered" || status === "completed";
};

const canConfirmBuyerReturned = (request) => {
  const status = normalizeReturnStatus(request?.status);
  return status === "approved" || status === "waiting_buyer_return";
};

const canConfirmReplacementReceived = (request) =>
  normalizeReturnStatus(request?.status) === "replacement_shipped";

const getOrderId = (order) => order?.orderId || order?.id;
const getFinalTotal = (order) =>
  order?.finalTotal ?? order?.finalTotalAmount ?? 0;
const getOrderItems = (order) => getAdapterOrderItems(order);
const getOrderItemId = (item) => item?.orderItemId || item?.id;
const getReturnableItems = (order) =>
  getOrderItems(order).filter((item) => {
    if (typeof item?.canReturn === "boolean") return item.canReturn;
    if (typeof item?.isReturnable === "boolean") return item.isReturnable;

    const itemStatus = normalizeStatus(item?.status || item?.itemStatus);

    if (!itemStatus) return true;

    return ["delivered", "received", "completed"].includes(itemStatus);
  });
const getPurchasedQuantity = (item) => getOrderItemQuantity(item);
const getMaxReturnQuantity = (item) =>
  Number(
    item?.remainingReturnQuantity ??
      item?.returnableQuantity ??
      getPurchasedQuantity(item),
  );
const getItemUnitPrice = (item) => getOrderItemUnitPrice(item);
const getItemSubtotal = (item) => getOrderItemTotalPrice(item);
const DEFAULT_RETURN_REASON_CODE = "OTHER";

const getField = (source, ...keys) => {
  if (!source || typeof source !== "object") return undefined;

  return keys.find((key) => source[key] !== undefined) !== undefined
    ? source[keys.find((key) => source[key] !== undefined)]
    : undefined;
};

const getReturnRequestId = (request) =>
  getField(
    request,
    "requestId",
    "RequestId",
    "returnRequestId",
    "ReturnRequestId",
    "id",
    "Id",
  );

const getReturnRequestCreatedAt = (request) =>
  getField(
    request,
    "requestedAtUtc",
    "RequestedAtUtc",
    "createdAtUtc",
    "CreatedAtUtc",
    "createdAt",
    "CreatedAt",
  );

const getReturnRequestReviewedAt = (request) =>
  getField(
    request,
    "reviewedAtUtc",
    "ReviewedAtUtc",
    "reviewedAt",
    "ReviewedAt",
  ) ||
  (Array.isArray(getField(request, "histories", "Histories"))
    ? getField(request, "histories", "Histories").find(
        (history) => normalizeReturnStatus(history?.newStatus) !== "pending",
      )?.createdAtUtc
    : undefined);

const getReturnRequestItems = (request) => {
  const items = getField(request, "items", "Items");
  return Array.isArray(items) ? items : [];
};

const getReturnRequestEvidenceImages = (request) => {
  const images = getField(request, "evidenceImages", "EvidenceImages");
  return Array.isArray(images) ? images : [];
};

const getLatestReturnRefundRequest = (order) => {
  const directRequest = getField(
    order,
    "returnRefund",
    "ReturnRefund",
    "returnRefundRequest",
    "ReturnRefundRequest",
    "returnRequest",
    "ReturnRequest",
    "refundRequest",
    "RefundRequest",
  );

  if (directRequest) return directRequest;

  const requests =
    getField(
      order,
      "returnRefundRequests",
      "ReturnRefundRequests",
      "returnRequests",
      "ReturnRequests",
      "refundRequests",
      "RefundRequests",
      "afterSalesRequests",
      "AfterSalesRequests",
    ) || [];

  if (!Array.isArray(requests) || requests.length === 0) return null;

  return [...requests].sort((left, right) => {
    const rightTime = new Date(getReturnRequestCreatedAt(right) || 0).getTime();
    const leftTime = new Date(getReturnRequestCreatedAt(left) || 0).getTime();

    return rightTime - leftTime;
  })[0];
};

const getReturnRequestRejectReason = (request) =>
  getField(
    request,
    "rejectReason",
    "RejectReason",
    "rejectionReason",
    "RejectionReason",
    "reviewReason",
    "ReviewReason",
  ) || null;

const getReturnRequestType = (request) =>
  getField(
    request,
    "type",
    "Type",
    "requestType",
    "RequestType",
    "returnType",
    "ReturnType",
  ) || "Return/Refund";

const getReturnRequestStatus = (request, order) =>
  getField(request, "status", "Status") ||
  getField(order, "returnRefundStatus", "ReturnRefundStatus");

const getReturnRequestReason = (request) =>
  getField(request, "reason", "Reason", "reasonCode", "ReasonCode") || "--";

function StatusBadge({ status }) {
  const normalized = normalizeStatus(status);
  const label =
    ORDER_STATUS_LABELS[normalized] ||
    String(status || "--")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <span className={`status-badge status-badge--${normalized}`}>
      {label}
    </span>
  );
}

function OrderDetailModal({ order, payment, loading, actionLoading, onClose, onConfirmBuyerReturned, onCompleteReturnRequest }) {
  if (!order) return null;

  const items = getOrderItems(order);
  const returnRefundRequest = getLatestReturnRefundRequest(order);
  const returnRefundStatus = getReturnRequestStatus(returnRefundRequest, order);
  const returnRefundItems = getReturnRequestItems(returnRefundRequest);
  const returnEvidenceImages = getReturnRequestEvidenceImages(returnRefundRequest);
  const orderStatus = normalizeStatus(order.status);
  const canRateSeller = orderStatus === "completed";

  const modalContent = (
    <div className="order-detail-backdrop">
      <div
        className="order-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Order Detail"
      >
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
              <span>Total Items</span>
              <strong>{items.length}</strong>
            </div>

            <div>
              <span>Voucher Code</span>
              <strong>{order.voucherCode || "--"}</strong>
            </div>
          </div>
        </section>

        <section>
          <h3>Exchanges / Warranty</h3>

          {returnRefundStatus || returnRefundRequest ? (
            <div className="detail-grid return-refund-grid">
              <div>
                <span>Request ID</span>
                <strong>
                  {getReturnRequestId(returnRefundRequest) || "--"}
                </strong>
              </div>

              <div>
                <span>Type</span>
                <strong>{getReturnRequestType(returnRefundRequest)}</strong>
              </div>

              <div>
                <span>Return/Refund Status</span>

                <span
                  className={`return-refund-badge ${getReturnStatusBadgeClass(
                    returnRefundStatus,
                  )}`}
                >
                  {getReturnStatusLabel(returnRefundStatus)}
                </span>
              </div>

              <div>
                <span>Requested At</span>
                <strong>
                  {getReturnRequestCreatedAt(returnRefundRequest)
                    ? new Date(
                        getReturnRequestCreatedAt(returnRefundRequest),
                      ).toLocaleString()
                    : "--"}
                </strong>
              </div>

              <div>
                <span>Reviewed At</span>
                <strong>
                  {getReturnRequestReviewedAt(returnRefundRequest)
                    ? new Date(
                        getReturnRequestReviewedAt(returnRefundRequest),
                      ).toLocaleString()
                    : "--"}
                </strong>
              </div>

              <div>
                <span>Reason</span>
                <strong>{getReturnRequestReason(returnRefundRequest)}</strong>
              </div>

              {[
                "rejected",
                "inspection_failed",
              ].includes(normalizeReturnStatus(returnRefundStatus)) && (
                <div className="return-refund-grid__full">
                  <span>Reject Reason</span>

                  <strong>
                    {getReturnRequestRejectReason(returnRefundRequest) ||
                      "No rejection reason provided."}
                  </strong>
                </div>
              )}

              {(canConfirmBuyerReturned(returnRefundRequest) ||
                canConfirmReplacementReceived(returnRefundRequest)) && (
                <div className="return-refund-grid__full">
                  <div className="order-detail-item__actions">
                    {canConfirmBuyerReturned(returnRefundRequest) && (
                      <button
                        type="button"
                        className="primary-btn"
                        disabled={actionLoading}
                        onClick={() => onConfirmBuyerReturned?.(order)}
                      >
                        {actionLoading ? "Processing..." : "Send return / Confirm returned"}
                      </button>
                    )}

                    {canConfirmReplacementReceived(returnRefundRequest) && (
                      <button
                        type="button"
                        className="primary-btn"
                        disabled={actionLoading}
                        onClick={() => onCompleteReturnRequest?.(order)}
                      >
                        {actionLoading ? "Processing..." : "Confirm replacement received"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {returnRefundItems.length > 0 && (
                <div className="return-refund-grid__full">
                  <span>Affected Items</span>

                  <div className="return-request-items">
                    {returnRefundItems.map((requestItem) => {
                      const matchedOrderItem = items.find(
                        (item) =>
                          String(getAdapterOrderItemId(item)) ===
                          String(requestItem.orderItemId || requestItem.id),
                      );

                      return (
                        <article
                          className="return-request-item"
                          key={requestItem.id || requestItem.orderItemId}
                        >
                          {matchedOrderItem ? (
                            <OrderProductImage
                              item={matchedOrderItem}
                              className="return-request-item__image"
                              alt={requestItem.productName || getOrderItemName(matchedOrderItem)}
                            />
                          ) : (
                            <div className="return-request-item__image return-request-item__image--placeholder" />
                          )}

                          <div className="return-request-item__content">
                            <strong>
                              {requestItem.productName ||
                                (matchedOrderItem
                                  ? getOrderItemName(matchedOrderItem)
                                  : "Product")}
                            </strong>
                            <span>
                              Qty {requestItem.quantity || 0}
                              {requestItem.reason ? ` · ${requestItem.reason}` : ""}
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}

              {returnEvidenceImages.length > 0 && (
                <div className="return-refund-grid__full">
                  <span>Evidence Images</span>

                  <div className="return-request-evidence">
                    {returnEvidenceImages.map((image) => (
                      <a
                        key={image.id || image.imageUrl}
                        href={image.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={image.imageUrl} alt="Return evidence" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="order-muted">
              No return/refund request for this order.
            </p>
          )}
        </section>

        <section>
          <h3>Items</h3>

          <div className="order-detail-items">
            {items.length === 0 && <p className="order-muted">No items.</p>}

            {items.map((item) => {
              const quantity = getOrderItemQuantity(item);
              const unitPrice = getOrderItemUnitPrice(item);
              const subtotal = getOrderItemTotalPrice(item);
              const productPath = getOrderItemProductPath(item);
              const productName = getOrderItemName(item);

              const productImage = (
                <OrderProductImage
                  item={item}
                  className="order-detail-item__image"
                  alt={productName}
                />
              );

              const productTitle = <strong>{productName}</strong>;

              return (
                <div
                  className="order-detail-item"
                  key={getAdapterOrderItemId(item)}
                >
                  {productPath ? (
                    <Link
                      to={productPath}
                      aria-label={`View product ${productName}`}
                    >
                      {productImage}
                    </Link>
                  ) : (
                    productImage
                  )}

                  <div className="order-detail-item__info">
                    {productPath ? (
                      <Link
                        to={productPath}
                        className="order-detail-item__link"
                      >
                        {productTitle}
                      </Link>
                    ) : (
                      productTitle
                    )}

                    <span>Product ID: {getOrderItemProductId(item)}</span>

                    <span>
                      Status: {item.status || item.itemStatus || "--"}
                    </span>

                    <div className="order-detail-item__actions">
                      {productPath && (
                        <Link to={productPath} onClick={onClose}>
                          Review product
                        </Link>
                      )}

                      {item.sellerId && canRateSeller && (
                        <Link
                          to={`/seller/detail/${
                            item.sellerId
                          }?orderId=${encodeURIComponent(getOrderId(order))}`}
                          onClick={onClose}
                        >
                          Rate seller
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="order-detail-item__price">
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
              <span>Gateway</span>
              <strong>{payment?.gateway || "Omise"}</strong>
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
          </div>
        </section>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
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

    if (isReturn && reason.trim().length > 50) {
      toast.error("Reason code must not exceed 50 characters.");
      return;
    }

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
                maxLength={50}
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
                          <OrderProductImage
                            item={item}
                            alt={getOrderItemName(item)}
                            className="return-item__image"
                          />
                          <span>
                            <strong>{getOrderItemName(item)}</strong>
                            <small>
                              Bought: {getPurchasedQuantity(item)} · Unit:{" "}
                              {formatCurrencyVN(getItemUnitPrice(item))} ·
                              Subtotal:{" "}
                              {formatCurrencyVN(getItemSubtotal(item))}
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
                              handleReturnQuantityChange(
                                item,
                                event.target.value,
                              )
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
                disabled={evidenceFiles.length >= 10}
                onChange={(event) =>
                  setEvidenceFiles(
                    Array.from(event.target.files || []).slice(0, 10),
                  )
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
  const [orderKeyword, setOrderKeyword] = useState("");
  const [debouncedOrderKeyword, setDebouncedOrderKeyword] = useState("");
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
  const [orderAction, setOrderAction] = useState(null);

  const loadOrders = useCallback(
    async ({
      page = 1,
      status = activeStatus,
      search = debouncedOrderKeyword,
    } = {}) => {
      try {
        setLoading(true);
        const response = await orderApi.getPurchasedOrdersPaged({
          status: status === "all" ? undefined : status,
          search: search?.trim() || undefined,
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
    [activeStatus, debouncedOrderKeyword, pagination.pageSize],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedOrderKeyword(orderKeyword.trim());
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [orderKeyword]);

  const isSearchPending = orderKeyword.trim() !== debouncedOrderKeyword;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => loadOrders({ page: 1 }), 0);
    return () => window.clearTimeout(timeoutId);
  }, [activeStatus, debouncedOrderKeyword, loadOrders]);

  const handleStatusChange = (status) => {
    setActiveStatus(status);
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

  const filteredOrders = useMemo(() => {
    return Array.isArray(orders) ? orders : [];
  }, [orders]);

  const handlePay = async (order) => {
    if (!canPay(order)) {
      setError("Only pending orders can be paid.");
      return;
    }

    const orderId = getOrderId(order);
    const amount = getFinalTotal(order);

    try {
      setActionLoading(orderId);
      const paymentRequest = {
        orderId,
        amount,
        currency: "vnd",
        returnUri: `${window.location.origin}/payment-return`,
        cancelUri: `${window.location.origin}/payment-cancel`,
      };

      if (!paymentRequest.orderId) {
        throw new Error("Missing orderId");
      }

      if (!paymentRequest.amount || paymentRequest.amount <= 0) {
        throw new Error("Missing amount");
      }

      const response =
        await paymentApi.createPaymentTransaction(paymentRequest);
      const data = unwrapApiData(response);
      const payment = data?.data ?? data;
      const paymentUrl =
        payment?.paymentUrl ||
        payment?.checkoutUrl ||
        response?.data?.data?.paymentUrl ||
        response?.data?.paymentUrl ||
        response?.paymentUrl ||
        response?.data?.data?.checkoutUrl ||
        response?.data?.checkoutUrl ||
        response?.checkoutUrl;

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
    if (!canRequestReturn(order)) {
      toast.error("Order already has an active return/refund request.");
      return;
    }

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
        reasonCode: values.reason || DEFAULT_RETURN_REASON_CODE,
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
    if (!canRequestReturn(order)) {
      toast.error("Order already has an active return/refund request.");
      return;
    }

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

  const handleConfirmBuyerReturned = async (order) => {
    const orderId = getOrderId(order);
    const request = getLatestReturnRefundRequest(order);
    const requestId = getReturnRequestId(request);

    if (!orderId || !requestId) {
      toast.error("Return request is missing");
      return;
    }

    try {
      setActionLoading(orderId);
      await orderApi.confirmBuyerReturned(orderId, requestId, {});
      toast.success("Return shipment confirmed");
      await refreshAfterOrderAction(orderId);
      if (selectedOrder && getOrderId(selectedOrder) === orderId) {
        await loadDetail(orderId);
      }
    } catch (actionError) {
      setError(getApiErrorMessage(actionError));
      toast.error(getApiErrorMessage(actionError));
    } finally {
      setActionLoading("");
    }
  };

  const handleCompleteReturnRequest = async (order) => {
    const orderId = getOrderId(order);
    const request = getLatestReturnRefundRequest(order);
    const requestId = getReturnRequestId(request);

    if (!orderId || !requestId) {
      toast.error("Return request is missing");
      return;
    }

    try {
      setActionLoading(orderId);
      await orderApi.completeReturnRequest(orderId, requestId, {});
      toast.success("Exchange completed");
      await refreshAfterOrderAction(orderId);
      if (selectedOrder && getOrderId(selectedOrder) === orderId) {
        await loadDetail(orderId);
      }
    } catch (actionError) {
      setError(getApiErrorMessage(actionError));
      toast.error(getApiErrorMessage(actionError));
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
          <input
            type="text"
            placeholder="Search orders or products..."
            value={orderKeyword}
            onChange={(event) => setOrderKeyword(event.target.value)}
          />
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

      {isSearchPending && !loading && (
        <p className="order-muted">Searching orders...</p>
      )}

      {loading && <p className="order-muted">Loading orders...</p>}

      <div className="order-list">
        {!loading && filteredOrders.length === 0 && (
          <div className="order-empty-state">
            <div className="order-empty-state__icon">
              <ShoppingBag size={34} />
            </div>
            <h3>No orders found</h3>
            <p>
              {orderKeyword.trim() || activeStatus !== "all"
                ? "Try clearing your search or changing the current status filter."
                : "You have not placed any orders yet. Start shopping to see your order history here."}
            </p>
            <div className="order-empty-state__actions">
              {(orderKeyword.trim() || activeStatus !== "all") && (
                <button
                  type="button"
                  className="order-empty-state__secondary-btn"
                  onClick={() => {
                    setOrderKeyword("");
                    if (activeStatus !== "all") {
                      handleStatusChange("all");
                    }
                  }}
                >
                  Clear filters
                </button>
              )}
              <Link to="/products" className="order-empty-state__primary-btn">
                Browse products
              </Link>
            </div>
          </div>
        )}

        {filteredOrders.map((order) => {
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
          actionLoading={actionLoading === getOrderId(selectedOrder)}
          onConfirmBuyerReturned={handleConfirmBuyerReturned}
          onCompleteReturnRequest={handleCompleteReturnRequest}
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
