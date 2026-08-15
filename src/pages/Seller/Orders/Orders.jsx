import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PackageOpen, ShoppingBag } from "lucide-react";
import { getSellerOrdersThunk } from "../../../redux/slice/seller/order/slice";
import { formatDate, formatCurrencyVN } from "../../../utils/fncUtils";
import OrderDetail from "./OrderDetail";
import { orderService } from "../../../service/orderService";
import {
  getSellerOrderStatusLabel,
  normalizeOrderStatus,
} from "./sellerOrderActions";
import toast from "react-hot-toast";

import "./style.scss";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const dispatch = useDispatch();

  const { orders, loaded } = useSelector((state) => state.sellerOrder);

  useEffect(() => {
    if (!loaded) {
      dispatch(getSellerOrdersThunk());
    }
  }, [dispatch, loaded]);

  const handleOpenOrder = async (order) => {
    setSelectedOrder(order);
    setDetailLoading(true);

    try {
      const response = await orderService.getOrderDetail(order.orderId);
      const detail = response?.data?.order || response?.data || response?.order || response;

      setSelectedOrder((prev) =>
        prev && prev.orderId === order.orderId ? { ...prev, ...detail } : prev,
      );
    } catch (error) {
      toast.error(error?.message || "Load order detail failed");
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="orders">
      <div className="orders__header">
        <div>
          <span className="orders__label">Order Management</span>

          <h1>Orders</h1>

          <p>View and manage orders placed with your shop.</p>
        </div>

        <div className="orders__count">
          <ShoppingBag size={16} />
          <span>{orders?.length || 0} orders</span>
        </div>
      </div>

      {!loaded ? (
        <div className="orders__state">
          <div className="orders__loading-spinner" />
          <span>Loading orders...</span>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="orders__empty">
          <div className="orders__empty-icon">
            <PackageOpen size={34} />
          </div>

          <h3>No orders found</h3>

          <p>
            Your shop does not have any orders yet.
            <br />
            New customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="orders__list">
          {orders.map((order) => (
            <button
              type="button"
              className="order-card"
              key={order.orderId}
              onClick={() => handleOpenOrder(order)}
            >
              <div className="order-card__header">
                <div className="order-card__identity">
                  <div className="order-card__icon">
                    <ShoppingBag size={20} />
                  </div>

                  <div>
                    <span className="order-card__label">Order</span>

                    <h3>#{order.orderId.slice(0, 8)}</h3>
                  </div>
                </div>

                <span
                  className={`order-card__status order-card__status--${normalizeOrderStatus(
                    order.status,
                  )}`}
                >
                  {getSellerOrderStatusLabel(order.status)}
                </span>
              </div>

              <div className="order-card__info">
                <div>
                  <span>Created</span>
                  <strong>{formatDate(order.createdAtUtc)}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>{formatCurrencyVN(order.finalTotal)}</strong>
                </div>

                <div>
                  <span>Items</span>
                  <strong>{order.items?.length || 0}</strong>
                </div>
              </div>

              <div className="order-card__footer">
                <span>View order details</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <OrderDetail
        open={!!selectedOrder}
        order={selectedOrder}
        loading={detailLoading}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Orders;
