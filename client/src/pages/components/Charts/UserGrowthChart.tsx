import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Rootstate } from "../../../store";
import { UserGrowthPoint } from "../../../types/dashboard";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#893F45",
];

const UserGrowthChart = () => {
  const { kpis, loading ,error} = useSelector((state:Rootstate) => state.dashboard);
  
 if (loading) return <div>Loading...</div>;
if (error) return <div className="text-red-500">{error}</div>;
 const data:UserGrowthPoint[] = kpis?.userGrowthData ?? [];
 return (
    <div className="bg-white  p-4 rounded shadow">
      <h3 className="">User Growth</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users">
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
