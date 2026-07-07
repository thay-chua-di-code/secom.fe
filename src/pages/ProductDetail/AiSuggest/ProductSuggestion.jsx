import { Link } from "react-router-dom";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import "./style.scss";
import { aiService } from "../../../service/aiService";
import { useEffect, useState } from "react";
import { Eye, Heart, Star } from "lucide-react"; // Bổ sung Star icon
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
              {/* Phần hình ảnh & Các nút tương tác góc phải */}
              <div className="ai-product-card__image-box">
                <img
                  src={
                    product.thumbnailUrl ||
                    "https://placehold.co/300x300?text=No+Image"
                  }
                  alt={product.productName}
                />

                {/* Cụm hành động bay trên góc phải ảnh */}
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

              {/* Phần nội dung thông tin sản phẩm */}
              <div className="ai-product-card__content">
                <h5 className="title">{product.productName}</h5>

                {/* Khu vực hiển thị giá bán lẻ và giá gốc */}
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
