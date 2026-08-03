import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/common/Button/Button";
import AddVoucherModal from "./FormAdd";
import "./style.scss";
import { sellerService } from "../../../service/sellerService";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import toast from "react-hot-toast";

const DEFAULT_PAGE_SIZE = 20;

const unwrapPagedResult = (response) => {
  const payload = response?.data ?? response;
  return payload?.data ?? payload ?? {};
};

const normalizeVoucherStatus = (status) =>
  status?.trim().toLowerCase() || "unknown";

const getVoucherStatus = (voucher) => {
  const normalized = normalizeVoucherStatus(voucher?.status);

  if (normalized !== "unknown") return normalized;

  if (voucher?.isActive === false) return "inactive";

  if (voucher?.endAtUtc && new Date(voucher.endAtUtc).getTime() < Date.now()) {
    return "expired";
  }

  if (voucher?.quantity > 0 && voucher?.usedQuantity >= voucher.quantity) {
    return "exhausted";
  }

  return "active";
};

const getStatusLabel = (status) =>
  ({
    active: "Active",
    inactive: "Inactive",
    expired: "Expired",
    exhausted: "Exhausted",
    pending: "Pending",
  })[status] || status.charAt(0).toUpperCase() + status.slice(1);

const formatDiscount = (voucher) => {
  const type = normalizeVoucherStatus(voucher?.discountType);
  const value = Number(voucher?.discountValue || 0);

  if (["percent", "percentage", "percentile"].includes(type)) {
    return `${value}%`;
  }

  return formatCurrencyVN(value);
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("vi-VN");
};

