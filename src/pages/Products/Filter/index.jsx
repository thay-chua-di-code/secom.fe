import { Filter as FilterIcon, Tags, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import "./style.scss";
import { formatCurrencyVN, truncateText } from "../../../utils/fncUtils";

const sanitizePriceInput = (value) => value.replace(/[^\d]/g, "");

const getFormattedPriceInput = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const normalized = sanitizePriceInput(String(value));
  if (!normalized) return "";
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
      <div className="filter__header">
        <FilterIcon size={20} />
        <h2>Filters</h2>
      </div>

      <div className="filter__section">
        <div className="filter__title">
          <Tags size={18} />
          <span>Categories</span>
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
              <span className="radio"></span>
              All Products
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

                <span className="radio"></span>

                {truncateText(category.name, 20)}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter__section">
        <div className="filter__title">
          <Wallet size={18} />
          <span>Price Range</span>
        </div>

        <div className="price-range">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Min Price"
            value={getFormattedPriceInput(minPrice)}
            onChange={(e) => onMinPriceChange(sanitizePriceInput(e.target.value))}
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="Max Price"
            value={getFormattedPriceInput(maxPrice)}
            onChange={(e) => onMaxPriceChange(sanitizePriceInput(e.target.value))}
          />
        </div>
      </div>
    </aside>
  );
}
