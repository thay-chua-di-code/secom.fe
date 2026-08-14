import { AlertTriangle, Loader2, Scale, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/common/Button/Button";
import { productComparisonApi } from "../../api/productComparisonApi";
import productApi from "../../api/productApi";
import useCompare from "../../hooks/useCompare";
import { ROUTES } from "../../constants/routes";
import { formatCurrencyVN } from "../../utils/fncUtils";
import placeholderImage from "../../assets/icons/logo.jpg";

import "./style.scss";

const MAX_COMPARE_PRODUCTS = 2;

const getApiErrorMessage = (error) => {
  const data = error?.response?.data;
  const message = data?.message || data?.Message || data?.error || data?.Error;

  if (typeof message === "string") return message;
  if (error?.response?.status === 404) {
    return "One or more selected products are no longer available.";
  }
  if (error?.response?.status === 400) {
    return "AI comparison could not be completed for the selected products.";
  }
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    return "You do not have permission to compare these products.";
  }

  return error?.message || "AI comparison could not be completed. Please try again.";
};

const getProductId = (product) => String(product?.id || product?.productId || "");

const getProductImage = (product) =>
  product?.primaryImageUrl ||
  product?.imageUrl ||
  product?.images?.find?.((image) => image?.isPrimary)?.imageUrl ||
  product?.images?.[0]?.imageUrl ||
  product?.images?.[0] ||
  placeholderImage;

const normalizeCompareProduct = (product) => ({
  id: getProductId(product),
  name: product?.name || product?.productName || "Unavailable product",
  image: getProductImage(product),
  price: product?.price ?? null,
  category: product?.category?.name || product?.categoryName || product?.category || "Uncategorized",
  condition: product?.condition || "Unknown",
  sellerName:
    product?.seller?.fullName ||
    product?.seller?.shopName ||
    product?.shop?.shopName ||
    product?.sellerName ||
    "Unknown seller",
  stock: product?.stockQuantity ?? product?.stock ?? null,
  description: product?.description || "No description available.",
  available: true,
});

const getFallbackCompareProduct = (id) => ({
  id: String(id),
  name: "This product is no longer available",
  image: placeholderImage,
  price: null,
  category: "Unavailable",
  condition: "Unavailable",
  sellerName: "Unavailable",
  stock: null,
  description: "This product could not be loaded. You can remove it and choose another product.",
  available: false,
});

const getProductNameById = (products, productId) => {
  const product = products.find((item) => String(item.productId || item.id) === String(productId));
  return product?.name || productId || "Unknown product";
};

const getSimilarityLabel = (score) => {
  const numericScore = Number(score);
  if (!Number.isFinite(numericScore)) return "No similarity score yet";
  if (numericScore >= 80) return "Very similar";
  if (numericScore >= 60) return "Quite similar";
  if (numericScore >= 40) return "Some similarities";
  return "Significantly different";
};

const formatSimilarityScore = (score) => {
  const numericScore = Number(score);
  if (!Number.isFinite(numericScore)) return "--";
  return `${numericScore.toFixed(1)}%`;
};

