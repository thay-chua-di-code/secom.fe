import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { fetchOrderDetail, fetchOrders } from "../../../redux/slice/admin/orders/orderThunk";
import { clearOrderDetail } from "../../../redux/slice/admin/orders/ordersAdminSlice";
import { formatCurrencyVN, formatDate } from "../../../utils/fncUtils";
import { Eye, Search, ShoppingCart, Calendar, DollarSign } from "lucide-react";
import OrderDetailModal from "./Detail";
import { getOrderItems, getOrderItemName } from "../../../components/order/orderItemAdapter";
import UserPagination from "../Users/components/Pagination";

const Orders = () => {
  const { orders, loading, pagination } = useSelector(
    (state) => state.ordersAdmin,
  );
  const { orderDetail, detailLoading, error } = useSelector(
    (state) => state.ordersAdmin,
  );
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  const getProductsSummary = (order) => {
    const items = getOrderItems(order);
    if (!items.length) return order.productName || "No products";
    const firstName = getOrderItemName(items[0]);
    return items.length > 1 ? `${firstName} +${items.length - 1}` : firstName;
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setOpenDetail(true);
    dispatch(clearOrderDetail());
    dispatch(fetchOrderDetail(order.id));
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedOrder(null);
    dispatch(clearOrderDetail());
  };
  useEffect(() => {
    dispatch(
      fetchOrders({
        page: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  return (
    <>
      <div className="admin-orders">
        <div className="page-header">
          <div>
            <h2>
              <ShoppingCart size={28} />
              Orders
            </h2>
            <p>Manage all customer orders</p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={() => dispatch(fetchOrders({ page: 1, pageSize: 10 }))}
          >
            Refresh
          </button>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input placeholder="Search buyer..." />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Total</th>
                <th>Voucher</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>Loading...</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="buyer">
                        <strong>{order.buyerFullName}</strong>
                        <span>{order.id.slice(0, 8)}</span>
                      </div>
                    </td>

                    <td title={getProductsSummary(order)}>{getProductsSummary(order)}</td>

                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <div className="money">
                        <DollarSign size={15} />

                        {formatCurrencyVN(order.finalTotal)}
                      </div>
                    </td>

                    <td>{order.voucherCode || "--"}</td>

                    <td>
                      <div className="date">
                        <Calendar size={15} />

                        {formatDate(order.createdAtUtc)}
                      </div>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() => handleView(order)}
                        aria-label={`View order ${order.id}`}
                        title="View order"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <UserPagination
          pageNumber={pagination.pageNumber}
          totalPages={pagination.totalPages}
          onChange={(newPage) => {
            // keep the same pageSize from the current pagination state
            dispatch(
              fetchOrders({
                page: newPage,
                pageSize: pagination.pageSize,
              }),
            );
          }}
        />
      </div>
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
