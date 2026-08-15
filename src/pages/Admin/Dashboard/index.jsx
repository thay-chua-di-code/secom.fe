import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStatistics } from "../../../redux/slice/admin/dashboard/dashboardThunk";
import {
  DollarSign,
  ShoppingCart,
  Users,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import "./style.scss";
import AdminDashboardCharts from "./Chart";
import { formatCurrencyVN } from "../../../utils/fncUtils";

const formatGrowth = (value) => {
  const safeValue = Number(value ?? 0);
  const isPositive = safeValue >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const className = isPositive ? "positive" : "negative";
  const prefix = safeValue > 0 ? "+" : "";

  return {
    Icon,
    className,
    label: `${prefix}${safeValue.toFixed(1)}%`,
  };
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.dashboardAdmin.statistics);
  const overview = statistics?.overview ?? {};
  const products = statistics?.products ?? {};
  const orders = statistics?.orders ?? {};

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  const revenueGrowth = formatGrowth(overview?.revenueGrowthPercentage);
  const orderGrowth = formatGrowth(overview?.orderGrowthPercentage);
  const userGrowth = formatGrowth(overview?.userGrowthPercentage);
  const sellerGrowth = formatGrowth(overview?.sellerGrowthPercentage);

  return (
    <div className="dashboard-dark">
      <section className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper blue">
              <DollarSign size={20} />
            </div>
            <span className={`trend ${revenueGrowth.className}`}>
              <revenueGrowth.Icon size={14} /> {revenueGrowth.label}
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{formatCurrencyVN(overview?.totalRevenue)}</h3>
            <label>Total Revenue</label>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper cyan">
              <ShoppingCart size={20} />
            </div>
            <span className={`trend ${orderGrowth.className}`}>
              <orderGrowth.Icon size={14} /> {orderGrowth.label}
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{(overview?.totalOrders || 0).toLocaleString()}</h3>
            <label>Total Orders</label>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper purple">
              <Users size={20} />
            </div>
            <span className={`trend ${userGrowth.className}`}>
              <userGrowth.Icon size={14} /> {userGrowth.label}
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{(overview?.totalUsers || 0).toLocaleString()}</h3>
            <label>Total Users (Buyers: {overview?.totalBuyers || 0})</label>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper orange">
              <ShoppingBag size={20} />
            </div>
            <span className={`trend ${sellerGrowth.className}`}>
              <sellerGrowth.Icon size={14} /> {sellerGrowth.label}
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{(overview?.activeSellers || 0).toLocaleString()}</h3>
            <label>Active Sellers</label>
          </div>
        </div>
      </section>

      <div className="detail-sections-grid">
        <section className="dashboard-section">
          <h2>Product Statistics</h2>
          <div className="sub-grid">
            <div className="sub-card">
              <label>Total Products</label>
              <p className="value">{products?.totalProducts || 0}</p>
            </div>
            <div className="sub-card pending">
              <label>Pending</label>
              <p className="value">{products?.pendingProducts || 0}</p>
            </div>
            <div className="sub-card approved">
              <label>Approved</label>
              <p className="value">{products?.approvedProducts || 0}</p>
            </div>
            <div className="sub-card rejected">
              <label>Rejected</label>
              <p className="value">{products?.rejectedProducts || 0}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Order Breakdown</h2>
          <div className="sub-grid (3 cols)">
            <div className="sub-card completed">
              <label>Completed Orders</label>
              <p className="value">{orders?.completedOrders || 0}</p>
            </div>
            <div className="sub-card cancelled">
              <label>Cancelled Orders</label>
              <p className="value">{orders?.cancelledOrders || 0}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-section full-width">
          <div className="dashboard-chart-wrapper">
            <AdminDashboardCharts statistics={statistics} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
