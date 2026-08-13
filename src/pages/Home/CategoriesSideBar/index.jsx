import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { categoriesService } from "../../../service/categoriesService";
import { aiService } from "../../../service/aiService";
import Card from "../../../components/common/Card";

import "./style.scss";

export default function CategorySideBar() {
  const dispatch = useDispatch();
  const categoryListRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef(null);
  const handleCategoryScroll = (direction) => {
    if (!categoryListRef.current) return;

    const scrollAmount = 360;

    categoryListRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
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

      setProducts(res?.data?.items || []);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
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
      {/* =====================================
          HEADER
      ====================================== */}
      <div className="category-section__top">
        <div>
          <span className="category-section__eyebrow">AI SMART PICKS</span>

          <h3>Find what fits you</h3>

          <p>Choose a category and let AI discover products for you.</p>
        </div>

        <div className="category-section__ai-badge">
          <Sparkles size={14} />
          AI powered
        </div>
      </div>

      {/* =====================================
          CATEGORY HORIZONTAL SCROLL
      ====================================== */}
      <div className="category-section__category-area">
        <button
          type="button"
          className="category-section__scroll-btn category-section__scroll-btn--left"
          onClick={() => handleCategoryScroll("left")}
          aria-label="Previous categories"
        >
          <ArrowLeft size={17} />
        </button>

        <div ref={categoryListRef} className="category-section__list">
          {categories.map((category) => {
            const categoryName =
              category.name ||
              category.categoryName ||
              category.title ||
              "Category";

            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                className={`category-card ${
                  isActive ? "category-card--active" : ""
                }`}
                onClick={() => handleSelectCategory(category.id)}
              >
                <span className="category-card__icon">
                  {categoryName.charAt(0).toUpperCase()}
                </span>

                <span className="category-card__name">{categoryName}</span>

                <ArrowUpRight size={14} className="category-card__arrow" />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="category-section__scroll-btn category-section__scroll-btn--right"
          onClick={() => handleCategoryScroll("right")}
          aria-label="Next categories"
        >
          <ArrowRight size={17} />
        </button>
      </div>

      {/* =====================================
          AI RESULT
          LUÔN HIỂN THỊ
      ====================================== */}
      <div className="category-section__result" ref={resultRef}>
        <div className="category-section__result-header">
          <div>
            <span>AI RECOMMENDATIONS</span>

            <h3>Selected for you</h3>
          </div>

          <div className="category-section__result-icon">
            <WandSparkles size={18} />
          </div>
        </div>

        <div className="category-section__result-body">
          {/* CHƯA CHỌN CATEGORY */}
          {!activeCategory ? (
            <div className="category-section__state">
              <div className="category-section__state-icon">
                <Sparkles size={22} />
              </div>

              <strong>Select a category</strong>

              <p>
                Choose one of the categories above and AI will recommend
                matching products.
              </p>
            </div>
          ) : loading ? (
            /* LOADING */
            <div className="category-section__state">
              <span className="category-section__loader" />

              <strong>Finding products</strong>

              <p>AI is analyzing products in your selected category.</p>
            </div>
          ) : products.length > 0 ? (
            /* PRODUCTS */
            <div className="category-section__products">
              {products.map((item, index) => (
                <div
                  key={item.productId || item.id || index}
                  className="category-section__product"
                  style={{
                    "--product-index": index,
                  }}
                >
                  <Card item={item} />
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY RESULT */
            <div className="category-section__state">
              <div className="category-section__state-icon">
                <Sparkles size={22} />
              </div>

              <strong>No products found</strong>

              <p>
                AI could not find matching products for this category. Try
                another one.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
