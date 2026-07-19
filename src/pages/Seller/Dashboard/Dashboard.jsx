import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { getSellerDashboard } from "../../../api/sellerDashboardApi";
import { formatCurrencyVN } from "../../../utils/fncUtils";
const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (hasLoadedRef.current) return;

    hasLoadedRef.current = true;
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getSellerDashboard();

        if (isMounted) {
          setDashboard(result);
        }
      } catch (requestError) {
        if (isMounted) {
          console.error("Seller dashboard error:", requestError);
          setError(
            requestError?.message || "Unable to load seller dashboard.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const wallet = dashboard?.wallet;
  const overview = dashboard?.overview;
  const revenueOverview = dashboard?.revenueOverview;

  const formatGrowth = (value) => {
    const safeValue = value ?? 0;
    const prefix = safeValue > 0 ? "+" : "";

    return `${prefix}${safeValue}%`;
  };

  const stats = [
    {
      title: "Products",
      value: overview?.totalProducts ?? 0,
      growth: formatGrowth(overview?.productGrowthPercentage),
    },
    {
      title: "Orders",
      value: overview?.totalOrders ?? 0,
      growth: formatGrowth(overview?.orderGrowthPercentage),
    },
    {
      title: "Customers",
      value: overview?.totalCustomers ?? 0,
      growth: formatGrowth(overview?.customerGrowthPercentage),
    },
    {
      title: "Revenue",
      value: formatCurrencyVN(overview?.totalRevenue ?? 0),
      growth: formatGrowth(overview?.revenueGrowthPercentage),
    },
  ];

  const recentOrders = dashboard?.recentOrders ?? [];
  const topProducts = dashboard?.topSellingProducts ?? [];
  const recentActivities = dashboard?.recentActivities ?? [];

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
              {isLoading
                ? "..."
                : formatCurrencyVN(wallet?.availableBalance ?? 0)}
            </strong>
          </div>

          <div className="wallet-item">
            <span>Pending</span>

            <strong>
              {isLoading
                ? "..."
                : formatCurrencyVN(wallet?.pendingBalance ?? 0)}
            </strong>
          </div>

          <div className="wallet-item">
            <span>Withdrawn</span>

            <strong>
              {isLoading
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
              <h2>{formatCurrencyVN(revenueOverview?.today ?? 0)}</h2>
            </div>

            <div className="revenue-item">
              <span>This Week</span>
              <h2>{formatCurrencyVN(revenueOverview?.thisWeek ?? 0)}</h2>
            </div>

            <div className="revenue-item">
              <span>This Month</span>
              <h2>{formatCurrencyVN(revenueOverview?.thisMonth ?? 0)}</h2>
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
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.orderId || order.orderCode}>
                      <td>{order.orderCode || order.orderId}</td>
                      <td>{order.customerName || "--"}</td>
                      <td>{formatCurrencyVN(order.sellerTotal ?? 0)}</td>
                      <td>{order.status || "--"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No recent orders</td>
                  </tr>
                )}
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
          {topProducts.length > 0 ? (
            topProducts.map((product) => (
              <div className="top-products__item" key={product.productId}>
                <div>
                  <h4>{product.productName}</h4>
                  <p>{product.quantitySold ?? 0} sold</p>
                </div>

                <span>🔥</span>
              </div>
            ))
          ) : (
            <div className="top-products__item">
              <div>
                <h4>No sales data yet</h4>
                <p>0 sold</p>
              </div>

              <span>🔥</span>
            </div>
          )}
        </div>
      </div>

      {/* Activities */}

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h3>Recent Activities</h3>
        </div>

        <div className="activities">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div
                className="activity"
                key={activity.referenceId || activity.createdAtUtc}
              >
                {activity.message}
              </div>
            ))
          ) : (
            <div className="activity">
              {error ? "Unable to load seller dashboard." : "No recent activities"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
