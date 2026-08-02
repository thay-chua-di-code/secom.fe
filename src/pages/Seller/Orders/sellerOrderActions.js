export function normalizeOrderStatus(status) {
  return status?.trim().toLowerCase() ?? "";
}

export function getSellerOrderAction(status) {
  switch (normalizeOrderStatus(status)) {
    case "paid":
      return {
        type: "ship",
        label: "Start Shipping",
        loadingLabel: "Starting...",
        confirmMessage: "Are you sure you want to move this order to Shipping?",
        successMessage: "Order moved to Shipping.",
      };
    case "shipping":
    case "shipped":
      return {
        type: "deliver",
        label: "Confirm Delivered",
        loadingLabel: "Confirming...",
        confirmMessage: "Are you sure this order has been delivered?",
        successMessage: "Order moved to Delivered.",
      };
    default:
      return null;
  }
}

export function getSellerOrderStatusLabel(status) {
  const normalizedStatus = normalizeOrderStatus(status);

  if (normalizedStatus === "shipping" || normalizedStatus === "shipped") {
    return "Shipping";
  }

  if (!normalizedStatus) {
    return "Unknown";
  }

  return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
}
