import {
  ChevronDown,
  Clock3,
  PackageCheck,
  Search,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import './style.scss';
const orders = [
  {
    id: "#DH001",
    shop: "SECOM Official Store",
    status: "Đang giao",
    productName: "Tai nghe Gaming RGB",
    image: "https://picsum.photos/200/200?random=1",
    price: 450000,
    quantity: 1,
    total: 450000,
  },
  {
    id: "#DH002",
    shop: "Apple Zone",
    status: "Hoàn thành",
    productName: "iPhone 15 Pro Max",
    image: "https://picsum.photos/200/200?random=2",
    price: 32990000,
    quantity: 1,
    total: 32990000,
  },
];

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
        {orders.map((order) => (
          <div key={order.id} className="order-card">
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

              <div className="price">₫{order.price.toLocaleString()}</div>
            </div>

            <div className="card-footer">
              <div className="total">
                Thành tiền:
                <span>₫{order.total.toLocaleString()}</span>
              </div>

              <div className="actions">
                <button className="outline-btn">Xem Chi Tiết</button>

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
