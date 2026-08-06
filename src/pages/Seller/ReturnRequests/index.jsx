import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Eye, PackageCheck } from "lucide-react";
import { sellerService } from "../../../service/sellerService";
import { formatCurrencyVN, formatDate } from "../../../utils/fncUtils";
import {
  getReturnStatusBadgeClass,
  getReturnStatusLabel,
  getReturnRequestApiErrorMessage,
  getSellerReturnActions,
  logReturnRequestApiError,
  RETURN_REQUEST_STATUSES,
  sellerReturnActionLabels,
} from "../../../utils/returnRequestUtils";
import "./style.scss";

const DEFAULT_PAGE_SIZE = 20;

const unwrapPagedResult = (response) => {
  const payload = response?.data ?? response;
  return payload?.data ?? payload ?? {};
};

const unwrapDetail = (response) => {
  const payload = response?.data ?? response;
  return payload?.data ?? payload;
};

const getApiErrorMessage = (error) =>
  getReturnRequestApiErrorMessage(error, "Return request action failed");

const buildSellerActionPayload = (action, { note, reason }) => {
  const payload = {};

  if (note) payload.note = note;
  if (action === "reject") payload.reason = reason;

  return payload;
};

const getRequestId = (request) => request?.requestId || request?.id;

const getPrimaryItem = (request) => request?.items?.[0] || null;

const getRequestAmount = (request) =>
  Number(request?.requestedAmount ?? request?.refundAmount ?? 0);

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: RETURN_REQUEST_STATUSES.PENDING, label: "Pending" },
  { value: RETURN_REQUEST_STATUSES.APPROVED, label: "Approved" },
  { value: RETURN_REQUEST_STATUSES.REJECTED, label: "Rejected" },
  { value: RETURN_REQUEST_STATUSES.ITEM_RETURNED, label: "Item Returned" },
  {
    value: RETURN_REQUEST_STATUSES.REFUND_PROCESSING,
    label: "Refund Processing",
  },
  { value: RETURN_REQUEST_STATUSES.REFUNDED, label: "Refunded" },
  { value: RETURN_REQUEST_STATUSES.CLOSED, label: "Closed" },
];

const typeOptions = [
  { value: "all", label: "All types" },
  { value: "return", label: "Return" },
  { value: "refund", label: "Refund" },
];

