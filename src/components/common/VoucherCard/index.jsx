import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import Button from "../Button/Button";
import "./style.scss";
export default function VoucherCard({ voucher }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(voucher.code);

    toast.success("Voucher copied");
  };

  const formatMoney = (value) => value.toLocaleString("vi-VN") + "đ";

  return (
    <div className="voucher-card">
      <div className="voucher-card__left">
        <div className="discount">
          {voucher.discountType === "PERCENT"
            ? `${voucher.discountValue}%`
            : formatMoney(voucher.discountValue)}
        </div>

        <span>OFF</span>
      </div>

      <div className="voucher-card__body">
        <h3>{voucher.code}</h3>

        <div className="voucher-info">
          <p>
            Minimum order:
            <strong>{formatMoney(voucher.minOrderAmount)}</strong>
          </p>

          <p>
            Maximum discount:
            <strong>{formatMoney(voucher.maxDiscountAmount)}</strong>
          </p>

          <p>
            Remaining:
            <strong>{voucher.remainingQuantity}</strong>
          </p>

          <p>
            Expired:
            <strong>
              {new Date(voucher.endAtUtc).toLocaleDateString("vi-VN")}
            </strong>
          </p>
        </div>
      </div>

      <div className="voucher-card__action">
        <Button onClick={handleCopy}>
          <Copy size={16} />
          Copy
        </Button>
      </div>
    </div>
  );
}
