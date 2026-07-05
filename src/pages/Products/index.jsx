import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import Card from "../../components/common/Card/index";
import { fetchProductsByCategory } from "../../redux/slice/productSlice";
import { Search } from "lucide-react";
import "./style.scss";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const { products, productFilter } = useSelector((state) => ({
    products: Array.isArray(state.products.products?.items)
      ? state.products.products.items
      : (state.products.products ?? []),
    productFilter: Array.isArray(state.products.productFilter?.items)
      ? state.products.productFilter.items
      : (state.products.productFilter ?? []),
  }));
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categoryFilter = searchParams.get("category");
  const effectiveCategoryFilter = categoryId || categoryFilter;

  useEffect(() => {
    if (categoryFilter) {
      dispatch(fetchProductsByCategory(categoryFilter));
    }
  }, [categoryFilter, dispatch]);

  const activeCategory = categoryFilter || categoryId;
  const sourceProducts = activeCategory ? productFilter : products;

  const handleCategoryChange = (id) => {
    if (id) {
      setSearchParams({ category: id });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = useMemo(() => {
    return sourceProducts.filter((product) => {
      const productName = product.name || "";
      const productPrice = Number(product.price || 0);

      const matchesKeyword = productName
        .toLowerCase()
        .includes(keyword.trim().toLowerCase());

      const matchesMin = minPrice === "" || productPrice >= Number(minPrice);

      const matchesMax = maxPrice === "" || productPrice <= Number(maxPrice);

      return matchesKeyword && matchesMin && matchesMax;
    });
  }, [sourceProducts, keyword, minPrice, maxPrice]);
  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="products-sidebar">
            <Filter
              categoryFilter={categoryFilter}
              onCategoryChange={handleCategoryChange}
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

            <div className="products-search">
              <Search size={20} className="search-icon" />

              <input
                data-testid="product-search-input"
                className="product-search-input"
                type="search"
                placeholder="Search products..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>

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
