import { useEffect, useMemo, useState } from "react";
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
  fetchAdminPayouts,
  approvePayout,
  rejectPayout,
} from "../../../redux/slice/admin/finance/financeThunk";
import FinanceCharts from "./Chart";
import toast from "react-hot-toast";

const DEFAULT_PAGE_SIZE = 20;

const normalizePayoutStatus = (status) =>
  status?.trim().toLowerCase() || "unknown";

const payoutStatusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
  unknown: "Unknown",
};

const getPayoutId = (item) =>
  item?.payoutRequestId || item?.payoutId || item?.id || item?.withdrawalRequestId;

const getSellerName = (item) =>
  item?.shopName || item?.sellerFullName || item?.sellerName || "Unknown seller";

const getBankName = (item) =>
  item?.bankName || item?.bank?.name || item?.bankAccount?.bankName || "-";

const getAccountHolderName = (item) =>
  item?.accountHolderName || item?.bankAccount?.accountHolderName || "-";

const getMaskedAccountNumber = (item) => {
  const rawValue = item?.accountNumber || item?.bankAccount?.accountNumber || "";
  const normalizedValue = String(rawValue).replace(/\s+/g, "").trim();

  if (!normalizedValue) {
    return "-";
  }

  const visibleSuffix = normalizedValue.slice(-4);
  return `******${visibleSuffix}`;
};

const getRequestedDate = (item) =>
  item?.requestedAtUtc || item?.createdAtUtc || item?.createdAt;

const getMoneyValue = (value) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
};

const formatCurrency = (value) => `${getMoneyValue(value).toLocaleString()} VND`;

const getField = (item, keys, fallback = 0) => {
  const value = keys.map((key) => item?.[key]).find((field) => field !== undefined && field !== null);
  return value ?? fallback;
};

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US");
};

