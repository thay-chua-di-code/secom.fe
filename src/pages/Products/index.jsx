import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";

import Filter from "./Filter";
import Card from "../../components/common/Card/index";
import useCompare from "../../hooks/useCompare";

import { dicoveryService } from "../../service/dicoveryService";
import { ROUTES } from "../../constants/routes";
import { formatCurrencyVN } from "../../utils/fncUtils";

import "./style.scss";

// =====================================================
// CONSTANTS
// =====================================================

const DEFAULT_PAGE = 1;

// Desktop 4 card / row => 2 row / page
const PRODUCTS_PER_PAGE = 8;

const PAGE_WINDOW = 5;

// =====================================================
// HELPERS
// =====================================================

const toPositiveNumber = (value, fallback) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

// =====================================================
// NORMALIZE PRODUCT RESPONSE
// =====================================================

const normalizeProductItems = (response) => {
  const payload = response?.data?.data ?? response?.data ?? response ?? {};

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.products)) {
    return payload.products;
  }

  return [];
};

// =====================================================
// PAGINATION ITEMS
// =====================================================

const buildPaginationItems = (currentPage, totalPages) => {
  const safeTotalPages = Math.max(Number(totalPages) || 1, 1);

  const safeCurrentPage = Math.min(
    Math.max(Number(currentPage) || 1, 1),
    safeTotalPages,
  );

  if (safeTotalPages === 1) {
    return [1];
  }

  const pages = new Set([1, safeTotalPages]);

  const start = Math.max(1, safeCurrentPage - 1);

  const end = Math.min(safeTotalPages, safeCurrentPage + 1);

  for (let current = start; current <= end; current += 1) {
    pages.add(current);
  }

  if (safeCurrentPage <= PAGE_WINDOW) {
    for (
      let current = 1;
      current <= Math.min(safeTotalPages, PAGE_WINDOW);
      current += 1
    ) {
      pages.add(current);
    }
  }

  if (safeCurrentPage >= safeTotalPages - (PAGE_WINDOW - 1)) {
    for (
      let current = Math.max(1, safeTotalPages - (PAGE_WINDOW - 1));
      current <= safeTotalPages;
      current += 1
    ) {
      pages.add(current);
    }
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);

  const items = [];

  sortedPages.forEach((current, index) => {
    items.push(current);

    const nextPage = sortedPages[index + 1];

    if (nextPage && nextPage - current > 1) {
      items.push(`ellipsis-${current}`);
    }
  });

  return items;
};

// =====================================================
// CONDITION
// =====================================================

const formatConditionLabel = (value) => {
  if (!value) return null;

  if (value === "new") {
    return "New";
  }

  if (value === "used") {
    return "Used";
  }

  if (value === "refurbished") {
    return "Refurbished";
  }

  return value;
};

// =====================================================
// SORT
// =====================================================

const formatSortLabel = (value) => {
  switch (value) {
    case "price_asc":
      return "Lowest price";

    case "price_desc":
      return "Highest price";

    case "popular":
      return "Most popular";

    case "newest":
      return "Newest";

    default:
      return value || null;
  }
};

// =====================================================
// PRICE LABEL
// =====================================================

const formatIntentPrice = (minPrice, maxPrice) => {
  if (minPrice && maxPrice) {
    return `${formatCurrencyVN(minPrice)} - ${formatCurrencyVN(maxPrice)}`;
  }

  if (maxPrice) {
    return `Up to ${formatCurrencyVN(maxPrice)}`;
  }

  if (minPrice) {
    return `From ${formatCurrencyVN(minPrice)}`;
  }

  return null;
};

// =====================================================
// INTENT CHIPS
// =====================================================

const buildIntentChips = (intent) => {
  if (!intent?.filters) {
    return [];
  }

  const chips = [];

  const { filters } = intent;

  if (intent.categoryName || filters.categoryId) {
    chips.push({
      key: "category",
      label: "Category",
      value: intent.categoryName || "Selected",
    });
  }

  const priceLabel = formatIntentPrice(filters.minPrice, filters.maxPrice);

  if (priceLabel) {
    chips.push({
      key: "price",
      label: "Price",
      value: priceLabel,
    });
  }

  const conditionLabel = formatConditionLabel(filters.condition);

  if (conditionLabel) {
    chips.push({
      key: "condition",
      label: "Condition",
      value: conditionLabel,
    });
  }

  if (filters.location) {
    chips.push({
      key: "location",
      label: "Location",
      value: filters.location,
    });
  }

  const sortLabel = formatSortLabel(filters.sort);

  if (sortLabel && filters.sort && filters.sort !== "newest") {
    chips.push({
      key: "sort",
      label: "Sort",
      value: sortLabel,
    });
  }

  return chips;
};

