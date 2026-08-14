import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import Filter from "./Filter";
import Card from "../../components/common/Card/index";
import CompareModal from "../../components/common/CompareModal";

import useCompare from "../../hooks/useCompare";

import { dicoveryService } from "../../service/dicoveryService";

import "./style.scss";

/* =========================================================
   CONSTANTS
========================================================= */

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const PAGE_WINDOW = 5;

/* =========================================================
   HELPERS
========================================================= */

const toPositiveNumber = (value, fallback) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

/*
  Hỗ trợ nhiều response shape:

  response.items
  response.data.items
  response.data.data.items

  Đồng thời fallback tự tính totalPages nếu BE
  chỉ trả totalCount + pageSize.
*/
const normalizeProductResponse = (response, fallbackPage, fallbackPageSize) => {
  const payload = response?.data?.data ?? response?.data ?? response ?? {};

  const items = Array.isArray(payload?.items)
    ? payload.items
    : Array.isArray(payload?.products)
      ? payload.products
      : Array.isArray(payload)
        ? payload
        : [];

  const pageNumber = toPositiveNumber(
    payload?.pageNumber ?? payload?.page ?? payload?.currentPage,
    fallbackPage,
  );

  const pageSize = toPositiveNumber(
    payload?.pageSize ?? payload?.limit ?? fallbackPageSize,
    fallbackPageSize,
  );

  const totalCount = Number(
    payload?.totalCount ??
      payload?.totalItems ??
      payload?.total ??
      payload?.count ??
      items.length,
  );

  let totalPages = Number(payload?.totalPages ?? payload?.pageCount ?? 0);

  if (
    (!Number.isFinite(totalPages) || totalPages <= 0) &&
    Number.isFinite(totalCount) &&
    totalCount > 0
  ) {
    totalPages = Math.ceil(totalCount / pageSize);
  }

  return {
    items,

    pageNumber,

    pageSize,

    totalCount: Number.isFinite(totalCount) ? totalCount : 0,

    totalPages: Number.isFinite(totalPages) ? totalPages : 0,
  };
};

/* =========================================================
   PAGINATION ITEMS

   Ví dụ:

   page 1 / 10
   1 2 3 4 5 ... 10

   page 6 / 10
   1 ... 5 6 7 ... 10

   page 10 / 10
   1 ... 6 7 8 9 10
========================================================= */

const buildPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages === 1) {
    return [1];
  }

  const pages = new Set([1, totalPages]);

  const start = Math.max(1, currentPage - 1);

  const end = Math.min(totalPages, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.add(page);
  }

  /*
    Đầu danh sách:
    1 2 3 4 5 ...
  */
  if (currentPage <= PAGE_WINDOW) {
    for (let page = 1; page <= Math.min(totalPages, PAGE_WINDOW); page += 1) {
      pages.add(page);
    }
  }

  /*
    Cuối danh sách:
    ... 6 7 8 9 10
  */
  if (currentPage >= totalPages - (PAGE_WINDOW - 1)) {
    for (
      let page = Math.max(1, totalPages - (PAGE_WINDOW - 1));
      page <= totalPages;
      page += 1
    ) {
      pages.add(page);
    }
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);

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

