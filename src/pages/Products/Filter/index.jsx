import { useParams } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
export default function Filter({
  categoryFilter,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) {
  const { categories } = useSelector((state) => state.categories);
  const products = useSelector(
    (state) => state.products.products?.items ?? state.products.products,
  );
  const selectedCategory = categoryFilter;

  return (
    <div className="filter">
      <h3>Categories</h3>

      <ul data-testid="category-filter">
        {categories.map((category) => (
          <li key={category.id}>
            <label>
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={categoryFilter === category.id}
                onChange={() => onCategoryChange(category.id)}
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
              checked={!categoryFilter}
              onChange={() => onCategoryChange(null)}
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
