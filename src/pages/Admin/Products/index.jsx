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

// =====================================================
// CONSTANT
// =====================================================

const PRODUCTS_PER_PAGE = 7;

// =====================================================
// HELPERS
// =====================================================

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

// =====================================================
// COMPONENT
// =====================================================

const Products = () => {
  const dispatch = useDispatch();

  // ===================================================
  // REDUX
  // ===================================================

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.productsAdmin);

  // ===================================================
  // LOCAL STATE
  // ===================================================

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");

  // FE pagination
  const [page, setPage] = useState(1);

  const [actionLoading, setActionLoading] = useState("");

  const [approveTarget, setApproveTarget] = useState(null);

  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const [detailTarget, setDetailTarget] = useState(null);

  const [historyTarget, setHistoryTarget] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // ===================================================
  // SEARCH DEBOUNCE
  // ===================================================

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  // ===================================================
  // FETCH ALL PRODUCTS
  // ===================================================
  //
  // Chỉ fetch 1 lần.
  //
  // Không truyền:
  // - page
  // - pageNumber
  // - pageSize
  // - searchTerm
  // - status
  //
  // Pagination + search + filter handle hoàn toàn FE.
  // ===================================================

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  // ===================================================
  // FILTER PRODUCTS - FE
  // ===================================================

  const filteredProducts = useMemo(() => {
    const keyword = debouncedSearch.toLowerCase().trim();

    return products.filter((product) => {
      const moderationStatus = getProductModerationStatus(product);

      // SEARCH
      const matchSearch =
        !keyword ||
        String(product?.name || "")
          .toLowerCase()
          .includes(keyword) ||
        String(product?.description || "")
          .toLowerCase()
          .includes(keyword) ||
        String(product?.sellerFullName || "")
          .toLowerCase()
          .includes(keyword) ||
        String(product?.categoryName || "")
          .toLowerCase()
          .includes(keyword) ||
        String(product?.location || "")
          .toLowerCase()
          .includes(keyword);

      // STATUS FILTER
      const matchStatus = !status || moderationStatus === status;

      return matchSearch && matchStatus;
    });
  }, [products, debouncedSearch, status]);

  // ===================================================
  // TOTAL PRODUCTS
  // ===================================================

  const totalCount = filteredProducts.length;

  // ===================================================
  // TOTAL PAGES - FE
  // ===================================================

  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE), 1);
  }, [filteredProducts.length]);

  // ===================================================
  // CURRENT PAGE PRODUCTS
  // ===================================================

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page]);

  // ===================================================
  // RESET PAGE WHEN SEARCH / FILTER CHANGES
  // ===================================================

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  // ===================================================
  // PAGE SAFETY
  // ===================================================
  //
  // Ví dụ:
  // Page 3
  // Reject/search/filter làm còn 2 pages
  // => tự về page 2
  // ===================================================

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // ===================================================
  // STATUS
  // ===================================================

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // ===================================================
  // PAGINATION
  // ===================================================

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // ===================================================
  // REFRESH PRODUCTS
  // ===================================================
  //
  // Sau approve/reject:
  // lấy lại toàn bộ products.
  //
  // Page vẫn do FE quản lý.
  // ===================================================

  const refreshProducts = async () => {
    await dispatch(fetchProducts({}));
  };

  // ===================================================
  // APPROVE
  // ===================================================

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

      await refreshProducts();
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

  // ===================================================
  // REJECT
  // ===================================================

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

      await refreshProducts();
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

  // ===================================================
  // HISTORY
  // ===================================================

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

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="admin-products">
      {/* ===============================================
          HEADER
      =============================================== */}

      <div className="admin-products__header">
        <div>
          <h1>Products</h1>

          <p>{totalCount} listings</p>
        </div>
      </div>

      {/* ===============================================
          TABLE CARD
      =============================================== */}

      <div className="table-wrapper">
        {/* ERROR */}

        {error ? (
          <div className="products-state products-state--error">{error}</div>
        ) : null}

        {/* =============================================
            FILTER
        ============================================= */}

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

            <option value="pending">Pending</option>

            <option value="approved">Approved</option>

            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* =============================================
            TABLE
        ============================================= */}

        <div className="table-scroll">
          <table>
            {/* HEADER */}

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

            {/* BODY */}

            <tbody>
              {loading ? (
                <tr className="admin-products__empty-row">
                  <td colSpan={8} className="empty-state">
                    Loading products...
                  </td>
                </tr>
              ) : paginatedProducts.length > 0 ? (
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

                            <span
                              className="product-sold"
                              title={
                                product.description ||
                                product.location ||
                                "No description"
                              }
                            >
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

                      {/* STOCK / VIEWS */}

                      <td>
                        <span className="stock">
                          {product.stockQuantity ?? 0}
                        </span>
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
                          {/* VIEW */}

                          <Button
                            className="action-btn view-btn"
                            title="View product detail"
                            onClick={() => setDetailTarget(product)}
                          >
                            <Eye size={16} />
                          </Button>

                          {/* APPROVE */}

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

                          {/* REJECT */}

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
                <tr className="admin-products__empty-row">
                  <td colSpan={8} className="empty-state">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =============================================
            FE PAGINATION
        ============================================= */}

        <div className="pagination">
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="pagination__buttons">
            {/* PREVIOUS */}

            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={handlePreviousPage}
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {/* NEXT */}

            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={handleNextPage}
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ===============================================
          APPROVE MODAL
      =============================================== */}

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

      {/* ===============================================
          DETAIL MODAL
      =============================================== */}

      {detailTarget && (
        <div className="admin-products__modal-backdrop" role="presentation">
          <div
            className="admin-products__modal admin-products__modal--wide"
            role="dialog"
            aria-modal="true"
          >
            <h3>Product detail</h3>

            <p>
              Product: <strong>{detailTarget.name}</strong>
            </p>

            <div className="admin-products__detail-grid">
              <article>
                <span>Name</span>

                <strong>{detailTarget.name || "--"}</strong>
              </article>

              <article>
                <span>Category</span>

                <strong>{detailTarget.categoryName || "--"}</strong>
              </article>

              <article>
                <span>Seller</span>

                <strong>{detailTarget.sellerFullName || "--"}</strong>
              </article>

              <article>
                <span>Price</span>

                <strong>{formatCurrencyVN(detailTarget.price || 0)}</strong>
              </article>

              <article>
                <span>Stock</span>

                <strong>{detailTarget.stockQuantity ?? 0}</strong>
              </article>

              <article>
                <span>Status</span>

                <strong>
                  {moderationStatusLabels[
                    getProductModerationStatus(detailTarget)
                  ] || "Pending"}
                </strong>
              </article>

              <article>
                <span>Visibility</span>

                <strong>
                  {detailTarget.isActive ? "Active" : "Inactive"}

                  {" / "}

                  {detailTarget.isPublic ? "Public" : "Private"}
                </strong>
              </article>

              <article>
                <span>Location</span>

                <strong>{detailTarget.location || "--"}</strong>
              </article>

              <article className="admin-products__detail-grid-full">
                <span>Description</span>

                <strong>{detailTarget.description || "No description"}</strong>
              </article>
            </div>

            <div className="admin-products__modal-actions">
              <button
                type="button"
                className="admin-products__modal-btn admin-products__modal-btn--neutral"
                onClick={() => setDetailTarget(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="admin-products__modal-btn admin-products__modal-btn--neutral"
                onClick={() => {
                  const target = detailTarget;

                  setDetailTarget(null);

                  handleViewHistory(target);
                }}
              >
                View history
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===============================================
          REJECT MODAL
      =============================================== */}

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
                onClick={() => {
                  setRejectTarget(null);
                  setRejectReason("");
                }}
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

      {/* ===============================================
          HISTORY MODAL
      =============================================== */}

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
                        `${item.previousStatus || "--"} → ${
                          item.newStatus || "--"
                        }`}
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
