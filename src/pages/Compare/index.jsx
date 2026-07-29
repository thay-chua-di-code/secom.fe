import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RefreshCw, Trash2 } from "lucide-react";
import productApi from "../../api/productApi";
import { formatCurrencyVN } from "../../utils/fncUtils";
import {
  getCompareProductIds,
  removeCompareProductId,
} from "../../utils/compareProducts";
import "./style.scss";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Load compare products failed";

export default function CompareProductsPage() {
  const [productIds, setProductIds] = useState(() => getCompareProductIds());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    if (productIds.length === 0) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      const responses = await Promise.all(
        productIds.map((productId) => productApi.getProductDetail(productId)),
      );
      setProducts(responses.filter(Boolean));
      setError("");
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, [productIds]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadProducts, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadProducts]);

  useEffect(() => {
    const handleChange = () => setProductIds(getCompareProductIds());
    window.addEventListener("compare-products-change", handleChange);
    return () => window.removeEventListener("compare-products-change", handleChange);
  }, []);

  const handleRemove = (productId) => {
    const nextIds = removeCompareProductId(productId);
    setProductIds(nextIds);
    toast.success("Removed from compare");
  };

  return (
    <div className="compare-page">
      <div className="compare-page__header">
        <div>
          <h1>Compare Products</h1>
          <p>{productIds.length} selected products</p>
        </div>
        <button type="button" disabled={loading} onClick={loadProducts}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && <div className="compare-page__error">{error}</div>}
      {loading && <div className="compare-page__state">Loading products...</div>}

      {!loading && products.length === 0 && (
        <div className="compare-page__state">
          No products selected. Add products from product cards.
        </div>
      )}

      {products.length > 0 && (
        <div className="compare-page__table-wrap">
          <table className="compare-page__table">
            <thead>
              <tr>
                <th>Product</th>
                {products.map((product) => {
                  const productId = product.id || product.productId;
                  return (
                    <th key={productId}>
                      <button type="button" onClick={() => handleRemove(String(productId))}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                {products.map((product) => (
                  <td key={product.id || product.productId}>
                    <strong>{product.name || product.productName}</strong>
                  </td>
                ))}
              </tr>
              <tr>
                <td>Image</td>
                {products.map((product) => {
                  const image = product.primaryImageUrl || product.imageUrl || product.images?.[0]?.imageUrl || product.images?.[0];
                  return (
                    <td key={product.id || product.productId}>
                      {image ? <img src={image} alt={product.name || "Product"} /> : "--"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td>Price</td>
                {products.map((product) => (
                  <td key={product.id || product.productId}>{formatCurrencyVN(product.price || 0)}</td>
                ))}
              </tr>
              <tr>
                <td>Category</td>
                {products.map((product) => (
                  <td key={product.id || product.productId}>{product.category?.name || product.categoryName || "--"}</td>
                ))}
              </tr>
              <tr>
                <td>Stock</td>
                {products.map((product) => (
                  <td key={product.id || product.productId}>{product.stockQuantity ?? product.stock ?? "--"}</td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {products.map((product) => (
                  <td key={product.id || product.productId}>{product.rating || product.averageRating || "--"}</td>
                ))}
              </tr>
              <tr>
                <td>Action</td>
                {products.map((product) => {
                  const productId = product.id || product.productId;
                  return (
                    <td key={productId}>
                      <Link to={`/product-detail/${productId}`}>View detail</Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
