export const RETURN_REQUEST_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ITEM_RETURNED: "item_returned",
  REFUND_PROCESSING: "refund_processing",
  PROCESSING: "processing",
  COMPLETED: "completed",
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
      return "Pending";
    case RETURN_REQUEST_STATUSES.APPROVED:
      return "Approved";
    case RETURN_REQUEST_STATUSES.REJECTED:
      return "Rejected";
    case RETURN_REQUEST_STATUSES.ITEM_RETURNED:
      return "Item Returned";
    case RETURN_REQUEST_STATUSES.REFUND_PROCESSING:
      return "Refund Processing";
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

export const getReturnRequestApiErrorMessage = (error, fallback = "Return request action failed") => {
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
      return "Dữ liệu xử lý yêu cầu trả hàng/hoàn tiền không hợp lệ.";
    case 401:
      return "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
    case 403:
      return "Bạn không có quyền xử lý yêu cầu trả hàng/hoàn tiền này.";
    case 404:
      return "Không tìm thấy yêu cầu trả hàng/hoàn tiền.";
    case 409:
      return "Yêu cầu này đã được xử lý hoặc trạng thái không còn hợp lệ.";
    case 422:
      return "Yêu cầu không đáp ứng điều kiện nghiệp vụ để xử lý.";
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
