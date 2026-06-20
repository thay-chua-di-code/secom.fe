const Orders = () => {
  const orders = [
    {
      id: "#1234",
      customer: "Long",
      total: "$240",
      status: "Delivered",
    },
    {
      id: "#1235",
      customer: "David",
      total: "$180",
      status: "Pending",
    },
  ];

  return (
    <div>
      <h1>Orders</h1>

      <div className="orders">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>{order.id}</h3>
            <p>{order.customer}</p>
            <p>{order.total}</p>
            <span>{order.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