function SellerReturnDetail({ request, actionLoading, onClose, onOpenAction }) {
  if (!request) return null;

  const actions = getSellerReturnActions(request.status);

  return (
    <div className="seller-return-detail-overlay" onClick={onClose}>
      <div
        className="seller-return-detail-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="seller-return-detail-header">
          <div>
            <span className="seller-return-detail-eyebrow">Return Request</span>
            <h2>Request #{String(request.id).slice(0, 8)}</h2>
            <p>Order #{request.orderId}</p>
          </div>
          <button type="button" onClick={onClose} disabled={!!actionLoading}>
            ×
          </button>
        </header>

        <section className="seller-return-detail-summary">
          <article>
            <span>Status</span>
            <strong
              className={`seller-return-status ${getReturnStatusBadgeClass(request.status)}`}
            >
              {getReturnStatusLabel(request.status)}
            </strong>
          </article>
          <article>
            <span>Refund Amount</span>
            <strong>{formatCurrencyVN(request.refundAmount || 0)}</strong>
          </article>
          <article>
            <span>Requested</span>
            <strong>{formatDate(request.requestedAtUtc)}</strong>
          </article>
          <article>
            <span>Reviewed</span>
            <strong>
              {request.reviewedAtUtc ? formatDate(request.reviewedAtUtc) : "-"}
            </strong>
          </article>
        </section>

        <section className="seller-return-detail-card">
          <h3>Reason</h3>
          <strong>{request.reasonCode || "-"}</strong>
          <p>{request.description || "No description provided."}</p>
          {request.rejectReason && (
            <p className="seller-return-detail-danger">
              Rejected: {request.rejectReason}
            </p>
          )}
        </section>

        <section className="seller-return-detail-card">
          <h3>Items</h3>
          {(request.items || []).length === 0 ? (
            <p>No return items.</p>
          ) : (
            (request.items || []).map((item) => (
              <article
                className="seller-return-detail-item"
                key={item.id || item.orderItemId}
              >
                <PackageCheck size={18} />
                <div>
                  <strong>{item.productName || item.orderItemId}</strong>
                  <span>
                    Qty {item.quantity} · Refund{" "}
                    {formatCurrencyVN(item.refundAmount || 0)}
                  </span>
                  {item.reason && <p>{item.reason}</p>}
                </div>
              </article>
            ))
          )}
        </section>

        <section className="seller-return-detail-card">
          <h3>Evidence</h3>
          {(request.evidenceImages || []).length === 0 ? (
            <p>No evidence images.</p>
          ) : (
            <div className="seller-return-detail-evidence">
              {(request.evidenceImages || []).map((image) => (
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
          )}
        </section>

        <section className="seller-return-detail-card">
          <h3>History</h3>
          {(request.histories || []).length === 0 ? (
            <p>No history.</p>
          ) : (
            (request.histories || []).map((history, index) => (
              <article
                className="seller-return-detail-history"
                key={`${history.newStatus}-${history.createdAtUtc}-${index}`}
              >
                <strong>{getReturnStatusLabel(history.newStatus)}</strong>
                <span>
                  {history.createdAtUtc
                    ? formatDate(history.createdAtUtc)
                    : "-"}
                </span>
                {history.reason && <p>{history.reason}</p>}
              </article>
            ))
          )}
        </section>

        <footer className="seller-return-detail-actions">
          <button type="button" onClick={onClose} disabled={!!actionLoading}>
            Close
          </button>
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              className={action === "reject" ? "danger" : "primary"}
              disabled={!!actionLoading}
              onClick={() => onOpenAction(action, request)}
            >
              {actionLoading === action
                ? "Processing..."
                : sellerReturnActionLabels[action]}
            </button>
          ))}
        </footer>
      </div>
    </div>
  );
}

