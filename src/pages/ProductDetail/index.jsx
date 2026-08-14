import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Heart, MapPin, Minus, Plus, ShoppingBag, Store } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import shipIcon from "../../assets/icons/icon-ship.png";
import returnIcon from "../../assets/icons/icon-return.png";

import Button from "../../components/common/Button/Button";

import ProductReview from "./Review";
import SellerShow from "./SellerShow";
import RelatedProducts from "./RelatedProduct";
import ProductSuggestion from "./AiSuggest/ProductSuggestion";

import {
  addCartItem,
  updateCartItemQuantity,
} from "../../redux/slice/cartSlice";

import {
  addWishlistThunk,
  deleteWishlistThunk,
} from "../../redux/slice/userSlice";

import { fetchProductDetailThunk } from "../../redux/slice/productSlice";

import { formatCurrencyVN } from "../../utils/fncUtils";

import "./style.scss";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Something went wrong. Please try again.";

function ProductDetailSkeleton() {
  return (
    <main className="product-detail-page">
      <div className="product-detail product-detail--loading">
        <div className="product-detail__gallery">
          <div className="thumbnail-list">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="product-detail-skeleton product-detail-skeleton--thumbnail"
              />
            ))}
          </div>

          <div className="main-image">
            <div className="product-detail-skeleton product-detail-skeleton--main-image" />
          </div>
        </div>

        <div className="product-detail__info">
          <div className="product-detail-skeleton product-detail-skeleton--eyebrow" />

          <div className="product-detail-skeleton product-detail-skeleton--title" />
          <div className="product-detail-skeleton product-detail-skeleton--title-short" />

          <div className="product-detail-skeleton product-detail-skeleton--rating" />

          <div className="product-detail-skeleton product-detail-skeleton--price" />

          <div className="product-detail-skeleton product-detail-skeleton--description" />
          <div className="product-detail-skeleton product-detail-skeleton--description-short" />

          <div className="product-detail-skeleton product-detail-skeleton--option" />
          <div className="product-detail-skeleton product-detail-skeleton--option" />

          <div className="product-detail-skeleton product-detail-skeleton--purchase" />
        </div>
      </div>
    </main>
  );
}

function ProductNotFound() {
  return (
    <main className="product-detail-page">
      <div className="product-detail-state">
        <div className="product-detail-state__icon">
          <ShoppingBag size={26} />
        </div>

        <span>PRODUCT UNAVAILABLE</span>

        <h1>Product not found</h1>

        <p>
          The product you are looking for does not exist or is currently
          unavailable.
        </p>
      </div>
    </main>
  );
}

