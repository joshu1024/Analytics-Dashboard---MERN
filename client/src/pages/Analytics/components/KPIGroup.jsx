import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../api/api.js";
const KPICard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);
const KPIGroup = () => {
  const { kpis = {}, loading } = useSelector((state) => state.analytics || {});

  if (loading) return <p>Loading kpi data...</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <KPICard title="Users" value={kpis.totalUsers} />
      <KPICard title="Retention" value={`${kpis.retention}%`} />
      <KPICard title="Churn" value={`${kpis.churn}%`} />
      <KPICard title="ARPU" value={`$${kpis.arpu}`} />
    </div>
  );
};

export default KPIGroup;
