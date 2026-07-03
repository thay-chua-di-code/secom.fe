import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import shipIcon from "../../assets/icons/icon-ship.png";
import returnIcon from "../../assets/icons/icon-return.png";
import Button from "../../components/common/Button/Button";
import "./style.scss";
import ProductReview from "./Review";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrencyVN } from "../../utils/fncUtils";
import SellerShow from "./SellerShow";
import RelatedProducts from "./RelatedProduct";
import { addCartItem } from "../../redux/slice/cartSlice";
import {
  addWishlistThunk,
  deleteWishlistThunk,
} from "../../redux/slice/userSlice";
import { fetchProductDetailThunk } from "../../redux/slice/productSlice";
import productApi from "../../api/productApi";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Something went wrong. Please try again.";

const unwrapProductDetail = (response) =>
  response?.data?.data ?? response?.data ?? response;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const wishlist = useSelector((state) => {
    const items = state.user.wishlist?.items ?? state.user.wishlist;

    return Array.isArray(items) ? items : [];
  });
  const [productDetail, setProductDetail] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const productId = productDetail?.id;
  const images = useMemo(() => productDetail?.images ?? [], [productDetail]);
  const isWishlisted = useMemo(
    () =>
      !!productId &&
      (wishlist ?? []).some(
        (wishlistItem) =>
          String(wishlistItem.productId) === String(productId) ||
          String(wishlistItem.id) === String(productId) ||
          String(wishlistItem.product?.id) === String(productId),
      ),
    [productId, wishlist],
  );

  useEffect(() => {
    let ignore = false;

    async function fetchProductDetail() {
      if (!id) {
        setProductDetail(null);
        setError("Product not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await productApi.getProductDetail(id);
        await dispatch(fetchProductDetailThunk(id));
        const product = unwrapProductDetail(response);

        if (!ignore) {
          setProductDetail(product || null);
        }
      } catch (fetchError) {
        if (!ignore) {
          setProductDetail(null);
          setError(getApiErrorMessage(fetchError));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchProductDetail();

    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    queueMicrotask(() => setSelectedImage(images[0] || ""));
  }, [images]);

  const requireLogin = () => {
    if (isAuthenticated) {
      return true;
    }

    toast.error("Please login to use wishlist");
    navigate("/login");
    return false;
  };

  const handleAddToCart = () => {
    if (!productId) {
      toast.error("Product not found");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(addCartItem({ productId, quantity }));
  };

  const handleToggleWishlist = async () => {
    if (!productId) {
      toast.error("Product not found");
      return;
    }

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
    } catch (wishlistError) {
      toast.error(getApiErrorMessage(wishlistError));
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail" data-testid="product-detail">
        <div className="product-detail__info">
          <h1>Loading product...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail" data-testid="product-detail">
        <div className="product-detail__info">
          <h1>Load product failed</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div className="product-detail" data-testid="product-detail">
        <div className="product-detail__info">
          <h1>Product not found</h1>
          <p>
            The product you are looking for does not exist or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product-detail" data-testid="product-detail">
        <div className="product-detail__gallery">
          <div className="thumbnail-list">
            {images.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={productDetail.name || "Product"} />
              </div>
            ))}
          </div>

          <div className="main-image" data-testid="product-detail-image">
            {selectedImage ? (
              <img src={selectedImage} alt={productDetail.name || "Product"} />
            ) : (
              <span>No image available</span>
            )}
          </div>
        </div>

        <div className="product-detail__info">
          <h1 data-testid="product-detail-name">{productDetail.name}</h1>

          <div className="rating">
            <div className="stars">★★★★☆</div>
            <span>{productDetail.category?.name || "Uncategorized"}</span>
            <div className="divider"></div>
            <span className="stock">
              {productDetail.condition || "Available"}
            </span>
          </div>

          <div className="price" data-testid="product-detail-price">
            {formatCurrencyVN(productDetail?.price ?? 0)}
          </div>

          <p className="description" data-testid="product-detail-description">
            {productDetail.description || "No description available."}
          </p>

          <div className="option-group">
            <span>Location:</span>
            <strong>{productDetail.location || "Not specified"}</strong>
          </div>

          <div className="option-group">
            <span>Seller:</span>
            <strong>
              {productDetail.seller?.fullName || "Unknown seller"}
            </strong>
          </div>

          <div className="purchase">
            <div className="quantity">
              <Button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>

              <span>{quantity}</span>

              <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
            </div>

            <button data-testid="buy-now-btn" className="buy-btn">
              Buy Now
            </button>

            <button
              data-testid="add-to-cart-btn"
              className="buy-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              data-testid="wishlist-btn"
              className={`wishlist ${isWishlisted ? "active" : ""}`}
              onClick={handleToggleWishlist}
              disabled={wishlistLoading}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {isWishlisted ? "♥" : "♡"}
            </button>
          </div>

          <div className="delivery-box">
            <div className="delivery-item">
              <div className="icon">
                <img src={shipIcon} alt="Free delivery" />
              </div>

              <div>
                <h4>Free Delivery</h4>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>

            <div className="delivery-item">
              <div className="icon">
                <img src={returnIcon} alt="Return delivery" />
              </div>

              <div>
                <h4>Return Delivery</h4>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail-feature">
        <SellerShow seller={productDetail.seller} />
        <ProductReview productId={productDetail.id} />
      </div>
      <RelatedProducts products={productDetail.relatedProducts} />
    </>
  );
}
