import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import Card from "../../components/common/Card/index";
import { mockProducts } from "../../utils/temporary";
import { fetchProductsByCategory } from "../../redux/slice/productSlice";
import "./style.scss";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const products = useSelector((state) => {
    const items = state.products.products?.items ?? state.products.products;

    return Array.isArray(items) ? items : [];
  });
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const effectiveCategoryFilter = categoryId || categoryFilter;

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  const sourceProducts = categoryId && products.length ? products : mockProducts;

  const filteredProducts = useMemo(() => {
    return (sourceProducts ?? []).filter((product) => {
      const productName = product.name || product.title || "";
      const productPrice = Number(product.price || 0);
      const productCategory = String(
        product.categoryId || product.categoryName || product.category || "",
      ).toLowerCase();

      const matchesKeyword = productName
        .toLowerCase()
        .includes(keyword.trim().toLowerCase());
      const matchesMin = minPrice === "" || productPrice >= Number(minPrice);
      const matchesMax = maxPrice === "" || productPrice <= Number(maxPrice);
      const matchesCategory =
        !effectiveCategoryFilter ||
        productCategory === String(effectiveCategoryFilter).toLowerCase() ||
        String(product.id) === String(effectiveCategoryFilter);

      return matchesKeyword && matchesMin && matchesMax && matchesCategory;
    });
  }, [effectiveCategoryFilter, keyword, maxPrice, minPrice, sourceProducts]);

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="products-sidebar">
            <Filter
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
            />
          </aside>

          <main className="products-content">
            <div className="products-header">
              <h2>All Products</h2>
              <span>{filteredProducts.length} products</span>
            </div>

            <input
              data-testid="product-search-input"
              className="product-search-input"
              type="search"
              placeholder="Search products..."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />

            {filteredProducts.length === 0 ? (
              <div data-testid="product-empty-state" className="products-empty">
                No products found.
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((item) => (
                  <Card key={item.id || item.productId} item={item} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
