import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStatistics } from "../../../redux/slice/admin/adminThunk";
import StatCard from "../../../components/common/Admin/StatCard";
import "./style.scss";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { statistics } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>

        <p>Overview and statistics of Secom platform</p>
      </div>

      {/* TOP KPI */}

      <section className="dashboard__grid">
        <StatCard title="Total Users" value={statistics?.totalUsers} />

        <StatCard title="Total Products" value={statistics?.totalProducts} />

        <StatCard title="Total Orders" value={statistics?.totalOrders} />

        <StatCard
          title="Revenue"
          value={`₫${statistics?.totalRevenue?.toLocaleString()}`}
        />
      </section>

      {/* USER */}

      <section className="dashboard-section">
        <h2>User Statistics</h2>

        <div className="dashboard__grid">
          <StatCard title="Buyers" value={statistics?.totalBuyers} />

          <StatCard title="Sellers" value={statistics?.totalSellers} />
        </div>
      </section>

      {/* PRODUCT */}

      <section className="dashboard-section">
        <h2>Product Statistics</h2>

        <div className="dashboard__grid">
          <StatCard title="Pending" value={statistics?.pendingProducts} />

          <StatCard title="Approved" value={statistics?.approvedProducts} />

          <StatCard title="Rejected" value={statistics?.rejectedProducts} />
        </div>
      </section>

      {/* ORDER */}

      <section className="dashboard-section">
        <h2>Order Statistics</h2>

        <div className="dashboard__grid">
          <StatCard title="Completed" value={statistics?.completedOrders} />

          <StatCard title="Cancelled" value={statistics?.cancelledOrders} />
        </div>
      </section>

      {/* FINANCE */}

      <section className="dashboard-section">
        <h2>Finance</h2>

        <div className="dashboard__grid">
          <StatCard
            title="Refund"
            value={`₫${statistics?.totalRefundAmount?.toLocaleString()}`}
          />

          <StatCard
            title="Payout"
            value={`₫${statistics?.totalSellerPayoutAmount?.toLocaleString()}`}
          />

          <StatCard
            title="Withdrawal"
            value={`₫${statistics?.totalWithdrawalAmount?.toLocaleString()}`}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
