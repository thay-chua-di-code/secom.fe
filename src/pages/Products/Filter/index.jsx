import { Filter as FilterIcon, MapPin, PackageSearch, Tags, Wallet } from "lucide-react";
import { useSelector } from "react-redux";

import { formatCurrencyVN, truncateText } from "../../../utils/fncUtils";

import "./style.scss";

const getFormattedPriceInput = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const normalized = String(value).replace(/[^\d]/g, "");

  if (!normalized) {
    return "";
  }

  return formatCurrencyVN(normalized);
};

const CONDITION_OPTIONS = [
  { value: "", label: "All conditions" },
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "refurbished", label: "Refurbished" },
];

export default function Filter({
  categoryFilter,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  condition,
  onConditionChange,
  location,
  onLocationChange,
  onClearAll,
}) {
  const { categories } = useSelector((state) => state.categories);

  return (
    <aside className="filter">
      <div className="filter__header">
        <div className="filter__header-icon">
          <FilterIcon size={17} />
        </div>

        <div>
          <span className="filter__eyebrow">PRODUCT FILTER</span>
          <h2>Filters</h2>
        </div>
      </div>

      <div className="filter__actions">
        <button type="button" className="filter__clear-all" onClick={onClearAll}>
          Clear all
        </button>
      </div>

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
              <span className="category-name">All categories</span>
            </label>
          </li>

          {(Array.isArray(categories?.items) ? categories.items : categories || []).map((category) => (
            <li key={category.id}>
              <label className={String(categoryFilter) === String(category.id) ? "active" : ""}>
                <input
                  type="radio"
                  name="category"
                  checked={String(categoryFilter) === String(category.id)}
                  onChange={() => onCategoryChange(category.id)}
                />
                <span className="radio" />
                <span className="category-name">{truncateText(category.name, 32)}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter__section filter__section--price">
        <div className="filter__title">
          <div className="filter__title-icon">
            <Wallet size={15} />
          </div>

          <div>
            <span>Price range</span>
            <small>Set your budget</small>
          </div>
        </div>

        <div className="filter__price-grid">
          <label>
            <span>Min</span>
            <input
              type="text"
              inputMode="numeric"
              value={getFormattedPriceInput(minPrice)}
              onChange={(event) => onMinPriceChange(event.target.value.replace(/[^\d]/g, ""))}
              placeholder="0"
            />
          </label>

          <label>
            <span>Max</span>
            <input
              type="text"
              inputMode="numeric"
              value={getFormattedPriceInput(maxPrice)}
              onChange={(event) => onMaxPriceChange(event.target.value.replace(/[^\d]/g, ""))}
              placeholder="25,000,000"
            />
          </label>
        </div>
      </div>

      <div className="filter__section">
        <div className="filter__title">
          <div className="filter__title-icon">
            <PackageSearch size={15} />
          </div>

          <div>
            <span>Condition</span>
            <small>Choose product status</small>
          </div>
        </div>

        <div className="filter__condition-list">
          {CONDITION_OPTIONS.map((option) => (
            <button
              key={option.value || 'all'}
              type="button"
              className={`filter__chip ${condition === option.value ? "is-active" : ""}`}
              onClick={() => onConditionChange(option.value || null)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter__section">
        <div className="filter__title">
          <div className="filter__title-icon">
            <MapPin size={15} />
          </div>

          <div>
            <span>Location</span>
            <small>Filter seller location</small>
          </div>
        </div>

        <div className="filter__location-field">
          <input
            type="text"
            value={location || ""}
            onChange={(event) => onLocationChange(event.target.value)}
            placeholder="Da Nang, Hanoi, Ho Chi Minh City"
          />
        </div>
      </div>
    </aside>
  );
}
