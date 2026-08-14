import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { categoriesService } from "../../../service/categoriesService";
import { aiService } from "../../../service/aiService";
import Card from "../../../components/common/Card";
import useCompare from "../../../hooks/useCompare";
import { ROUTES } from "../../../constants/routes";

import "./style.scss";

export default function CategorySideBar() {
  const dispatch = useDispatch();
  const categoryListRef = useRef(null);
  const resultRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { compareIds } = useCompare();

  const categories = useSelector((state) => {
    const items =
      state.categories.categories?.items ?? state.categories.categories;

    return Array.isArray(items) ? items : [];
  });

  const activeCategoryName = useMemo(() => {
    const active = categories.find(
      (category) => String(category.id) === String(activeCategory),
    );

    return active?.name || active?.categoryName || active?.title || "Selected";
  }, [activeCategory, categories]);

  useEffect(() => {
    categoriesService.getCategories(dispatch);
  }, [dispatch]);

  const handleCategoryScroll = (direction) => {
    if (!categoryListRef.current) return;

    categoryListRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleSelectCategory = async (categoryId) => {
    setActiveCategory(categoryId);
    setLoading(true);

    try {
      const res = await aiService.recommendByCategories(categoryId);
      const nextProducts = Array.isArray(res?.data?.items)
        ? res.data.items.slice(0, 4)
        : [];

      setProducts(nextProducts);

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
      <div className="category-section__top">
        <div>
          <span className="category-section__eyebrow">AI SMART PICKS</span>
          <h3>Find what fits you</h3>
          <p>Choose a category and let AI surface compact product picks fast.</p>
        </div>

        <div className="category-section__ai-badge">
          <Sparkles size={14} />
          AI powered
        </div>
      </div>

      <div className="category-section__category-toolbar">
        <p>Browse categories to get a focused shortlist.</p>
        <div className="category-section__scroll-actions">
          <button
            type="button"
            className="category-section__scroll-btn category-section__scroll-btn--left"
            onClick={() => handleCategoryScroll("left")}
            aria-label="Previous categories"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            className="category-section__scroll-btn category-section__scroll-btn--right"
            onClick={() => handleCategoryScroll("right")}
            aria-label="Next categories"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="category-section__category-area">
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
      </div>

      <div className="category-section__result" ref={resultRef}>
        <div className="category-section__result-header">
          <div>
            <span>AI RECOMMENDATIONS</span>
            <h3>Selected for you</h3>
            <p>
              {activeCategory
                ? `Showing quick picks for ${activeCategoryName}.`
                : "Pick a category to generate a shortlist."}
            </p>
          </div>

          <div className="category-section__result-icon">
            <WandSparkles size={18} />
          </div>
        </div>

        <div className="category-section__result-body">
          {!activeCategory ? (
            <div className="category-section__state category-section__state--rich">
              <div className="category-section__state-icon">
                <Sparkles size={22} />
              </div>
              <strong>Start with a category</strong>
              <p>
                Electronics, fashion, home or collectibles — AI will narrow
                the space and hand you a compact shortlist.
              </p>
              <div className="category-section__state-features">
                <span>Focused picks</span>
                <span>Compact cards</span>
                <span>Compare-ready</span>
              </div>
            </div>
          ) : loading ? (
            <div className="category-section__state">
              <div className="category-section__state-icon">
                <WandSparkles size={20} />
              </div>
              <strong>Generating recommendations</strong>
              <p>Finding the best matches for {activeCategoryName}.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="category-section__state category-section__state--rich">
              <div className="category-section__state-icon">
                <Search size={22} />
              </div>
              <strong>No recommendations yet</strong>
              <p>
                We could not find a strong AI shortlist for this category right
                now. Try another category or explore the marketplace directly.
              </p>
              <div className="category-section__state-actions">
                <Link to={ROUTES.PRODUCT.PRODUCTS}>Browse products</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="category-section__result-actions">
                <Link to={ROUTES.PRODUCT.PRODUCTS}>View all recommendations</Link>
                {compareIds.length > 0 ? <Link to={ROUTES.COMPARE}>Compare</Link> : null}
              </div>
              <div className="category-section__products">
                {products.map((item, index) => (
                  <div
                    key={item.id || item.productId || index}
                    className="category-section__product"
                    style={{ "--product-index": index }}
                  >
                    <Card item={item} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
