import React from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, Pie, PieChart, Tooltip, Cell } from "recharts";

const SubscriptionChart = () => {
  const { subscriptions, loading, error } = useSelector(
    (state) => state.billing,
  );
  if (loading) return <div>Loading..</div>;
  if (error) return <div className="text-red-500">Error</div>;
  const data = Object.entries(subscriptions).map(([status, count]) => ({
    name: status,
    value: count,
  }));
  const COLORS = [
    "#8884d8",
    "#a4de6c",
    "#ff8042",
    "#8dd1e1",
    "#82ca9d",
    "#ffc658",
    "#893F45",
  ];
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Subscriptions</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label>
            {data.map((_, index) => (
              <Cell index={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionChart;