const renderList = (items, emptyText) => {
  if (!items?.length) return <p className="compare-page__empty-copy">{emptyText}</p>;

  return (
    <ul className="compare-page__result-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

export default function ComparePage() {
  const { compareIds, remove, clear } = useCompare();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [failedImageIds, setFailedImageIds] = useState({});
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparisonError, setComparisonError] = useState(null);

  const compareIdsLimited = useMemo(() => compareIds.slice(0, MAX_COMPARE_PRODUCTS), [compareIds]);
  const availableProducts = useMemo(() => products.filter((product) => product.available), [products]);
  const unavailableProducts = useMemo(() => products.filter((product) => !product.available), [products]);
  const selectedProductIds = useMemo(() => availableProducts.map((product) => product.id), [availableProducts]);
  const selectionKey = useMemo(() => [...selectedProductIds].sort().join(","), [selectedProductIds]);
  const activeComparisonResult = comparisonResult?.selectionKey === selectionKey ? comparisonResult.data : null;
  const activeComparisonError = comparisonError?.selectionKey === selectionKey ? comparisonError.message : "";

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      if (!compareIdsLimited.length) {
        setProducts([]);
        return;
      }

      try {
        setLoadingProducts(true);
        const results = await Promise.allSettled(
          compareIdsLimited.map((id) => productApi.getProductDetail(id)),
        );

        if (!isMounted) return;

        const mapped = results.map((result, index) => {
          const productId = compareIdsLimited[index];
          if (result.status === "fulfilled") {
            return normalizeCompareProduct(result.value);
          }

          return getFallbackCompareProduct(productId);
        });

        setProducts(mapped);
      } finally {
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [compareIdsLimited]);

  const handleRemove = (productId) => {
    remove(productId);
    setComparisonResult(null);
    setComparisonError(null);
    toast.success("Removed from compare.");
  };

  const handleClear = () => {
    clear();
    setComparisonResult(null);
    setComparisonError(null);
    toast.success("Compare list cleared.");
  };

  const handleCompareWithAI = async () => {
    if (selectedProductIds.length !== MAX_COMPARE_PRODUCTS) {
      toast.error("Choose exactly 2 available products before starting AI Compare.");
      return;
    }

    try {
      setIsComparing(true);
      setComparisonError(null);
      setComparisonResult(null);

      const result = await productComparisonApi.compareProductDescriptions({
        productIds: selectedProductIds,
      });

      setComparisonResult({ selectionKey, data: result });
      toast.success("Products compared successfully.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      setComparisonError({ selectionKey, message });
      toast.error(message);
    } finally {
      setIsComparing(false);
    }
  };

  const renderAiComparison = () => {
    if (!activeComparisonResult) return null;

    const { comparison, products: comparedProducts = [] } = activeComparisonResult;
    const similarities = comparison?.similarities || [];
    const differences = comparison?.differences || [];
    const recommendations = comparison?.recommendations || [];
    const criteria = comparison?.criteria || [];
    const uniqueContentByProduct = comparison?.uniqueContentByProduct || [];
    const commonContent = comparison?.commonContent || [];

    return (
      <section className="compare-page__results">
        <div className="compare-page__section-header">
          <h2>AI Comparison</h2>
          <span>
            {formatSimilarityScore(comparison?.similarityScore)} · {getSimilarityLabel(comparison?.similarityScore)}
          </span>
        </div>

        {comparison?.summary ? (
          <article className="compare-page__result-card">
            <h3>Summary</h3>
            <p className="compare-page__result-text">{comparison.summary}</p>
          </article>
        ) : null}

        {criteria.length > 0 ? (
          <article className="compare-page__result-card">
            <h3>Criteria Comparison</h3>
            <div className="compare-page__criteria-grid">
              {criteria.map((criterion) => (
                <div key={criterion.name} className="compare-page__criteria-card">
                  <h4>{criterion.name}</h4>
                  <div className="compare-page__criteria-values">
                    {criterion.values.map((value) => (
                      <div key={`${criterion.name}-${value.productId}`}>
                        <strong>{getProductNameById(comparedProducts, value.productId)}</strong>
                        <span>{value.value || "No information"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ) : null}

        <div className="compare-page__result-grid">
          <article className="compare-page__result-card">
            <h3>Key Similarities</h3>
            {renderList(similarities, "No major similarities were highlighted by AI.")}
          </article>

          <article className="compare-page__result-card">
            <h3>Key Differences</h3>
            {renderList(differences, "No major differences were highlighted by AI.")}
          </article>
        </div>

        {commonContent.length > 0 ? (
          <article className="compare-page__result-card">
            <h3>Shared Content Highlights</h3>
            {renderList(commonContent, "No common content available.")}
          </article>
        ) : null}

        {uniqueContentByProduct.length > 0 ? (
          <article className="compare-page__result-card">
            <h3>Unique Strengths</h3>
            <div className="compare-page__criteria-grid">
              {uniqueContentByProduct.map((item) => (
                <div key={item.productId} className="compare-page__criteria-card">
                  <h4>{getProductNameById(comparedProducts, item.productId)}</h4>
                  {renderList(item.contents, "No significant unique content.")}
                </div>
              ))}
            </div>
          </article>
        ) : null}

        {recommendations.length > 0 ? (
          <article className="compare-page__result-card compare-page__result-card--recommendation">
            <h3>Recommendations</h3>
            <div className="compare-page__recommendations">
              {recommendations.map((recommendation, index) => (
                <div key={`${recommendation.productId}-${index}`} className="compare-page__recommendation-item">
                  <strong>{recommendation.useCase}</strong>
                  <p>
                    <span>{getProductNameById(comparedProducts, recommendation.productId)}</span>
                    {recommendation.reason ? ` — ${recommendation.reason}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ) : null}

        <article className="compare-page__result-card">
          <h3>Note</h3>
          <p className="compare-page__result-text">
            {comparison?.disclaimer ||
              "The result is generated from the current product descriptions available in the system."}
          </p>
        </article>
      </section>
    );
  };

  return (
    <div className="compare-page">
      <div className="compare-page__container">
        <header className="compare-page__hero">
          <div>
            <span className="compare-page__eyebrow">AI Product Comparison</span>
            <h1>Compare Products</h1>
            <p>
              Review your selected products and let AI help you choose the right one.
            </p>
          </div>

          <div className="compare-page__hero-actions">
            <span>{compareIdsLimited.length} of {MAX_COMPARE_PRODUCTS} products selected</span>
            {compareIdsLimited.length > 0 ? (
              <button type="button" className="compare-page__clear-btn" onClick={handleClear}>
                <Trash2 size={16} />
                Clear all
              </button>
            ) : null}
          </div>
        </header>

        {compareIdsLimited.length === 0 ? (
          <section className="compare-page__state compare-page__state--empty">
            <Scale size={38} />
            <h2>No products to compare yet</h2>
            <p>Add products from the marketplace to start comparing.</p>
            <Link to={ROUTES.PRODUCT.PRODUCTS} className="compare-page__browse-btn">
              Browse Products
            </Link>
          </section>
        ) : (
          <>
            <section className="compare-page__selection">
              {loadingProducts ? (
                <div className="compare-page__state compare-page__state--loading">
                  <Loader2 className="compare-page__spinner" size={24} />
                  <p>Loading selected products...</p>
                </div>
              ) : (
                <div className="compare-page__grid">
                  {products.map((product) => (
                    <article
                      key={product.id}
                      className={`compare-page__product-card ${product.available ? "" : "compare-page__product-card--missing"}`}
                    >
                      <button
                        type="button"
                        className="compare-page__remove-btn"
                        onClick={() => handleRemove(product.id)}
                        aria-label={`Remove ${product.name} from compare`}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>

                      <div className="compare-page__image-wrap">
                        <img
                          src={failedImageIds[product.id] ? placeholderImage : product.image}
                          alt={product.name}
                          onError={() =>
                            setFailedImageIds((current) => ({
                              ...current,
                              [product.id]: true,
                            }))
                          }
                        />
                      </div>

                      <div className="compare-page__product-body">
                        <h3>{product.name}</h3>
                        <strong>
                          {product.price !== null ? formatCurrencyVN(product.price) : "Unavailable"}
                        </strong>
                        <dl>
                          <div>
                            <dt>Category</dt>
                            <dd>{product.category}</dd>
                          </div>
                          <div>
                            <dt>Condition</dt>
                            <dd>{product.condition}</dd>
                          </div>
                          <div>
                            <dt>Seller</dt>
                            <dd>{product.sellerName}</dd>
                          </div>
                          <div>
                            <dt>Stock</dt>
                            <dd>{product.stock ?? "--"}</dd>
                          </div>
                        </dl>
                        <p>{product.description}</p>
                        {!product.available ? (
                          <div className="compare-page__missing-note">
                            This product is no longer available. Remove it before comparing.
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {compareIdsLimited.length === 1 ? (
              <section className="compare-page__state compare-page__state--hint">
                <AlertTriangle size={26} />
                <h2>Choose one more product</h2>
                <p>You need 2 products before AI Compare can start.</p>
                <Link to={ROUTES.PRODUCT.PRODUCTS} className="compare-page__browse-btn">
                  Browse Products
                </Link>
              </section>
            ) : null}

            {unavailableProducts.length > 0 ? (
              <section className="compare-page__error-banner">
                One or more selected products are unavailable. Remove them before starting AI Compare.
              </section>
            ) : null}

            <section className="compare-page__actions">
              <Button
                className="compare-page__ai-btn"
                type="button"
                fullWidth
                onClick={handleCompareWithAI}
                disabled={selectedProductIds.length !== MAX_COMPARE_PRODUCTS || isComparing || unavailableProducts.length > 0}
              >
                {isComparing ? <Loader2 className="compare-page__button-spin" size={18} /> : <Sparkles size={18} />}
                {isComparing ? "Comparing with AI..." : "Compare with AI"}
              </Button>
            </section>

            {activeComparisonError ? (
              <section className="compare-page__error-banner compare-page__error-banner--danger">
                {activeComparisonError}
              </section>
            ) : null}

            {renderAiComparison()}
          </>
        )}
      </div>
    </div>
  );
}
