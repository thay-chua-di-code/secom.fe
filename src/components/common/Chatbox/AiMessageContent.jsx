import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProductRecommendationCard from "./ProductRecommendationCard";
import { extractProductIdsFromContent, normalizeProductDetailUrl } from "./productLinkUtils";

const AiMessageContent = ({ content, productReferences = [] }) => {
  const fallbackProductIds = productReferences.length
    ? []
    : extractProductIdsFromContent(content);

  return (
    <div className="ai-message-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const internalPath = normalizeProductDetailUrl(href);

            if (internalPath) {
              return (
                <Link to={internalPath} className="ai-markdown-link">
                  {children}
                </Link>
              );
            }

            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="ai-markdown-link">
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="ai-markdown-table-wrap">
              <table>{children}</table>
            </div>
          ),
          code: ({ children }) => <code className="ai-inline-code">{children}</code>,
        }}
      >
        {content || ""}
      </ReactMarkdown>

      {productReferences.length > 0 && (
        <div className="ai-product-grid" aria-label="AI suggested products">
          {productReferences.map((product) => (
            <ProductRecommendationCard
              key={product.productId || product.id || product.name}
              product={product}
            />
          ))}
        </div>
      )}

      {fallbackProductIds.length > 0 && (
        <div className="ai-product-links" aria-label="Mentioned product links">
          {fallbackProductIds.map((productId) => (
            <Link key={productId} to={`/product-detail/${productId}`} className="ai-product-link-chip">
              View product {productId.slice(0, 8).toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AiMessageContent;
