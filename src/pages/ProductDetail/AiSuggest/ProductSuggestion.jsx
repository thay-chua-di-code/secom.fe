import { Link } from "react-router-dom";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import "./style.scss";
import { aiService } from "../../../service/aiService";
import { useEffect, useState } from "react";
import { Eye, Heart, Star } from "lucide-react"; // Add Star icon
import Title from "../../../components/common/Title";

const ProductSuggestion = ({ productId }) => {
  const [products, setProducts] = useState([]);

  const handleGetProductAi = async () => {
    try {
      const res = await aiService.similarProduct(productId);
      setProducts(res.data.items || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProductAi();
  }, [productId]);

  return (
    <div className="ai-products">
      <Title title={"Recommended products"} />

      <div className="ai-products__list">
        {products.map((product) => (
          <div key={product.productId} className="ai-product-card-wrapper">
            <Link
              to={`/product-detail/${product.productId}`}
              className="ai-product-card"
            >
              {/* Image section and right-side action buttons */}
              <div className="ai-product-card__image-box">
                <img
                  src={
                    product.thumbnailUrl ||
                    "https://placehold.co/300x300?text=No+Image"
                  }
                  alt={product.productName}
                />

                {/* Floating action group at the top-right of the image */}
                <div
                  className="ai-product-card__actions"
                  onClick={(e) => e.preventDefault()}
                >
                  <button className="icon-btn" aria-label="Add to wishlist">
                    <Heart size={18} />
                  </button>
                  <button
                    className="icon-btn"
                    type="button"
                    aria-label="View detail"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Product information content section */}
              <div className="ai-product-card__content">
                <h5 className="title">{product.productName}</h5>

                {/* Area showing sale price and original price */}
                <div className="price-box">
                  <span className="current-price">
                    {formatCurrencyVN(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="old-price">
                      {formatCurrencyVN(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="rating-box">
                  <div className="stars">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        fill="#ffad33"
                        color="#ffad33"
                      />
                    ))}
                  </div>
                  <span className="review-count">
                    ({product.reviewCount || 65})
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestion;
