import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotifications } from "../../../redux/slice/notificationSlice";
import NotificationItem from "../Item";
import "./style.scss";

const NotificationDropdown = () => {
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const { items, unreadCount } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(
      getNotifications({
        pageNumber: 1,
        pageSize: 5,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notification" ref={dropdownRef}>
      <button className="notification-trigger" onClick={() => setOpen(!open)}>
        <Bell size={16} />

        <span>Notifications</span>

        {unreadCount > 0 && (
          <div className="notification-badge">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-dropdown__header">
            <h3>Notifications</h3>
          </div>

          <div className="notification-dropdown__list">
            {items.length > 0 ? (
              items.map((item) => (
                <NotificationItem key={item.id} notification={item} />
              ))
            ) : (
              <div className="notification-empty">No notifications</div>
            )}
          </div>

          <div className="notification-dropdown__footer">
            <Link to="/notifications">View All</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
