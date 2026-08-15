import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";

import {
  fetchOrderDetail,
  fetchOrders,
} from "../../../redux/slice/admin/orders/orderThunk";

import { clearOrderDetail } from "../../../redux/slice/admin/orders/ordersAdminSlice";

import { formatCurrencyVN, formatDate } from "../../../utils/fncUtils";

import {
  Eye,
  Search,
  ShoppingCart,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import OrderDetailModal from "./Detail";

import {
  getOrderItems,
  getOrderItemName,
} from "../../../components/order/orderItemAdapter";

// =====================================================
// CONSTANT
// =====================================================

const ORDERS_PER_PAGE = 7;

// =====================================================
// COMPONENT
// =====================================================

const Orders = () => {
  const dispatch = useDispatch();

  // ===================================================
  // REDUX
  // ===================================================

  const {
    orders = [],
    loading,
    orderDetail,
    detailLoading,
    error,
  } = useSelector((state) => state.ordersAdmin);

  // ===================================================
  // LOCAL STATE
  // ===================================================

  const [openDetail, setOpenDetail] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  // ===================================================
  // PRODUCT SUMMARY
  // ===================================================

  const getProductsSummary = (order) => {
    const items = getOrderItems(order);

    if (!items.length) {
      return order.productName || "No products";
    }

    const firstName = getOrderItemName(items[0]);

    return items.length > 1 ? `${firstName} +${items.length - 1}` : firstName;
  };

  // ===================================================
  // VIEW DETAIL
  // ===================================================

  const handleView = (order) => {
    setSelectedOrder(order);

    setOpenDetail(true);

    dispatch(clearOrderDetail());

    dispatch(fetchOrderDetail(order.id));
  };

  // ===================================================
  // CLOSE DETAIL
  // ===================================================

  const handleCloseDetail = () => {
    setOpenDetail(false);

    setSelectedOrder(null);

    dispatch(clearOrderDetail());
  };

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
  // FETCH ALL ORDERS
  // ===================================================
  //
  // Không truyền page/pageSize.
  // Pagination xử lý hoàn toàn FE.
  //
  // ===================================================

  useEffect(() => {
    dispatch(fetchOrders({}));
  }, [dispatch]);

  // ===================================================
  // FILTER ORDERS - FE
  // ===================================================

  const filteredOrders = useMemo(() => {
    const keyword = debouncedSearch.toLowerCase().trim();

    if (!keyword) {
      return orders;
    }

    return orders.filter((order) => {
      const buyer = String(order?.buyerFullName || "").toLowerCase();

      const product = String(getProductsSummary(order) || "").toLowerCase();

      const status = String(order?.status || "").toLowerCase();

      const voucher = String(order?.voucherCode || "").toLowerCase();

      const id = String(order?.id || "").toLowerCase();

      return (
        buyer.includes(keyword) ||
        product.includes(keyword) ||
        status.includes(keyword) ||
        voucher.includes(keyword) ||
        id.includes(keyword)
      );
    });
  }, [orders, debouncedSearch]);

  // ===================================================
  // TOTAL PAGES
  // ===================================================

  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredOrders.length / ORDERS_PER_PAGE), 1);
  }, [filteredOrders.length]);

  // ===================================================
  // PAGINATED ORDERS
  // ===================================================

  const paginatedOrders = useMemo(() => {
    const startIndex = (page - 1) * ORDERS_PER_PAGE;

    const endIndex = startIndex + ORDERS_PER_PAGE;

    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, page]);

  // ===================================================
  // RESET PAGE ON SEARCH
  // ===================================================

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // ===================================================
  // PAGE SAFETY
  // ===================================================

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ===================================================
  // REFRESH
  // ===================================================

  const handleRefresh = () => {
    setPage(1);

    dispatch(fetchOrders({}));
  };

  // ===================================================
  // PREVIOUS
  // ===================================================

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  // ===================================================
  // NEXT
  // ===================================================

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <>
      <div className="admin-orders">
        {/* =============================================
            HEADER
        ============================================= */}

        <div className="admin-orders__header">
          <div>
            <h2>
              <ShoppingCart size={28} />
              Orders
            </h2>

            <p>Manage all customer orders</p>
          </div>

          <button
            type="button"
            className="admin-orders__refresh-btn"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {/* =============================================
            TOOLBAR
        ============================================= */}

        <div className="admin-orders__toolbar">
          <div className="admin-orders__search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search buyer, product, status..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {/* =============================================
            CARD
        ============================================= */}

        <div className="admin-orders__card">
          {/* ===========================================
              TABLE
          =========================================== */}

          <div className="admin-orders__table-wrapper">
            <table className="admin-orders__table">
              {/* HEADER */}

              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Voucher</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/* BODY */}

              <tbody>
                {loading ? (
                  <tr className="admin-orders__empty-row">
                    <td colSpan={7}>Loading orders...</td>
                  </tr>
                ) : paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr key={order.id}>
                      {/* BUYER */}

                      <td>
                        <div className="admin-orders__buyer">
                          <strong title={order.buyerFullName}>
                            {order.buyerFullName || "Unknown buyer"}
                          </strong>

                          <span title={order.id}>
                            {order.id ? order.id.slice(0, 8) : "--"}
                          </span>
                        </div>
                      </td>

                      {/* PRODUCT */}

                      <td title={getProductsSummary(order)}>
                        <span className="admin-orders__product">
                          {getProductsSummary(order)}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`admin-orders__status ${
                            order.status?.toLowerCase().replaceAll("_", "-") ||
                            ""
                          }`}
                        >
                          {order.status || "--"}
                        </span>
                      </td>

                      {/* TOTAL */}

                      <td>
                        <div className="admin-orders__money">
                          <DollarSign size={15} />

                          <span>{formatCurrencyVN(order.finalTotal)}</span>
                        </div>
                      </td>

                      {/* VOUCHER */}

                      <td>
                        <span className="admin-orders__voucher">
                          {order.voucherCode || "--"}
                        </span>
                      </td>

                      {/* DATE */}

                      <td>
                        <div className="admin-orders__date">
                          <Calendar size={15} />

                          <span>{formatDate(order.createdAtUtc)}</span>
                        </div>
                      </td>

                      {/* ACTION */}

                      <td>
                        <div className="admin-orders__actions">
                          <button
                            type="button"
                            className="admin-orders__view-btn"
                            onClick={() => handleView(order)}
                            aria-label={`View order ${order.id}`}
                            title="View order"
                          >
                            <Eye size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="admin-orders__empty-row">
                    <td colSpan={7}>No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ===========================================
              FE PAGINATION
          =========================================== */}

          <div className="admin-orders__pagination">
            <span>
              Page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <div className="admin-orders__pagination-buttons">
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
      </div>

      {/* ===============================================
          DETAIL MODAL
      =============================================== */}

      <OrderDetailModal
        open={openDetail}
        order={orderDetail || selectedOrder}
        loading={detailLoading}
        error={error}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default Orders;
