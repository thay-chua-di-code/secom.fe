import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteSellerProduct,
  fetchSellerProducts,
  updateInventory,
} from "../../../redux/slice/seller/product/thunk";
import Button from "../../../components/common/Button/Button";
import { sellerService } from "../../../service/sellerService";
import UpdateProductModal from "./FormUpdate";
import AddProductModal from "./FormAdd";
import {
  Plus,
  Pencil,
  Package,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Boxes,
  Upload,
  Download,
} from "lucide-react";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import "./style.scss";

const ITEMS_PER_PAGE = 8;

const SUPPORTED_IMPORT_EXTENSIONS = [".xls", ".csv"];

const INVALID_IMPORT_FILE_MESSAGE =
  "Hiện tại hệ thống chỉ hỗ trợ file .xls và .csv.";

const isValidImportFile = (file) => {
  const fileName = file?.name?.toLowerCase() || "";

  return SUPPORTED_IMPORT_EXTENSIONS.some((extension) =>
    fileName.endsWith(extension),
  );
};

const extractFileNameFromDisposition = (contentDisposition) => {
  if (!contentDisposition) return null;

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);

  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const fileNameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);

  return fileNameMatch?.[1] || null;
};

const formatErrors = (errors) => {
  if (!errors) return [];

  if (Array.isArray(errors)) {
    return errors.flatMap((error) => {
      if (typeof error === "string") {
        return error;
      }

      const row = error?.rowNumber || error?.RowNumber;
      const field = error?.field || error?.Field;
      const message = error?.message || error?.Message;

      if (message) {
        return `${
          row ? `Dòng ${row}` : "Dữ liệu"
        }${field ? ` - ${field}` : ""}: ${message}`;
      }

      return JSON.stringify(error);
    });
  }

  if (typeof errors === "object") {
    return Object.entries(errors).flatMap(([field, value]) => {
      if (Array.isArray(value)) {
        return value.map((message) => `${field}: ${message}`);
      }

      return `${field}: ${String(value)}`;
    });
  }

  return [String(errors)];
};

const getErrorDetails = (error) => {
  const data = error?.response?.data;

  const message =
    data?.message || data?.title || error?.message || "Thao tác thất bại.";

  return {
    message,
    errors: formatErrors(data?.errors || data?.data?.errors),
  };
};