// =====================================================
// PREFERENCE CHIPS
// =====================================================

const buildPreferenceChips = (intent) =>
  Array.isArray(intent?.useCase)
    ? intent.useCase.filter(Boolean).map((value) => ({
        key: `usecase-${value}`,
        label: "Use case",
        value,
      }))
    : [];

// =====================================================
// COMPONENT
// =====================================================

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ===================================================
  // FE CURRENT PAGE
  // ===================================================

  const page = toPositiveNumber(searchParams.get("page"), DEFAULT_PAGE);

  // ===================================================
  // FILTER VALUES
  // ===================================================

  const categoryFilter = searchParams.get("category") || "";

  const keyword = searchParams.get("search") || "";

  const minPrice = searchParams.get("minPrice") || "";

  const maxPrice = searchParams.get("maxPrice") || "";

  const condition = searchParams.get("condition") || "";

  const location = searchParams.get("location") || "";

  const sort = searchParams.get("sort") || "newest";

  // ===================================================
  // PRODUCT STATE
  // ===================================================

  const [allProducts, setAllProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ===================================================
  // SMART SEARCH
  // ===================================================

  const [smartQuery, setSmartQuery] = useState("");

  const [smartLoading, setSmartLoading] = useState(false);

  const [smartError, setSmartError] = useState("");

  const [parsedIntent, setParsedIntent] = useState(null);

  const [appliedIntent, setAppliedIntent] = useState(null);

  const listRef = useRef(null);

  const { compareIds } = useCompare();

  // ===================================================
  // ACTIVE FILTER CHECK
  // ===================================================

  const hasActiveFilters = Boolean(
    keyword ||
    categoryFilter ||
    minPrice ||
    maxPrice ||
    condition ||
    location ||
    (sort && sort !== "newest"),
  );

  // ===================================================
  // UPDATE URL
  // ===================================================

  const updateSearchParams = (
    updates,
    { resetPage = false, replace = false } = {},
  ) => {
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

    // Pagination được handle FE.
    // Không dùng pageSize trên API nữa.
    nextParams.delete("pageSize");

    setSearchParams(nextParams, { replace });
  };

  // ===================================================
  // FETCH PRODUCTS
  // ===================================================
  //
  // QUAN TRỌNG:
  // KHÔNG truyền page / pageSize.
  //
  // Click pagination không gọi API lại.
  // ===================================================

  useEffect(() => {
    const parsedMinPrice = minPrice !== "" ? Number(minPrice) : undefined;

    const parsedMaxPrice = maxPrice !== "" ? Number(maxPrice) : undefined;

    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          sort: sort || "newest",
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

        if (condition) {
          params.condition = condition;
        }

        if (location.trim()) {
          params.location = location.trim();
        }

        const response = await dicoveryService.getProductByKeyWord(params);

        if (!isMounted) {
          return;
        }

        const items = normalizeProductItems(response);

        setAllProducts(items);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setAllProducts([]);

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
  }, [categoryFilter, keyword, minPrice, maxPrice, condition, location, sort]);

  // ===================================================
  // TOTAL COUNT
  // ===================================================

  const totalCount = allProducts.length;

  // ===================================================
  // TOTAL PAGES
  // ===================================================

  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(totalCount / PRODUCTS_PER_PAGE), 1);
  }, [totalCount]);

  // ===================================================
  // CURRENT PAGE ITEMS
  // ===================================================

  const visibleProducts = useMemo(() => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    return allProducts.slice(startIndex, endIndex);
  }, [allProducts, page]);

  // ===================================================
  // PAGE SAFETY
  // ===================================================

  useEffect(() => {
    if (page > totalPages) {
      updateSearchParams(
        {
          page: totalPages,
        },
        {
          replace: true,
        },
      );
    }
  }, [page, totalPages]);

  // ===================================================
  // SCROLL ON PAGE CHANGE
  // ===================================================

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    listRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  // ===================================================
  // FILTER HANDLERS
  // ===================================================

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

  const handleConditionChange = (value) => {
    updateSearchParams(
      {
        condition: value || null,
      },
      {
        resetPage: true,
      },
    );
  };

  const handleLocationChange = (value) => {
    updateSearchParams(
      {
        location: value || null,
      },
      {
        resetPage: true,
      },
    );
  };

  // ===================================================
  // CLEAR ALL
  // ===================================================

  const handleClearAll = () => {
    const nextParams = new URLSearchParams();

    nextParams.set("page", String(DEFAULT_PAGE));

    setSearchParams(nextParams);

    setAppliedIntent(null);
    setParsedIntent(null);
    setSmartError("");
  };

  // ===================================================
  // APPLY SMART FILTER
  // ===================================================

  const applyIntentToFilters = (intent) => {
    if (!intent?.filters) {
      return;
    }

    updateSearchParams(
      {
        search: null,

        category: intent.filters.categoryId || null,

        minPrice: intent.filters.minPrice || null,

        maxPrice: intent.filters.maxPrice || null,

        condition: intent.filters.condition || null,

        location: intent.filters.location || null,

        sort:
          intent.filters.sort && intent.filters.sort !== "newest"
            ? intent.filters.sort
            : null,
      },
      {
        resetPage: true,
      },
    );

    setAppliedIntent(intent);
    setParsedIntent(intent);
  };

  // ===================================================
  // SMART SEARCH PARSE
  // ===================================================

  const handleParseSmartSearch = async () => {
    if (!smartQuery.trim()) {
      setSmartError("Please describe what you want to find.");

      setParsedIntent(null);

      return;
    }

    try {
      setSmartLoading(true);

      setSmartError("");

      const result = await dicoveryService.parseSearchIntent(smartQuery.trim());

      setParsedIntent(result);
    } catch (parseError) {
      setParsedIntent(null);

      setSmartError(
        parseError?.response?.data?.message ||
          parseError?.message ||
          "We couldn't understand the smart filters. Try using the text as a normal search.",
      );
    } finally {
      setSmartLoading(false);
    }
  };

  // ===================================================
  // USE SMART QUERY AS NORMAL SEARCH
  // ===================================================

  const handleUseAsKeywordSearch = () => {
    if (!smartQuery.trim()) {
      return;
    }

    updateSearchParams(
      {
        search: smartQuery.trim(),
      },
      {
        resetPage: true,
      },
    );

    setAppliedIntent(null);
  };

  // ===================================================
  // REMOVE FILTER
  // ===================================================

  const handleRemoveAppliedFilter = (key) => {
    const updates = {};

    if (key === "category") {
      updates.category = null;
    }

    if (key === "search") {
      updates.search = null;
    }

    if (key === "price") {
      updates.minPrice = null;
      updates.maxPrice = null;
    }

    if (key === "condition") {
      updates.condition = null;
    }

    if (key === "location") {
      updates.location = null;
    }

    if (key === "sort") {
      updates.sort = null;
    }

    updateSearchParams(updates, {
      resetPage: true,
    });

    if (appliedIntent?.filters) {
      const nextIntent = {
        ...appliedIntent,

        filters: {
          ...appliedIntent.filters,

          ...(key === "category"
            ? {
                categoryId: null,
              }
            : {}),

          ...(key === "price"
            ? {
                minPrice: null,
                maxPrice: null,
              }
            : {}),

          ...(key === "condition"
            ? {
                condition: null,
              }
            : {}),

          ...(key === "location"
            ? {
                location: null,
              }
            : {}),

          ...(key === "sort"
            ? {
                sort: "newest",
              }
            : {}),
        },

        ...(key === "category"
          ? {
              categoryName: null,
            }
          : {}),
      };

      setAppliedIntent(nextIntent);
    }
  };

  // ===================================================
  // PAGE CHANGE
  // ===================================================
  //
  // Chỉ thay URL.
  // KHÔNG CALL API.
  // ===================================================

  const handlePageChange = (nextPage) => {
    if (loading || nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    updateSearchParams({
      page: nextPage,
    });
  };

  // ===================================================
  // PAGINATION NUMBERS
  // ===================================================

  const paginationItems = useMemo(
    () => buildPaginationItems(page, totalPages),
    [page, totalPages],
  );

  // ===================================================
  // RESULT RANGE
  // ===================================================

  const resultStart = totalCount > 0 ? (page - 1) * PRODUCTS_PER_PAGE + 1 : 0;

  const resultEnd = Math.min(page * PRODUCTS_PER_PAGE, totalCount);

  // ===================================================
  // SMART CHIPS
  // ===================================================

  const parsedIntentChips = buildIntentChips(parsedIntent);

  const appliedIntentChips = buildIntentChips(appliedIntent);

  const parsedIntentPreferences = buildPreferenceChips(parsedIntent);

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          {/* SIDEBAR */}

          <aside className="products-sidebar">
            <Filter
              categoryFilter={categoryFilter}
              onCategoryChange={handleCategoryChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              condition={condition}
              onConditionChange={handleConditionChange}
              location={location}
              onLocationChange={handleLocationChange}
              onClearAll={handleClearAll}
            />
          </aside>

          {/* CONTENT */}

          <main ref={listRef} className="products-content">
            {/* HEADER */}

            <div className="products-header">
              <div>
                <span className="products-header__eyebrow">DISCOVER</span>

                <h2>All Products</h2>
              </div>

              <span>{totalCount} products</span>
            </div>

            {/* SMART SEARCH */}

            <div className="products-smart-search">
              <div className="products-smart-search__header">
                <div>
                  <span className="products-smart-search__eyebrow">
                    AI SMART SEARCH
                  </span>

                  <h3>Describe what you need</h3>

                  <p>
                    Natural language search becomes structured filters using the
                    existing product search engine.
                  </p>
                </div>

                <div className="products-smart-search__badge">
                  <Sparkles size={14} />
                  Structured filters
                </div>
              </div>

              <div className="products-smart-search__controls">
                <textarea
                  value={smartQuery}
                  onChange={(event) => setSmartQuery(event.target.value)}
                  placeholder="Laptop gaming dưới 25 triệu, RAM 16GB, ở Đà Nẵng, hàng mới..."
                />

                <div className="products-smart-search__actions">
                  <button
                    type="button"
                    className="products-smart-search__primary"
                    onClick={handleParseSmartSearch}
                    disabled={smartLoading}
                  >
                    <WandSparkles size={15} />

                    {smartLoading
                      ? "Understanding your search..."
                      : "Apply smart filters"}
                  </button>

                  <button
                    type="button"
                    className="products-smart-search__secondary"
                    onClick={handleUseAsKeywordSearch}
                    disabled={!smartQuery.trim() || smartLoading}
                  >
                    Use as normal search
                  </button>
                </div>
              </div>

              {smartError ? (
                <div className="products-smart-search__message products-smart-search__message--error">
                  {smartError}
                </div>
              ) : null}

              {parsedIntent ? (
                <div className="products-smart-search__result">
                  <div className="products-smart-search__result-head">
                    <div>
                      <strong>AI understood your request</strong>

                      <p>
                        Confidence{" "}
                        {Math.round((parsedIntent.confidence || 0) * 100)}%
                        {parsedIntent.usedFallbackParser
                          ? " • fallback parser"
                          : ""}
                      </p>
                    </div>

                    <div className="products-smart-search__result-actions">
                      <button
                        type="button"
                        onClick={() => applyIntentToFilters(parsedIntent)}
                      >
                        Apply filters
                      </button>

                      <button
                        type="button"
                        onClick={() => setParsedIntent(null)}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>

                  <div className="products-smart-search__chips">
                    {parsedIntentChips.length > 0 ? (
                      parsedIntentChips.map((chip) => (
                        <span
                          key={`${chip.key}-${chip.value}`}
                          className="products-smart-search__chip"
                        >
                          <small>{chip.label}</small>

                          <strong>{chip.value}</strong>
                        </span>
                      ))
                    ) : (
                      <span className="products-smart-search__empty-chip">
                        No structured filters were confidently extracted.
                      </span>
                    )}
                  </div>

                  {parsedIntentPreferences.length > 0 ? (
                    <div className="products-smart-search__notes">
                      <span>Other preferences</span>

                      <div>
                        {parsedIntentPreferences.map((chip) => (
                          <em key={chip.key}>{chip.value}</em>
                        ))}
                      </div>

                      <p>
                        These preferences were detected from your description,
                        but they are not applied as structured filters.
                      </p>
                    </div>
                  ) : null}

                  {parsedIntent.unmappedTerms?.length > 0 ? (
                    <div className="products-smart-search__notes">
                      <span>Also requested</span>

                      <div>
                        {parsedIntent.unmappedTerms.map((term) => (
                          <em key={term}>{term}</em>
                        ))}
                      </div>

                      <p>
                        These details are not applied as filters and may need
                        manual review.
                      </p>
                    </div>
                  ) : null}

                  {parsedIntent.validationWarnings?.length > 0 ? (
                    <div className="products-smart-search__notes">
                      <span>Validation notes</span>

                      <div>
                        {parsedIntent.validationWarnings.map((warning) => (
                          <em key={warning}>{warning}</em>
                        ))}
                      </div>

                      <p>
                        Unsupported values were ignored instead of being applied
                        as incorrect filters.
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            {/* APPLIED FILTER */}

            {appliedIntentChips.length > 0 ? (
              <div className="products-applied-intent">
                <div className="products-applied-intent__head">
                  <strong>Filters applied from your description</strong>

                  <button type="button" onClick={handleClearAll}>
                    Clear all
                  </button>
                </div>

                <div className="products-applied-intent__chips">
                  {appliedIntentChips.map((chip) => (
                    <button
                      key={`${chip.key}-${chip.value}`}
                      type="button"
                      className="products-applied-intent__chip"
                      onClick={() => handleRemoveAppliedFilter(chip.key)}
                    >
                      <small>{chip.label}</small>

                      <strong>{chip.value}</strong>

                      <X size={14} />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* SEARCH */}

            <div className="products-search">
              <Search size={20} className="search-icon" />

              <input
                data-testid="product-search-input"
                className="product-search-input"
                type="search"
                value={keyword}
                placeholder="Search by product name or description"
                onChange={handleKeywordChange}
              />
            </div>

            {/* STATE */}

            {error ? (
              <div data-testid="product-error-state" className="products-empty">
                {error}
              </div>
            ) : loading ? (
              <div className="products-loading">Loading products...</div>
            ) : totalCount === 0 ? (
              <div
                data-testid="product-empty-state"
                className="products-empty products-empty--rich"
              >
                <div>
                  <strong>No products match these filters.</strong>

                  <p>
                    Try increasing your budget, removing a location filter, or
                    broadening the keyword.
                  </p>

                  {hasActiveFilters ? (
                    <button type="button" onClick={handleClearAll}>
                      Clear filters
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                {/* RESULT INFO */}

                <div className="products-results-info">
                  <span>
                    Showing <strong>{resultStart}</strong>
                    {" – "}
                    <strong>{resultEnd}</strong>
                    {" of "}
                    <strong>{totalCount}</strong>
                  </span>

                  <span>
                    Page <strong>{page}</strong> of{" "}
                    <strong>{totalPages}</strong>
                  </span>
                </div>

                {/* PRODUCT GRID */}

                <div className="products-grid">
                  {visibleProducts.map((item) => (
                    <Card key={item.id || item.productId} item={item} />
                  ))}
                </div>

                {/* PAGINATION ALWAYS VISIBLE */}

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
                    title="Previous page"
                  >
                    <ChevronLeft size={16} />

                    <span>Previous</span>
                  </button>

                  {/* PAGE NUMBER */}

                  <div className="products-pagination__pages">
                    {paginationItems.length > 0 ? (
                      paginationItems.map((item) => {
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
                            disabled={loading || isActive}
                            aria-label={`Go to page ${item}`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {item}
                          </button>
                        );
                      })
                    ) : (
                      <button
                        type="button"
                        className="products-pagination__page is-active"
                        disabled
                      >
                        1
                      </button>
                    )}
                  </div>

                  {/* NEXT */}

                  <button
                    type="button"
                    className="products-pagination__btn"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages || loading}
                    aria-label="Next page"
                    title="Next page"
                  >
                    <span>Next</span>

                    <ChevronRight size={16} />
                  </button>
                </nav>
              </>
            )}
          </main>
        </div>

        {/* COMPARE */}

        {compareIds.length > 0 && (
          <Link to={ROUTES.COMPARE} className="compare-floating-btn">
            View Compare ({compareIds.length})
          </Link>
        )}
      </div>
    </div>
  );
}
