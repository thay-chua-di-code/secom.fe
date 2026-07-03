import "./style.scss";

const categories = ["Laptop", "Keyboard", "Mouse", "Headphone"];

export default function Filter({
  categoryFilter,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) {
  return (
    <div className="filter">
      <h3>Categories</h3>

      <ul data-testid="category-filter">
        {categories.map((category) => (
          <li key={category}>
            <label>
              <input
                type="radio"
                name="category"
                value={category}
                checked={categoryFilter === category}
                onChange={(event) => onCategoryChange(event.target.value)}
              />
              {category}
            </label>
          </li>
        ))}
        <li>
          <label>
            <input
              type="radio"
              name="category"
              value=""
              checked={!categoryFilter}
              onChange={() => onCategoryChange("")}
            />
            All
          </label>
        </li>
      </ul>

      <h3>Price Range</h3>

      <div className="price-range">
        <input
          data-testid="price-min-input"
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
        />
        <input
          data-testid="price-max-input"
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
        />
      </div>
    </div>
  );
}
