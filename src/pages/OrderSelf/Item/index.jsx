import "./style.scss";

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

          <div className="price">{product.price.toLocaleString()}đ</div>
        </div>
      ))}
    </div>
  );
}
