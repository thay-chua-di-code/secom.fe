import { PackageSearch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrdersThunk } from "../../../redux/slice/seller/order/slice";
import { formatDate, formatCurrencyVN } from "../../../utils/fncUtils";
import OrderDetail from "./OrderDetail";
import {
  getSellerOrderStatusLabel,
  normalizeOrderStatus,
} from "./sellerOrderActions";
import "./style.scss";

const PAGE_SIZE = 10;

const normalizeValue = (value) => String(value || "").trim().toLowerCase();

const getOrderId = (order) => order?.orderId || order?.id || "";
const getBuyerName = (order) =>
  order?.buyerName ||
  order?.buyerFullName ||
  order?.buyerEmail ||
  order?.buyerPhoneNumber ||
  "--";
const getOrderItems = (order) => (Array.isArray(order?.items) ? order.items : []);
const getProductNames = (order) =>
  getOrderItems(order)
    .map((item) => item?.productName)
    .filter(Boolean);

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { orders, loaded, loading, error } = useSelector((state) => state.sellerOrder);

  useEffect(() => {
    if (!loaded) {
      dispatch(getSellerOrdersThunk());
    }
  }, [dispatch, loaded]);

  const normalizedQuery = normalizeValue(searchTerm);
  const allOrders = Array.isArray(orders) ? orders : [];

  const filteredOrders = useMemo(() => {
    const byStatus = allOrders.filter((order) => {
      if (statusFilter === "all") return true;
      return normalizeOrderStatus(order?.status) === statusFilter;
    });

    const bySearch = byStatus.filter((order) => {
      if (!normalizedQuery) return true;

      const orderId = normalizeValue(getOrderId(order));
      const buyerName = normalizeValue(getBuyerName(order));
      const status = normalizeValue(getSellerOrderStatusLabel(order?.status));
      const productNames = getProductNames(order).some((name) =>
        normalizeValue(name).includes(normalizedQuery),
      );

      return (
        orderId.includes(normalizedQuery) ||
        buyerName.includes(normalizedQuery) ||
        status.includes(normalizedQuery) ||
        productNames
      );
    });

    const sorted = [...bySearch].sort((left, right) => {
      const leftTime = new Date(left?.createdAtUtc || 0).getTime();
      const rightTime = new Date(right?.createdAtUtc || 0).getTime();

      if (sortBy === "oldest") return leftTime - rightTime;
      if (sortBy === "highest_total") {
        return Number(right?.finalTotal || 0) - Number(left?.finalTotal || 0);
      }
      if (sortBy === "lowest_total") {
        return Number(left?.finalTotal || 0) - Number(right?.finalTotal || 0);
      }

      return rightTime - leftTime;
    });

    return sorted;
  }, [allOrders, normalizedQuery, sortBy, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  const totalOrders = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalOrders / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedOrders = filteredOrders.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  );

  const hasFilters = Boolean(normalizedQuery) || statusFilter !== "all";
  const emptyTitle = hasFilters ? "No matching orders" : "No orders found";
  const emptyDescription = hasFilters
    ? "Try adjusting your search or filters."
    : "Orders from your customers will appear here.";

  return (
    <div className="seller-orders-page">
      <div className="seller-orders-page__header">
        <div>
          <span className="seller-orders-page__label">Order Management</span>
          <h1>Order Management</h1>
          <p>Manage and process customer orders from your store.</p>
        </div>
      </div>

      <div className="seller-orders-page__table-card">
        <div className="seller-orders-page__toolbar">
          <input
            type="search"
            placeholder="Search order, product, customer..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="packed">Packed</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest_total">Highest total</option>
            <option value="lowest_total">Lowest total</option>
          </select>
        </div>

        <div className="seller-orders-page__table-wrapper">
          <table className="seller-orders-page__table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="seller-orders-page__empty-row">
                  <td colSpan={7}>Loading orders...</td>
                </tr>
              )}

              {!loading && error && (
                <tr className="seller-orders-page__empty-row">
                  <td colSpan={7}>{error}</td>
                </tr>
              )}

              {!loading && !error && pagedOrders.map((order) => {
                const orderId = getOrderId(order);
                const items = getOrderItems(order);
                const firstProduct = items[0]?.productName || "--";
                const extraProducts = Math.max(0, items.length - 1);

                return (
                  <tr key={orderId}>
                    <td data-label="Order ID">
                      <button
                        type="button"
                        className="seller-orders-page__order-link"
                        onClick={() => setSelectedOrder(order)}
                      >
                        #{String(orderId).slice(0, 8)}
                      </button>
                    </td>
                    <td data-label="Product">
                      <div className="seller-orders-page__product-cell">
                        <strong>{firstProduct}</strong>
                        {extraProducts > 0 && (
                          <span>+{extraProducts} more item(s)</span>
                        )}
                      </div>
                    </td>
                    <td data-label="Customer">{getBuyerName(order)}</td>
                    <td data-label="Total">
                      <strong>{formatCurrencyVN(order?.finalTotal || 0)}</strong>
                    </td>
                    <td data-label="Status">
                      <span
                        className={`seller-orders-page__status seller-orders-page__status--${normalizeOrderStatus(order?.status)}`}
                      >
                        {getSellerOrderStatusLabel(order?.status)}
                      </span>
                    </td>
                    <td data-label="Date">{formatDate(order?.createdAtUtc)}</td>
                    <td data-label="Action">
                      <button
                        type="button"
                        className="seller-orders-page__action-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View detail
                      </button>
                    </td>
                  </tr>
                );
              })}

              {!loading && !error && pagedOrders.length === 0 && (
                <tr className="seller-orders-page__empty-row seller-orders-page__empty-row--state">
                  <td colSpan={7}>
                    <div className="seller-orders-page__empty-state">
                      <div className="seller-orders-page__empty-icon">
                        <PackageSearch size={28} />
                      </div>
                      <h3>{emptyTitle}</h3>
                      <p>{emptyDescription}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="seller-orders-page__footer">
          <span>
            Page {safeCurrentPage} of {totalPages} · {totalOrders} order{totalOrders === 1 ? "" : "s"}
          </span>
          <div className="seller-orders-page__pagination">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safeCurrentPage <= 1}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safeCurrentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <OrderDetail
        open={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Orders;
