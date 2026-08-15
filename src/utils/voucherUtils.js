import { formatCurrencyVN } from "./fncUtils";

export const VOUCHER_DISCOUNT_TYPES = {
  PERCENTAGE: "percentage",
  FIXED_AMOUNT: "fixed_amount",
};

export const normalizeVoucherDiscountType = (discountType) => {
  const normalized = String(discountType || "").trim().toLowerCase();

  if (normalized === "percentage" || normalized === "percent") {
    return VOUCHER_DISCOUNT_TYPES.PERCENTAGE;
  }

  if (
    normalized === "fixed" ||
    normalized === "fixed_amount" ||
    normalized === "fixedamount" ||
    normalized === "fixed-amount"
  ) {
    return VOUCHER_DISCOUNT_TYPES.FIXED_AMOUNT;
  }

  return normalized;
};

export const isPercentageVoucher = (discountType) =>
  normalizeVoucherDiscountType(discountType) === VOUCHER_DISCOUNT_TYPES.PERCENTAGE;

export const isFixedAmountVoucher = (discountType) =>
  normalizeVoucherDiscountType(discountType) === VOUCHER_DISCOUNT_TYPES.FIXED_AMOUNT;

export const getVoucherDiscountTypeLabel = (discountType) => {
  if (isPercentageVoucher(discountType)) {
    return "Percentage";
  }

  if (isFixedAmountVoucher(discountType)) {
    return "Fixed Amount";
  }

  return String(discountType || "-");
};

export const formatVoucherDiscountValue = (voucher) => {
  const value = Number(voucher?.discountValue || 0);

  return isPercentageVoucher(voucher?.discountType)
    ? `${value}%`
    : formatCurrencyVN(value);
};
