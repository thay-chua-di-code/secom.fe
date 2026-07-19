import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";

const formatDiscount = (voucher) => {
  const type = String(voucher.discountType || "").toLowerCase();
  const value = voucher.discountValue ?? 0;

  if (type.includes("percent")) {
    return `${value}%`;
  }

  return formatCurrencyVN(value);
};

const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleDateString("vi-VN");
};

export default function VoucherList({
  vouchers = [],
  loading = false,
  selectedVoucher,
  onSelectVoucher,
}) {
  const voucherItems = Array.isArray(vouchers) ? vouchers : [];

  return (
    <div className="voucher-list">
      <div className="voucher-list__header">
        <h3>Available Vouchers</h3>
        <span>{voucherItems.length} vouchers</span>
      </div>

      {loading ? (
        <div className="voucher-list__empty">Loading vouchers...</div>
      ) : voucherItems.length === 0 ? (
        <div className="voucher-list__empty">No active vouchers available.</div>
      ) : (
        <div className="voucher-list__grid">
          {voucherItems.map((voucher) => (
            <button
              key={voucher.id || voucher.voucherId || voucher.code}
              className={`voucher-card ${
                selectedVoucher === voucher.code ? "voucher-card--active" : ""
              }`}
              onClick={() => onSelectVoucher(voucher.code)}
              type="button"
            >
              <div className="voucher-card__top">
                <span className="voucher-card__code">{voucher.code}</span>

                <span className="voucher-card__discount">
                  {formatDiscount(voucher)}
                </span>
              </div>

              <span className="voucher-card__description">
                {voucher.description || voucher.name || "SECOM voucher"}
              </span>

              <div className="voucher-card__meta">
                <span>Min {formatCurrencyVN(voucher.minOrderAmount || 0)}</span>

                <span>
                  Exp {formatDate(voucher.expiresAtUtc || voucher.endAtUtc)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
