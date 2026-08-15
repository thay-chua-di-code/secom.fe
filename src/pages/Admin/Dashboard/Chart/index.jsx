import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
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

import { adminService } from "../../../../service/adminService";
import "./style.scss";

const tooltipProps = {
  allowEscapeViewBox: { x: true, y: true },
  wrapperStyle: { zIndex: 20, pointerEvents: "none" },
};

const CURRENT_YEAR = new Date().getFullYear();

const AdminDashboardCharts = ({ statistics }) => {
  const overview = statistics?.overview ?? {};
  const products = statistics?.products ?? {};
  const orders = statistics?.orders ?? {};

  const {
    totalUsers = overview?.totalUsers ?? statistics?.totalUsers ?? 0,
    totalBuyers = overview?.totalBuyers ?? statistics?.totalBuyers ?? 0,
    totalSellers = overview?.totalSellers ?? statistics?.totalSellers ?? 0,

    totalProducts = products?.totalProducts ?? statistics?.totalProducts ?? 0,
    pendingProducts = products?.pendingProducts ?? statistics?.pendingProducts ?? 0,
    approvedProducts = products?.approvedProducts ?? statistics?.approvedProducts ?? 0,
    rejectedProducts = products?.rejectedProducts ?? statistics?.rejectedProducts ?? 0,

    totalOrders = overview?.totalOrders ?? statistics?.totalOrders ?? 0,
    completedOrders = orders?.completedOrders ?? statistics?.completedOrders ?? 0,
    cancelledOrders = orders?.cancelledOrders ?? statistics?.cancelledOrders ?? 0,

    totalRevenue = overview?.totalRevenue ?? statistics?.totalRevenue ?? 0,
  } = {};

  const [trendState, setTrendState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    let isMounted = true;

    setTrendState((currentState) => ({
      ...currentState,
      loading: true,
      error: null,
    }));

    adminService
      .getDashboardTrends({ year: CURRENT_YEAR })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setTrendState({
          loading: false,
          error: null,
          data,
        });
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }

        setTrendState({
          loading: false,
          error: error.message || "Unable to load monthly platform trend.",
          data: null,
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const trendItems = useMemo(() => trendState.data?.items ?? [], [trendState.data]);
  const hasTrendActivity = useMemo(
    () => trendItems.some((item) =>
      Number(item?.newUsers || 0) > 0 ||
      Number(item?.newProducts || 0) > 0 ||
      Number(item?.newOrders || 0) > 0 ||
      Number(item?.revenue || 0) > 0,
    ),
    [trendItems],
  );

  const productStatusData = [
    { name: "Approved", value: approvedProducts, color: "#3b82f6" },
    { name: "Pending", value: pendingProducts, color: "#f59e0b" },
    { name: "Rejected", value: rejectedProducts, color: "#ef4444" },
  ];

  const otherOrders = Math.max(totalOrders - completedOrders - cancelledOrders, 0);

  const orderStatusData = [
    { name: "Completed", value: completedOrders, color: "#22c55e" },
    { name: "Cancelled", value: cancelledOrders, color: "#ef4444" },
    { name: "Processing", value: otherOrders, color: "#06b6d4" },
  ];

  return (
    <section className="admin-dashboard-charts">
      <div className="dashboard-card overview-card">
        <div className="card-header">
          <div>
            <h3>Platform Overview</h3>
            <span>{`Monthly new users, products, and orders — ${trendState.data?.year || CURRENT_YEAR}`}</span>
          </div>
        </div>

        <div className="overview-chart">
          {trendState.loading ? (
            <div className="overview-chart__state">Loading monthly activity...</div>
          ) : trendState.error ? (
            <div className="overview-chart__state overview-chart__state--error">
              Unable to load monthly platform activity.
            </div>
          ) : !hasTrendActivity ? (
            <div className="overview-chart__state overview-chart__state--empty">
              No historical activity is available for {trendState.data?.year || CURRENT_YEAR}.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={270}>
              <LineChart data={trendItems} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#202b40" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#7182a6", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#7182a6", fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  {...tooltipProps}
                  contentStyle={{ background: "#151d2e", border: "1px solid #26324a", borderRadius: "10px" }}
                  formatter={(value, name) => [Number(value).toLocaleString(), name]}
                />
                <Line type="monotone" dataKey="newUsers" name="New Users" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="newProducts" name="New Products" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="newOrders" name="New Orders" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
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
              <Pie data={productStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={68} outerRadius={96} paddingAngle={4} stroke="none">
                {productStatusData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
              <Tooltip {...tooltipProps} contentStyle={{ background: "#151d2e", border: "1px solid #26324a", borderRadius: "10px" }} />
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center">
            <strong>{totalProducts}</strong>
            <span>Products</span>
          </div>
        </div>

        <div className="chart-legend">
          <LegendItem icon={<PackageCheck size={15} />} label="Approved" value={approvedProducts} color="blue" />
          <LegendItem icon={<Clock3 size={15} />} label="Pending" value={pendingProducts} color="orange" />
          <LegendItem icon={<PackageX size={15} />} label="Rejected" value={rejectedProducts} color="red" />
        </div>
      </div>

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
            <BarChart data={orderStatusData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#202b40" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#7182a6", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#7182a6", fontSize: 11 }} />
              <Tooltip {...tooltipProps} contentStyle={{ background: "#151d2e", border: "1px solid #26324a", borderRadius: "10px" }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={55} />
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
  return formatCurrencyVN(value);
};

export default AdminDashboardCharts;
import { formatCurrencyVN } from "../../../../utils/fncUtils";
