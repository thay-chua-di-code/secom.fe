import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DollarSign,
  Wallet,
  Banknote,
  Landmark,
  BadgeDollarSign,
  TrendingUp,
  RotateCcw,
  RefreshCw,
  CircleDollarSign,
} from "lucide-react";

import "./style.scss";

import {
  fetchFinanceSummary,
  approvePayout,
  rejectPayout,
} from "../../../redux/slice/admin/finance/financeThunk";
import FinanceCharts from "./Chart";

export default function Finance() {
  const dispatch = useDispatch();

  const { summary, loading } = useSelector((state) => state.financeAdmin);

  useEffect(() => {
    dispatch(fetchFinanceSummary());
  }, [dispatch]);

  const cards = [
    {
      title: "Total GMV",
      value: summary?.totalGMV,
      icon: DollarSign,
    },
    {
      title: "Platform Revenue",
      value: summary?.totalPlatformRevenue,
      icon: TrendingUp,
    },
    {
      title: "Platform Fee",
      value: summary?.totalPlatformFee,
      icon: Wallet,
    },
    {
      title: "Refund Amount",
      value: summary?.totalRefundAmount,
      icon: RotateCcw,
    },
    {
      title: "Seller Payout",
      value: summary?.totalSellerPayoutAmount,
      icon: Landmark,
    },
    {
      title: "Pending Withdrawal",
      value: summary?.totalPendingWithdrawalAmount,
      icon: Banknote,
    },
    {
      title: "Completed Withdrawal",
      value: summary?.totalCompletedWithdrawalAmount,
      icon: BadgeDollarSign,
    },
    {
      title: "Failed Withdrawal",
      value: summary?.totalFailedWithdrawalAmount,
      icon: CircleDollarSign,
    },
    {
      title: "Net Revenue",
      value: summary?.netRevenue,
      icon: DollarSign,
    },
  ];

  // Temporary
  const withdrawals = [
    {
      id: 1,
      sellerName: "Apple Store",
      amount: 12500000,
      bankName: "Vietcombank",
      createdAt: "2026-06-29",
      status: "Pending",
    },
    {
      id: 2,
      sellerName: "Samsung Official",
      amount: 8200000,
      bankName: "BIDV",
      createdAt: "2026-06-29",
      status: "Pending",
    },
    {
      id: 3,
      sellerName: "Asus Shop",
      amount: 14300000,
      bankName: "ACB",
      createdAt: "2026-06-28",
      status: "Approved",
    },
    {
      id: 4,
      sellerName: "Dell VN",
      amount: 7200000,
      bankName: "MB Bank",
      createdAt: "2026-06-28",
      status: "Rejected",
    },
    {
      id: 5,
      sellerName: "Lenovo Mall",
      amount: 9300000,
      bankName: "Techcombank",
      createdAt: "2026-06-27",
      status: "Pending",
    },
  ];

  return (
    <div className="finance-page">
      <div className="finance-header">
        <div>
          <h2>Finance Dashboard</h2>
          <p>Platform Financial Overview</p>
        </div>

        <button onClick={() => dispatch(fetchFinanceSummary())}>
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {/* Summary Cards */}

          <div className="finance-grid">
            {cards.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="finance-card" key={index}>
                  <div className="icon">
                    <Icon />
                  </div>

                  <div className="content">
                    <span>{item.title}</span>

                    <h3>{Number(item.value || 0).toLocaleString()} đ</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}

          <div>
            <FinanceCharts summary={summary} />
          </div>
          {/* Withdrawal Table */}

          <div className="withdraw-section">
            <div className="section-header">
              <h3>Withdrawal Requests</h3>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Seller</th>
                    <th>Amount</th>
                    <th>Bank</th>
                    <th>Requested Date</th>
                    <th>Status</th>
                    <th width="180">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {withdrawals.map((item) => (
                    <tr key={item.id}>
                      <td>{item.sellerName}</td>

                      <td>{item.amount.toLocaleString()} đ</td>

                      <td>{item.bankName}</td>

                      <td>{item.createdAt}</td>

                      <td>
                        <span
                          className={
                            item.status === "Pending"
                              ? "pending"
                              : item.status === "Approved"
                                ? "approved"
                                : "rejected"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        {item.status === "Pending" ? (
                          <>
                            <button
                              className="approve"
                              onClick={() => dispatch(approvePayout(item.id))}
                            >
                              Approve
                            </button>

                            <button
                              className="reject"
                              onClick={() => dispatch(rejectPayout(item.id))}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
