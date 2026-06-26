import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../components/common/Title";
import { categoriesService } from "../../../service/categoriesService";
import "./style.scss";

export default function CategorySidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      await categoriesService.getCategories(dispatch);
    };

    fetchCategories();
  }, [dispatch]);
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
