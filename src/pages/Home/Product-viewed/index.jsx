import { Clock3, ArrowRight, Eye, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
import { userService } from "../../../service/userService";
import { useEffect, useState } from "react";

function formatCurrency(price) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

function formatViewedTime(date) {
  const viewedDate = new Date(date);
  const now = new Date();

  const diffInMinutes = Math.floor((now - viewedDate) / (1000 * 60));

  if (diffInMinutes < 1) {
    return "Just now";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 1) {
    return "Yesterday";
  }

  return `${diffInDays} days ago`;
}

function RecentlyViewed() {
  const dispatch = useDispatch();
  const { viewedProduct, loading } = useSelector((state) => state.user);
  const [isClearing, setIsClearing] = useState(false);
  const handleGetViewedProduct = () => {
    const result = userService.getViewedProductSvc(dispatch);

    return result;
  };

  const handleClearAll = () => {
    userService.clearAllViewedProductSvc(dispatch);
  };
  useEffect(() => {
    handleGetViewedProduct();
  }, [dispatch]);
  return (
    <section className="recently-viewed">
      <div className="recently-viewed__header">
        <div className="recently-viewed__title">
          <div className="recently-viewed__icon">
            <Clock3 size={20} />
          </div>

          <div>
            <h2>Recently Viewed</h2>
            <p>Pick up where you left off</p>
          </div>
        </div>

        <div className="recently-viewed__actions">
          <button
            type="button"
            className="recently-viewed__clear"
            onClick={handleClearAll}
            disabled={isClearing}
          >
            <Trash2 size={15} />

            {isClearing ? "Clearing..." : "Clear all"}
          </button>

          <Link to="/products" className="recently-viewed__view-all">
            View all
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="recently-viewed__list">
        {loading ? (
          <div className="recently-viewed__loading">
            <div className="recently-viewed__spinner" />
            <span>Loading recently viewed...</span>
          </div>
        ) : (
          viewedProduct?.map((product) => (
            <Link
              key={product.productId}
              to={`/product-detail/${product.productId}`}
              className="recent-product"
            >
              <div className="recent-product__image-wrapper">
                {product.primaryImageUrl ? (
                  <img
                    src={product.primaryImageUrl}
                    alt={product.name}
                    className="recent-product__image"
                  />
                ) : (
                  <div className="recent-product__placeholder">No image</div>
                )}

                <span className="recent-product__viewed">
                  <Eye size={12} />
                  Viewed
                </span>
              </div>

              <div className="recent-product__content">
                <h3>{product.name}</h3>

                <strong>{formatCurrency(product.price)}₫</strong>

                <span className="recent-product__time">
                  {formatViewedTime(product.viewedAtUtc)}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentlyViewed;
