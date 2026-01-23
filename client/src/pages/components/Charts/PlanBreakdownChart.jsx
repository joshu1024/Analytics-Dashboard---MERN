import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const PlanBreakdownChart = () => {
  const { kpis, loading } = useSelector((state) => state.dashboard);
  const data = kpis.planBreakDown;
  if (loading) return <div className="">Loading...</div>;

  return (
    <div className="bg-white rounded shadow p-2">
      <h3 className="font-semibold mb-2">Plan Breakdown Chart</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} nameKey="name" dataKey="value" label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlanBreakdownChart;