export default function Finance() {
  const dispatch = useDispatch();

  const {
    summary,
    loading,
    payouts,
    payoutsPagination,
    payoutsLoading,
    payoutsError,
    payoutLoading,
  } = useSelector((state) => state.financeAdmin);

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const payoutParams = useMemo(
    () => ({
      status,
      page,
      pageSize: DEFAULT_PAGE_SIZE,
    }),
    [page, status],
  );

  useEffect(() => {
    dispatch(fetchFinanceSummary());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAdminPayouts(payoutParams));
  }, [dispatch, payoutParams]);

  const cards = [
    {
      title: "Total GMV",
      value: summary?.totalGMV,
      icon: DollarSign,
      description: "Completed order value processed through the platform.",
    },
    {
      title: "Successful Payments",
      value: summary?.totalPlatformRevenue,
      icon: TrendingUp,
      description: "Successful buyer payments recorded by the payment gateway.",
    },
    {
      title: "Platform Fee",
      value: summary?.totalPlatformFee,
      icon: Wallet,
      description: "Commission deducted from seller settlements.",
    },
    {
      title: "Refund Amount",
      value: summary?.totalRefundAmount,
      icon: RotateCcw,
      description: "Successful refund transactions only.",
    },
    {
      title: "Seller Wallet Releases",
      value: summary?.totalSellerPayoutAmount,
      icon: Landmark,
      description: "Funds released into seller wallets from completed sales.",
    },
    {
      title: "Pending Withdrawal",
      value: summary?.totalPendingWithdrawalAmount,
      icon: Banknote,
      description: "Withdrawal requests awaiting completion.",
    },
    {
      title: "Completed Withdrawal",
      value: summary?.totalCompletedWithdrawalAmount,
      icon: BadgeDollarSign,
      description: "Withdrawals already completed by the platform.",
    },
    {
      title: "Failed Withdrawal",
      value: summary?.totalFailedWithdrawalAmount,
      icon: CircleDollarSign,
      description: "Withdrawals marked as failed.",
    },
    {
      title: "Net Revenue",
      value: summary?.netRevenue,
      icon: DollarSign,
      description: "Current code formula: payments - refunds - seller wallet releases.",
    },
  ];

  const refreshPayouts = () => dispatch(fetchAdminPayouts(payoutParams));

  const handleRefresh = () => {
    dispatch(fetchFinanceSummary());
    refreshPayouts();
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleApprovePayout = async (id) => {
    if (!id || payoutLoading) {
      return;
    }

    const result = await dispatch(approvePayout(id));

    if (approvePayout.fulfilled.match(result)) {
      toast.success("Payout approved successfully");
      refreshPayouts();
      dispatch(fetchFinanceSummary());
      return;
    }

    toast.error(result.payload || "Unable to approve payout request.");
  };

  const handleRejectPayout = async (id) => {
    if (!id || payoutLoading) {
      return;
    }

    const result = await dispatch(rejectPayout(id));

    if (rejectPayout.fulfilled.match(result)) {
      toast.success("Payout rejected successfully");
      refreshPayouts();
      dispatch(fetchFinanceSummary());
      return;
    }

    toast.error(result.payload || "Unable to reject payout request.");
  };

  return (
    <div className="finance-page">
      <div className="finance-header">
        <div>
          <h2>Finance Dashboard</h2>
          <p>Platform Financial Overview</p>
        </div>

        <button onClick={handleRefresh}>
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

                    <h3>{Number(item.value || 0).toLocaleString()} VND</h3>

                    <p>{item.description}</p>
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
              <select value={status} onChange={handleStatusChange}>
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Seller</th>
                    <th>Requested Amount</th>
                    <th>Bank</th>
                    <th>Account Holder</th>
                    <th>Account</th>
                    <th>Requested Date</th>
                    <th>Status</th>
                    <th width="180">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {payoutsLoading ? (
                    <tr>
                      <td colSpan={7}>Loading withdrawal requests...</td>
                    </tr>
                  ) : payoutsError ? (
                    <tr>
                      <td colSpan={7}>
                        {payoutsError.includes("403")
                          ? "You do not have permission to view payout requests."
                          : payoutsError || "Unable to load withdrawal requests."}
                      </td>
                    </tr>
                  ) : payouts.length === 0 ? (
                    <tr>
                      <td colSpan={7}>No withdrawal requests found.</td>
                    </tr>
                  ) : (
                    payouts.map((item) => {
                      const itemStatus = normalizePayoutStatus(item.status);
                      const itemId = getPayoutId(item);

                      return (
                    <tr key={itemId}>
                      <td>{getSellerName(item)}</td>


                      <td>{formatCurrency(getField(item, ["amount", "requestedAmount"]))}</td>

                      <td>{getBankName(item)}</td>

                      <td>{getAccountHolderName(item)}</td>

                      <td>{getMaskedAccountNumber(item)}</td>

                      <td>{formatDate(getRequestedDate(item))}</td>

                      <td>
                        <span
                          className={payoutStatusLabels[itemStatus] ? itemStatus : "unknown"}
                        >
                          {payoutStatusLabels[itemStatus] || payoutStatusLabels.unknown}
                        </span>
                      </td>

                      <td>
                        {itemStatus === "pending" ? (
                          <>
                            <button
                              className="approve"
                              disabled={payoutLoading}
                              onClick={() => handleApprovePayout(itemId)}
                            >
                              Approve
                            </button>

                            <button
                              className="reject"
                              disabled={payoutLoading}
                              onClick={() => handleRejectPayout(itemId)}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="withdraw-pagination">
              <span>
                Page {payoutsPagination.pageNumber || page} of{" "}
                {payoutsPagination.totalPages || 1} · {payoutsPagination.totalCount || 0} requests
              </span>
              <div>
                <button
                  disabled={payoutsLoading || page <= 1}
                  onClick={() => setPage((current) => Math.max(current - 1, 1))}
                >
                  Previous
                </button>
                <button
                  disabled={
                    payoutsLoading ||
                    page >= (payoutsPagination.totalPages || 1)
                  }
                  onClick={() =>
                    setPage((current) =>
                      Math.min(current + 1, payoutsPagination.totalPages || 1),
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
