import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import {  useAppSelector } from "../../../store";
import { PlanBreakdown } from "../../../types/dashboard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const PlanBreakdownChart = () => {
 const { kpis, loading, error } = useAppSelector((state) => state.dashboard);
  if (loading) return <div className="">Loading...</div>;
  const data:PlanBreakdown[] = kpis?.planBreakDown ?? [];
 if (!data.length) {
  return <div className="text-gray-500">No plan data available</div>;
}
  return (
    <div className="bg-white rounded shadow p-2">
      <h3 className="font-semibold mb-2">Plan Breakdown Chart</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} nameKey="name" dataKey="value" label>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlanBreakdownChart;
