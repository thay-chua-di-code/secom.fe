import { Link } from "react-router-dom";
import { Flame, Folder, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import "./style.scss";

export default function SearchDropdown({
  open,
  categories = [],
  keyword,
  onClose,
}) {
  const { productSearch } = useSelector((state) => state.products);
  console.log("productSearch: ", productSearch);
  if (!open) return null;

  return (
    <div className="search-dropdown">
      {!keyword.trim() && (
        <>
          <div className="dropdown-section">
            <h4>
              <Folder size={16} />
              Categories
            </h4>

            <div className="categories-grid">
              {categories.map((item) => (
                <Link
                  key={item.id}
                  to={`/products?category=${item.id}`}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="dropdown-section">
            <h4>
              <Flame size={16} />
              Trending
            </h4>

            <div className="trending-list">
              <button>Macbook M4</button>
              <button>iPhone 17</button>
              <button>RTX 5090</button>
              <button>Gaming Laptop</button>
            </div>
          </div>
        </>
      )}

      {!!keyword.trim() && (
        <div className="dropdown-section">
          <h4>Result</h4>

          {productSearch?.length ? (
            <div className="search-products">
              {productSearch?.map((item) => (
                <Link
                  key={item.id}
                  to={`/product-detail/${item.id}`}
                  className="product-item"
                  onClick={onClose}
                >
                  <img
                    src={
                      item.primaryImageUrl ||
                      "https://placehold.co/80x80?text=No+Image"
                    }
                    alt={item.name}
                  />

                  <div className="product-info">
                    <h5>{item.name}</h5>

                    <p>
                      <MapPin size={14} />
                      {item.location}
                    </p>

                    <span>{formatCurrencyVN(item.price)} ₫</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty">No suitable products found.</div>
          )}
        </div>
      )}
    </div>
  );
}
