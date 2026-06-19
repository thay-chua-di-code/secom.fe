// Change money to VietNam
export const formatCurrencyVN = (value) => {
  if (!value) return "0";

  return Number(value).toLocaleString("vi-VN");
};
