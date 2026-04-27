import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../../store";

interface RevenuePoint {
  month: string;
  revenue: number;
}
const RevenueChart = () => {
  const { kpis, loading, error } = useAppSelector((state) => state.dashboard);
  const revenueChart:RevenuePoint[] = kpis?.revenueChart ?? [];

  if (!revenueChart?.length) {
  return <div className="text-gray-500">No revenue data available</div>;
}
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Revenue Growth</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={revenueChart}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="revenue"
            stroke="#7c3aed"
            type="monotone"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
