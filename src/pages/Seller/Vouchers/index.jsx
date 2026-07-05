import "./style.scss";

export default function VoucherList({ vouchers = [] }) {
  if (!vouchers.length) {
    return <div className="voucher-empty">No vouchers available.</div>;
  }

  return (
    <div className="voucher-list">
      {vouchers.map((voucher) => (
        <div className="voucher-card" key={voucher.id}>
          <div className="voucher-card__left">
            <div className="voucher-code">{voucher.code}</div>

            <div className="voucher-name">{voucher.name}</div>

            <div className="voucher-description">{voucher.description}</div>
          </div>

          <div className="voucher-card__right">
            <div className="voucher-discount">
              {voucher.discountType === "Percentage"
                ? `${voucher.discountValue}% OFF`
                : `${voucher.discountValue.toLocaleString()} VNĐ`}
            </div>

            <div className="voucher-info">
              <p>
                Min Order:
                <strong>{voucher.minOrderAmount.toLocaleString()} VNĐ</strong>
              </p>

              <p>
                Max Discount:
                <strong>
                  {voucher.maxDiscountAmount.toLocaleString()} VNĐ
                </strong>
              </p>

              <p>
                Remaining:
                <strong>{voucher.remainingQuantity}</strong>
              </p>

              <p>
                Status:
                <span className={`status ${voucher.status.toLowerCase()}`}>
                  {voucher.status}
                </span>
              </p>
            </div>

            <button className="use-btn">Use Now</button>
          </div>
        </div>
      ))}
    </div>
  );
}
