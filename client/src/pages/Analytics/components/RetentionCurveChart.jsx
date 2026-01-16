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
const RetentionCurveChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get("/analytics/retention").then((res) => setData(res.data));
  }, []);
  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h3 className="font-semibold mb-2">RetentionCurve</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RetentionCurveChart;
