import { AlertTriangle, Loader2, Sparkles, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { productComparisonApi } from "../../../api/productComparisonApi";
import placeholderImage from "../../../assets/icons/logo.jpg";

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
  if (error?.response?.status === 404) return "Một hoặc nhiều sản phẩm không còn khả dụng.";
  if (error?.response?.status === 400) {
    return "Các sản phẩm đã chọn không có đủ nội dung mô tả để so sánh.";
  }
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    return "Bạn không có quyền thực hiện so sánh sản phẩm này.";
  }

  return error?.message || "Không thể so sánh sản phẩm lúc này. Vui lòng thử lại.";
};

const getProductId = (product) => String(product?.id || product?.productId || "");

const getSimilarityLabel = (score) => {
  const numericScore = Number(score);

  if (!Number.isFinite(numericScore)) return "Chưa có điểm đánh giá";
  if (numericScore >= 80) return "Rất giống nhau";
  if (numericScore >= 60) return "Khá giống nhau";
  if (numericScore >= 40) return "Có một số điểm giống nhau";
  return "Khác biệt đáng kể";
};

const formatSimilarityScore = (score) => {
  const numericScore = Number(score);

  if (!Number.isFinite(numericScore)) return "--";
  return `${numericScore.toFixed(1)}%`;
};

const getProductNameById = (products, productId) => {
  const product = products.find((item) => String(item.productId) === String(productId));

  return product?.name || productId || "Sản phẩm không xác định";
};

