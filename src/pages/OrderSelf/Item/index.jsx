import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";

export default function OrderBody({ products }) {
  return (
    <div className="order-body">
      {products.map((product) => (
        <div className="order-product" key={product.id}>
          <img src={product.image} alt={product.name} />

          <div className="info">
            <h4>{product.name}</h4>

            <p>{product.variant}</p>

            <span>x{product.quantity}</span>
          </div>

          <div className="price">{formatCurrencyVN(product.price)}</div>
        </div>
      ))}
    </div>
  );
}
