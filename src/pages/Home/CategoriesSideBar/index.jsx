import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../components/common/Title";
import { categoriesService } from "../../../service/categoriesService";
import { aiService } from "../../../service/aiService";
import "./style.scss";
import Card from "../../../components/common/Card/index";

export default function CategorySideBar() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const categories = useSelector((state) => {
    const items =
      state.categories.categories?.items ?? state.categories.categories;

    return Array.isArray(items) ? items : [];
  });

  useEffect(() => {
    categoriesService.getCategories(dispatch);
  }, [dispatch]);

  const handleSelectCategory = async (categoryId) => {
    setActiveCategory(categoryId);
    setLoading(true);

    try {
      const res = await aiService.recommendByCategories(categoryId);
      setProducts(res.data.items || []);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="category-section">
      <Title title="Categories" />

      <h2 className="category-section__heading">AI Recommend</h2>

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

      {activeCategory && (
        <div className="category-section__result" ref={resultRef}>
          <div className="category-section__header">
            <h2>🤖 AI Recommended Products</h2>

            <p>Products recommended specifically for your selected category.</p>
          </div>

          {loading ? (
            <div className="loading">AI is finding the best products...</div>
          ) : products.length > 0 ? (
            <div className="category-section__products">
              {products.map((item) => (
                <Card key={item.productId} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty">No recommended products found.</div>
          )}
        </div>
      )}
    </section>
  );
}