function SellerReturnActionModal({
  action,
  request,
  actionLoading,
  onClose,
  onSubmit,
}) {
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");

  if (!action || !request) return null;

  const isReject = action === "reject";
  const isConfirmReceived = action === "confirm-received";

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedNote = note.trim();
    const trimmedReason = reason.trim();

    if (isReject && !trimmedReason) {
      toast.error("Reject reason is required");
      return;
    }

    if (trimmedNote.length > 500 || trimmedReason.length > 500) {
      toast.error("Reason and note must not exceed 500 characters");
      return;
    }

    onSubmit({ note: trimmedNote || null, reason: trimmedReason || null });
  };

  return (
    <div className="seller-return-detail-overlay" onClick={onClose}>
      <form
        className="seller-return-action-modal"
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3>{sellerReturnActionLabels[action]}</h3>
        <p>
          {isConfirmReceived
            ? "Confirm that returned items have been received for this request."
            : `Request #${String(request.id).slice(0, 8)} · Order #${request.orderId}`}
        </p>

        <label>
          Note
          <textarea
            maxLength={500}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>

        {isReject && (
          <label>
            Reason *
            <textarea
              required
              maxLength={500}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </label>
        )}

        <div className="seller-return-detail-actions">
          <button type="button" onClick={onClose} disabled={!!actionLoading}>
            Cancel
          </button>
          <button
            type="submit"
            className={isReject ? "danger" : "primary"}
            disabled={!!actionLoading}
          >
            {actionLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SellerReturnRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reviewAction, setReviewAction] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalCount: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    keyword: "",
    status: "all",
    type: "all",
    sortBy: "newest",
  });
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const loadRequests = useCallback(
    async ({ page = pagination.pageNumber, nextFilters = filters } = {}) => {
      try {
        setLoading(true);
        setError("");
        const response = await sellerService.getReturnRequests({
          keyword: nextFilters.keyword?.trim(),
          status: nextFilters.status,
          type: nextFilters.type,
          sortBy: nextFilters.sortBy,
          page,
          pageSize: pagination.pageSize,
        });
        const pagedResult = unwrapPagedResult(response);

        setRequests(Array.isArray(pagedResult.items) ? pagedResult.items : []);
        setPagination((prev) => ({
          ...prev,
          pageNumber: pagedResult.pageNumber ?? page,
          pageSize: pagedResult.pageSize ?? prev.pageSize,
          totalCount: pagedResult.totalCount ?? 0,
          totalPages: pagedResult.totalPages ?? 0,
        }));
      } catch (loadError) {
        setRequests([]);
        setError(getApiErrorMessage(loadError));
      } finally {
        setLoading(false);
      }
    },
    [filters, pagination.pageNumber, pagination.pageSize],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadRequests({ page: 1 });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [filters, loadRequests]);

  const loadDetail = async (requestId) => {
    try {
      setDetailLoading(true);
      const response = await sellerService.getReturnRequestDetail(requestId);
      setSelectedRequest(unwrapDetail(response));
    } catch (detailError) {
      toast.error(getApiErrorMessage(detailError));
    } finally {
      setDetailLoading(false);
    }
  };

  const refreshAfterMutation = async (updatedRequestId) => {
    await loadRequests({ page: pagination.pageNumber });

    if (updatedRequestId) {
      await loadDetail(updatedRequestId);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
  };

  const handleOpenAction = (action, request) => {
    setReviewAction({ action, request });
  };

  const handleSubmitAction = async (formPayload) => {
    if (!reviewAction) return;

    const requestId =
      reviewAction.request.id || getRequestId(reviewAction.request);

    if (!requestId) {
      toast.error("Return request id is missing");
      return;
    }

    const payload = buildSellerActionPayload(reviewAction.action, formPayload);

    try {
      setActionLoading(reviewAction.action);

      if (import.meta.env.DEV) {
        console.info("[ReturnRequest] seller action request", {
          method: "PATCH",
          url: `/seller/return-requests/${requestId}/${reviewAction.action}`,
          returnRequestId: requestId,
          action: reviewAction.action,
          payload,
        });
      }

      if (reviewAction.action === "approve") {
        await sellerService.approveReturnRequest(requestId, payload);
      } else if (reviewAction.action === "reject") {
        await sellerService.rejectReturnRequest(requestId, payload);
      } else if (reviewAction.action === "confirm-received") {
        await sellerService.confirmReturnReceived(requestId, payload);
      }

      toast.success(
        `${sellerReturnActionLabels[reviewAction.action]} successfully`,
      );
      setReviewAction(null);
      await refreshAfterMutation(requestId);
    } catch (actionError) {
      logReturnRequestApiError("seller action failed", actionError, {
        method: "PATCH",
        url: `/seller/return-requests/${requestId}/${reviewAction.action}`,
        returnRequestId: requestId,
        action: reviewAction.action,
      });
      toast.error(getApiErrorMessage(actionError));
    } finally {
      setActionLoading("");
    }
  };

  const handlePageChange = (nextPage) => {
    loadRequests({ page: nextPage });
  };

  return (
    <div className="seller-return-requests">
      <div className="seller-return-requests__header">
        <div>
          <span className="seller-return-requests__label">
            After-sales Management
          </span>
          <h1>Exchanges / Warranty Requests</h1>
          <p>Review return requests and track refund status for your shop.</p>
        </div>
      </div>

      <div className="seller-return-requests__table-card">
        <div className="seller-return-requests__toolbar">
          <input
            type="search"
            placeholder="Search request, order, buyer, product..."
            value={filters.keyword}
            onChange={(event) =>
              handleFilterChange("keyword", event.target.value)
            }
          />
          <select
            value={filters.type}
            onChange={(event) => handleFilterChange("type", event.target.value)}
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(event) =>
              handleFilterChange("status", event.target.value)
            }
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={filters.sortBy}
            onChange={(event) =>
              handleFilterChange("sortBy", event.target.value)
            }
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="amount_desc">Amount high to low</option>
            <option value="amount_asc">Amount low to high</option>
          </select>
        </div>

        <div className="seller-return-requests__table-wrapper">
          <table className="seller-return-requests__table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Type</th>
                <th>Order</th>
                <th>Buyer</th>
                <th>Item</th>
                <th>Reason</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="seller-return-requests__empty-row">
                  <td colSpan={10}>Loading return requests...</td>
                </tr>
              )}

              {!loading && error && (
                <tr className="seller-return-requests__empty-row">
                  <td colSpan={10}>
                    {error}
                    <button type="button" onClick={() => loadRequests()}>
                      Retry
                    </button>
                  </td>
                </tr>
              )}

              {!loading && !error && requests.length === 0 && (
                <tr className="seller-return-requests__empty-row">
                  <td colSpan={10}>No return or refund requests found.</td>
                </tr>
              )}

              {!loading &&
                !error &&
                requests.map((request) => {
                  const requestId = getRequestId(request);
                  const primaryItem = getPrimaryItem(request);
                  const actions = getSellerReturnActions(request.status);

                  return (
                    <tr key={requestId}>
                      <td>
                        <strong>#{String(requestId).slice(0, 8)}</strong>
                      </td>
                      <td>{request.requestType || "return"}</td>
                      <td>#{String(request.orderId).slice(0, 8)}</td>
                      <td>
                        {request.buyerName ||
                          String(request.buyerId || "-").slice(0, 8)}
                      </td>
                      <td>
                        <div className="seller-return-requests__item-name">
                          <strong>{primaryItem?.productName || "-"}</strong>
                          <span>{request.items?.length || 0} item(s)</span>
                        </div>
                      </td>
                      <td>{request.reasonCode || "-"}</td>
                      <td>{formatCurrencyVN(getRequestAmount(request))}</td>
                      <td>
                        <span
                          className={`seller-return-status ${getReturnStatusBadgeClass(request.status)}`}
                        >
                          {getReturnStatusLabel(request.status)}
                        </span>
                      </td>
                      <td>{formatDate(request.createdAtUtc)}</td>
                      <td>
                        <div className="seller-return-requests__actions">
                          <button
                            type="button"
                            onClick={() => loadDetail(requestId)}
                            disabled={detailLoading}
                          >
                            <Eye size={14} /> View
                          </button>
                          {actions.map((action) => (
                            <button
                              key={action}
                              type="button"
                              className={
                                action === "reject" ? "danger" : "primary"
                              }
                              disabled={!!actionLoading}
                              onClick={() => handleOpenAction(action, request)}
                            >
                              {sellerReturnActionLabels[action]}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="seller-return-requests__pagination">
          <span>
            {pagination.totalCount} request(s) · Page {pagination.pageNumber} of{" "}
            {pagination.totalPages || 1}
          </span>
          <div>
            <button
              type="button"
              disabled={loading || pagination.pageNumber <= 1}
              onClick={() =>
                handlePageChange(Math.max(pagination.pageNumber - 1, 1))
              }
            >
              Previous
            </button>
            <button
              type="button"
              disabled={
                loading || pagination.pageNumber >= pagination.totalPages
              }
              onClick={() => handlePageChange(pagination.pageNumber + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <SellerReturnDetail
        request={selectedRequest}
        actionLoading={actionLoading}
        onClose={() => setSelectedRequest(null)}
        onOpenAction={handleOpenAction}
      />

      <SellerReturnActionModal
        action={reviewAction?.action}
        request={reviewAction?.request}
        actionLoading={actionLoading}
        onClose={() => setReviewAction(null)}
        onSubmit={handleSubmitAction}
      />
    </div>
  );
}
