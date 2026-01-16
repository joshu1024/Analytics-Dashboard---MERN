import React from "react";
import { ResponsiveContainer, Pie, PieChart, Tooltip } from "recharts";
const data = [
  { name: "Active", value: 301 },
  { name: "Cancelled", value: 13 },
];
const SubscriptionChart = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Subscriptions</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionChart;
