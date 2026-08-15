import { AlertTriangle, Loader2, Sparkles, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { productComparisonApi } from "../../../api/productComparisonApi";
import placeholderImage from "../../../assets/icons/favicon-aidr.svg";

const ATTRIBUTES = [
  { key: "image", label: "Image" },
  { key: "name", label: "Product Name" },
  { key: "price", label: "Price" },
  { key: "categoryName", label: "Category" },
  { key: "condition", label: "Condition" },
  { key: "location", label: "Location" },
  { key: "viewCount", label: "Views" },
  { key: "createdAtUtc", label: "Created" },
];

const getApiErrorMessage = (error) => {
  const data = error?.response?.data;
  const message = data?.message || data?.Message || data?.error || data?.Error;

  if (typeof message === "string") return message;
  if (error?.response?.status === 404)
    return "One or more products are no longer available.";
  if (error?.response?.status === 400) {
    return "The selected products do not have enough description content to compare.";
  }
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    return "You do not have permission to compare these products.";
  }

  return (
    error?.message || "Unable to compare products right now. Please try again."
  );
};

const getProductId = (product) =>
  String(product?.id || product?.productId || "");

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

const getProductNameById = (products, productId) => {
  const product = products.find(
    (item) => String(item.productId) === String(productId),
  );

  return product?.name || productId || "Unknown product";
};

const getCriterionStatusMeta = (status) => {
  const normalized = String(status || "").toLowerCase();

  if (normalized === "same") {
    return {
      label: "Same",
      className: "ai-compare-status-badge ai-compare-status-badge--same",
    };
  }

  if (normalized === "different") {
    return {
      label: "Different",
      className:
        "ai-compare-status-badge ai-compare-status-badge--different",
    };
  }

  return {
    label: "Insight",
    className: "ai-compare-status-badge",
  };
};

const getLocalComparisonProduct = (product) => ({
  productId: getProductId(product),
  name: product?.name || product?.productName || "Unknown product",
  description: product?.description || null,
  imageUrl:
    product?.primaryImageUrl ||
    product?.imageUrl ||
    product?.images?.[0] ||
    null,
  price: product?.price ?? null,
  categoryName: product?.categoryName || product?.category || null,
  condition: product?.condition || null,
  extractedAttributes: {},
  warnings: [],
});

const findInsightItemsByProduct = (groups, productId) =>
  groups.find((item) => String(item.productId) === String(productId))?.items ||
  [];