const getLocalComparisonProduct = (product) => ({
  productId: getProductId(product),
  name: product?.name || product?.productName || "Unknown product",
  description: product?.description || null,
  imageUrl: product?.primaryImageUrl || product?.imageUrl || product?.images?.[0] || null,
  price: product?.price ?? null,
  categoryName: product?.categoryName || product?.category || null,
  condition: product?.condition || null,
  extractedAttributes: {},
  warnings: [],
});

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
    const prices = products.map((item) => Number(item.price)).filter(Number.isFinite);

    if (!prices.length) return null;
    return Math.min(...prices);
  }, [products]);

  const activeComparisonResult =
    comparisonResult?.selectionKey === selectionKey ? comparisonResult.data : null;

  if (!open) return null;

  const handleClose = () => {
    setComparisonError("");
    onClose?.();
  };

  const handleCompareWithAI = async () => {
    if (selectedProductIds.length < 2) {
      toast.error("Vui lòng chọn ít nhất 2 sản phẩm để so sánh.");
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
      toast.success("So sánh sản phẩm thành công.");
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
            src={failedImageIds[productId] ? placeholderImage : product?.primaryImageUrl || placeholderImage}
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
          <span className={Number(product.price) === bestPrice ? "best-price" : "price"}>
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
            <h3>Kết quả Compare with AI</h3>
            <p>Kết quả được tạo từ nội dung mô tả sản phẩm hiện có.</p>
          </div>

          <div className="ai-compare-score">
            <strong>{formatSimilarityScore(comparison?.similarityScore)}</strong>
            <span>{getSimilarityLabel(comparison?.similarityScore)}</span>
            <small>{comparedProducts.length} sản phẩm được so sánh</small>
          </div>
        </section>

        {!hasStructuredResult && (
          <section className="ai-compare-section">
            <h4>Kết quả trống</h4>
            <p className="ai-compare-empty">
              Backend đã xử lý yêu cầu nhưng chưa trả nội dung so sánh hợp lệ để hiển thị.
            </p>
          </section>
        )}

        {summary && (
          <section className="ai-compare-section">
            <h4>Tóm tắt so sánh</h4>
            <p className="ai-compare-summary">{summary}</p>
          </section>
        )}

        <section className="ai-compare-section">
          <h4>Thông tin từng sản phẩm</h4>
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
                  <p>{product.description || "Sản phẩm chưa có mô tả."}</p>

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
                    {Object.entries(product.extractedAttributes || {}).length > 0 ? (
                      Object.entries(product.extractedAttributes).map(([key, value]) => (
                        <div key={key}>
                          <dt>{key}</dt>
                          <dd>{value || "Không có thông tin"}</dd>
                        </div>
                      ))
                    ) : (
                      <p className="ai-compare-empty">Không có thuộc tính trích xuất.</p>
                    )}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-compare-section">
          <h4>Thuộc tính giống nhau</h4>
          {sameAttributes.length > 0 ? (
            <div className="ai-compare-table-wrap">
              <table className="ai-compare-table">
                <thead>
                  <tr>
                    <th>Thuộc tính</th>
                    <th>Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {sameAttributes.map((item) => (
                    <tr key={item.attribute}>
                      <td>{item.attribute}</td>
                      <td>{item.value || "Không có thông tin"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="ai-compare-empty">Không tìm thấy thuộc tính giống nhau rõ ràng.</p>
          )}
        </section>

        {criteria.length > 0 && (
          <section className="ai-compare-section">
            <h4>Bảng tiêu chí AI</h4>
            <div className="ai-compare-table-wrap">
              <table className="ai-compare-table ai-compare-table--dynamic">
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    {comparedProducts.map((product) => (
                      <th key={product.productId}>{product.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion) => (
                    <tr key={criterion.name}>
                      <td>{criterion.name}</td>
                      {comparedProducts.map((product) => {
                        const value = criterion.values.find(
                          (item) => String(item.productId) === String(product.productId),
                        )?.value;

                        return <td key={product.productId}>{value || "Không có thông tin"}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="ai-compare-section">
          <h4>Thuộc tính khác nhau</h4>
          {differentAttributes.length > 0 ? (
            <div className="ai-compare-table-wrap">
              <table className="ai-compare-table ai-compare-table--dynamic">
                <thead>
                  <tr>
                    <th>Thuộc tính</th>
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
                          (item) => String(item.productId) === String(product.productId),
                        )?.value;

                        return <td key={product.productId}>{value || "Không có thông tin"}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="ai-compare-empty">Không tìm thấy thuộc tính khác nhau rõ ràng.</p>
          )}
        </section>

        <section className="ai-compare-section">
          <h4>Thuộc tính bị thiếu</h4>
          {missingAttributes.length > 0 ? (
            <ul className="ai-compare-list">
              {missingAttributes.map((item) => (
                <li key={item.attribute}>
                  <strong>{item.attribute}</strong> có trong {item.availableInProductIds.map((id) => getProductNameById(comparedProducts, id)).join(", ") || "--"} nhưng thiếu ở {item.missingInProductIds.map((id) => getProductNameById(comparedProducts, id)).join(", ") || "--"}.
                </li>
              ))}
            </ul>
          ) : (
            <p className="ai-compare-empty">Không có thuộc tính bị thiếu đáng chú ý.</p>
          )}
        </section>

        <section className="ai-compare-section">
          <h4>Nội dung chung</h4>
          {renderList(
            commonContent.length ? commonContent : similarities,
            "Không tìm thấy nội dung chung đáng kể.",
          )}
        </section>

        <section className="ai-compare-section">
          <h4>Điểm khác biệt</h4>
          {renderList(differences, "Không tìm thấy điểm khác biệt đáng kể.")}
        </section>

        <section className="ai-compare-section">
          <h4>Nội dung riêng theo từng sản phẩm</h4>
          {uniqueContentByProduct.length > 0 ? (
            <div className="ai-compare-unique-grid">
              {uniqueContentByProduct.map((item) => (
                <article key={item.productId}>
                  <h5>{getProductNameById(comparedProducts, item.productId)}</h5>
                  {renderList(item.contents, "Không có nội dung riêng đáng kể.")}
                </article>
              ))}
            </div>
          ) : (
            <p className="ai-compare-empty">Không có nội dung riêng đáng kể.</p>
          )}
        </section>

        {recommendations.length > 0 && (
          <section className="ai-compare-section">
            <h4>Khuyến nghị theo nhu cầu</h4>
            <div className="ai-compare-unique-grid">
              {recommendations.map((recommendation, index) => (
                <article key={`${recommendation.productId}-${index}`}>
                  <h5>{recommendation.useCase}</h5>
                  <p className="ai-compare-empty">
                    <strong>{getProductNameById(comparedProducts, recommendation.productId)}</strong>
                    {recommendation.reason ? ` — ${recommendation.reason}` : ""}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="ai-compare-section">
          <h4>Ghi chú</h4>
          <p className="ai-compare-empty">
            {comparison?.disclaimer || "Kết quả được tạo dựa trên mô tả sản phẩm hiện có trong hệ thống."}
          </p>
        </section>
      </div>
    );
  };

  return (
    <div className="compare-overlay" role="dialog" aria-modal="true" aria-labelledby="compare-products-title">
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
              {isComparing ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
              {isComparing ? "Đang so sánh..." : "Compare with AI"}
            </button>

            {products.length > 0 && (
              <button type="button" className="clear-btn" onClick={onClear}>
                <Trash2 size={18} /> Clear
              </button>
            )}

            <button type="button" className="close-btn" onClick={handleClose} aria-label="Close compare modal">
              <X size={20} />
            </button>
          </div>
        </div>

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

        {comparisonError && <div className="ai-compare-error">{comparisonError}</div>}
        {isComparing && (
          <div className="ai-compare-loading" aria-busy="true">
            <Loader2 className="spin" size={24} /> Đang phân tích mô tả sản phẩm...
          </div>
        )}
        {renderAiComparison()}
      </div>
    </div>
  );
};

export default CompareModal;
