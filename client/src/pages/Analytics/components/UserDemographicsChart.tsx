import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {Rootstate} from "../../../store"

const UserDemographicsChart = () => {
  const { demographics, loading } = useSelector((state:Rootstate) => state.analytics);
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#893F45",
  ];
  if (loading) return <p>Loading kpi data...</p>;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">User Demographics</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={demographics} dataKey="value" nameKey="name" label>
            {demographics.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDemographicsChart;