const renderList = (items, emptyText) => {
  if (!items?.length) return <p className="ai-compare-empty">{emptyText}</p>;

  return (
    <ul className="ai-compare-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const CompareModal = ({ open, products = [], onClose, onRemove, onClear }) => {
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparisonError, setComparisonError] = useState("");
  const [failedImageIds, setFailedImageIds] = useState({});

  const selectedProductIds = useMemo(
    () => Array.from(new Set(products.map(getProductId).filter(Boolean))),
    [products],
  );
  const selectionKey = useMemo(
    () => [...selectedProductIds].sort().join(","),
    [selectedProductIds],
  );

  const bestPrice = useMemo(() => {
    const prices = products
      .map((item) => Number(item.price))
      .filter(Number.isFinite);

    if (!prices.length) return null;
    return Math.min(...prices);
  }, [products]);

  const activeComparisonResult =
    comparisonResult?.selectionKey === selectionKey
      ? comparisonResult.data
      : null;

  if (!open) return null;

  const handleClose = () => {
    setComparisonError("");
    onClose?.();
  };

  const handleCompareWithAI = async () => {
    if (selectedProductIds.length < 2) {
      toast.error("Please select at least 2 products to compare.");
      return;
    }

    try {
      setIsComparing(true);
      setComparisonError("");
      setComparisonResult(null);

      const result = await productComparisonApi.compareProductDescriptions({
        productIds: selectedProductIds,
      });

      if (import.meta.env.DEV) {
        console.debug("[ProductCompare] API response", result);
      }

      setComparisonResult({ selectionKey, data: result });
      toast.success("Products compared successfully.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      setComparisonError(message);
      toast.error(message);
    } finally {
      setIsComparing(false);
    }
  };

  const renderValue = (product, key) => {
    const productId = getProductId(product);

    switch (key) {
      case "image":
        return (
          <img
            className="product-image"
            src={
              failedImageIds[productId]
                ? placeholderImage
                : product?.primaryImageUrl || placeholderImage
            }
            alt={product?.name || "Product image"}
            onError={() =>
              setFailedImageIds((prev) => ({
                ...prev,
                [productId]: true,
              }))
            }
          />
        );

      case "price":
        return (
          <span
            className={
              Number(product.price) === bestPrice ? "best-price" : "price"
            }
          >
            {Number(product.price) === bestPrice && "🔥 "}
            {formatCurrencyVN(product.price || 0)}
          </span>
        );

      case "condition":
        return (
          <span className={`condition ${product.condition || "unknown"}`}>
            {product.condition === "new" ? "New" : product.condition || "--"}
          </span>
        );

      case "viewCount":
        return <span className="views">👁 {product.viewCount || 0}</span>;

      case "createdAtUtc":
        return product.createdAtUtc
          ? new Date(product.createdAtUtc).toLocaleDateString("en-US")
          : "--";

      default:
        return product[key] || "--";
    }
  };

const renderAiComparison = () => {
  if (!activeComparisonResult) return null;

  const { comparison } = activeComparisonResult;
  const comparedProducts = activeComparisonResult.products?.length
    ? activeComparisonResult.products
    : products.map(getLocalComparisonProduct);
  const summary = comparison?.summary || "";
  const criteria = comparison?.criteria || [];
  const similarities = comparison?.similarities || [];
  const differences = comparison?.differences || [];
  const recommendations = comparison?.recommendations || [];
  const advantagesByProduct = comparison?.advantagesByProduct || [];
  const disadvantagesByProduct = comparison?.disadvantagesByProduct || [];
  const bestForByProduct = comparison?.bestForByProduct || [];
  const sameAttributes = comparison?.sameAttributes || [];
  const differentAttributes = comparison?.differentAttributes || [];
  const missingAttributes = comparison?.missingAttributes || [];
  const commonContent = comparison?.commonContent || [];
  const uniqueContentByProduct = comparison?.uniqueContentByProduct || [];
  const hasStructuredResult = Boolean(
    summary ||
      criteria.length ||
      similarities.length ||
      differences.length ||
      recommendations.length ||
      advantagesByProduct.length ||
      disadvantagesByProduct.length ||
      bestForByProduct.length ||
      sameAttributes.length ||
      differentAttributes.length ||
      missingAttributes.length ||
      commonContent.length ||
      uniqueContentByProduct.length,
  );

  return (
    <div className="ai-compare-result" aria-live="polite">
      <section className="ai-compare-section ai-compare-overview">
        <div>
            <h3>Compare With AI</h3>
          <p>
              The analysis highlights what matches, what differs, and which
              product fits each use case best.
          </p>
        </div>

        <div className="ai-compare-score">
          <strong>
            {formatSimilarityScore(comparison?.similarityScore)}
          </strong>
          <span>{getSimilarityLabel(comparison?.similarityScore)}</span>
          <small>{comparedProducts.length} products compared</small>
        </div>
      </section>

      {!hasStructuredResult && (
        <section className="ai-compare-section">
          <h4>Empty result</h4>
          <p className="ai-compare-empty">
            The backend processed the request but did not return valid
            comparison content to display.
          </p>
        </section>
      )}

      {summary ? (
        <section className="ai-compare-section">
            <h4>Quick Summary</h4>
          <p className="ai-compare-summary">{summary}</p>
        </section>
      ) : null}

      <section className="ai-compare-section">
          <h4>Product Details</h4>
        <div className="ai-compare-products">
          {comparedProducts.map((product) => (
            <article className="ai-compare-product" key={product.productId}>
              <img
                src={product.imageUrl || placeholderImage}
                alt={product.name || "Product image"}
                onError={(event) => {
                  event.currentTarget.src = placeholderImage;
                }}
              />
              <div>
                <h5>{product.name}</h5>
                <p>
                  {product.description || "This product has no description."}
                </p>

                {product.warnings?.length > 0 && (
                  <div className="ai-compare-warnings">
                    {product.warnings.map((warning, index) => (
                      <span key={`${warning}-${index}`}>
                        <AlertTriangle size={14} /> {warning}
                      </span>
                    ))}
                  </div>
                )}

                <dl className="ai-compare-attributes">
                  {Object.entries(product.extractedAttributes || {}).length >
                  0 ? (
                    Object.entries(product.extractedAttributes).map(
                      ([key, value]) => (
                        <div key={key}>
                          <dt>{key}</dt>
                            <dd>{value || "Unavailable"}</dd>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="ai-compare-empty">
                      No extracted attributes.
                    </p>
                  )}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      {criteria.length > 0 ? (
        <section className="ai-compare-section">
            <h4>Criteria Comparison</h4>
          <div className="ai-compare-criteria-grid">
            {criteria.map((criterion) => {
              const statusMeta = getCriterionStatusMeta(criterion.status);

              return (
                <article
                  key={criterion.name}
                  className="ai-compare-criteria-card"
                >
                  <div className="ai-compare-criteria-head">
                    <h5>{criterion.name}</h5>
                    <span className={statusMeta.className}>
                      {statusMeta.label}
                    </span>
                  </div>

                  <div className="ai-compare-criteria-values">
                    {criterion.values.map((value) => {
                      const isBetter = criterion.betterProductIds?.includes?.(
                        String(value.productId),
                      );

                      return (
                        <div
                          key={`${criterion.name}-${value.productId}`}
                          className={`ai-compare-criteria-value ${isBetter ? "ai-compare-criteria-value--better" : ""}`}
                        >
                          <strong>
                            {getProductNameById(
                              comparedProducts,
                              value.productId,
                            )}
                          </strong>
                            <span>{value.value || "Unavailable"}</span>
                        </div>
                      );
                    })}
                  </div>

                  {criterion.insight ? (
                    <p className="ai-compare-criteria-note">
                      {criterion.insight}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <div className="ai-compare-grid ai-compare-grid--insights">
        <section className="ai-compare-section">
            <h4>Key Similarities</h4>
          {renderList(
            similarities.length ? similarities : commonContent,
              "No key similarities highlighted.",
          )}
        </section>

        <section className="ai-compare-section">
            <h4>Key Differences</h4>
            {renderList(differences, "No key differences highlighted.")}
        </section>
      </div>

      {(advantagesByProduct.length > 0 ||
        disadvantagesByProduct.length > 0 ||
        bestForByProduct.length > 0) && (
        <section className="ai-compare-section">
            <h4>Product Guidance</h4>
          <div className="ai-compare-guide-grid">
            {comparedProducts.map((product) => (
              <article
                key={product.productId}
                className="ai-compare-guide-card"
              >
                <h5>{product.name}</h5>

                <div className="ai-compare-guide-section">
                  <span className="ai-compare-guide-label">Pros</span>
                  {renderList(
                    findInsightItemsByProduct(
                      advantagesByProduct,
                      product.productId,
                    ),
                      "No standout advantage highlighted.",
                  )}
                </div>

                <div className="ai-compare-guide-section">
                  <span className="ai-compare-guide-label">Cons</span>
                  {renderList(
                    findInsightItemsByProduct(
                      disadvantagesByProduct,
                      product.productId,
                    ),
                      "No major drawback highlighted.",
                  )}
                </div>

                <div className="ai-compare-guide-section">
                  <span className="ai-compare-guide-label">Best for</span>
                  {renderList(
                    findInsightItemsByProduct(
                      bestForByProduct,
                      product.productId,
                    ),
                      "No best-fit use case highlighted.",
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {sameAttributes.length > 0 ? (
        <section className="ai-compare-section">
            <h4>Matching Attributes</h4>
          <div className="ai-compare-table-wrap">
            <table className="ai-compare-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {sameAttributes.map((item) => (
                  <tr key={item.attribute}>
                    <td>{item.attribute}</td>
                      <td>{item.value || "Unavailable"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {differentAttributes.length > 0 ? (
        <section className="ai-compare-section">
            <h4>Detailed Differences</h4>
          <div className="ai-compare-table-wrap">
            <table className="ai-compare-table ai-compare-table--dynamic">
              <thead>
                <tr>
                  <th>Attribute</th>
                  {comparedProducts.map((product) => (
                    <th key={product.productId}>{product.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {differentAttributes.map((attribute) => (
                  <tr key={attribute.attribute}>
                    <td>{attribute.attribute}</td>
                    {comparedProducts.map((product) => {
                      const value = attribute.values.find(
                        (item) =>
                          String(item.productId) ===
                          String(product.productId),
                      )?.value;

                      return (
                        <td key={product.productId}>
                            {value || "Unavailable"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {missingAttributes.length > 0 ? (
        <section className="ai-compare-section">
            <h4>Missing Attributes</h4>
          <ul className="ai-compare-list">
            {missingAttributes.map((item) => (
              <li key={item.attribute}>
                <strong>{item.attribute}</strong> is available in{" "}
                {item.availableInProductIds
                  .map((id) => getProductNameById(comparedProducts, id))
                  .join(", ") || "--"}{" "}
                but missing in{" "}
                {item.missingInProductIds
                  .map((id) => getProductNameById(comparedProducts, id))
                  .join(", ") || "--"}
                .
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {uniqueContentByProduct.length > 0 ? (
        <section className="ai-compare-section">
            <h4>Unique Strengths</h4>
          <div className="ai-compare-unique-grid">
            {uniqueContentByProduct.map((item) => (
              <article key={item.productId}>
                <h5>
                  {getProductNameById(comparedProducts, item.productId)}
                </h5>
                  {renderList(item.contents, "No unique strength highlighted.")}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {recommendations.length > 0 ? (
        <section className="ai-compare-section ai-compare-section--recommendation">
            <h4>Final Recommendation</h4>
          <div className="ai-compare-unique-grid">
            {recommendations.map((recommendation, index) => (
              <article key={`${recommendation.productId}-${index}`}>
                <h5>{recommendation.useCase}</h5>
                <p className="ai-compare-empty">
                  <strong>
                    {getProductNameById(
                      comparedProducts,
                      recommendation.productId,
                    )}
                  </strong>
                  {recommendation.reason ? ` — ${recommendation.reason}` : ""}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="ai-compare-section">
          <h4>Notes</h4>
        <p className="ai-compare-empty">
          {comparison?.disclaimer ||
            "The result is generated based on product descriptions currently available in the system."}
        </p>
      </section>
    </div>
  );
};


  return (
    <div
      className="compare-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-products-title"
    >
      <div className="compare-modal">
        <div className="compare-header">
          <div>
            <h2 id="compare-products-title">Compare Products</h2>
            <p>Compare your favorite products side by side</p>
          </div>

          <div className="compare-header__actions">
            <button
              type="button"
              className="ai-compare-btn"
              onClick={handleCompareWithAI}
              disabled={selectedProductIds.length < 2 || isComparing}
              aria-label="Compare selected products with AI"
            >
              {isComparing ? (
                <Loader2 className="spin" size={18} />
              ) : (
                <Sparkles size={18} />
              )}
              {isComparing ? "Comparing..." : "Compare with AI"}
            </button>

            {products.length > 0 && (
              <button type="button" className="clear-btn" onClick={onClear}>
                <Trash2 size={18} /> Clear
              </button>
            )}

            <button
              type="button"
              className="close-btn-compare"
              onClick={handleClose}
              aria-label="Close compare modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="compare-body">
          <div className="compare-wrapper">
            <div className="attribute-column">
              {ATTRIBUTES.map((item) => (
                <div key={item.key} className="attribute-item">
                  {item.label}
                </div>
              ))}
            </div>

            {products.map((product) => {
              const productId = getProductId(product);

              return (
                <div className="product-column" key={productId}>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemove(productId)}
                    aria-label={`Remove ${product.name || "product"} from compare`}
                  >
                    <X size={15} />
                  </button>

                  {ATTRIBUTES.map((item) => (
                    <div key={item.key} className="product-item">
                      {renderValue(product, item.key)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        {comparisonError && (
          <div className="ai-compare-error">{comparisonError}</div>
        )}
        {isComparing && (
          <div className="ai-compare-loading" aria-busy="true">
            <Loader2 className="spin" size={24} /> Analyzing product
            descriptions...
          </div>
        )}
        {renderAiComparison()}
      </div>
    </div>
  );
};

export default CompareModal;