export default function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const wishlist = useSelector((state) => {
    const items = state.user.wishlist?.items ?? state.user.wishlist;

    return Array.isArray(items) ? items : [];
  });

  const cartItems = useSelector((state) => {
    const items = state.cart.items;

    return Array.isArray(items) ? items : [];
  });

  const { productDetail, loading } = useSelector((state) => state.products);

  const [selectedImage, setSelectedImage] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const productId = productDetail?.id || productDetail?.productId;

  const images = useMemo(
    () => (Array.isArray(productDetail?.images) ? productDetail.images : []),
    [productDetail],
  );

  const activeImage = useMemo(() => {
    if (!images.length) {
      return null;
    }

    const clickedImage = images.find(
      (image) => String(image.id) === String(selectedImage?.id),
    );

    return clickedImage || images.find((item) => item.isPrimary) || images[0];
  }, [images, selectedImage]);

  const isWishlisted = useMemo(
    () =>
      !!productId &&
      wishlist.some(
        (wishlistItem) =>
          String(wishlistItem.productId) === String(productId) ||
          String(wishlistItem.id) === String(productId) ||
          String(wishlistItem.product?.id) === String(productId),
      ),
    [productId, wishlist],
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetailThunk(id));
    }

    setSelectedImage(null);
    setQuantity(1);
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetail?.name) {
      document.title = `${productDetail.name} | SECOM`;
    }
  }, [productDetail]);

  const requireLogin = () => {
    if (isAuthenticated) {
      return true;
    }

    toast.error("Please login to use wishlist");

    navigate("/login");

    return false;
  };

  const handleAddToCart = async () => {
    if (!productId) {
      toast.error("Product not found");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId,
          quantity,
        }),
      ).unwrap();

      toast.success("Added to cart");
    } catch (cartError) {
      toast.error(getApiErrorMessage(cartError));
    }
  };

  const handleBuyNow = async () => {
    if (!productId) {
      toast.error("Product not found");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const existingItem = cartItems.find(
        (item) => String(item.productId) === String(productId),
      );

      if (existingItem) {
        await dispatch(
          updateCartItemQuantity({
            cartItemId: existingItem.cartItemId,
            quantity: existingItem.quantity + quantity,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addCartItem({
            productId,
            quantity,
          }),
        ).unwrap();
      }

      navigate("/cart", {
        state: {
          autoSelectProductId: productId,
        },
      });
    } catch {
      toast.error("Cannot buy product");
    }
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

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!productDetail) {
    return <ProductNotFound />;
  }

  return (
    <main className="product-detail-page">
      <div className="product-detail" data-testid="product-detail">
        {/* =================================================
            GALLERY
        ================================================= */}

        <div className="product-detail__gallery">
          <div className="thumbnail-list">
            {images.map((img, index) => (
              <button
                type="button"
                key={img?.id || `${img?.imageUrl}-${index}`}
                className={`thumbnail ${
                  activeImage?.id === img?.id ? "active" : ""
                }`}
                onClick={() => setSelectedImage(img)}
                aria-label={`View product image ${index + 1}`}
              >
                <img
                  src={img?.imageUrl}
                  alt={productDetail.name || "Product"}
                />
              </button>
            ))}
          </div>

          <div className="main-image" data-testid="product-detail-image">
            {activeImage ? (
              <img
                src={activeImage?.imageUrl}
                alt={productDetail?.name || "Product"}
              />
            ) : (
              <div className="main-image__empty">
                <ShoppingBag size={28} />

                <span>No image available</span>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            INFO
        ================================================= */}

        <div className="product-detail__info">
          <span className="product-detail__eyebrow">PRODUCT DETAILS</span>

          <h1 data-testid="product-detail-name">{productDetail.name}</h1>

          <div className="rating">
            <div className="stars">★★★★☆</div>

            <span>{productDetail.category?.name || "Uncategorized"}</span>

            <div className="divider" />

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

          {/* =================================================
              PRODUCT META
          ================================================= */}

          <div className="product-detail__meta">
            <div className="option-group">
              <div className="option-group__icon">
                <MapPin size={17} />
              </div>

              <div>
                <span>Location</span>

                <strong>{productDetail.location || "Not specified"}</strong>
              </div>
            </div>

            <div className="option-group">
              <div className="option-group__icon">
                <Store size={17} />
              </div>

              <div>
                <span>Seller</span>

                <strong>
                  {productDetail.seller?.fullName || "Unknown seller"}
                </strong>
              </div>
            </div>
          </div>

          {/* =================================================
              PURCHASE
          ================================================= */}

          <div className="purchase">
            <div className="quantity">
              <Button
                type="button"
                onClick={handleDecreaseQuantity}
                className="decrease-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </Button>

              <span>{quantity}</span>

              <Button
                type="button"
                onClick={handleIncreaseQuantity}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </Button>
            </div>

            <button
              type="button"
              data-testid="buy-now-btn"
              className="buy-btn buy-btn--primary"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            <button
              type="button"
              data-testid="add-to-cart-btn"
              className="buy-btn buy-btn--secondary"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>

            <button
              type="button"
              data-testid="wishlist-btn"
              className={`wishlist ${isWishlisted ? "active" : ""}`}
              onClick={handleToggleWishlist}
              disabled={wishlistLoading}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart size={19} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* =================================================
              DELIVERY
          ================================================= */}

          <div className="delivery-box">
            <div className="delivery-item">
              <div className="icon">
                <img src={shipIcon} alt="" />
              </div>

              <div>
                <h4>Free Delivery</h4>

                <p>Enter your postal code for delivery availability.</p>
              </div>
            </div>

            <div className="delivery-item">
              <div className="icon">
                <img src={returnIcon} alt="" />
              </div>

              <div>
                <h4>Return Delivery</h4>

                <p>Free 30-day delivery returns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SELLER + REVIEW
      ===================================================== */}

      <div className="product-detail-feature">
        <SellerShow seller={productDetail.seller} />

        <ProductReview productId={productDetail.id} />
      </div>

      {/* =====================================================
          AI SUGGESTION
      ===================================================== */}

      <div className="product-detail-related-section">
        <ProductSuggestion productId={id} />
      </div>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      <div className="product-detail-related-section">
        <RelatedProducts
          productId={id}
          products={productDetail.relatedProducts || []}
        />
      </div>
    </main>
  );
}
