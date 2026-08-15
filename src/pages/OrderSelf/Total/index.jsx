import "./style.scss";
import Button from "../../../components/common/Button/Button";
import { formatCurrencyVN } from "../../../utils/fncUtils";
export default function OrderFooter({ totalPrice }) {
  return (
    <div className="order-footer">
      <div className="total">
        Total:
        <span>{formatCurrencyVN(totalPrice)}</span>
      </div>

      <div className="actions">
        <Button className="outline">Details</Button>

        <Button className="primary">Buy it again!</Button>
      </div>
    </div>
  );
}
