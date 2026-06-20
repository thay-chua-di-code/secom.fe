import { Heart, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

import {
  addCartItem,
  updateCartItemQuantity,
} from "../../../../redux/slices/cartSlice";

export default function Card({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const existingItem = cartItems.find(
      (item) =>
        item.productId === product.id || item.productId === String(product.id),
    );

    if (existingItem) {
      dispatch(
        updateCartItemQuantity({
          cartItemId: existingItem.cartItemId,
          quantity: existingItem.quantity + 1,
        }),
      );
      return;
    }

    dispatch(addCartItem(product));
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        {product.isNew && <span className="product-card__badge">NEW</span>}

        <div className="product-card__actions">
          <button onClick={(e) => e.stopPropagation()}>
            <Heart size={18} />
          </button>

          <Link
            to={`/product-detail/${product.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Eye size={18} />
          </Link>
        </div>

        <img
          src={product.images?.[0]}
          alt={product.name}
          className="product-card__image"
        />

        <button className="product-card__cart" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>

      <div className="product-card__content">
        <h3>{product.name}</h3>

        <div className="product-card__price-rating">
          <span className="price">${product.price}</span>

          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
            <span>({product.review || 0})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
