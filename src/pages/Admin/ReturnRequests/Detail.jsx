import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Check, PackageCheck, RefreshCw, X } from "lucide-react";
import {
  adminReturnRequestApi,
  normalizeReturnRequest,
} from "../../../api/adminReturnRequestApi";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import {
  getReturnStatusBadgeClass,
  getReturnStatusLabel,
  getReturnRequestApiErrorMessage,
  logReturnRequestApiError,
  normalizeReturnStatus,
  RETURN_REQUEST_STATUSES,
} from "../../../utils/returnRequestUtils";
import "./style.scss";

const actionLabels = {
  approve: "Approve",
  reject: "Reject",
  "mark-item-returned": "Mark item returned",
  "start-refund": "Start refund",
  "complete-refund": "Complete refund",
  close: "Close request",
};

const statusActions = {
  [RETURN_REQUEST_STATUSES.PENDING]: ["approve", "reject"],
  [RETURN_REQUEST_STATUSES.APPROVED]: ["mark-item-returned", "reject"],
  [RETURN_REQUEST_STATUSES.ITEM_RETURNED]: ["start-refund"],
  [RETURN_REQUEST_STATUSES.REFUND_PROCESSING]: ["complete-refund"],
  [RETURN_REQUEST_STATUSES.REFUNDED]: ["close"],
};

const getApiErrorMessage = (error) =>
  getReturnRequestApiErrorMessage(error, "Return request action failed");

const buildReviewPayload = (action, { note, reason }) => {
  const payload = {};

  if (note) payload.note = note;
  if (action === "reject") payload.reason = reason;

  return payload;
};

export default function AdminReturnRequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [reviewAction, setReviewAction] = useState(null);
  const [reviewForm, setReviewForm] = useState({ note: "", reason: "" });

  const loadRequest = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminReturnRequestApi.getReturnRequest(id);
      setRequest(normalizeReturnRequest(response));
      setError("");
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadRequest, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadRequest]);

  const availableActions = statusActions[normalizeReturnStatus(request?.status)] || [];

  const handleOpenAction = (action) => {
    setReviewAction(action);
    setReviewForm({ note: "", reason: "" });
  };

  const handleSubmitAction = async (event) => {
    event.preventDefault();

    if (!reviewAction) return;

    if (!id) {
      toast.error("Return request id is missing");
      return;
    }

    const reason = reviewForm.reason.trim();
    const note = reviewForm.note.trim();

    if (reviewAction === "reject" && !reason) {
      toast.error("Reject reason is required");
      return;
    }

    if (reason.length > 500 || note.length > 500) {
      toast.error("Reason and note must not exceed 500 characters");
      return;
    }

    try {
      setActionLoading(reviewAction);
      const payload = buildReviewPayload(reviewAction, { note, reason });

      if (import.meta.env.DEV) {
        console.info("[ReturnRequest] admin review request", {
          method: "PATCH",
          url: `/admin/return-requests/${id}/${reviewAction}`,
          returnRequestId: id,
          action: reviewAction,
          payload,
        });
      }

      await adminReturnRequestApi.reviewReturnRequest(id, reviewAction, payload);
      toast.success(`${actionLabels[reviewAction]} successfully`);
      setReviewAction(null);
      await loadRequest();
    } catch (actionError) {
      logReturnRequestApiError("admin review failed", actionError, {
        method: "PATCH",
        url: `/admin/return-requests/${id}/${reviewAction}`,
        returnRequestId: id,
        action: reviewAction,
      });
      toast.error(getApiErrorMessage(actionError));
    } finally {
      setActionLoading("");
    }
  };

  return (
    <div className="admin-return-requests">
      <div className="admin-return-requests__header">
        <div>
          <Link to="/admin/return-requests" className="admin-return-requests__view">
            <ArrowLeft size={15} /> Back
          </Link>
          <h1>Return Request Detail</h1>
          <p>{id}</p>
        </div>
        <button type="button" onClick={loadRequest} disabled={loading}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && <div className="admin-return-requests__error">{error}</div>}
      {loading && <div className="admin-return-requests__state">Loading request...</div>}

      {request && !loading && (
        <>
          <section className="admin-return-detail__summary">
            <article><span>Status</span><strong className={`admin-return-requests__badge ${getReturnStatusBadgeClass(request.status)}`}>{getReturnStatusLabel(request.status)}</strong></article>
            <article><span>Refund Amount</span><strong>{formatCurrencyVN(request.refundAmount || 0)}</strong></article>
            <article><span>Order</span><strong>{request.orderId}</strong></article>
            <article><span>Requested</span><strong>{request.requestedAtUtc ? new Date(request.requestedAtUtc).toLocaleString("vi-VN") : "--"}</strong></article>
          </section>

          <section className="admin-return-detail__card">
            <h2>Reason</h2>
            <p><strong>{request.reasonCode || "OTHER"}</strong></p>
            <p>{request.description || "No description provided."}</p>
            {request.rejectReason && <p className="admin-return-detail__danger">Rejected: {request.rejectReason}</p>}
          </section>

          <section className="admin-return-detail__card">
            <h2>Items</h2>
            {(request.items || []).length === 0 ? (
              <p>No items.</p>
            ) : (
              (request.items || []).map((item) => (
                <article className="admin-return-detail__item" key={item.orderItemId || item.id}>
                  <PackageCheck size={18} />
                  <div>
                    <strong>{item.productName || item.orderItemId}</strong>
                    <span>Qty {item.quantity} · Refund {formatCurrencyVN(item.refundAmount || 0)}</span>
                    {item.reason && <p>{item.reason}</p>}
                  </div>
                </article>
              ))
            )}
          </section>

          <section className="admin-return-detail__card">
            <h2>Evidence</h2>
            {(request.evidenceImages || []).length === 0 ? (
              <p>No evidence images.</p>
            ) : (
              <div className="admin-return-detail__evidence">
                {(request.evidenceImages || []).map((image) => (
                  <a key={image.id || image.imageUrl} href={image.imageUrl} target="_blank" rel="noreferrer">
                    <img src={image.imageUrl} alt="Return evidence" />
                  </a>
                ))}
              </div>
            )}
          </section>

          <section className="admin-return-detail__card">
            <h2>Actions</h2>
            <div className="admin-return-detail__actions">
              {availableActions.length === 0 ? (
                <span>No available actions for this status.</span>
              ) : availableActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className={action === "reject" ? "danger" : ""}
                  disabled={!!actionLoading}
                  onClick={() => handleOpenAction(action)}
                >
                  {action === "reject" ? <X size={15} /> : <Check size={15} />}
                  {actionLabels[action]}
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {reviewAction && (
        <div className="admin-return-detail__modal-backdrop" role="presentation">
          <form className="admin-return-detail__modal" onSubmit={handleSubmitAction} role="dialog" aria-modal="true">
            <h3>{actionLabels[reviewAction]}</h3>
            <label>
              Note
              <textarea maxLength={500} value={reviewForm.note} onChange={(event) => setReviewForm((prev) => ({ ...prev, note: event.target.value }))} />
            </label>
            <label>
              Reason {reviewAction === "reject" ? "*" : ""}
              <textarea maxLength={500} required={reviewAction === "reject"} value={reviewForm.reason} onChange={(event) => setReviewForm((prev) => ({ ...prev, reason: event.target.value }))} />
            </label>
            <div className="admin-return-detail__actions">
              <button type="button" onClick={() => setReviewAction(null)} disabled={!!actionLoading}>Cancel</button>
              <button type="submit" disabled={!!actionLoading}>{actionLoading ? "Processing..." : "Submit"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
