const Revenue = () => {
  const revenues = [
    {
      month: "January",
      amount: "$1200",
    },
    {
      month: "February",
      amount: "$1800",
    },
    {
      month: "March",
      amount: "$2200",
    },
  ];

  return (
    <div>
      <h1>Revenue</h1>

      <div className="revenue-list">
        {revenues.map((item) => (
          <div key={item.month} className="revenue-card">
            <h3>{item.month}</h3>
            <h2>{item.amount}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Revenue;
