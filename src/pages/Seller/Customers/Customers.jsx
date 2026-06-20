const Customers = () => {
  const customers = [
    {
      id: 1,
      name: "Long",
      orders: 15,
    },
    {
      id: 2,
      name: "John",
      orders: 8,
    },
  ];

  return (
    <div>
      <h1>Customers</h1>

      <div className="customer-list">
        {customers.map((customer) => (
          <div className="customer-card" key={customer.id}>
            <h3>{customer.name}</h3>
            <p>{customer.orders} Orders</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
