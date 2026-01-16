import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = () => {
  const data = [
    { month: "Jan", revenue: 1000 },
    { month: "Feb", revenue: 1500 },
    { month: "Mar", revenue: 1800 },
  ];
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Revenue Growth</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="revenue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
