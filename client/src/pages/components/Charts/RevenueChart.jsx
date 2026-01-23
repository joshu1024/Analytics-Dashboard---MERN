import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = () => {
  const { revenueChart } = useSelector((state) => state.dashboard);
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
