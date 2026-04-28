import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector} from "../../../store/index.js"
const RetentionCurveChart = () => {
const { data, loading, error } = useAppSelector((state) => state.analytics);
if (!data.length) return <p className="text-gray-400">No retention data available</p>;
if (loading) return <p>Loading retention data...</p>;
if (error) return <p className="text-red-500">{error}</p>;

  if (loading) return <p>Loading retention data...</p>;

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h3 className="font-semibold mb-2">User Retention (%)</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RetentionCurveChart;
