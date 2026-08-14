import { Clock3, ArrowRight, Eye, Search, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import "./style.scss";
import { userService } from "../../../service/userService";
import { ROUTES } from "../../../constants/routes";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-US").format(price);
}

function formatViewedTime(date) {
  const viewedDate = new Date(date);
  const now = new Date();
  const diffInMinutes = Math.floor((now - viewedDate) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  return `${diffInDays} days ago`;
}

function RecentlyViewed() {
  const dispatch = useDispatch();
  const { viewedProduct, loading } = useSelector((state) => state.user);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    userService.getViewedProductSvc(dispatch);
  }, [dispatch]);

  const items = useMemo(
    () => (Array.isArray(viewedProduct) ? viewedProduct.slice(0, 5) : []),
    [viewedProduct],
  );

  const handleClearAll = async () => {
    try {
      setIsClearing(true);
      await userService.clearAllViewedProductSvc(dispatch);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <section className="recently-viewed">
      <div className="recently-viewed__header">
        <div className="recently-viewed__title">
          <div className="recently-viewed__icon">
            <Clock3 size={20} />
          </div>

          <div>
            <h2>Recent Activity</h2>
            <p>Your latest viewed products, ready to revisit</p>
          </div>
        </div>

        <div className="recently-viewed__actions">
          {items.length > 0 ? (
            <button
              type="button"
              className="recently-viewed__clear"
              onClick={handleClearAll}
              disabled={isClearing}
            >
              <Trash2 size={15} />
              {isClearing ? "Clearing..." : "Clear all"}
            </button>
          ) : null}

          <Link to={ROUTES.PRODUCT.PRODUCTS} className="recently-viewed__view-all">
            View all
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="recently-viewed__list recently-viewed__list--compact">
        {loading ? (
          <div className="recently-viewed__loading">
            <div className="recently-viewed__spinner" />
            <span>Loading recently viewed...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="recently-viewed__empty">
            <Clock3 size={22} />
            <strong>No recent activity yet</strong>
            <p>
              Start browsing products and your recently viewed list will appear
              here for faster follow-up.
            </p>
            <Link to={ROUTES.PRODUCT.PRODUCTS} className="recently-viewed__empty-link">
              <Search size={14} />
              Browse products
            </Link>
          </div>
        ) : (
          items.map((product) => (
            <Link
              key={product.productId}
              to={`/product-detail/${product.productId}`}
              className="recent-product recent-product--compact"
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
              </div>

              <div className="recent-product__content">
                <div className="recent-product__meta">
                  <span className="recent-product__viewed">
                    <Eye size={12} />
                    Viewed {formatViewedTime(product.viewedAtUtc)}
                  </span>
                </div>
                <h3>{product.name}</h3>
                <strong>{formatCurrency(product.price)}₫</strong>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentlyViewed;
