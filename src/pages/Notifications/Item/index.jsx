import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  markNotificationAsRead,
  deleteNotification,
} from "../../../redux/slice/notificationSlice";
import { Trash2 } from "lucide-react";

const NotificationItem = ({ notification, showDelete = false }) => {
  const dispatch = useDispatch();

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
      <div className="notification-item__content">
        <h4>{notification.title}</h4>

        <p>{notification.message}</p>

        <span>{new Date(notification.createdAtUtc).toLocaleString()}</span>
      </div>

      {showDelete && (
        <button className="notification-item__delete" onClick={handleDelete}>
          <Trash2 size={16} />
        </button>
      )}
    </Link>
  );
};

export default NotificationItem;
