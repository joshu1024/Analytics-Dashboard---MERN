import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Free", value: 50 },
  { name: "Pro", value: 70 },
  { name: "Enterprise", value: 110 },
];
const PlanBreakdownChart = () => {
  return (
    <div className="bg-white rounded shadow p-2">
      <h3 className="font-semibold mb-2">Plan Breakdown Chart</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} nameKey="name" dataKey="value" label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlanBreakdownChart;
