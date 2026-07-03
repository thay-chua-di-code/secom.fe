import "./style.scss";
import { useSelector } from "react-redux";
const categories = ["Laptop", "Keyboard", "Mouse", "Headphone"];

export default function Filter({
  categoryFilter,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) {
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);
  return (
    <div className="filter">
      <h3>Categories</h3>

      <ul data-testid="category-filter">
        {categories.map((category) => (
          <li key={category.id}>
            <label>
              <input
                type="radio"
                value={category.id}
                checked={categoryFilter === category.id}
                onChange={(e) => onCategoryChange(e.target.value)}
              />
              {category.name}
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
