import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const toNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const normalized = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(normalized) ? normalized : null;
  }
  return null;
};

const formatVnd = (value) => {
  const numberValue = toNumber(value);
  if (numberValue === null) return null;

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(numberValue);
};

const ProductRecommendationCard = ({ product }) => {
  const productId = product.productId || product.id;
  const name = product.name || product.productName || "Sản phẩm được gợi ý";
  const originalPrice = formatVnd(product.originalPrice ?? product.price);
  const discountedPrice = formatVnd(product.discountedPrice ?? product.salePrice);
  const stock = toNumber(product.stock ?? product.stockQuantity);
  const isOutOfStock = stock !== null && stock <= 0;

  if (!productId) return null;

  return (
    <article className="ai-product-card">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={name}
          className="ai-product-card__image"
          loading="lazy"
        />
      )}

      <div className="ai-product-card__body">
        <h4>{name}</h4>

        <div className="ai-product-card__price">
          {discountedPrice && <strong>{discountedPrice}</strong>}
          {originalPrice && originalPrice !== discountedPrice && <span>{originalPrice}</span>}
        </div>

        <div className="ai-product-card__meta">
          {product.rating !== undefined && (
            <span>
              <Star size={13} fill="currentColor" /> {product.rating}
            </span>
          )}
          {product.soldCount !== undefined && <span>Đã bán {product.soldCount}</span>}
          {stock !== null && (
            <span className={`ai-stock-badge ${isOutOfStock ? "is-out" : "is-in"}`}>
              {isOutOfStock ? "Hết hàng" : "Còn hàng"}
            </span>
          )}
        </div>

        <Link
          to={`/product-detail/${productId}`}
          className="ai-product-card__link"
          aria-label={`Xem chi tiết ${name}`}
        >
          Xem chi tiết
        </Link>
      </div>
    </article>
  );
};

export default ProductRecommendationCard;
