import { useMemo, useState } from "react";
import { Eye, Heart, Scale, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import placeholderImage from "../../../../assets/icons/logo.jpg";
import "./style.scss";

import {
  addCartItem,
  updateCartItemQuantity,
} from "../../../../redux/slices/cartSlice";
import {
  addWishlistThunk,
  deleteWishlistThunk,
} from "../../../../redux/slice/userSlice";
import { formatCurrencyVN } from "../../../../utils/fncUtils";
import useCompare from "../../../../hooks/useCompare";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Cannot update wishlist. Please try again.";

export default function Card({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const items = state.cart.items;

    return Array.isArray(items) ? items : [];
  });
  const wishlist = useSelector((state) => {
    const items = state.user.wishlist?.items ?? state.user.wishlist;

    return Array.isArray(items) ? items : [];
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { toggle, isCompared } = useCompare();
  const productImage =
    product.primaryImageUrl || product.images?.[0] || placeholderImage;
  const productId = product.id || product.productId;
  const compared = isCompared(productId);
  const isWishlisted = useMemo(
    () =>
      (wishlist ?? []).some(
        (wishlistItem) =>
          String(wishlistItem.productId) === String(product.id) ||
          String(wishlistItem.id) === String(product.id) ||
          String(wishlistItem.product?.id) === String(product.id),
      ),
    [product.id, wishlist],
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const existingItem = (cartItems ?? []).find(
      (item) => String(item.productId) === String(product.id),
    );

    if (existingItem) {
      dispatch(
        updateCartItemQuantity({
          cartItemId: existingItem.cartItemId,
          quantity: existingItem.quantity + 1,
        }),
      );
    } else {
      dispatch(
        addCartItem({
          productId: product.id,
          quantity: 1,
        }),
      );
    }
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to use wishlist");
      navigate("/login");
      return;
    }

    if (wishlistLoading) {
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await dispatch(deleteWishlistThunk(product.id)).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await dispatch(addWishlistThunk(product.id)).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const existingItem = (cartItems ?? []).find(
        (item) => String(item.productId) === String(product.id),
      );

      if (existingItem) {
        await dispatch(
          updateCartItemQuantity({
            cartItemId: existingItem.cartItemId,
            quantity: existingItem.quantity + 1,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addCartItem({
            productId: product.id,
            quantity: 1,
          }),
        ).unwrap();
      }

      navigate("/cart", {
        state: {
          autoSelectProductId: product.id,
        },
      });
    } catch {
      toast.error("Cannot buy product");
    }
  };

  const handleToggleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      toggle(productId);
      toast.success(compared ? "Removed from compare" : "Added to compare");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="product-card" data-testid="product-card">
      <div className="product-card__image-wrapper">
        {product.isNew && <span className="product-card__badge">NEW</span>}

        <div className="product-card__actions">
          <button
            data-testid="wishlist-btn"
            onClick={handleToggleWishlist}
            disabled={wishlistLoading}
            className={isWishlisted ? "active" : ""}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

          <Link
            to={`/product-detail/${productId}`}
            onClick={(e) => e.stopPropagation()}
            aria-label="View product detail"
          >
            <Eye size={18} />
          </Link>

          <button
            type="button"
            onClick={handleToggleCompare}
            className={compared ? "active" : ""}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            title={compared ? "Remove from compare" : "Compare product"}
          >
            <Scale size={18} />
          </button>
        </div>

        <img
          src={productImage}
          alt={product.name}
          className="product-card__image"
          onClick={() => {
            navigate(`/product-detail/${productId}`);
          }}
        />

        <div className="product-card__buttons">
          <button
            data-testid="add-to-cart-btn"
            className="product-card__cart"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          <button className="product-card__buy" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>

      <div className="product-card__content">
        <h3>{product.name}</h3>

        <div className="product-card__price-rating">
          <span className="price">{formatCurrencyVN(product.price)}</span>

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
