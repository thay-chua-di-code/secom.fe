import { Filter as FilterIcon, Tags, Wallet } from "lucide-react";

import { useSelector } from "react-redux";

import { formatCurrencyVN, truncateText } from "../../../utils/fncUtils";

import "./style.scss";

const sanitizePriceInput = (value) => value.replace(/[^\d]/g, "");

const getFormattedPriceInput = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const normalized = sanitizePriceInput(String(value));

  if (!normalized) {
    return "";
  }

  return formatCurrencyVN(normalized);
};

export default function Filter({
  categoryFilter,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) {
  const { categories } = useSelector((state) => state.categories);

  return (
    <aside className="filter">
      {/* HEADER */}
      <div className="filter__header">
        <div className="filter__header-icon">
          <FilterIcon size={17} />
        </div>

        <div>
          <span className="filter__eyebrow">PRODUCT FILTER</span>

          <h2>Filters</h2>
        </div>
      </div>

      {/* CATEGORY */}
      <div className="filter__section">
        <div className="filter__title">
          <div className="filter__title-icon">
            <Tags size={15} />
          </div>

          <div>
            <span>Categories</span>
            <small>Browse by product type</small>
          </div>
        </div>

        <ul className="filter__categories">
          <li>
            <label className={!categoryFilter ? "active" : ""}>
              <input
                type="radio"
                name="category"
                checked={!categoryFilter}
                onChange={() => onCategoryChange(null)}
              />

              <span className="radio" />

              <span className="category-name">All Products</span>
            </label>
          </li>

          {categories.map((category) => (
            <li key={category.id}>
              <label className={categoryFilter === category.id ? "active" : ""}>
                <input
                  type="radio"
                  name="category"
                  checked={categoryFilter === category.id}
                  onChange={() => onCategoryChange(category.id)}
                />

                <span className="radio" />

                <span className="category-name">
                  {truncateText(category.name, 20)}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
      <div className="filter__section filter__section--price">
        <div className="filter__title">
          <div className="filter__title-icon">
            <Wallet size={15} />
          </div>

          <div>
            <span>Price Range</span>

            <small>Set your budget</small>
          </div>
        </div>

        <div className="price-range">
          <div className="price-range__field">
            <label>Minimum</label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Min Price"
              value={getFormattedPriceInput(minPrice)}
              onChange={(e) =>
                onMinPriceChange(sanitizePriceInput(e.target.value))
              }
            />
          </div>

          <div className="price-range__divider">
            <span />
          </div>

          <div className="price-range__field">
            <label>Maximum</label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Max Price"
              value={getFormattedPriceInput(maxPrice)}
              onChange={(e) =>
                onMaxPriceChange(sanitizePriceInput(e.target.value))
              }
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