const Vouchers = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalCount: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    keyword: "",
    discountType: "all",
    status: "all",
    sortBy: "default",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadVouchers = useCallback(
    async ({ page = 1, nextFilters = filters } = {}) => {
      try {
        setLoading(true);
        setError("");
        const response = await sellerService.getVouchers({
          keyword: nextFilters.keyword?.trim(),
          discountType: nextFilters.discountType,
          status: nextFilters.status,
          sortBy: nextFilters.sortBy,
          page,
          pageSize: pagination.pageSize,
        });
        const pagedResult = unwrapPagedResult(response);

        setVouchers(Array.isArray(pagedResult.items) ? pagedResult.items : []);
        setPagination((prev) => ({
          ...prev,
          pageNumber: pagedResult.pageNumber ?? page,
          pageSize: pagedResult.pageSize ?? prev.pageSize,
          totalCount: pagedResult.totalCount ?? 0,
          totalPages: pagedResult.totalPages ?? 0,
        }));
      } catch (loadError) {
        setVouchers([]);
        setError(loadError.message || "Unable to load vouchers.");
      } finally {
        setLoading(false);
      }
    },
    [filters, pagination.pageSize],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadVouchers({ page: 1 });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [filters, loadVouchers]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
  };

  const handlePageChange = (nextPage) => {
    loadVouchers({ page: nextPage });
  };

  const getVoucherId = (voucher) => voucher?.id ?? voucher?.voucherId;

  const handleDeleteVoucher = async (voucher) => {
    const voucherId = getVoucherId(voucher);

    if (!voucherId) {
      toast.error("Voucher id is missing");
      return;
    }

    const confirmed = window.confirm(
      `Delete voucher ${voucher?.code || voucherId}?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(voucherId);
      await sellerService.deleteVoucher(voucherId);
      setVouchers((prev) => prev.filter((item) => getVoucherId(item) !== voucherId));
      setPagination((prev) => ({
        ...prev,
        totalCount: Math.max(Number(prev.totalCount || 0) - 1, 0),
      }));
      await loadVouchers({ page: pagination.pageNumber });
      toast.success("Voucher deleted successfully");
    } catch (deleteError) {
      toast.error(deleteError.message || "Delete seller voucher failed");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    loadVouchers({ page: pagination.pageNumber });
  };

  return (
    <div className="seller-vouchers">
      {/* Header */}
      <div className="seller-vouchers__header">
        <div>
          <span className="seller-vouchers__label">Promotion Management</span>

          <h1>Voucher Management</h1>

          <p>Create and manage discount vouchers for your customers.</p>
        </div>

        <Button
          className="seller-vouchers__add-btn"
          onClick={() => setOpenAdd(true)}
        >
          + Add Voucher
        </Button>
      </div>

      {/* Table */}
      <div className="seller-vouchers__table-card">
        <div className="seller-vouchers__toolbar">
          <input
            type="search"
            placeholder="Search voucher code or name..."
            value={filters.keyword}
            onChange={(event) => handleFilterChange("keyword", event.target.value)}
          />
          <select
            value={filters.discountType}
            onChange={(event) => handleFilterChange("discountType", event.target.value)}
          >
            <option value="all">All discount types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed amount</option>
          </select>
          <select
            value={filters.status}
            onChange={(event) => handleFilterChange("status", event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
            <option value="exhausted">Exhausted</option>
          </select>
          <select
            value={filters.sortBy}
            onChange={(event) => handleFilterChange("sortBy", event.target.value)}
          >
            <option value="default">Default sort</option>
            <option value="createdAtUtc_desc">Newest</option>
            <option value="createdAtUtc_asc">Oldest</option>
            <option value="endAtUtc_asc">Ending soon</option>
          </select>
        </div>
        <div className="seller-vouchers__table-wrapper">
          <table className="seller-vouchers__table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Discount</th>
                <th>Min Order</th>
                <th>Quantity</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr className="seller-vouchers__empty-row">
                  <td colSpan={9}>Loading vouchers...</td>
                </tr>
              )}

              {!loading && error && (
                <tr className="seller-vouchers__empty-row">
                  <td colSpan={9}>{error}</td>
                </tr>
              )}

              {!loading && !error && vouchers?.map((item) => {
                const status = getVoucherStatus(item);
                const statusClass = ["active", "pending"].includes(status)
                  ? "seller-vouchers__status--active"
                  : "seller-vouchers__status--expired";

                return (
                  <tr key={item.id}>
                    <td data-label="Code">
                      <span className="seller-vouchers__code">{item.code}</span>
                    </td>

                    <td data-label="Name">
                      <span className="seller-vouchers__name">{item.name}</span>
                    </td>

                    <td data-label="Discount">
                      <strong className="seller-vouchers__discount">
                        {formatDiscount(item)}
                      </strong>
                    </td>

                    <td data-label="Min Order">
                      {formatCurrencyVN(item.minOrderAmount || 0)}
                    </td>

                    <td data-label="Quantity">
                      <span className="seller-vouchers__quantity">
                        {item.usedQuantity ?? 0}/{item.quantity ?? 0}
                      </span>
                    </td>

                    <td data-label="Start Date">
                      {formatDate(item.startAtUtc)}
                    </td>

                    <td data-label="End Date">
                      {formatDate(item.endAtUtc)}
                    </td>

                    <td data-label="Status">
                      <span
                        className={`seller-vouchers__status ${statusClass}`}
                      >
                        <span className="seller-vouchers__status-dot" />
                        {getStatusLabel(status)}
                      </span>
                    </td>

                    <td data-label="Action">
                      <div className="seller-vouchers__actions">
                        <button
                          type="button"
                          className="seller-vouchers__action-btn seller-vouchers__action-btn--edit"
                          disabled
                          title="Edit voucher is not available in current API contract"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="seller-vouchers__action-btn seller-vouchers__action-btn--delete"
                          onClick={() => handleDeleteVoucher(item)}
                          disabled={deletingId === getVoucherId(item)}
                        >
                          {deletingId === getVoucherId(item) ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!loading && !error && vouchers?.length === 0 && (
                <tr className="seller-vouchers__empty-row">
                  <td colSpan={9}>
                    <div className="seller-vouchers__empty">
                      <div className="seller-vouchers__empty-icon">🎟️</div>

                      <h3>No vouchers found</h3>

                      <p>
                        Create a new voucher or change filters to find existing
                        seller vouchers.
                      </p>

                      <button
                        type="button"
                        onClick={() => setOpenAdd(true)}
                        className="seller-vouchers__empty-btn"
                      >
                        Create Voucher
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="seller-vouchers__pagination">
          <span>
            Page {pagination.pageNumber || 1} of {pagination.totalPages || 1} ·{" "}
            {pagination.totalCount || 0} vouchers
          </span>
          <div>
            <button
              type="button"
              disabled={loading || pagination.pageNumber <= 1}
              onClick={() => handlePageChange(Math.max(pagination.pageNumber - 1, 1))}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={
                loading || pagination.pageNumber >= (pagination.totalPages || 1)
              }
              onClick={() =>
                handlePageChange(
                  Math.min(pagination.pageNumber + 1, pagination.totalPages || 1),
                )
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {openAdd && (
        <AddVoucherModal open={openAdd} onClose={handleCloseAdd} />
      )}
    </div>
  );
};

export default Vouchers;
