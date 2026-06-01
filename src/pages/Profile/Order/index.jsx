import {
  ChevronDown,
  Clock3,
  PackageCheck,
  Search,
  Star,
  Truck,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrdersThunk } from "../../../redux/slice/orderSlice";
import "./style.scss";

const tabs = [
  "Tất Cả",
  "Chờ Thanh Toán",
  "Vận Chuyển",
  "Đang Giao",
  "Hoàn Thành",
  "Đã Huỷ",
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("Tất Cả");
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchMyOrdersThunk());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    if (activeTab === "Tất Cả") return orders;

    return orders.filter((o) => {
      switch (activeTab) {
        case "Hoàn Thành":
          return o.status === "Hoàn Thành";
        case "Đang Giao":
          return o.status === "Đang giao";
        default:
          return true;
      }
    });
  }, [orders, activeTab]);

  return (
    <div className="order-history">
      <div className="order-header">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Tìm theo tên Shop, ID đơn hàng..." />
        </div>

        <button className="filter-btn">
          <Clock3 size={18} />
          <span>30 ngày qua</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="order-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="order-list">
        {filteredOrders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="card-top">
              <div className="shop-info">
                <PackageCheck size={18} />
                <span>{order.shop}</span>
              </div>

              <div className="status">
                <Truck size={16} />
                <span>{order.status}</span>
              </div>
            </div>

            <div className="card-body">
              <img src={order.image} alt="" />

              <div className="product-info">
                <h3>{order.productName}</h3>
                <span>x{order.quantity}</span>
              </div>

              <div className="price">₫{order.price?.toLocaleString?.()}</div>
            </div>

            <div className="card-footer">
              <div className="total">
                Sum:
                <span>₫{order.finalTotal?.toLocaleString?.()}</span>
              </div>

              <div className="actions">
                <button className="outline-btn">See Details</button>

                <button className="primary-btn">
                  <Star size={16} />
                  Đánh Giá
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
