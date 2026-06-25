import "./style.scss";
export default function VoucherList({
  vouchers = [],
  selectedVoucher,
  onSelectVoucher,
}) {
  return (
    <div className="voucher-list">
      <div className="voucher-list__header">
        <h3>Available Vouchers</h3>
      </div>

      <div className="voucher-list__grid">
        {vouchers.map((voucher) => (
          <button
            key={voucher.voucherId}
            className={`voucher-card ${
              selectedVoucher === voucher.code ? "voucher-card--active" : ""
            }`}
            onClick={() => onSelectVoucher(voucher.code)}
          >
            <span className="voucher-card__code">{voucher.code}</span>

            <span className="voucher-card__description">
              {voucher.description}
            </span>

            <span className="voucher-card__discount">
              Discount {voucher.discountValue}%
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
