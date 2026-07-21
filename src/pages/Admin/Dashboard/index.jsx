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
import { adminService } from "../../../service/adminService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(
  (state) => state.dashboardAdmin.statistics,
);

  console.log(statistics);

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  const formatMoney = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value || 0);

  return (
    <div className="dashboard-dark">
      <section className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper blue">
              <DollarSign size={20} />
            </div>
            <span className="trend positive">
              <TrendingUp size={14} /> +18.2%
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{formatMoney(statistics?.totalRevenue)}</h3>
            <label>Total Revenue</label>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper cyan">
              <ShoppingCart size={20} />
            </div>
            <span className="trend positive">
              <TrendingUp size={14} /> +12.5%
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{(statistics?.totalOrders || 0).toLocaleString()}</h3>
            <label>Total Orders</label>
          </div>
        </div>

        {/* Card 3: Active Users */}
        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper purple">
              <Users size={20} />
            </div>
            <span className="trend positive">
              <TrendingUp size={14} /> +8.1%
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{(statistics?.totalUsers || 0).toLocaleString()}</h3>
            <label>Total Users (Buyers: {statistics?.totalBuyers})</label>
          </div>
        </div>

        {/* Card 4: Active Sellers */}
        <div className="kpi-card">
          <div className="kpi-card__header">
            <div className="icon-wrapper orange">
              <ShoppingBag size={20} />
            </div>
            <span className="trend negative">
              <TrendingDown size={14} /> -2.3%
            </span>
          </div>
          <div className="kpi-card__body">
            <h3>{(statistics?.totalSellers || 0).toLocaleString()}</h3>
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
              <p className="value">{statistics?.totalProducts || 0}</p>
            </div>
            <div className="sub-card pending">
              <label>Pending</label>
              <p className="value">{statistics?.pendingProducts || 0}</p>
            </div>
            <div className="sub-card approved">
              <label>Approved</label>
              <p className="value">{statistics?.approvedProducts || 0}</p>
            </div>
            <div className="sub-card rejected">
              <label>Rejected</label>
              <p className="value">{statistics?.rejectedProducts || 0}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Order Breakdown</h2>
          <div className="sub-grid (3 cols)">
            <div className="sub-card completed">
              <label>Completed Orders</label>
              <p className="value">{statistics?.completedOrders || 0}</p>
            </div>
            <div className="sub-card cancelled">
              <label>Cancelled Orders</label>
              <p className="value">{statistics?.cancelledOrders || 0}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-section full-width">
          <h2>Financial Adjustments</h2>
          <div className="sub-grid finance-cols">
            <div className="sub-card">
              <label>Total Refund</label>
              <p className="value money-red">
                {formatMoney(statistics?.totalRefundAmount)}
              </p>
            </div>
            <div className="sub-card">
              <label>Seller Payout</label>
              <p className="value money-blue">
                {formatMoney(statistics?.totalSellerPayoutAmount)}
              </p>
            </div>
            <div className="sub-card">
              <label>Withdrawal Amount</label>
              <p className="value money-blue">
                {formatMoney(statistics?.totalWithdrawalAmount)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
