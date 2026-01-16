import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserGrowthChart = () => {
  const data = [
    { month: "Jan", users: 267 },
    { month: "Feb", users: 309 },
    { month: "Mar", users: 379 },
  ];
  return (
    <div className="bg-white  p-4 rounded shadow">
      <h3 className="">User Growth</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
