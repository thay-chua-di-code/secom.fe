// Change money to VietNam
export const formatCurrencyVN = (value) => {
  if (value == null) return "0 ₫";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const formatDate = (date) => new Date(date).toLocaleDateString("vi-VN");
