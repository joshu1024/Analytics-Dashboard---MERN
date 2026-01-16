import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const UserDemographicsChart = () => {
  const data = [
    { name: "Male", value: 60 },
    { name: "Female", value: 40 },
    { name: "Other", value: 10 },
  ]; // Placeholder data
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">User Demographics</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label></Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDemographicsChart;
