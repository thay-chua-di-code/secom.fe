import { Link, useNavigate } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import {
  addWishlistThunk,
  deleteWishlistThunk,
} from "../../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Title from "../../../components/common/Title/index";
import "./style.scss";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Something went wrong. Please try again.";

export default function RelatedProducts({ products = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingId, setLoadingId] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const wishlist = useSelector((state) => {
    const items = state.user.wishlist?.items ?? state.user.wishlist;
    return Array.isArray(items) ? items : [];
  });

  const wishlistIds = useMemo(() => {
    return new Set(
      wishlist.map((item) =>
        String(item.productId || item.id || item.product?.id),
      ),
    );
  }, [wishlist]);

  if (!products.length) return null;

  const handleWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (loadingId === productId) return;

    try {
      setLoadingId(productId);

      if (wishlistIds.has(String(productId))) {
        await dispatch(deleteWishlistThunk(productId)).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await dispatch(addWishlistThunk(productId)).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="related-products">
      <Title title="Related Products" />

      <div className="related-products__grid">
        {products.map((product) => {
          const isWishlisted = wishlistIds.has(String(product.id));

          return (
            <Link
              key={product.id}
              to={`/product-detail/${product.id}`}
              className="related-card"
            >
              <div className="related-card__image">
                <img
                  src={
                    product.images?.[0] ||
                    "https://placehold.co/400x400?text=No+Image"
                  }
                  alt={product.name}
                />

                <button
                  className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
                  onClick={(e) => handleWishlist(e, product.id)}
                  disabled={loadingId === product.id}
                >
                  <Heart
                    size={18}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="related-card__content">
                <h3>{product.name}</h3>

                <div className="price">{formatCurrencyVN(product.price)}đ</div>

                <div className="meta">
                  <span>{product.condition}</span>

                  <span className="dot"></span>

                  <span className="location">
                    <MapPin size={14} />
                    {product.location}
                  </span>
                </div>

                <span className="category">{product.category?.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
