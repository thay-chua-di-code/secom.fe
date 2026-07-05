import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerWalletThunk } from "../../../redux/slice/seller/wallet/thunk";
import { formatCurrencyVN } from "../../../utils/fncUtils";
const Dashboard = () => {
  const dispatch = useDispatch();

  const { wallet, loading } = useSelector((state) => state.sellerWallet);

  useEffect(() => {
    dispatch(getSellerWalletThunk());
  }, [dispatch]);

  const stats = [
    {
      title: "Products",
      value: 120,
      growth: "+12%",
    },
    {
      title: "Orders",
      value: 58,
      growth: "+8%",
    },
    {
      title: "Customers",
      value: 234,
      growth: "+15%",
    },
    {
      title: "Revenue",
      value: "$12,450",
      growth: "+20%",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD001",
      customer: "Nguyen Van A",
      total: "$120",
      status: "Delivered",
    },
    {
      id: "#ORD002",
      customer: "Tran Thi B",
      total: "$85",
      status: "Shipping",
    },
    {
      id: "#ORD003",
      customer: "Le Van C",
      total: "$220",
      status: "Pending",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Nike Air Force 1",
      sold: 150,
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      sold: 122,
    },
    {
      id: 3,
      name: "Jordan 1 Retro",
      sold: 98,
    },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Seller Dashboard</h1>
          <p>Welcome back 👋</p>
        </div>

        <div className="wallet-summary">
          <div className="wallet-item">
            <span>Available</span>

            <strong>
              {loading
                ? "..."
                : formatCurrencyVN(wallet?.availableBalance ?? 0)}
            </strong>
          </div>

          <div className="wallet-item">
            <span>Pending</span>

            <strong>
              {loading ? "..." : formatCurrencyVN(wallet?.pendingBalance ?? 0)}
            </strong>
          </div>

          <div className="wallet-item">
            <span>Withdrawn</span>

            <strong>
              {loading
                ? "..."
                : formatCurrencyVN(wallet?.withdrawnBalance ?? 0)}
            </strong>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="dashboard__stats">
        {stats.map((item) => (
          <div className="card" key={item.title}>
            <h2>{item.value}</h2>
            <p>{item.title}</p>

            <span className="growth">{item.growth} this month</span>
          </div>
        ))}
      </div>

      {/* Revenue Overview */}

      <div className="dashboard__section">
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h3>Revenue Overview</h3>
          </div>

          <div className="revenue-overview">
            <div className="revenue-item">
              <span>Today</span>
              <h2>$580</h2>
            </div>

            <div className="revenue-item">
              <span>This Week</span>
              <h2>$3,450</h2>
            </div>

            <div className="revenue-item">
              <span>This Month</span>
              <h2>$12,450</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Orders + Top Products */}

      <div className="dashboard__grid">
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h3>Recent Orders</h3>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h3>Top Selling Products</h3>
        </div>

        <div className="top-products">
          {topProducts.map((product) => (
            <div className="top-products__item" key={product.id}>
              <div>
                <h4>{product.name}</h4>
                <p>{product.sold} sold</p>
              </div>

              <span>🔥</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h3>Recent Activities</h3>
        </div>

        <div className="activities">
          <div className="activity">New order #ORD001 received.</div>

          <div className="activity">Product Nike Air Force updated.</div>

          <div className="activity">Customer left a 5⭐ review.</div>

          <div className="activity">Voucher SUMMER2026 created.</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
