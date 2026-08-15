import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

import { adminService } from "../../../../service/adminService";
import { formatCurrencyVN } from "../../../../utils/fncUtils";
import "./style.scss";

const tooltipProps = {
  allowEscapeViewBox: { x: true, y: true },
  wrapperStyle: { zIndex: 20, pointerEvents: "none" },
};

const CURRENT_YEAR = new Date().getFullYear();

const formatCurrency = (value) => {
  const numericValue = Number(value || 0);

  if (numericValue >= 1000000) {
    return `${Math.round(numericValue / 1000)}k`;
  }

  return numericValue.toLocaleString();
};

export default function FinanceCharts({ summary }) {
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
      .getFinanceTrends({ year: CURRENT_YEAR })
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
          error: error.message || "Unable to load revenue trend.",
          data: null,
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const trendItems = useMemo(() => trendState.data?.items ?? [], [trendState.data]);
  const hasTrendActivity = useMemo(
    () => trendItems.some((item) => Number(item?.successfulPayments || 0) > 0),
    [trendItems],
  );

  const categoryData = [
    {
      name: "GMV",
      value: summary?.totalGMV || 0,
    },
    {
      name: "Platform Fee",
      value: summary?.totalPlatformFee || 0,
    },
    {
      name: "Seller Wallet Releases",
      value: summary?.totalSellerPayoutAmount || 0,
    },
  ];

  return (
    <div className="finance-charts">
      <div className="chart-card revenue-chart">
        <div className="chart-header">
          <div>
            <h3>Revenue Trend</h3>
            <span>{`Monthly successful payments — ${trendState.data?.year || CURRENT_YEAR}`}</span>
          </div>
        </div>

        {trendState.loading ? (
          <div className="finance-chart-state">Loading revenue trend...</div>
        ) : trendState.error ? (
          <div className="finance-chart-state finance-chart-state--error">
            Unable to load revenue trend.
          </div>
        ) : !hasTrendActivity ? (
          <div className="finance-chart-state finance-chart-state--empty">
            No historical revenue data is available for {trendState.data?.year || CURRENT_YEAR}.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendItems} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={formatCurrency} />
              <Tooltip
                {...tooltipProps}
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value) => [formatCurrencyVN(value), "Successful Payments"]}
              />
              <Line type="monotone" dataKey="successfulPayments" name="Successful Payments" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="chart-card category-chart">
        <div className="chart-header">
          <h3>Financial Overview</h3>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={categoryData}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              tickFormatter={formatCurrency}
            />

            <Tooltip
              {...tooltipProps}
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [formatCurrencyVN(value), "Amount"]}
            />

            <Bar
              dataKey="value"
              fill="#10b981"
              radius={[5, 5, 0, 0]}
              barSize={34}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