const Products = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    actionLoading,
    error,
    pagination,
  } = useSelector((state) => state.sellerProduct);

  const [currentPage, setCurrentPage] = useState(1);

  const [openAdd, setOpenAdd] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [inventoryTarget, setInventoryTarget] = useState(null);

  const [inventoryForm, setInventoryForm] = useState({
    stockQuantity: 0,
    lowStockThreshold: 0,
  });

  const [openImport, setOpenImport] = useState(false);

  const [selectedImportFile, setSelectedImportFile] = useState(null);

  const [importing, setImporting] = useState(false);

  const [exporting, setExporting] = useState(false);

  const [importError, setImportError] = useState(null);

  const totalCount = Number(pagination?.totalCount ?? products?.length ?? 0);

  const totalPages = Math.max(
    Number(
      pagination?.totalPages ?? Math.ceil(totalCount / ITEMS_PER_PAGE) ?? 1,
    ),
    1,
  );

  // ========================================
  // LOAD PRODUCTS
  // ========================================

  const refreshProducts = (page = currentPage) => {
    dispatch(
      fetchSellerProducts({
        page,
        pageNumber: page,
        pageSize: ITEMS_PER_PAGE,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      fetchSellerProducts({
        page: currentPage,
        pageNumber: currentPage,
        pageSize: ITEMS_PER_PAGE,
      }),
    );
  }, [currentPage, dispatch]);

  // ========================================
  // PRODUCT HELPERS
  // ========================================

  const getProductId = (product) => product?.productId || product?.id;

  const getProductStock = (product) =>
    Number(product?.stockQuantity ?? product?.stock ?? product?.quantity ?? 0);

  // ========================================
  // ADD PRODUCT
  // ========================================

  const handleCloseAdd = () => {
    setOpenAdd(false);

    refreshProducts();
  };

  // ========================================
  // UPDATE PRODUCT
  // ========================================

  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);

    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setSelectedProduct(null);

    setOpenUpdate(false);

    refreshProducts();
  };

  // ========================================
  // DELETE PRODUCT
  // ========================================

  const handleDeleteProduct = async () => {
    const productId = getProductId(deleteTarget);

    if (!productId) {
      toast.error("Product id is missing");
      return;
    }

    try {
      await dispatch(deleteSellerProduct(productId)).unwrap();

      toast.success("Product deleted successfully");

      setDeleteTarget(null);

      const nextTotal = Math.max(totalCount - 1, 0);

      const nextTotalPages = Math.max(Math.ceil(nextTotal / ITEMS_PER_PAGE), 1);

      const nextPage = Math.min(currentPage, nextTotalPages);

      if (nextPage !== currentPage) {
        setCurrentPage(nextPage);
      } else {
        refreshProducts(nextPage);
      }
    } catch (err) {
      toast.error(
        typeof err === "string" ? err : err?.message || "Delete product failed",
      );
    }
  };

  // ========================================
  // INVENTORY
  // ========================================

  const handleOpenInventory = (product) => {
    setInventoryTarget(product);

    setInventoryForm({
      stockQuantity: getProductStock(product),
      lowStockThreshold: Number(product?.lowStockThreshold ?? 0),
    });
  };

  const handleSaveInventory = async (event) => {
    event.preventDefault();

    const productId = getProductId(inventoryTarget);

    const stockQuantity = Number(inventoryForm.stockQuantity);

    const lowStockThreshold = Number(inventoryForm.lowStockThreshold || 0);

    if (!productId) {
      toast.error("Product id is missing");
      return;
    }

    if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
      toast.error("Stock quantity must be a non-negative integer");
      return;
    }

    if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 0) {
      toast.error("Low stock threshold must be a non-negative integer");
      return;
    }

    try {
      await dispatch(
        updateInventory({
          productId,
          stockQuantity,
          lowStockThreshold,
        }),
      ).unwrap();

      toast.success("Inventory updated successfully");

      setInventoryTarget(null);

      refreshProducts();
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Update inventory failed",
      );
    }
  };

  // ========================================
  // IMPORT
  // ========================================

  const handleImportFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    setImportError(null);

    if (!file) {
      setSelectedImportFile(null);
      return;
    }

    if (!isValidImportFile(file)) {
      setSelectedImportFile(null);

      setImportError({
        message: INVALID_IMPORT_FILE_MESSAGE,
        errors: [],
      });

      event.target.value = "";

      return;
    }

    setSelectedImportFile(file);
  };

  const handleCloseImport = () => {
    if (importing) return;

    setOpenImport(false);

    setSelectedImportFile(null);

    setImportError(null);
  };

  const handleImportProducts = async (event) => {
    event.preventDefault();

    if (importing) return;

    if (!selectedImportFile) {
      setImportError({
        message: "Vui lòng chọn file .xls hoặc .csv.",
        errors: [],
      });

      return;
    }

    if (!isValidImportFile(selectedImportFile)) {
      setImportError({
        message: INVALID_IMPORT_FILE_MESSAGE,
        errors: [],
      });

      return;
    }

    if (selectedImportFile.size === 0) {
      setImportError({
        message: "File import đang rỗng.",
        errors: [],
      });

      return;
    }

    try {
      setImporting(true);

      setImportError(null);

      const result = await sellerService.importProducts(selectedImportFile);

      const errors = formatErrors(result?.errors || result?.Errors);

      const failedRows = Number(result?.failedRows ?? result?.FailedRows ?? 0);

      if (errors.length > 0 || failedRows > 0) {
        setImportError({
          message: `Import hoàn tất với ${failedRows} dòng lỗi.`,
          errors,
        });

        return;
      }

      const successRows = result?.successRows ?? result?.SuccessRows ?? 0;

      toast.success(
        successRows
          ? `Import sản phẩm thành công: ${successRows} dòng.`
          : "Import sản phẩm thành công.",
      );

      setSelectedImportFile(null);

      setOpenImport(false);

      setCurrentPage(1);

      refreshProducts(1);
    } catch (err) {
      setImportError(getErrorDetails(err));
    } finally {
      setImporting(false);
    }
  };

  // ========================================
  // EXPORT
  // ========================================

  const handleExportProducts = async () => {
    if (exporting) return;

    try {
      setExporting(true);

      const response = await sellerService.exportProducts();

      const fileName =
        extractFileNameFromDisposition(
          response?.headers?.["content-disposition"],
        ) || "seller-products.xls";

      const blob = new Blob([response.data], {
        type: response?.headers?.["content-type"] || "application/vnd.ms-excel",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Xuất danh sách sản phẩm thành công.");
    } catch (err) {
      const { message, errors } = getErrorDetails(err);

      toast.error(errors.length > 0 ? errors[0] : message);
    } finally {
      setExporting(false);
    }
  };

  // ========================================
  // PAGINATION
  // ========================================

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading && products.length === 0) {
    return (
      <div className="seller-products__loading">
        <div className="seller-products__loading-spinner" />

        <span>Loading products...</span>
      </div>
    );
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="seller-products">
      {/* =========================
          HEADER
      ========================= */}

      <div className="seller-products__header">
        <div className="seller-products__heading">
          <div className="seller-products__heading-icon">
            <Package size={24} />
          </div>

          <div>
            <span className="seller-products__section-label">
              Product Management
            </span>

            <h1>Products</h1>

            <p>Manage and monitor all products in your store.</p>
          </div>
        </div>

        <div className="seller-products__toolbar">
          {/* <Button
            className="seller-products__add-btn seller-products__toolbar-btn"
            disabled={importing}
            onClick={() => setOpenImport(true)}
          >
            <Upload size={18} />

            {importing ? "Đang nhập sản phẩm..." : "Import Excel"}
          </Button>

          <Button
            className="seller-products__add-btn seller-products__toolbar-btn"
            disabled={exporting}
            onClick={handleExportProducts}
          >
            <Download size={18} />

            {exporting ? "Đang xuất file..." : "Export Excel"}
          </Button> */}

          <Button
            className="seller-products__add-btn seller-products__toolbar-btn"
            onClick={() => setOpenAdd(true)}
          >
            <Plus size={18} />
            Add Product
          </Button>
        </div>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="seller-products__error">
          {typeof error === "string"
            ? error
            : error?.message || "Unable to load products."}
        </div>
      )}

      {/* =========================
          STATS
      ========================= */}

      <div className="seller-products__stats">
        <div className="seller-products__stat-card">
          <div className="seller-products__stat-icon">
            <Package size={20} />
          </div>

          <div className="seller-products__stat-content">
            <span>Total Products</span>

            <strong>{totalCount}</strong>
          </div>
        </div>

        <div className="seller-products__stat-card">
          <div className="seller-products__stat-icon seller-products__stat-icon--success">
            <TrendingUp size={20} />
          </div>

          <div className="seller-products__stat-content">
            <span>Active Products</span>

            <strong>{products.filter((item) => item.isActive).length}</strong>
          </div>
        </div>
      </div>

      {/* =========================
          PRODUCTS CARD
      ========================= */}

      <div className="seller-products__card">
        <div className="seller-products__card-header">
          <div>
            <span className="seller-products__section-label">
              Product Inventory
            </span>

            <h2>Your Products</h2>

            <p>View and manage your product inventory.</p>
          </div>

          <span className="seller-products__count">{totalCount} Products</span>
        </div>

        {/* =========================
            TABLE
        ========================= */}

        <div className="seller-products__table-wrapper">
          <table className="seller-products__table">
            <thead>
              <tr>
                <th>Product</th>

                <th>Category</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Status</th>

                <th className="seller-products__action-column">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => {
                const productId = getProductId(item);

                return (
                  <tr key={productId || item.name}>
                    <td data-label="Product">
                      <div className="seller-products__product-info">
                        <div className="seller-products__product-avatar">
                          {item.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="seller-products__product-details">
                          <strong>{item.name}</strong>

                          <span>
                            ID:{" "}
                            {productId
                              ? String(productId).slice(0, 8).toUpperCase()
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td data-label="Category">
                      <span className="seller-products__category">
                        {item.categoryName || "-"}
                      </span>
                    </td>

                    <td data-label="Price">
                      <strong className="seller-products__price">
                        {formatCurrencyVN(item.price || 0)}
                      </strong>
                    </td>

                    <td data-label="Stock">
                      <span className="seller-products__stock">
                        {getProductStock(item)}
                      </span>
                    </td>

                    <td data-label="Status">
                      <span
                        className={`seller-products__status ${
                          item.isActive
                            ? "seller-products__status--active"
                            : "seller-products__status--inactive"
                        }`}
                      >
                        <span className="seller-products__status-dot" />

                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td data-label="Action">
                      <div className="seller-products__actions">
                        <button
                          type="button"
                          className="seller-products__action-btn seller-products__action-btn--edit"
                          onClick={() => handleOpenUpdate(item)}
                          aria-label={`Edit ${item.name}`}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          className="seller-products__action-btn seller-products__action-btn--inventory"
                          onClick={() => handleOpenInventory(item)}
                          aria-label={`Edit inventory for ${item.name}`}
                        >
                          <Boxes size={17} />
                        </button>

                        <button
                          type="button"
                          className="seller-products__action-btn seller-products__action-btn--delete"
                          onClick={() => setDeleteTarget(item)}
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="seller-products__empty">
                      <div className="seller-products__empty-icon">
                        <Package size={38} />
                      </div>

                      <h3>No products found</h3>

                      <p>Start by adding your first product.</p>

                      <button
                        type="button"
                        className="seller-products__empty-btn"
                        onClick={() => setOpenAdd(true)}
                      >
                        <Plus size={16} />
                        Add Product
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =========================
            PAGINATION
        ========================= */}

        {totalCount > 0 && (
          <div className="seller-products__pagination">
            <button
              type="button"
              className="seller-products__pagination-btn seller-products__pagination-btn--prev"
              disabled={currentPage <= 1 || loading}
              onClick={handlePreviousPage}
            >
              <ChevronLeft size={18} />

              <span>Previous</span>
            </button>

            <span className="seller-products__pagination-info">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <button
              type="button"
              className="seller-products__pagination-btn seller-products__pagination-btn--next"
              disabled={currentPage >= totalPages || loading}
              onClick={handleNextPage}
            >
              <span>Next</span>

              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* =========================
          ADD MODAL
      ========================= */}

      {openAdd && <AddProductModal open={openAdd} onClose={handleCloseAdd} />}

      {/* =========================
          UPDATE MODAL
      ========================= */}

      {openUpdate && selectedProduct && (
        <UpdateProductModal
          key={getProductId(selectedProduct) || selectedProduct.name}
          open={openUpdate}
          product={selectedProduct}
          onClose={handleCloseUpdate}
        />
      )}

      {/* =========================
          IMPORT MODAL
      ========================= */}

      {openImport && (
        <div className="seller-products__modal-backdrop" role="presentation">
          <form
            className="seller-products__confirm seller-products__import-modal"
            role="dialog"
            aria-modal="true"
            onSubmit={handleImportProducts}
          >
            <h3>Import Excel</h3>

            <p>
              Chọn file <strong>.xls</strong> hoặc <strong>.csv</strong> để nhập
              sản phẩm. Hệ thống chưa hỗ trợ file .xlsx.
            </p>

            <label className="seller-products__field">
              <span>File sản phẩm</span>

              <input
                type="file"
                accept=".xls,.csv,application/vnd.ms-excel,text/csv"
                disabled={importing}
                onChange={handleImportFileChange}
              />
            </label>

            {selectedImportFile && (
              <div className="seller-products__file-info">
                {selectedImportFile.name} ·{" "}
                {Math.ceil(selectedImportFile.size / 1024)} KB
              </div>
            )}

            {importError && (
              <div className="seller-products__import-error" role="alert">
                <strong>{importError.message}</strong>

                {importError.errors?.length > 0 && (
                  <ul>
                    {importError.errors.slice(0, 20).map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {importing && (
              <div className="seller-products__inline-loading">
                <span className="seller-products__inline-spinner" />
                Đang nhập sản phẩm...
              </div>
            )}

            <div className="seller-products__modal-actions">
              <button
                type="button"
                className="seller-products__modal-btn"
                disabled={importing}
                onClick={handleCloseImport}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="seller-products__modal-btn seller-products__modal-btn--primary"
                disabled={importing}
              >
                {importing ? "Đang nhập sản phẩm..." : "Import"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          DELETE MODAL
      ========================= */}

      {deleteTarget && (
        <div className="seller-products__modal-backdrop" role="presentation">
          <div
            className="seller-products__confirm"
            role="dialog"
            aria-modal="true"
          >
            <h3>Delete product?</h3>

            <p>
              This will remove <strong>{deleteTarget.name}</strong> from your
              shop. Products linked to existing orders may be rejected by the
              server.
            </p>

            <div className="seller-products__modal-actions">
              <button
                type="button"
                className="seller-products__modal-btn"
                disabled={actionLoading}
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="seller-products__modal-btn seller-products__modal-btn--danger"
                disabled={actionLoading}
                onClick={handleDeleteProduct}
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          INVENTORY MODAL
      ========================= */}

      {inventoryTarget && (
        <div className="seller-products__modal-backdrop" role="presentation">
          <form
            className="seller-products__confirm"
            role="dialog"
            aria-modal="true"
            onSubmit={handleSaveInventory}
          >
            <h3>Edit inventory</h3>

            <p>
              Update stock levels for <strong>{inventoryTarget.name}</strong>.
            </p>

            <label className="seller-products__field">
              <span>Stock quantity</span>

              <input
                type="number"
                min="0"
                step="1"
                value={inventoryForm.stockQuantity}
                onChange={(event) =>
                  setInventoryForm((prev) => ({
                    ...prev,
                    stockQuantity: event.target.value,
                  }))
                }
              />
            </label>

            <label className="seller-products__field">
              <span>Low stock threshold</span>

              <input
                type="number"
                min="0"
                step="1"
                value={inventoryForm.lowStockThreshold}
                onChange={(event) =>
                  setInventoryForm((prev) => ({
                    ...prev,
                    lowStockThreshold: event.target.value,
                  }))
                }
              />
            </label>

            <div className="seller-products__modal-actions">
              <button
                type="button"
                className="seller-products__modal-btn"
                disabled={actionLoading}
                onClick={() => setInventoryTarget(null)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="seller-products__modal-btn seller-products__modal-btn--primary"
                disabled={actionLoading}
              >
                {actionLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
