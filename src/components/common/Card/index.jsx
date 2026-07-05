import { useMemo, useState } from "react";
import { FaTrash, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
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
import { formatCurrencyVN } from "../../../utils/fncUtils";
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
  const productImages =
    item.images || [item.imageUrl || item.primaryImageUrl].filter(Boolean);
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

  const handleRemoveWishlist = async (event) => {
    event.preventDefault();
    event.stopPropagation();
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

  const handleBuyNow = async (e) => {
    e.preventDefault();

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
    } catch (err) {
      toast.error("Cannot buy product");
    }
  };
  return (
    <div className="wishlist-item">
      <div className="image-box">
        <Link to={`/product-detail/${productId}`}>
          <img src={productImages[0]} alt={productName} />
        </Link>

        <div className="image-actions">
          <button
            className={`favorite-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleToggleWishlist}
            disabled={wishlistLoading}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>

          <Link to={`/product-detail/${productId}`} className="view-btn">
            <FaEye />
          </Link>
        </div>
      </div>

      <div className="product-info">
        <h3>{productName}</h3>

        <div className="price">
          <span className="new-price">{formatCurrencyVN(item.price)}</span>

          {item.oldPrice && (
            <span className="old-price">{formatCurrencyVN(item.oldPrice)}</span>
          )}
        </div>

        <span className={`stock ${item.stock ? "available" : "out"}`}>
          {item.stock ? "In Stock" : "Out Of Stock"}
        </span>
      </div>

      <div className="card-actions">
        <Button className="add-cart" onClick={handleAddCart}>
          Add To Cart
        </Button>

        <div className="bottom-actions">
          <Button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
