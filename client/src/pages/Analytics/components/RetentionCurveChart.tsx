import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../../api/api.js";
import { useSelector } from "react-redux";
import {Rootstate} from "../../../store/index.js"
const RetentionCurveChart = () => {
  const { data = [], loading } = useSelector((state:Rootstate) => state.analytics);

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
