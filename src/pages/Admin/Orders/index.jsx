import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { fetchOrders } from "../../../redux/slice/admin/orders/orderThunk";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { Eye, Search, ShoppingCart, Calendar, DollarSign } from "lucide-react";
import OrderDetailModal from "./Detail";

const Orders = () => {
  const { orders, loading, pagination } = useSelector(
    (state) => state.ordersAdmin,
  );
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  const handleView = (order) => {
    setSelectedOrder(order);
    setOpenDetail(true);
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

          <button className="refresh-btn">Refresh</button>
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
                  <td colSpan={6}>Loading...</td>
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
                        className="view-btn"
                        onClick={() => handleView(order)}
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

        <div className="pagination">
          Page {pagination.pageNumber} / {pagination.totalPages}
        </div>
      </div>
      <OrderDetailModal
        open={openDetail}
        order={selectedOrder}
        onClose={() => setOpenDetail(false)}
      />
    </>
  );
};

export default Orders;
