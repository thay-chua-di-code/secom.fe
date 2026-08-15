export const RETURN_REQUEST_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  WAITING_BUYER_RETURN: "waiting_buyer_return",
  ITEM_RETURNED: "item_returned",
  SELLER_RECEIVED_RETURN: "seller_received_return",
  INSPECTION_PASSED: "inspection_passed",
  INSPECTION_FAILED: "inspection_failed",
  REPLACEMENT_SHIPPED: "replacement_shipped",
  COMPLETED: "completed",
  REFUND_PROCESSING: "refund_processing",
  PROCESSING: "processing",
  REFUNDED: "refunded",
  RETURNED: "returned",
  CANCELLED: "cancelled",
  CLOSED: "closed",
};

export function normalizeReturnStatus(status) {
  return String(status || "unknown").trim().toLowerCase().replace(/\s+/g, "_");
}

export function getReturnStatusLabel(status) {
  switch (normalizeReturnStatus(status)) {
    case RETURN_REQUEST_STATUSES.PENDING:
      return "Return request pending approval";
    case RETURN_REQUEST_STATUSES.APPROVED:
      return "Waiting for seller review";
    case RETURN_REQUEST_STATUSES.REJECTED:
      return "Return request rejected";
    case RETURN_REQUEST_STATUSES.WAITING_BUYER_RETURN:
      return "Waiting for buyer return";
    case RETURN_REQUEST_STATUSES.ITEM_RETURNED:
      return "Buyer returned item";
    case RETURN_REQUEST_STATUSES.SELLER_RECEIVED_RETURN:
      return "Seller received return";
    case RETURN_REQUEST_STATUSES.INSPECTION_PASSED:
      return "Inspection passed";
    case RETURN_REQUEST_STATUSES.INSPECTION_FAILED:
      return "Inspection failed";
    case RETURN_REQUEST_STATUSES.REPLACEMENT_SHIPPED:
      return "Replacement shipped";
    case RETURN_REQUEST_STATUSES.REFUND_PROCESSING:
      return "Refund processing";
    case RETURN_REQUEST_STATUSES.PROCESSING:
      return "Processing";
    case RETURN_REQUEST_STATUSES.COMPLETED:
      return "Completed";
    case RETURN_REQUEST_STATUSES.REFUNDED:
      return "Refunded";
    case RETURN_REQUEST_STATUSES.RETURNED:
      return "Returned";
    case RETURN_REQUEST_STATUSES.CANCELLED:
      return "Cancelled";
    case RETURN_REQUEST_STATUSES.CLOSED:
      return "Closed";
    default:
      return status || "Unknown";
  }
}

export function getReturnStatusBadgeClass(status) {
  return normalizeReturnStatus(status).replace(/_/g, "-");
}

export function getSellerReturnActions(status) {
  switch (normalizeReturnStatus(status)) {
    case RETURN_REQUEST_STATUSES.APPROVED:
      return ["approve", "reject"];
    case RETURN_REQUEST_STATUSES.ITEM_RETURNED:
      return ["confirm-received"];
    case RETURN_REQUEST_STATUSES.SELLER_RECEIVED_RETURN:
      return ["inspection-pass", "inspection-fail"];
    case RETURN_REQUEST_STATUSES.INSPECTION_PASSED:
      return ["ship-replacement"];
    default:
      return [];
  }
}

export const sellerReturnActionLabels = {
  approve: "Approve",
  reject: "Reject",
  "confirm-received": "Confirm returned item received",
  "inspection-pass": "Inspection passed",
  "inspection-fail": "Inspection failed",
  "ship-replacement": "Ship replacement",
};

export const getReturnRequestApiErrorMessage = (error, fallback = "Return/refund request action failed") => {
  const data = error?.response?.data;
  const message =
    data?.message ||
    data?.Message ||
    data?.title ||
    data?.Title ||
    data?.error ||
    data?.Error;

  if (typeof message === "string" && message.trim()) return message;

  switch (error?.response?.status) {
    case 400:
      return "Invalid return/refund request data.";
    case 401:
      return "Your session has expired. Please log in again.";
    case 403:
      return "You do not have permission to process this return/refund request.";
    case 404:
      return "Return/refund request not found.";
    case 409:
      return "This request has already been processed or its status is no longer valid.";
    case 422:
      return "The request does not meet the business requirements for processing.";
    default:
      return error?.message || fallback;
  }
};

export const logReturnRequestApiError = (context, error, meta = {}) => {
  if (!import.meta.env.DEV) return;

  console.error("[ReturnRequest]", context, {
    ...meta,
    status: error?.response?.status,
    response: error?.response?.data,
    message: error?.message,
  });
};
