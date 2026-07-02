import OrderHistory from "../Profile/Order";
import "./style.scss";

export default function OrdersPage() {
  return (
    <div className="orders-page flex-col-g-center m-t-b-10">
      <div className="container">
        <OrderHistory />
      </div>
    </div>
  );
}
