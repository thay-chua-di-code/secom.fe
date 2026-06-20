import React from "react";
import "./style.scss";

const products = [
  {
    id: 1,
    image: "https://picsum.photos/100?1",
    name: "Nike Air Force 1",
    price: "$120",
    stock: 35,
    status: "Active",
  },
  {
    id: 2,
    image: "https://picsum.photos/100?2",
    name: "Adidas Ultraboost",
    price: "$140",
    stock: 12,
    status: "Active",
  },
  {
    id: 3,
    image: "https://picsum.photos/100?3",
    name: "Jordan 1 Retro",
    price: "$180",
    stock: 8,
    status: "Low Stock",
  },
];

const Seller = () => {
  return (
    <div className="seller">
      <aside className="seller__sidebar">
        <div className="seller__logo">
          <h2>Seller Center</h2>
        </div>

        <nav>
          <a href="/">📊 Dashboard</a>
          <a href="/">📦 Products</a>
          <a href="/">🛒 Orders</a>
          <a href="/">👥 Customers</a>
          <a href="/">💰 Revenue</a>
          <a href="/">⚙️ Settings</a>
        </nav>
      </aside>

      <main className="seller__content">
        <div className="seller__header">
          <h1>Dashboard</h1>

          <button>Add Product</button>
        </div>

        <div className="seller__stats">
          <div className="card">
            <h3>120</h3>
            <p>Products</p>
          </div>

          <div className="card">
            <h3>35</h3>
            <p>Orders Today</p>
          </div>

          <div className="card">
            <h3>$12,450</h3>
            <p>Revenue</p>
          </div>

          <div className="card">
            <h3>4.9 ⭐</h3>
            <p>Rating</p>
          </div>
        </div>

        <div className="seller__products">
          <div className="section-title">
            <h2>Product Management</h2>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="product">
                        <img src={item.image} alt="" />
                        <span>{item.name}</span>
                      </div>
                    </td>

                    <td>{item.price}</td>

                    <td>{item.stock}</td>

                    <td>
                      <span
                        className={`status ${
                          item.status === "Active" ? "active" : "low-stock"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="actions">
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Seller;
