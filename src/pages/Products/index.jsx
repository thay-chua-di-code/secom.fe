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

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const PAGE_WINDOW = 5;

const toPositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

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

const buildPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const pages = new Set([1, totalPages]);
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  for (let current = start; current <= end; current += 1) {
    pages.add(current);
  }

  if (currentPage <= PAGE_WINDOW) {
    for (let current = 1; current <= Math.min(totalPages, PAGE_WINDOW); current += 1) {
      pages.add(current);
    }
  }

  if (currentPage >= totalPages - (PAGE_WINDOW - 1)) {
    for (
      let current = Math.max(1, totalPages - (PAGE_WINDOW - 1));
      current <= totalPages;
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

const formatConditionLabel = (value) => {
  if (!value) return null;
  if (value === "new") return "New";
  if (value === "used") return "Used";
  if (value === "refurbished") return "Refurbished";
  return value;
};

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

const formatIntentPrice = (minPrice, maxPrice) => {
  if (minPrice && maxPrice) {
    return `${formatCurrencyVN(minPrice)} - ${formatCurrencyVN(maxPrice)}₫`;
  }
  if (maxPrice) {
    return `Up to ${formatCurrencyVN(maxPrice)}₫`;
  }
  if (minPrice) {
    return `From ${formatCurrencyVN(minPrice)}₫`;
  }
  return null;
};

const buildIntentChips = (intent) => {
  if (!intent?.filters) return [];

  const chips = [];
  const { filters } = intent;

  if (intent.categoryName || filters.categoryId) {
    chips.push({ key: "category", label: "Category", value: intent.categoryName || "Selected" });
  }

  const priceLabel = formatIntentPrice(filters.minPrice, filters.maxPrice);
  if (priceLabel) {
    chips.push({ key: "price", label: "Price", value: priceLabel });
  }

  const conditionLabel = formatConditionLabel(filters.condition);
  if (conditionLabel) {
    chips.push({ key: "condition", label: "Condition", value: conditionLabel });
  }

  if (filters.location) {
    chips.push({ key: "location", label: "Location", value: filters.location });
  }

  const sortLabel = formatSortLabel(filters.sort);
  if (sortLabel && filters.sort && filters.sort !== "newest") {
    chips.push({ key: "sort", label: "Sort", value: sortLabel });
  }

  return chips;
};

const buildPreferenceChips = (intent) =>
  Array.isArray(intent?.useCase)
    ? intent.useCase
        .filter(Boolean)
        .map((value) => ({ key: `usecase-${value}`, label: "Use case", value }))
    : [];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = toPositiveNumber(searchParams.get("page"), DEFAULT_PAGE);
  const pageSize = toPositiveNumber(
    searchParams.get("pageSize"),
    DEFAULT_PAGE_SIZE,
  );
  const categoryFilter = searchParams.get("category") || "";
  const keyword = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const condition = searchParams.get("condition") || "";
  const location = searchParams.get("location") || "";
  const sort = searchParams.get("sort") || "newest";

  const [productsState, setProductsState] = useState({
    items: [],
    pageNumber: page,
    pageSize,
    totalCount: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [smartQuery, setSmartQuery] = useState("");
  const [smartLoading, setSmartLoading] = useState(false);
  const [smartError, setSmartError] = useState("");
  const [parsedIntent, setParsedIntent] = useState(null);
  const [appliedIntent, setAppliedIntent] = useState(null);

  const listRef = useRef(null);
  const { compareIds } = useCompare();

  const hasActiveFilters = Boolean(
    keyword || categoryFilter || minPrice || maxPrice || condition || location || (sort && sort !== "newest"),
  );

  const updateSearchParams = (updates, { resetPage = false, replace = false } = {}) => {
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

    setSearchParams(nextParams, { replace });
  };

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
          sort: sort || "newest",
        };

        if (keyword.trim()) params.keyword = keyword.trim();
        if (categoryFilter) params.categoryId = categoryFilter;
        if (Number.isFinite(parsedMinPrice)) params.minPrice = parsedMinPrice;
        if (Number.isFinite(parsedMaxPrice)) params.maxPrice = parsedMaxPrice;
        if (condition) params.condition = condition;
        if (location.trim()) params.location = location.trim();

        const response = await dicoveryService.getProductByKeyWord(params);
        if (!isMounted) return;

        const normalized = normalizeProductResponse(response, page, pageSize);
        if (normalized.totalPages > 0 && page > normalized.totalPages) {
          const nextParams = new URLSearchParams(searchParams);
          nextParams.set("page", String(normalized.totalPages));
          setSearchParams(nextParams, { replace: true });
          return;
        }

        setProductsState(normalized);
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
  }, [categoryFilter, keyword, minPrice, maxPrice, condition, location, sort, page, pageSize, searchParams, setSearchParams]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

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

  const handleConditionChange = (value) => {
    updateSearchParams({ condition: value || null }, { resetPage: true });
  };

  const handleLocationChange = (value) => {
    updateSearchParams({ location: value || null }, { resetPage: true });
  };

  const handleClearAll = () => {
    const nextParams = new URLSearchParams();
    nextParams.set("page", String(DEFAULT_PAGE));
    nextParams.set("pageSize", String(pageSize));
    setSearchParams(nextParams);
    setAppliedIntent(null);
    setParsedIntent(null);
    setSmartError("");
  };

  const applyIntentToFilters = (intent) => {
    if (!intent?.filters) return;

    updateSearchParams(
      {
        search: null,
        category: intent.filters.categoryId || null,
        minPrice: intent.filters.minPrice || null,
        maxPrice: intent.filters.maxPrice || null,
        condition: intent.filters.condition || null,
        location: intent.filters.location || null,
        sort: intent.filters.sort && intent.filters.sort !== "newest" ? intent.filters.sort : null,
      },
      { resetPage: true },
    );

    setAppliedIntent(intent);
    setParsedIntent(intent);
  };

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

  const handleUseAsKeywordSearch = () => {
    if (!smartQuery.trim()) return;
    updateSearchParams({ search: smartQuery.trim() }, { resetPage: true });
    setAppliedIntent(null);
  };

  const handleRemoveAppliedFilter = (key) => {
    const updates = {};

    if (key === "category") updates.category = null;
    if (key === "search") updates.search = null;
    if (key === "price") {
      updates.minPrice = null;
      updates.maxPrice = null;
    }
    if (key === "condition") updates.condition = null;
    if (key === "location") updates.location = null;
    if (key === "sort") updates.sort = null;

    updateSearchParams(updates, { resetPage: true });

    if (appliedIntent?.filters) {
      const nextIntent = {
        ...appliedIntent,
        filters: {
          ...appliedIntent.filters,
          ...(key === "category" ? { categoryId: null } : {}),
          ...(key === "price" ? { minPrice: null, maxPrice: null } : {}),
          ...(key === "condition" ? { condition: null } : {}),
          ...(key === "location" ? { location: null } : {}),
          ...(key === "sort" ? { sort: "newest" } : {}),
        },
        ...(key === "category" ? { categoryName: null } : {}),
      };
      setAppliedIntent(nextIntent);
    }
  };

  const handlePageChange = (nextPage) => {
    const totalPages = productsState.totalPages;
    if (loading || nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }
    updateSearchParams({ page: nextPage });
  };

  const paginationItems = useMemo(
    () => buildPaginationItems(page, productsState.totalPages),
    [page, productsState.totalPages],
  );

  const resultStart =
    productsState.totalCount > 0 ? (page - 1) * productsState.pageSize + 1 : 0;
  const resultEnd = Math.min(
    page * productsState.pageSize,
    productsState.totalCount,
  );

  const parsedIntentChips = buildIntentChips(parsedIntent);
  const appliedIntentChips = buildIntentChips(appliedIntent);
  const parsedIntentPreferences = buildPreferenceChips(parsedIntent);

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
              condition={condition}
              onConditionChange={handleConditionChange}
              location={location}
              onLocationChange={handleLocationChange}
              onClearAll={handleClearAll}
            />
          </aside>

          <main ref={listRef} className="products-content">
            <div className="products-header">
              <div>
                <span className="products-header__eyebrow">DISCOVER</span>
                <h2>All Products</h2>
              </div>
              <span>{productsState.totalCount} products</span>
            </div>

            <div className="products-smart-search">
              <div className="products-smart-search__header">
                <div>
                  <span className="products-smart-search__eyebrow">AI SMART SEARCH</span>
                  <h3>Describe what you need</h3>
                  <p>Natural language search becomes structured filters using the existing product search engine.</p>
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
                    {smartLoading ? "Understanding your search..." : "Apply smart filters"}
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
                        Confidence {Math.round((parsedIntent.confidence || 0) * 100)}%
                        {parsedIntent.usedFallbackParser ? " • fallback parser" : ""}
                      </p>
                    </div>
                    <div className="products-smart-search__result-actions">
                      <button type="button" onClick={() => applyIntentToFilters(parsedIntent)}>
                        Apply filters
                      </button>
                      <button type="button" onClick={() => setParsedIntent(null)}>
                        Dismiss
                      </button>
                    </div>
                  </div>

                  <div className="products-smart-search__chips">
                    {parsedIntentChips.length > 0 ? (
                      parsedIntentChips.map((chip) => (
                        <span key={`${chip.key}-${chip.value}`} className="products-smart-search__chip">
                          <small>{chip.label}</small>
                          <strong>{chip.value}</strong>
                        </span>
                      ))
                    ) : (
                      <span className="products-smart-search__empty-chip">No structured filters were confidently extracted.</span>
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
                  <p>These preferences were detected from your description, but they are not applied as structured filters.</p>
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
                      <p>These details are not applied as filters and may need manual review.</p>
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
                      <p>Unsupported values were ignored instead of being applied as incorrect filters.</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            {appliedIntentChips.length > 0 ? (
              <div className="products-applied-intent">
                <div className="products-applied-intent__head">
                  <strong>Filters applied from your description</strong>
                  <button type="button" onClick={handleClearAll}>Clear all</button>
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

            {error ? (
              <div data-testid="product-error-state" className="products-empty">
                {error}
              </div>
            ) : loading ? (
              <div className="products-loading">Loading products...</div>
            ) : productsState.items.length === 0 ? (
              <div data-testid="product-empty-state" className="products-empty products-empty--rich">
                <div>
                  <strong>No products match these filters.</strong>
                  <p>Try increasing your budget, removing a location filter, or broadening the keyword.</p>
                  {hasActiveFilters ? (
                    <button type="button" onClick={handleClearAll}>
                      Clear filters
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div className="products-results-info">
                  <span>
                    Showing <strong>{resultStart}</strong>
                    {" – "}
                    <strong>{resultEnd}</strong> of <strong>{productsState.totalCount}</strong>
                  </span>

                  {productsState.totalPages > 1 && (
                    <span>
                      Page <strong>{page}</strong> of <strong>{productsState.totalPages}</strong>
                    </span>
                  )}
                </div>

                <div className="products-grid">
                  {productsState.items.map((item) => (
                    <Card key={item.id || item.productId} item={item} />
                  ))}
                </div>

                {productsState.totalPages > 1 && (
                  <nav className="products-pagination" aria-label="Products pagination">
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

                    <div className="products-pagination__pages">
                      {paginationItems.map((item) => {
                        if (typeof item !== "number") {
                          return (
                            <span key={item} className="products-pagination__ellipsis" aria-hidden="true">
                              •••
                            </span>
                          );
                        }

                        const isActive = item === page;
                        return (
                          <button
                            key={item}
                            type="button"
                            className={`products-pagination__page ${isActive ? "is-active" : ""}`}
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

        {compareIds.length > 0 && (
          <Link to={ROUTES.COMPARE} className="compare-floating-btn">
            View Compare ({compareIds.length})
          </Link>
        )}
      </div>
    </div>
  );
}
