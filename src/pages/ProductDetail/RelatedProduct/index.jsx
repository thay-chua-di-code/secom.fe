import { Link, useNavigate } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import {
  addWishlistThunk,
  deleteWishlistThunk,
} from "../../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Title from "../../../components/common/Title/index";
import { aiService } from "../../../service/aiService";
import useReveal from "../../../hooks/useReveal";
import "./style.scss";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Something went wrong. Please try again.";

export default function RelatedProducts({ productId, products = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: false,
  });
  const [loadingId, setLoadingId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [relatedError, setRelatedError] = useState("");

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

  const normalizedProducts = useMemo(() => {
    const sourceProducts = products.length ? products : relatedProducts;

    return sourceProducts
      .map((product) => ({
        id: product.id || product.productId,
        name: product.name || product.productName || "Unnamed product",
        price: Number(product.price || product.currentPrice || 0),
        image:
          product.thumbnailUrl ||
          product.imageUrl ||
          product.primaryImageUrl ||
          product.images?.find?.((image) => image?.isPrimary)?.imageUrl ||
          product.images?.[0]?.imageUrl ||
          product.images?.[0] ||
          "/favicon.svg",
        condition: product.condition || "--",
        location: product.location || "--",
        categoryName:
          product.category?.name || product.categoryName || "Uncategorized",
      }))
      .filter((product) => product.id);
  }, [products, relatedProducts]);

  useEffect(() => {
    if (products.length || !productId) return;

    let isMounted = true;

    const loadRelatedProducts = async () => {
      try {
        setIsLoadingRelated(true);
        setRelatedError("");

        const response = await aiService.similarProduct(productId);
        const payload = response?.data ?? response ?? {};
        const items = Array.isArray(payload.items)
          ? payload.items
          : Array.isArray(payload.data?.items)
            ? payload.data.items
            : Array.isArray(payload)
              ? payload
              : [];

        if (isMounted) {
          setRelatedProducts(items);
        }
      } catch (error) {
        if (isMounted) {
          setRelatedProducts([]);
          setRelatedError(getApiErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setIsLoadingRelated(false);
        }
      }
    };

    loadRelatedProducts();

    return () => {
      isMounted = false;
    };
  }, [productId, products.length]);

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
    <section
      ref={reveal.ref}
      className={`related-products related-products-reveal ${
        reveal.visible ? "is-visible" : ""
      }`}
    >
      <Title title="Related Products" />

      {isLoadingRelated && (
        <div className="related-products__state">
          Loading related products...
        </div>
      )}

      {!isLoadingRelated && relatedError && (
        <div className="related-products__state related-products__state--error">
          {relatedError}
        </div>
      )}

      {!isLoadingRelated &&
        !relatedError &&
        normalizedProducts.length === 0 && (
          <div className="related-products__state">
            No related products found.
          </div>
        )}

      <div className="related-products__grid">
        {normalizedProducts.map((product) => {
          const isWishlisted = wishlistIds.has(String(product.id));

          return (
            <Link
              key={product.id}
              to={`/product-detail/${product.id}`}
              className="related-card"
            >
              <div className="related-card__image">
                <img src={product.image} alt={product.name} />

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

                <div className="price">
                  {formatCurrencyVN(product.price)} VND
                </div>

                <div className="meta">
                  <span>{product.condition}</span>

                  <span className="dot"></span>

                  <span className="location">
                    <MapPin size={14} />
                    {product.location}
                  </span>
                </div>

                <span className="category">{product.categoryName}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
