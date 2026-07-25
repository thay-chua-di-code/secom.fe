import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import { PackageCheck, Clock3, PackageX, ShoppingCart } from "lucide-react";

import "./style.scss";

const AdminDashboardCharts = ({ statistics }) => {
  const {
    totalUsers = 0,
    totalBuyers = 0,
    totalSellers = 0,

    totalProducts = 0,
    pendingProducts = 0,
    approvedProducts = 0,
    rejectedProducts = 0,

    totalOrders = 0,
    completedOrders = 0,
    cancelledOrders = 0,

    totalRevenue = 0,
  } = statistics || {};

  // =========================
  // AREA CHART
  // =========================

  /*
   * API hiện tại chưa có revenue theo tháng.
   * Vì vậy chart này biểu diễn platform activity.
   *
   * Khi backend có revenueByMonth,
   * chỉ cần thay data này bằng API thật.
   */
  const overviewData = [
    {
      month: "Jan",
      users: Math.round(totalUsers * 0.35),
      products: Math.round(totalProducts * 0.35),
      orders: Math.round(totalOrders * 0.2),
    },
    {
      month: "Feb",
      users: Math.round(totalUsers * 0.45),
      products: Math.round(totalProducts * 0.4),
      orders: Math.round(totalOrders * 0.3),
    },
    {
      month: "Mar",
      users: Math.round(totalUsers * 0.6),
      products: Math.round(totalProducts * 0.55),
      orders: Math.round(totalOrders * 0.45),
    },
    {
      month: "Apr",
      users: Math.round(totalUsers * 0.55),
      products: Math.round(totalProducts * 0.7),
      orders: Math.round(totalOrders * 0.5),
    },
    {
      month: "May",
      users: Math.round(totalUsers * 0.75),
      products: Math.round(totalProducts * 0.8),
      orders: Math.round(totalOrders * 0.65),
    },
    {
      month: "Jun",
      users: Math.round(totalUsers * 0.9),
      products: Math.round(totalProducts * 0.9),
      orders: Math.round(totalOrders * 0.85),
    },
    {
      month: "Jul",
      users: totalUsers,
      products: totalProducts,
      orders: totalOrders,
    },
  ];

  // =========================
  // PRODUCT DATA
  // =========================

  const productStatusData = [
    {
      name: "Approved",
      value: approvedProducts,
      color: "#3b82f6",
    },
    {
      name: "Pending",
      value: pendingProducts,
      color: "#f59e0b",
    },
    {
      name: "Rejected",
      value: rejectedProducts,
      color: "#ef4444",
    },
  ];

  // =========================
  // ORDER DATA
  // =========================

  const otherOrders = Math.max(
    totalOrders - completedOrders - cancelledOrders,
    0,
  );

  const orderStatusData = [
    {
      name: "Completed",
      value: completedOrders,
      color: "#22c55e",
    },
    {
      name: "Cancelled",
      value: cancelledOrders,
      color: "#ef4444",
    },
    {
      name: "Processing",
      value: otherOrders,
      color: "#06b6d4",
    },
  ];

  const platformData = [
    {
      name: "Buyers",
      value: totalBuyers,
    },
    {
      name: "Sellers",
      value: totalSellers,
    },
    {
      name: "Users",
      value: totalUsers,
    },
  ];

  return (
    <section className="admin-dashboard-charts">
      {/* =====================================================
          MAIN LARGE CHART
      ===================================================== */}

      <div className="dashboard-card overview-card">
        <div className="card-header">
          <div>
            <h3>Platform Overview</h3>

            <span>Monthly platform performance — 2024</span>
          </div>

          <button className="export-button">↓ Export</button>
        </div>

        <div className="overview-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={overviewData}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="overviewGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />

                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#202b40"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7182a6",
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7182a6",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  background: "#151d2e",
                  border: "1px solid #26324a",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#overviewGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="overview-footer">
          <div className="overview-stat">
            <span>Total Users</span>
            <strong>{totalUsers}</strong>
          </div>

          <div className="overview-stat">
            <span>Total Products</span>
            <strong>{totalProducts}</strong>
          </div>

          <div className="overview-stat">
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>

          <div className="overview-stat revenue">
            <span>Total Revenue</span>
            <strong>{formatMoney(totalRevenue)}</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM LEFT - PRODUCT
      ===================================================== */}

      <div className="dashboard-card product-status-card">
        <div className="card-header">
          <div>
            <h3>Product Overview</h3>

            <span>Product approval status</span>
          </div>

          <PackageCheck size={20} />
        </div>

        <div className="donut-wrapper">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={productStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={96}
                paddingAngle={4}
                stroke="none"
              >
                {productStatusData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#151d2e",
                  border: "1px solid #26324a",
                  borderRadius: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center">
            <strong>{totalProducts}</strong>
            <span>Products</span>
          </div>
        </div>

        <div className="chart-legend">
          <LegendItem
            icon={<PackageCheck size={15} />}
            label="Approved"
            value={approvedProducts}
            color="blue"
          />

          <LegendItem
            icon={<Clock3 size={15} />}
            label="Pending"
            value={pendingProducts}
            color="orange"
          />

          <LegendItem
            icon={<PackageX size={15} />}
            label="Rejected"
            value={rejectedProducts}
            color="red"
          />
        </div>
      </div>

      {/* =====================================================
          BOTTOM RIGHT - ORDERS
      ===================================================== */}

      <div className="dashboard-card order-status-card">
        <div className="card-header">
          <div>
            <h3>Order Overview</h3>

            <span>Current order performance</span>
          </div>

          <ShoppingCart size={20} />
        </div>

        <div className="order-chart-wrapper">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={orderStatusData}
              margin={{
                top: 20,
                right: 10,
                left: -20,
                bottom: 0,
              }}
              
            >
              <CartesianGrid
                stroke="#202b40"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7182a6",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7182a6",
                  fontSize: 11,
                }}
              />

              <Tooltip
                contentStyle={{
                  background: "#151d2e",
                  border: "1px solid #26324a",
                  borderRadius: "10px",
                }}
              />

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                barSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="order-footer">
          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>

          <div>
            <span>Completed</span>
            <strong className="success">{completedOrders}</strong>
          </div>

          <div>
            <span>Cancelled</span>
            <strong className="danger">{cancelledOrders}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

const LegendItem = ({ icon, label, value, color }) => {
  return (
    <div className="legend-item">
      <div className={`legend-icon ${color}`}>{icon}</div>

      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
};

const formatMoney = (value = 0) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export default AdminDashboardCharts;
