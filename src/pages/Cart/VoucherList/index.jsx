import { useRef } from "react";
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

  return new Date(value).toLocaleDateString("en-US");
};

export default function VoucherList({
  vouchers = [],
  loading = false,
  selectedVoucher,
  disabledReasons = {},
  onSelectVoucher,
}) {
  const voucherItems = Array.isArray(vouchers) ? vouchers : [];

  const viewportRef = useRef(null);

  const handleScroll = (direction) => {
    if (!viewportRef.current) return;

    const scrollAmount = viewportRef.current.clientWidth * 0.8;

    viewportRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="voucher-list">
      <div className="voucher-list__header">
        <div className="voucher-list__title">
          <h3>Available Vouchers</h3>

          <span>Choose a voucher to save more</span>
        </div>

        <span className="voucher-list__count">
          {voucherItems.length} vouchers
        </span>
      </div>

      {loading ? (
        <div className="voucher-list__empty">Loading vouchers...</div>
      ) : voucherItems.length === 0 ? (
        <div className="voucher-list__empty">No active vouchers available.</div>
      ) : (
        <div className="voucher-list__content">
          <button
            type="button"
            className="voucher-list__nav voucher-list__nav--prev"
            onClick={() => handleScroll("left")}
            aria-label="Scroll vouchers left"
          >
            ‹
          </button>

          <div ref={viewportRef} className="voucher-list__viewport">
            <div
              className={`voucher-list__grid voucher-list__grid--count-${Math.min(
                voucherItems.length,
                3,
              )}`}
            >
              {voucherItems.map((voucher) => {
                const voucherKey =
                  voucher.id || voucher.voucherId || voucher.code;

                const isSelected = selectedVoucher === voucher.code;
                const disabledReason = disabledReasons?.[voucher.code] || "";
                const isDisabled = Boolean(disabledReason);

                return (
                  <div
                    key={voucherKey}
                    className={`voucher-item ${
                      isSelected ? "voucher-item--active" : ""
                    }`}
                  >
                    {isSelected && (
                      <div className="voucher-item__selected">✓</div>
                    )}

                    <button
                      type="button"
                      aria-label={`Select voucher ${voucher.code}`}
                      className={`voucher-card ${
                        isSelected ? "voucher-card--active" : ""
                      } ${isDisabled ? "voucher-card--disabled" : ""}`}
                      onClick={() => {
                        if (isDisabled) return;
                        onSelectVoucher?.(voucher.code);
                      }}
                      disabled={isDisabled}
                      title={disabledReason || `Apply voucher ${voucher.code}`}
                    >
                      <div className="voucher-card__top">
                        <span className="voucher-card__code">
                          {voucher.code}
                        </span>

                        <span className="voucher-card__discount">
                          {formatDiscount(voucher)}
                        </span>
                      </div>

                      <span className="voucher-card__description">
                        {voucher.description || voucher.name || "SECOM voucher"}
                      </span>

                      <div className="voucher-card__meta">
                        <span>
                          Min {formatCurrencyVN(voucher.minOrderAmount || 0)}
                        </span>

                        <span>
                          Exp{" "}
                          {formatDate(voucher.expiresAtUtc || voucher.endAtUtc)}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="voucher-list__nav voucher-list__nav--next"
            onClick={() => handleScroll("right")}
            aria-label="Scroll vouchers right"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