/* =========================================================
   COMPONENT
========================================================= */

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* =====================================================
     URL PARAMS
  ===================================================== */

  const page = toPositiveNumber(searchParams.get("page"), DEFAULT_PAGE);

  const pageSize = toPositiveNumber(
    searchParams.get("pageSize"),
    DEFAULT_PAGE_SIZE,
  );

  const categoryFilter = searchParams.get("category") || "";

  const keyword = searchParams.get("search") || "";

  const minPrice = searchParams.get("minPrice") || "";

  const maxPrice = searchParams.get("maxPrice") || "";

  /* =====================================================
     STATE
  ===================================================== */

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

  /* =====================================================
     COMPARE
  ===================================================== */

  const { compareIds, remove, clear } = useCompare();

  /* =====================================================
     SEARCH PARAM HELPER
  ===================================================== */

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

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

  useEffect(() => {
    const parsedMinPrice = minPrice !== "" ? Number(minPrice) : undefined;

    const parsedMaxPrice = maxPrice !== "" ? Number(maxPrice) : undefined;

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

        if (keyword.trim()) {
          params.keyword = keyword.trim();
        }

        if (categoryFilter) {
          params.categoryId = categoryFilter;
        }

        if (Number.isFinite(parsedMinPrice)) {
          params.minPrice = parsedMinPrice;
        }

        if (Number.isFinite(parsedMaxPrice)) {
          params.maxPrice = parsedMaxPrice;
        }

        const response = await dicoveryService.getProductByKeyWord(params);

        if (!isMounted) {
          return;
        }

        const normalized = normalizeProductResponse(response, page, pageSize);

        /*
            Ví dụ:
            URL = page 8
            filter mới chỉ còn 3 pages

            => tự đưa về page 3
          */
        if (normalized.totalPages > 0 && page > normalized.totalPages) {
          const nextParams = new URLSearchParams(searchParams);

          nextParams.set("page", String(normalized.totalPages));

          setSearchParams(nextParams, {
            replace: true,
          });

          return;
        }

        setProductsState(normalized);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setProductsState({
          items: [],

          pageNumber: page,

          pageSize,

          totalCount: 0,

          totalPages: 0,
        });

        setError(
          loadError?.response?.data?.message ||
            loadError?.response?.data?.error ||
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

  /* =====================================================
     SCROLL TO PRODUCTS AFTER PAGE CHANGE
  ===================================================== */

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    listRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  /* =====================================================
     FILTER HANDLERS
  ===================================================== */

  const handleCategoryChange = (id) => {
    updateSearchParams(
      {
        category: id || null,
      },
      {
        resetPage: true,
      },
    );
  };

  const handleKeywordChange = (event) => {
    updateSearchParams(
      {
        search: event.target.value || null,
      },
      {
        resetPage: true,
      },
    );
  };

  const handleMinPriceChange = (value) => {
    updateSearchParams(
      {
        minPrice: value || null,
      },
      {
        resetPage: true,
      },
    );
  };

  const handleMaxPriceChange = (value) => {
    updateSearchParams(
      {
        maxPrice: value || null,
      },
      {
        resetPage: true,
      },
    );
  };

  /* =====================================================
     PAGINATION
  ===================================================== */

  const handlePageChange = (nextPage) => {
    const totalPages = productsState.totalPages;

    if (loading || nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    updateSearchParams({
      page: nextPage,
    });
  };

  const paginationItems = useMemo(
    () => buildPaginationItems(page, productsState.totalPages),
    [page, productsState.totalPages],
  );

  /* =====================================================
     COMPARE PRODUCTS
  ===================================================== */

  const compareProducts = useMemo(
    () =>
      productsState.items.filter((product) =>
        compareIds.includes(String(product.id || product.productId)),
      ),
    [compareIds, productsState.items],
  );

  /* =====================================================
     RESULT RANGE

     20 items/page
     page 2:
     21 - 40 of 115
  ===================================================== */

  const resultStart =
    productsState.totalCount > 0 ? (page - 1) * productsState.pageSize + 1 : 0;

  const resultEnd = Math.min(
    page * productsState.pageSize,
    productsState.totalCount,
  );

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          {/* =================================================
              FILTER
          ================================================= */}

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

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <main ref={listRef} className="products-content">
            {/* =============================================
                HEADER
            ============================================= */}

            <div className="products-header">
              <div>
                <span className="products-header__eyebrow">DISCOVER</span>

                <h2>All Products</h2>
              </div>

              <span>{productsState.totalCount} products</span>
            </div>

            {/* =============================================
                SEARCH
            ============================================= */}

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

            {/* =============================================
                ERROR
            ============================================= */}

            {error ? (
              <div data-testid="product-empty-state" className="products-empty">
                {error}
              </div>
            ) : loading ? (
              /* ===========================================
                 LOADING
              =========================================== */

              <div className="products-loading">Loading products...</div>
            ) : productsState.items.length === 0 ? (
              /* ===========================================
                 EMPTY
              =========================================== */

              <div data-testid="product-empty-state" className="products-empty">
                No products found.
              </div>
            ) : (
              <>
                {/* =========================================
                    RESULT INFORMATION
                ========================================= */}

                <div className="products-results-info">
                  <span>
                    Showing <strong>{resultStart}</strong>
                    {" – "}
                    <strong>{resultEnd}</strong> of{" "}
                    <strong>{productsState.totalCount}</strong>
                  </span>

                  {productsState.totalPages > 1 && (
                    <span>
                      Page <strong>{page}</strong> of{" "}
                      <strong>{productsState.totalPages}</strong>
                    </span>
                  )}
                </div>

                {/* =========================================
                    GRID
                ========================================= */}

                <div className="products-grid">
                  {productsState.items.map((item) => (
                    <Card key={item.id || item.productId} item={item} />
                  ))}
                </div>

                {/* =========================================
                    PAGINATION
                ========================================= */}

                {productsState.totalPages > 1 && (
                  <nav
                    className="products-pagination"
                    aria-label="Products pagination"
                  >
                    {/* PREVIOUS */}

                    <button
                      type="button"
                      className="products-pagination__btn"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page <= 1 || loading}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={14} />

                      <span>Previous</span>
                    </button>

                    {/* PAGES */}

                    <div className="products-pagination__pages">
                      {paginationItems.map((item) => {
                        if (typeof item !== "number") {
                          return (
                            <span
                              key={item}
                              className="products-pagination__ellipsis"
                              aria-hidden="true"
                            >
                              •••
                            </span>
                          );
                        }

                        const isActive = item === page;

                        return (
                          <button
                            key={item}
                            type="button"
                            className={`products-pagination__page ${
                              isActive ? "is-active" : ""
                            }`}
                            onClick={() => handlePageChange(item)}
                            disabled={loading}
                            aria-label={`Go to page ${item}`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>

                    {/* NEXT */}

                    <button
                      type="button"
                      className="products-pagination__btn"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= productsState.totalPages || loading}
                      aria-label="Next page"
                    >
                      <span>Next</span>

                      <ChevronRight size={14} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>

        {/* =================================================
            FLOATING COMPARE
        ================================================= */}

        {compareIds.length > 0 && (
          <button
            type="button"
            className="compare-floating-btn"
            onClick={() => setOpenCompare(true)}
          >
            Compare ({compareIds.length})
          </button>
        )}

        {/* =================================================
            COMPARE MODAL
        ================================================= */}

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
