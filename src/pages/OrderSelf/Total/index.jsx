import "./style.scss";
import Button from "../../../components/common/Button/Button";
export default function OrderFooter({ totalPrice }) {
  return (
    <div className="order-footer">
      <div className="total">
        Total:
        <span>{totalPrice.toLocaleString()}đ</span>
      </div>

      <div className="actions">
        <Button className="outline">Details</Button>

        <Button className="primary">Buy it again!</Button>
      </div>
    </div>
  );
}
