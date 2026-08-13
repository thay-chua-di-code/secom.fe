import { ArrowUpRight, Flame, Folder, MapPin, Search } from "lucide-react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { formatCurrencyVN } from "../../../utils/fncUtils";

import "./style.scss";

const TRENDING = ["MacBook M4", "iPhone 17", "RTX 5090", "Gaming Laptop"];

export default function SearchDropdown({
  open,
  categories = [],
  keyword = "",
  onClose,
  onSelectKeyword,
}) {
  const { productSearch } = useSelector((state) => state.products);

  if (!open) return null;

  const hasKeyword = Boolean(keyword.trim());

  return (
    <div className="search-dropdown">
      {!hasKeyword ? (
        <div className="search-dropdown__discover">
          {/* CATEGORIES */}

          <section className="search-dropdown__section">
            <div className="search-dropdown__section-title">
              <div>
                <Folder size={14} />

                <span>CATEGORIES</span>
              </div>

              <Link to="/products" onClick={onClose}>
                Browse all
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="search-dropdown__categories">
              {categories.length > 0 ? (
                categories.map((item) => (
                  <Link
                    key={item.id}
                    to={`/products?category=${item.id}`}
                    onClick={onClose}
                  >
                    <span>{item.name?.charAt(0).toUpperCase()}</span>

                    {item.name}
                  </Link>
                ))
              ) : (
                <p className="search-dropdown__hint">
                  No categories available.
                </p>
              )}
            </div>
          </section>

          {/* TRENDING */}

          <section className="search-dropdown__section">
            <div className="search-dropdown__section-title">
              <div>
                <Flame size={14} />

                <span>TRENDING</span>
              </div>
            </div>

            <div className="search-dropdown__trending">
              {TRENDING.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectKeyword?.(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <section className="search-dropdown__section">
          <div className="search-dropdown__section-title">
            <div>
              <Search size={14} />

              <span>SEARCH RESULTS</span>
            </div>

            {productSearch?.length > 0 && (
              <span className="search-dropdown__result-count">
                {productSearch.length} found
              </span>
            )}
          </div>

          {productSearch?.length ? (
            <div className="search-dropdown__products">
              {productSearch.map((item) => (
                <Link
                  key={item.id || item.productId}
                  to={`/product-detail/${item.id || item.productId}`}
                  className="search-product"
                  onClick={onClose}
                >
                  <div className="search-product__image">
                    <img
                      src={
                        item.primaryImageUrl ||
                        "https://placehold.co/100x100?text=No+Image"
                      }
                      alt={item.name}
                    />
                  </div>

                  <div className="search-product__info">
                    <h5>{item.name}</h5>

                    {item.location && (
                      <p>
                        <MapPin size={12} />
                        {item.location}
                      </p>
                    )}

                    <strong>{formatCurrencyVN(item.price)}</strong>
                  </div>

                  <ArrowUpRight size={16} className="search-product__arrow" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="search-dropdown__empty">
              <div>
                <Search size={20} />
              </div>

              <strong>No products found</strong>

              <p>Try another product, category or keyword.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
