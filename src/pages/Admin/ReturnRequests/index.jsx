import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, RefreshCw, Search } from "lucide-react";
import {
  adminReturnRequestApi,
  normalizeReturnRequestList,
} from "../../../api/adminReturnRequestApi";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import {
  getReturnStatusBadgeClass,
  getReturnStatusLabel,
  RETURN_REQUEST_STATUSES,
} from "../../../utils/returnRequestUtils";
import "./style.scss";

const statusOptions = [
  { value: "all", label: "All" },
  { value: RETURN_REQUEST_STATUSES.PENDING, label: "Pending" },
  { value: RETURN_REQUEST_STATUSES.APPROVED, label: "Approved" },
  { value: RETURN_REQUEST_STATUSES.REJECTED, label: "Rejected" },
  { value: RETURN_REQUEST_STATUSES.ITEM_RETURNED, label: "Item Returned" },
  { value: RETURN_REQUEST_STATUSES.REFUND_PROCESSING, label: "Refund Processing" },
  { value: RETURN_REQUEST_STATUSES.REFUNDED, label: "Refunded" },
  { value: RETURN_REQUEST_STATUSES.CLOSED, label: "Closed" },
];

const getApiErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Load return requests failed";

export default function AdminReturnRequests() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadReturnRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminReturnRequestApi.getReturnRequests({
        page,
        pageSize: 20,
        status,
      });
      const payload = normalizeReturnRequestList(response);
      setItems(payload.items);
      setPagination({
        totalCount: payload.totalCount,
        totalPages: payload.totalPages,
      });
      setError("");
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadReturnRequests, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadReturnRequests]);

  return (
    <div className="admin-return-requests">
      <div className="admin-return-requests__header">
        <div>
          <h1>Return / Refund Requests</h1>
          <p>{pagination.totalCount} requests</p>
        </div>
        <button type="button" onClick={loadReturnRequests} disabled={loading}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="admin-return-requests__toolbar">
        <div className="admin-return-requests__search">
          <Search size={16} />
          <span>Filter by status</span>
        </div>
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {error && <div className="admin-return-requests__error">{error}</div>}
      {loading && <div className="admin-return-requests__state">Loading requests...</div>}

      {!loading && (
        <div className="admin-return-requests__table-wrap">
          <table className="admin-return-requests__table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Order</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Status</th>
                <th>Refund</th>
                <th>Requested</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={8}>No return requests found.</td></tr>
              ) : items.map((item) => (
                <tr key={item.id}>
                  <td>{String(item.id).slice(0, 8)}</td>
                  <td>{String(item.orderId).slice(0, 8)}</td>
                  <td>{String(item.buyerId || "--").slice(0, 8)}</td>
                  <td>{String(item.sellerId || "--").slice(0, 8)}</td>
                  <td><span className={`admin-return-requests__badge ${getReturnStatusBadgeClass(item.status)}`}>{getReturnStatusLabel(item.status)}</span></td>
                  <td>{formatCurrencyVN(item.refundAmount || 0)}</td>
                  <td>{item.requestedAtUtc ? new Date(item.requestedAtUtc).toLocaleString("en-US") : "--"}</td>
                  <td>
                    <Link to={`/admin/return-requests/${item.id}`} className="admin-return-requests__view">
                      <Eye size={15} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-return-requests__pagination">
        <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span>Page {page} of {pagination.totalPages || 1}</span>
        <button type="button" disabled={page >= pagination.totalPages || loading} onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}
