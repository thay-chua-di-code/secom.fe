import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrdersThunk } from "../../../redux/slice/seller/order/slice";
import { formatDate, formatCurrencyVN } from "../../../utils/fncUtils";
import OrderDetail from "./OrderDetail";
const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { orders, loading, loaded } = useSelector((state) => state.sellerOrder);

  useEffect(() => {
    if (!loaded) {
      dispatch(getSellerOrdersThunk());
    }
  }, [dispatch, loaded]);
  return (
    <div className="orders">
      <h1>Order</h1>
      {orders.map((order) => (
        <div
          className="order-card"
          key={order.orderId}
          onClick={() => setSelectedOrder(order)}
        >
          <div className="order-card__header">
            <div>
              <span className="order-card__label">Order</span>
              <h3>#{order.orderId.slice(0, 8)}</h3>
            </div>

            <span
              className={`order-card__status order-card__status--${order.status.toLowerCase()}`}
            >
              {order.status}
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
              <strong>{order.items.length}</strong>
            </div>
          </div>
        </div>
      ))}

      <OrderDetail
        open={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Orders;
