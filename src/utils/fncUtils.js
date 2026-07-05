export const formatCurrencyVN = (value) => {
  if (value === null || value === undefined || value === "") {
    return "0 ₫";
  }

  // Loại bỏ dấu phẩy nếu có và ép sang number
  const amount = Number(String(value).replace(/,/g, ""));

  if (Number.isNaN(amount)) {
    return "0 ₫";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};
