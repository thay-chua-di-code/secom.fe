import { useState } from "react";
import { useSelector } from "react-redux";
import Title from "../../../components/common/Title";
import "./style.scss";

export default function CategorySidebar() {
  const { featuredCategories, loading, error } = useSelector(
    (state) => state.home,
  );

  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section className="category-section">
      <Title title="Categories" />

      <h2 className="category-section__heading">Browse By Category</h2>

      <div className="category-section__list">
        {loading && <p>Loading categories...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && featuredCategories.length === 0 && (
          <p>No categories found</p>
        )}

        {!loading &&
          !error &&
          featuredCategories.map((category) => {
            const categoryName =
              category.name ||
              category.categoryName ||
              category.title ||
              "Category";

            return (
              <button
                key={category.id}
                className={`category-card ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="category-card__avatar">
                  {categoryName.charAt(0).toUpperCase()}
                </div>

                <span>{categoryName}</span>
              </button>
            );
          })}
      </div>
    </section>
  );
}
