import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, CheckCheck } from "lucide-react";

import NotificationItem from "./Item";
import {
  getNotifications,
  markAllNotificationsAsRead,
} from "../../redux/slice/notificationSlice";

import "./style.scss";

export default function NotificationPage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const { items, loading, unreadCount, pagination } = useSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    dispatch(
      getNotifications({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
  }, [dispatch]);

  const filteredNotifications =
    activeTab === "unread" ? items.filter((item) => !item.isRead) : items;

  return (
    <div className="notification-page mx-auto max-w-5xl">
      <div className="notification-page__wrapper">
        <div className="notification-page__header">
          <div className="notification-page__header-left">
            <div className="notification-page__icon">
              <Bell size={22} />
            </div>

            <div>
              <h1 className="notification-page__title">Notifications</h1>
              <p className="notification-page__subtitle">
                You have <span>{unreadCount}</span> unread notifications
              </p>
            </div>
          </div>

          <button
            type="button"
            className="notification-page__mark-read-btn"
            onClick={() => dispatch(markAllNotificationsAsRead())}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={16} />
            <span>Mark all as read</span>
          </button>
        </div>

        <div className="notification-page__filter">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`notification-page__filter-btn ${activeTab === "all" ? "active" : ""}`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("unread")}
            className={`notification-page__filter-btn ${activeTab === "unread" ? "active" : ""}`}
          >
            Unread
          </button>
        </div>

        <div className="notification-page__content">
          {loading ? (
            <div className="notification-page__loading">
              <div className="notification-page__spinner" />
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="notification-page__list">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  showDelete
                  variant="page"
                />
              ))}
            </div>
          ) : (
            <div className="notification-page__empty">
              <div className="notification-page__empty-icon">
                <Bell size={42} />
              </div>
              <h3 className="notification-page__empty-title">No notifications yet</h3>
              <p className="notification-page__empty-text">
                We&apos;ll let you know when something needs your attention.
              </p>
            </div>
          )}
        </div>

        {pagination.totalPages > 1 && (
          <div className="notification-page__footer">
            <p className="notification-page__footer-text">
              Total: {pagination.totalCount} notifications
            </p>

            <div className="notification-page__pagination">
              <button type="button" className="notification-page__pagination-btn">
                Previous
              </button>

              <button
                type="button"
                className="notification-page__pagination-btn notification-page__pagination-btn--active"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
