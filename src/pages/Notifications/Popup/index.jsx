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

  const { items = [], unreadCount = 0 } = useSelector(
    (state) => state.notification,
  );

  // =========================
  // LOAD NOTIFICATIONS
  // =========================

  useEffect(() => {
    dispatch(
      getNotifications({
        pageNumber: 1,
        pageSize: 5,
      }),
    );
  }, [dispatch]);

  // =========================
  // CLICK OUTSIDE
  // =========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`notification-nav ${open ? "notification-nav--open" : ""}`}
      ref={dropdownRef}
    >
      {/* =========================
          NAV ITEM
      ========================== */}

      <button
        type="button"
        className="notification-nav__trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span>Notifications</span>

        {unreadCount > 0 && (
          <span className="notification-nav__badge">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* =========================
          POPUP
      ========================== */}

      {open && (
        <div className="notification-dropdown">
          <div className="notification-dropdown__header">
            <div>
              <h3>Notifications</h3>

              <p>
                {unreadCount > 0
                  ? `${unreadCount} unread ${
                      unreadCount === 1 ? "notification" : "notifications"
                    }`
                  : "You're all caught up"}
              </p>
            </div>
          </div>

          <div className="notification-dropdown__list">
            {items.length > 0 ? (
              items.map((item) => (
                <NotificationItem key={item.id} notification={item} />
              ))
            ) : (
              <div className="notification-empty">
                <div className="notification-empty__icon">
                  <Bell size={22} />
                </div>

                <strong>No notifications</strong>

                <span>You don't have any notifications yet.</span>
              </div>
            )}
          </div>

          <div className="notification-dropdown__footer">
            <Link to="/notifications" onClick={() => setOpen(false)}>
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
