import { useMemo, useState } from "react";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";

import { ArrowUpRight, Check, ShoppingBag } from "lucide-react";

import toast from "react-hot-toast";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addCartItem } from "../../../redux/slice/cartSlice";

import {
  addWishlistThunk,
  deleteWishlistThunk,
} from "../../../redux/slice/userSlice";

import { formatCurrencyVN } from "../../../utils/fncUtils";

import useCompare from "../../../hooks/useCompare";

import "./style.scss";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Cannot update wishlist. Please try again.";

const FALLBACK_PRODUCT_IMAGE = "/favicon.svg";

const getProductImages = (product = {}) => {
  const imageList = Array.isArray(product.images)
    ? product.images
        .map((image) => image?.imageUrl || image?.url || image?.src)
        .filter(Boolean)
    : [];

  return [
    product.primaryImageUrl,
    product.productImageUrl,
    product.imageUrl,
    product.thumbnailUrl,
    product.productThumbnailUrl,
    product.image,
    ...imageList,
  ].filter(Boolean);
};

export default function Card({ item }) {
  const { pathname } = useLocation();

  const isProducts = pathname === "/products";

  const { toggle, isCompared } = useCompare();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const wishlist = useSelector((state) => {
    const items = state.user.wishlist?.items ?? state.user.wishlist;

    return Array.isArray(items) ? items : [];
  });

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const productId = item.id || item.productId;

  const compared = isCompared(productId);

  const productName = item.name || item.title || item.productName || "Product";

  const productImages = getProductImages(item);

  const isWishlisted = useMemo(
    () =>
      pathname === "/wish-list" ||
      (wishlist ?? []).some(
        (wishlistItem) =>
          String(wishlistItem.productId) === String(productId) ||
          String(wishlistItem.id) === String(productId) ||
          String(wishlistItem.product?.id) === String(productId),
      ),
    [pathname, productId, wishlist],
  );

  const requireLogin = () => {
    if (isAuthenticated) {
      return true;
    }

    toast.error("Please login to use wishlist");

    navigate("/login");

    return false;
  };

  const handleToggleWishlist = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!requireLogin() || wishlistLoading) {
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await dispatch(deleteWishlistThunk(productId)).unwrap();

        toast.success("Removed from wishlist");
      } else {
        await dispatch(addWishlistThunk(productId)).unwrap();

        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleBuyNow = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId,
          quantity: 1,
        }),
      ).unwrap();

      navigate("/cart", {
        state: {
          autoSelectProductId: productId,
        },
      });
    } catch {
      toast.error("Cannot buy product");
    }
  };

  const handleToggleCompare = (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      toggle(productId);

      toast.success(compared ? "Removed from compare" : "Added to compare");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <article className="custom-product-card">
      {/* =====================================
          IMAGE
      ====================================== */}

      <div className="image-container">
        <Link className="image-link" to={`/product-detail/${productId}`}>
          <img
            src={productImages[0] || FALLBACK_PRODUCT_IMAGE}
            alt={productName}
          />
        </Link>

        {/* FLOATING ACTIONS */}

        <div className="floating-actions">
          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className={`action-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleToggleWishlist}
            disabled={wishlistLoading}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>

          <Link
            className="action-btn"
            to={`/product-detail/${productId}`}
            aria-label="View product"
            onClick={(event) => event.stopPropagation()}
          >
            <FaEye />
          </Link>
        </div>

        {/* QUICK ACTION BAR */}

        <div
          className={`product-quick-actions ${
            isProducts ? "product-quick-actions--compare" : ""
          }`}
        >
          <button
            type="button"
            className="quick-buy-btn"
            onClick={handleBuyNow}
          >
            <ShoppingBag size={14} />

            <span>Buy Now</span>
          </button>

          {isProducts && (
            <button
              type="button"
              className={`compare-btn ${compared ? "active" : ""}`}
              onClick={handleToggleCompare}
            >
              {compared ? (
                <>
                  <Check size={14} />

                  <span>Compared</span>
                </>
              ) : (
                <span>Compare</span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* =====================================
          INFO
      ====================================== */}

      <div className="info-container">
        <Link
          to={`/product-detail/${productId}`}
          className="product-title-link"
        >
          <h3 className="product-title">{productName}</h3>

          <ArrowUpRight size={14} />
        </Link>

        <div className="price-container">
          <span className="current-price">{formatCurrencyVN(item.price)}</span>

          {item.oldPrice && (
            <span className="old-price">{formatCurrencyVN(item.oldPrice)}</span>
          )}
        </div>

        <div className="rating-container">
          <div className="stars">★★★★★</div>

          <span className="review-count">(65)</span>
        </div>
      </div>
    </article>
  );
}
