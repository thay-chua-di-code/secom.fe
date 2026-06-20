import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  markNotificationAsRead,
  deleteNotification,
} from "../../../redux/slice/notificationSlice";
import "./style.scss";
import { Bell, CreditCard, Package, ShoppingBag, Trash2 } from "lucide-react";

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

export default function NotificationItem({ notification, showDelete = false }) {
  const dispatch = useDispatch();

  console.log(notification);
  const handleRead = () => {
    if (!notification.isRead) {
      dispatch(markNotificationAsRead(notification.id));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(deleteNotification(notification.id));
  };

  return (
    <Link
      to="/"
      onClick={handleRead}
      className={`notification-item ${!notification.isRead ? "unread" : ""}`}
    >
      <div className="notification-item__icon">
        {getNotificationIcon(notification.type)}
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
          <span>{notification.referenceType}</span>

          <span>
            {new Date(notification.createdAtUtc).toLocaleString("vi-VN")}
          </span>
        </div>
      </div>

      {showDelete && (
        <button className="notification-item__delete" onClick={handleDelete}>
          <Trash2 size={16} />
        </button>
      )}
    </Link>
  );
}
