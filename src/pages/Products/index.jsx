import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import Filter from "./Filter";
import Card from "../../components/common/Card/index";
import CompareModal from "../../components/common/CompareModal";
import useCompare from "../../hooks/useCompare";
import { dicoveryService } from "../../service/dicoveryService";
import "./style.scss";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const PAGE_WINDOW = 5;

const toPositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const buildPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 1) return [1].filter((page) => page <= totalPages);

  const pages = new Set([1, totalPages]);
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.add(page);
  }

  if (currentPage <= PAGE_WINDOW) {
    for (let page = 1; page <= Math.min(totalPages, PAGE_WINDOW); page += 1) {
      pages.add(page);
    }
  }

  if (currentPage >= totalPages - (PAGE_WINDOW - 1)) {
    for (let page = Math.max(1, totalPages - (PAGE_WINDOW - 1)); page <= totalPages; page += 1) {
      pages.add(page);
    }
  }

  const sortedPages = Array.from(pages).sort((left, right) => left - right);
  const items = [];

  sortedPages.forEach((page, index) => {
    items.push(page);
    const nextPage = sortedPages[index + 1];
    if (nextPage && nextPage - page > 1) {
      items.push(`ellipsis-${page}`);
    }
  });

  return items;
};

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = toPositiveNumber(searchParams.get("page"), DEFAULT_PAGE);
  const pageSize = toPositiveNumber(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE);
  const categoryFilter = searchParams.get("category") || "";
  const keyword = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const [productsState, setProductsState] = useState({
    items: [],
    pageNumber: page,
    pageSize,
    totalCount: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openCompare, setOpenCompare] = useState(false);
  const listRef = useRef(null);
  const { compareIds, remove, clear } = useCompare();
  const categories = useSelector((state) => state.categories.categories || []);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          pageSize,
          sort: "newest",
        };

        if (keyword.trim()) params.keyword = keyword.trim();
        if (minPrice !== "") params.minPrice = Number(minPrice);
        if (maxPrice !== "") params.maxPrice = Number(maxPrice);

        const response = categoryFilter
          ? await dicoveryService.getProductByCategory(categoryFilter, params)
          : await dicoveryService.getProductByKeyWord(params);

        if (!isMounted) return;

        setProductsState({
          items: Array.isArray(response.items) ? response.items : [],
          pageNumber: response.pageNumber || page,
          pageSize: response.pageSize || pageSize,
          totalCount: response.totalCount || 0,
          totalPages: response.totalPages || 0,
        });
      } catch (loadError) {
        if (!isMounted) return;
        setProductsState({
          items: [],
          pageNumber: page,
          pageSize,
          totalCount: 0,
          totalPages: 0,
        });
        setError(
          loadError?.response?.data?.message ||
            loadError?.message ||
            "Unable to load products.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryFilter, keyword, minPrice, maxPrice, page, pageSize]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page]);

  const updateSearchParams = (updates, { resetPage = false } = {}) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    if (resetPage) {
      nextParams.set("page", String(DEFAULT_PAGE));
    }

    if (!nextParams.get("page")) {
      nextParams.set("page", String(DEFAULT_PAGE));
    }

    if (!nextParams.get("pageSize")) {
      nextParams.set("pageSize", String(pageSize));
    }

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (id) => {
    updateSearchParams({ category: id || null }, { resetPage: true });
  };

  const handleKeywordChange = (event) => {
    updateSearchParams({ search: event.target.value || null }, { resetPage: true });
  };

  const handleMinPriceChange = (value) => {
    updateSearchParams({ minPrice: value || null }, { resetPage: true });
  };

  const handleMaxPriceChange = (value) => {
    updateSearchParams({ maxPrice: value || null }, { resetPage: true });
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > Math.max(productsState.totalPages, 1) || nextPage === page) {
      return;
    }

    updateSearchParams({ page: nextPage });
  };

  const compareProducts = useMemo(
    () =>
      productsState.items.filter((product) =>
        compareIds.includes(String(product.id || product.productId)),
      ),
    [compareIds, productsState.items],
  );

  const paginationItems = useMemo(
    () => buildPaginationItems(page, Math.max(productsState.totalPages, 1)),
    [page, productsState.totalPages],
  );

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
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
            />
          </aside>

          <main className="products-content" ref={listRef}>
            <div className="products-header">
              <h2>All Products</h2>
              <span>{productsState.totalCount} products</span>
            </div>

            <div className="products-search">
              <Search size={20} className="search-icon" />

              <input
                data-testid="product-search-input"
                className="product-search-input"
                type="search"
                placeholder="Search products..."
                value={keyword}
                onChange={handleKeywordChange}
              />
            </div>

            {error ? (
              <div data-testid="product-empty-state" className="products-empty">
                {error}
              </div>
            ) : loading ? (
              <div className="products-loading">Loading products...</div>
            ) : productsState.items.length === 0 ? (
              <div data-testid="product-empty-state" className="products-empty">
                No products found.
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {productsState.items.map((item) => (
                    <Card key={item.id || item.productId} item={item} />
                  ))}
                </div>

                {productsState.totalPages > 1 && (
                  <div className="products-pagination" aria-label="Products pagination">
                    <button
                      type="button"
                      className="products-pagination__btn"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page <= 1}
                    >
                      Previous
                    </button>

                    <div className="products-pagination__pages">
                      {paginationItems.map((item) => {
                        if (typeof item !== "number") {
                          return (
                            <span key={item} className="products-pagination__ellipsis">
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            key={item}
                            type="button"
                            className={`products-pagination__page${item === page ? " is-active" : ""}`}
                            onClick={() => handlePageChange(item)}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="products-pagination__btn"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= productsState.totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>

        {compareIds.length > 0 && (
          <button className="compare-floating-btn" onClick={() => setOpenCompare(true)}>
            Compare ({compareIds.length})
          </button>
        )}

        <CompareModal
          open={openCompare}
          products={compareProducts}
          onClose={() => setOpenCompare(false)}
          onRemove={remove}
          onClear={clear}
        />
      </div>
    </div>
  );
}
