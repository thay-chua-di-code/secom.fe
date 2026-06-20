import { Bell, CreditCard, Package, ShoppingBag } from "lucide-react";

import "./style.scss";

const getNotificationIcon = (type) => {
  switch (type) {
    case "ORDER":
      return <Package size={20} />;

    case "PAYMENT":
      return <CreditCard size={20} />;

    case "PRODUCT":
      return <ShoppingBag size={20} />;

    default:
      return <Bell size={20} />;
  }
};

export default function NotificationCard({ notification }) {
  return (
    <div
      className={`notification-card ${
        !notification.isRead ? "notification-card--unread" : ""
      }`}
    >
      <div className="notification-card__icon">
        {getNotificationIcon(notification.type)}
      </div>

      <div className="notification-card__body">
        <div className="notification-card__header">
          <h3>{notification.title}</h3>

          {!notification.isRead && <span className="badge">New</span>}
        </div>

        <p>{notification.message}</p>

        <span className="time">
          {new Date(notification.createdAtUtc).toLocaleString("vi-VN")}
        </span>
      </div>
    </div>
  );
}
