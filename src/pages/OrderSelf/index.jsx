import { useMemo, useState } from "react";
import OrderTabs from "./Tabs/index";
import OrderBody from "./Item/index";
import OrderFooter from "./Total/index";
import "./style.scss";

export const orders = [
  {
    id: "DH001",
    shopName: "Watch Store",
    status: "PENDING",
    totalPrice: 8500000,
    products: [
      {
        id: 1,
        name: "Seiko Presage",
        image: "https://picsum.photos/200/200",
        variant: "Blue Dial",
        quantity: 1,
        price: 8500000,
      },
    ],
  },
  {
    id: "DH002",
    shopName: "Apple Store",
    status: "DELIVERED",
    totalPrice: 10990000,
    products: [
      {
        id: 2,
        name: "Apple Watch Series 9",
        image: "https://picsum.photos/201/200",
        variant: "45mm GPS",
        quantity: 1,
        price: 10990000,
      },
    ],
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredOrders = useMemo(() => {
    if (activeTab === "ALL") return orders;

    return orders.filter((order) => order.status === activeTab);
  }, [activeTab]);

  return (
    <div className="orders-page flex-col-g-center m-t-b-10">
      <div className="container">
        <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {filteredOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <span>{order.shopName}</span>
            </div>

            <OrderBody products={order.products} />

            <OrderFooter totalPrice={order.totalPrice} />
          </div>
        ))}
      </div>
    </div>
  );
}
