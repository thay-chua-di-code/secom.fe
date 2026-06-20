import "./style.scss";
import NotificationCard from "../../../components/common/NotificationCard/index";
import { useSelector } from "react-redux";

export default function NotificationList() {
  const { items } = useSelector((state) => state.notification);
  console.log("items:", items);
  return (
    <div className="notification-content">
      <div className="notification-content__header">
        <h2>Notifications</h2>

        <p>
          View all important updates and activities related to your account.
        </p>
      </div>

      <div className="notification-list">
        {items?.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
