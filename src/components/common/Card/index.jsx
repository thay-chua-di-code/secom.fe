import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../../redux/slice/cartSlice";
import {
  addWishlistThunk,
  deleteWishlistThunk,
} from "../../../redux/slice/userSlice";
import "./style.scss";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Cannot update wishlist. Please try again.";

export default function Card({ item }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const wishlist = useSelector((state) => {
    const items = state.user.wishlist?.items ?? state.user.wishlist;

    return Array.isArray(items) ? items : [];
  });
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const productId = item.id || item.productId;
  const productName = item.name || item.title || item.productName;
  const productImages = item.images || [item.imageUrl || item.primaryImageUrl].filter(Boolean);
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

  const handleAddCart = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(addCartItem({ productId, quantity: 1 }));
  };

  const handleToggleWishlist = async (event) => {
    event.preventDefault();

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

  const handleRemoveWishlist = async (event) => {
    event.preventDefault();

    if (wishlistLoading) {
      return;
    }

    try {
      setWishlistLoading(true);
      await dispatch(deleteWishlistThunk(productId)).unwrap();
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="wishlist-item" data-testid="product-card">
      {pathname === "/wish-list" && (
        <button
          data-testid="remove-wishlist-btn"
          className="remove-btn"
          onClick={handleRemoveWishlist}
          disabled={wishlistLoading}
        >
          <FaTrash />
        </button>
      )}

      <Link to={`/product-detail/${productId}`} className="image-box">
        <img src={productImages[0]} alt={productName} />
      </Link>

      <div className="product-info">
        <h3>{productName}</h3>

        <div className="price">
          <span className="new-price">{(item.price || 0).toLocaleString()}đ</span>

          <span className="old-price">
            {item.oldPrice ? item.oldPrice.toLocaleString() : ""}đ
          </span>
        </div>

        <div className="stock">{item.stock ? "In Stock" : "Out Of Stock"}</div>
      </div>

      <div className="card-actions">
        <Button data-testid="add-to-cart-btn" className="add-cart" onClick={handleAddCart}>
          Add To Cart
        </Button>
        <Button
          data-testid="wishlist-btn"
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleToggleWishlist}
          disabled={wishlistLoading}
        >
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
        <Link data-testid="buy-now-btn" to={`/product-detail/${productId}`} className="buy-now-btn">
          Buy Now
        </Link>
      </div>
    </div>
  );
}
