import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../../../components/common/Title";
import "./style.scss";
import { categoriesService } from "../../../service/categoriesService";

export default function CategorySidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/products?category=${categoryId}`);
  };

  useEffect(() => {
    categoriesService.getCategories(dispatch);
  }, []);
  return (
    <section className="category-section">
      <Title title="Categories" />

      <h2 className="category-section__heading">Browse By Category</h2>

      <div className="category-section__list">
        {categories.map((category) => {
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
              onClick={() => handleSelectCategory(category.id)}
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
