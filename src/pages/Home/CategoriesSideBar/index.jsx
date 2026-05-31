import { useState } from "react";
import { useSelector } from "react-redux";
import Title from "../../../components/common/Title";

import "./style.scss";

export default function CategorySidebar() {
  const { featuredCategories: categories = [] } = useSelector(
    (state) => state.home,
  );

  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section className="category-section">
      <Title title="Categories" />

      <h2 className="category-section__heading">Browse By Category</h2>

      <div className="category-section__list">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-card ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <div className="category-card__avatar">
              {category.name.charAt(0).toUpperCase()}
            </div>

            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
