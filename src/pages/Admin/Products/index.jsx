import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Button from "../../../components/common/Button/Button";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { fetchProducts } from "../../../redux/slice/admin/products/productAdminSlice";
import { adminService } from "../../../service/adminService";
import toast from "react-hot-toast";
import {
  Package,
  Search,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 7;

const getProductId = (product) => product?.productId || product?.id;
const getProductModerationStatus = (product) => {
  if (product?.isApproved && product?.isRejected) {
    return "invalid";
  }

  if (product?.isApproved) {
    return "approved";
  }

  if (product?.isRejected) {
    return "rejected";
  }

  return "pending";
};

const moderationStatusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  invalid: "Invalid state",
};

const canModerate = (product) =>
  getProductModerationStatus(product) === "pending";
const unwrapApiData = (response) => response?.data ?? response;

const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.productsAdmin,
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState("");
  const [approveTarget, setApproveTarget] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [historyTarget, setHistoryTarget] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // ========================================
  // FETCH PRODUCTS
  // ========================================

  useEffect(() => {
    dispatch(
      fetchProducts({
        pageNumber: 1,
        pageSize: 1000,
      }),
    );
  }, [dispatch]);

  // ========================================
  // SEARCH + FILTER ON FRONTEND
  // ========================================
  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !keyword ||
        product.name?.toLowerCase().includes(keyword) ||
        product.categoryName?.toLowerCase().includes(keyword) ||
        product.sellerFullName?.toLowerCase().includes(keyword);

      const matchesStatus =
        !status || getProductModerationStatus(product) === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [products, search, status]);

  // ========================================
  // SEARCH
  // ========================================

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ========================================
  // STATUS
  // ========================================

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // ========================================
  // PAGINATION FRONTEND
  // ========================================

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const refreshProducts = () => {
    dispatch(
      fetchProducts({
        pageNumber: 1,
        pageSize: 1000,
      }),
    );
  };

  const handleApprove = async () => {
    const productId = getProductId(approveTarget);

    if (actionLoading) {
      return;
    }

    if (!productId || !canModerate(approveTarget)) {
      toast.error("Product id is missing");
      return;
    }

    try {
      setActionLoading(productId);
      await adminService.approveProduct(productId);
      toast.success("Product approved successfully");
      setApproveTarget(null);
      refreshProducts();
    } catch (approveError) {
      toast.error(
        approveError?.response?.data?.message ||
          approveError?.message ||
          "Approve product failed",
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async (event) => {
    event.preventDefault();

    const productId = getProductId(rejectTarget);
    const reason = rejectReason.trim();

    if (actionLoading) {
      return;
    }

    if (!productId || !canModerate(rejectTarget)) {
      toast.error("Product id is missing");
      return;
    }

    if (!reason) {
      toast.error("Reject reason is required");
      return;
    }

    try {
      setActionLoading(productId);
      await adminService.rejectProduct(productId, reason);
      toast.success("Product rejected successfully");
      setRejectTarget(null);
      setRejectReason("");
      refreshProducts();
    } catch (rejectError) {
      toast.error(
        rejectError?.response?.data?.message ||
          rejectError?.message ||
          "Reject product failed",
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleViewHistory = async (product) => {
    const productId = getProductId(product);

    if (!productId) {
      toast.error("Product id is missing");
      return;
    }

    try {
      setHistoryTarget(product);
      setHistoryLoading(true);
      const response =
        await adminService.getProductModerationHistory(productId);
      const data = unwrapApiData(response);
      setHistoryItems(Array.isArray(data) ? data : []);
    } catch (historyError) {
      toast.error(
        historyError?.response?.data?.message ||
          historyError?.message ||
          "Load moderation history failed",
      );
      setHistoryItems([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="admin-products">
        <div className="products-state">Loading products...</div>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <div className="admin-products">
        <div className="products-state products-state--error">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-products">
      {/* HEADER */}
      <div className="admin-products__header">
        <div>
          <h1>Products</h1>
          <p>{filteredProducts.length} listings</p>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="table-wrapper">
        {/* FILTER */}
        <div className="table-toolbar">
          {/* SEARCH */}
          <div className="search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search products or sellers..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          {/* STATUS */}
          <select value={status} onChange={handleStatusChange}>
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="INVALID">Invalid state</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Views</th>
                <th>Visibility</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const moderationStatus = getProductModerationStatus(product);
                  const productId = getProductId(product);
                  const isActionLoading = actionLoading === productId;

                  return (
                    <tr key={productId}>
                      {/* PRODUCT */}
                      <td>
                        <div className="product-info">
                          <div className="icon">
                            <Package size={18} />
                          </div>

                          <div className="product-info__content">
                            <span className="product-name">{product.name}</span>

                            <span className="product-sold">
                              {product.description ||
                                product.location ||
                                "No description"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td>
                        <span className="category-name">
                          {product.categoryName || "-"}
                        </span>
                      </td>

                      {/* SELLER */}
                      <td>
                        <span className="seller-name">
                          {product.sellerFullName || "-"}
                        </span>
                      </td>

                      {/* PRICE */}
                      <td>
                        <span className="admin-product-price">
                          {formatCurrencyVN(product.price)}
                        </span>
                      </td>

                      {/* VIEWS */}
                      <td>
                        <span className="stock">{product.viewCount ?? 0}</span>
                      </td>

                      {/* VISIBILITY */}
                      <td>
                        <span className="rating">
                          {product.isActive ? "Active" : "Inactive"}
                          {" / "}
                          {product.isPublic ? "Public" : "Private"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`status status--${moderationStatus}`}
                          title={
                            moderationStatus === "invalid"
                              ? "Product is marked as both approved and rejected."
                              : undefined
                          }
                        >
                          {moderationStatusLabels[moderationStatus]}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="action-buttons">
                          <Button
                            className="action-btn view-btn"
                            title="View moderation history"
                            onClick={() => handleViewHistory(product)}
                          >
                            <Eye size={16} />
                          </Button>

                          {canModerate(product) && (
                            <Button
                              className="action-btn approve-btn"
                              title="Approve product"
                              disabled={isActionLoading}
                              onClick={() => setApproveTarget(product)}
                            >
                              <Check size={16} />
                            </Button>
                          )}

                          {canModerate(product) && (
                            <Button
                              className="action-btn reject-btn"
                              title="Reject product"
                              disabled={isActionLoading}
                              onClick={() => setRejectTarget(product)}
                            >
                              <X size={16} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="empty-state">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className="pagination">
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <div className="pagination__buttons">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {approveTarget && (
        <div className="admin-products__modal-backdrop" role="presentation">
          <div
            className="admin-products__modal"
            role="dialog"
            aria-modal="true"
          >
            <h3>Approve product?</h3>
            <p>
              Product: <strong>{approveTarget.name}</strong>
            </p>
            <p>This product will become visible according to backend rules.</p>
            <div className="admin-products__modal-actions">
              <button
                type="button"
                disabled={!!actionLoading}
                onClick={() => setApproveTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!!actionLoading}
                onClick={handleApprove}
              >
                {actionLoading ? "Approving..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectTarget && (
        <div className="admin-products__modal-backdrop" role="presentation">
          <form
            className="admin-products__modal"
            role="dialog"
            aria-modal="true"
            onSubmit={handleReject}
          >
            <h3>Reject product</h3>
            <p>
              Product: <strong>{rejectTarget.name}</strong>
            </p>
            <label>
              Reason
              <textarea
                value={rejectReason}
                required
                maxLength={500}
                onChange={(event) => setRejectReason(event.target.value)}
              />
            </label>
            <div className="admin-products__modal-actions">
              <button
                type="button"
                disabled={!!actionLoading}
                onClick={() => setRejectTarget(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!!actionLoading || !rejectReason.trim()}
              >
                Reject
              </button>
            </div>
          </form>
        </div>
      )}

      {historyTarget && (
        <div className="admin-products__modal-backdrop" role="presentation">
          <div
            className="admin-products__modal admin-products__modal--wide"
            role="dialog"
            aria-modal="true"
          >
            <h3>Moderation history</h3>
            <p>
              Product: <strong>{historyTarget.name}</strong>
            </p>
            {historyLoading ? (
              <div className="products-state">Loading history...</div>
            ) : historyItems.length === 0 ? (
              <div className="products-state">No moderation history.</div>
            ) : (
              <div className="admin-products__history-list">
                {historyItems.map((item) => (
                  <article key={item.id}>
                    <strong>
                      {item.action ||
                        `${item.previousStatus || "--"} → ${item.newStatus || "--"}`}
                    </strong>
                    <span>
                      {item.createdAtUtc
                        ? new Date(item.createdAtUtc).toLocaleString("en-US")
                        : "--"}
                    </span>
                    <p>{item.reason || "No reason provided"}</p>
                  </article>
                ))}
              </div>
            )}
            <div className="admin-products__modal-actions">
              <button type="button" onClick={() => setHistoryTarget(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
