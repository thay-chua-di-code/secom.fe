import { Heart, Eye, Star } from "lucide-react";

import "./style.scss";

export default function Card({ product }) {
  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        {product.isNew && <span className="product-card__badge">NEW</span>}

        <div className="product-card__actions">
          <button>
            <Heart size={18} />
          </button>

          <button>
            <Eye size={18} />
          </button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />

        <button className="product-card__cart">Add To Cart</button>
      </div>

      <div className="product-card__content">
        <h3>{product.name}</h3>

        <div className="product-card__price-rating">
          <span className="price">${product.price}</span>

          <div className="rating">
            <Star fill="currentColor" size={14} />
            <Star fill="currentColor" size={14} />
            <Star fill="currentColor" size={14} />
            <Star fill="currentColor" size={14} />
            <Star fill="currentColor" size={14} />

            <span>({product.review})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
