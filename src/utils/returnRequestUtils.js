export const RETURN_REQUEST_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ITEM_RETURNED: "item_returned",
  REFUND_PROCESSING: "refund_processing",
  REFUNDED: "refunded",
  CLOSED: "closed",
};

export function normalizeReturnStatus(status) {
  return String(status || "unknown").trim().toLowerCase();
}

export function getReturnStatusLabel(status) {
  switch (normalizeReturnStatus(status)) {
    case RETURN_REQUEST_STATUSES.PENDING:
      return "Pending";
    case RETURN_REQUEST_STATUSES.APPROVED:
      return "Approved";
    case RETURN_REQUEST_STATUSES.REJECTED:
      return "Rejected";
    case RETURN_REQUEST_STATUSES.ITEM_RETURNED:
      return "Item Returned";
    case RETURN_REQUEST_STATUSES.REFUND_PROCESSING:
      return "Refund Processing";
    case RETURN_REQUEST_STATUSES.REFUNDED:
      return "Refunded";
    case RETURN_REQUEST_STATUSES.CLOSED:
      return "Closed";
    default:
      return "Unknown";
  }
}

export function getReturnStatusBadgeClass(status) {
  return normalizeReturnStatus(status).replace(/_/g, "-");
}

export function getSellerReturnActions(status) {
  switch (normalizeReturnStatus(status)) {
    case RETURN_REQUEST_STATUSES.PENDING:
      return ["approve", "reject"];
    case RETURN_REQUEST_STATUSES.APPROVED:
      return ["confirm-received"];
    default:
      return [];
  }
}

export const sellerReturnActionLabels = {
  approve: "Approve",
  reject: "Reject",
  "confirm-received": "Confirm Received",
};
