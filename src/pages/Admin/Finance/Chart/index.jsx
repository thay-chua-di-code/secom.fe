import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./style.scss";

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${Math.round(value / 1000)}k`;
  }

  return `$${value.toLocaleString()}`;
};

export default function FinanceCharts({ summary }) {
  /**
   * Dữ liệu tạm thời
   *
   * Sau này nếu backend trả về:
   *
   * {
   *   month: "Jan",
   *   revenue: 130000
   * }
   *
   * thì chỉ cần map lại dữ liệu này.
   */
  const revenueData = [
    {
      month: "Jan",
      revenue: 140000,
    },
    {
      month: "Feb",
      revenue: 130000,
    },
    {
      month: "Mar",
      revenue: 190000,
    },
    {
      month: "Apr",
      revenue: 165000,
    },
    {
      month: "May",
      revenue: 220000,
    },
    {
      month: "Jun",
      revenue: 200000,
    },
    {
      month: "Jul",
      revenue: summary?.totalGMV || 260000,
    },
  ];

  /**
   * Biểu đồ trụ
   */
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
      name: "Seller Payout",
      value: summary?.totalSellerPayoutAmount || 0,
    },
  ];

  return (
    <div className="finance-charts">
      {/* Revenue Trend */}
      <div className="chart-card revenue-chart">
        <div className="chart-header">
          <h3>Revenue Trend</h3>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={revenueData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.28} />

                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickFormatter={formatCurrency}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString()} đ`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#10b981",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Financial Overview */}
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
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString()} đ`,
                "Amount",
              ]}
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
