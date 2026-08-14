import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Bell, CreditCard, Package, ShoppingBag, Trash2 } from "lucide-react";

import {
  deleteNotification,
  markNotificationAsRead,
} from "../../../redux/slice/notificationSlice";

import "./style.scss";

const getNotificationMeta = (type) => {
  switch (String(type || "").toUpperCase()) {
    case "ORDER":
      return {
        icon: <Package size={18} />,
        accent: "order",
        label: "Order",
      };
    case "PAYMENT":
      return {
        icon: <CreditCard size={18} />,
        accent: "payment",
        label: "Payment",
      };
    case "PRODUCT":
      return {
        icon: <ShoppingBag size={18} />,
        accent: "product",
        label: "Product",
      };
    case "SELLER_SHOP":
      return {
        icon: <ShoppingBag size={18} />,
        accent: "seller-shop",
        label: "Seller shop",
      };
    default:
      return {
        icon: <Bell size={18} />,
        accent: "system",
        label: "System",
      };
  }
};

export default function NotificationItem({
  notification,
  showDelete = false,
  variant = "page",
}) {
  const dispatch = useDispatch();
  const meta = getNotificationMeta(notification.type || notification.referenceType);

  const handleRead = () => {
    if (!notification.isRead) {
      dispatch(markNotificationAsRead(notification.id));
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(deleteNotification(notification.id));
  };

  return (
    <Link
      to="/"
      onClick={handleRead}
      className={`notification-item notification-item--${variant} ${
        notification.isRead ? "is-read" : "is-unread"
      }`}
    >
      <div
        className={`notification-item__icon notification-item__icon--${meta.accent}`}
      >
        {meta.icon}
      </div>

      <div className="notification-item__content">
        <div className="notification-item__header">
          <h4>{notification.title}</h4>

          {!notification.isRead && (
            <span className="notification-item__badge">New</span>
          )}
        </div>

        <p>{notification.message}</p>

        <div className="notification-item__meta">
          <span className="notification-item__type">{meta.label}</span>
          <span className="notification-item__time">
            {new Date(notification.createdAtUtc).toLocaleString("en-US")}
          </span>
        </div>
      </div>

      {showDelete && (
        <button
          type="button"
          className="notification-item__delete"
          onClick={handleDelete}
          aria-label="Delete notification"
        >
          <Trash2 size={16} />
        </button>
      )}
    </Link>
  );
}
