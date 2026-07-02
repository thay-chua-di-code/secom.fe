import { Link } from "react-router-dom";
import { Flame, Folder } from "lucide-react";

import "./style.scss";

export default function SearchDropdown({
  open,
  categories = [],
  keyword,
  products = [],
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="search-dropdown">
      {!keyword && (
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
              <button>Iphone 17</button>
              <button>RTX 5090</button>
              <button>Gaming Laptop</button>
            </div>
          </div>
        </>
      )}

      {!!keyword && (
        <div className="dropdown-section">
          <h4>Products</h4>

          {products.length ? (
            products.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                onClick={onClose}
                className="product-item"
              >
                <img src={item.thumbnail} alt="" />

                <div>
                  <h5>{item.name}</h5>

                  <span>${item.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="empty">Không tìm thấy sản phẩm</div>
          )}
        </div>
      )}
    </div>
  );
}
