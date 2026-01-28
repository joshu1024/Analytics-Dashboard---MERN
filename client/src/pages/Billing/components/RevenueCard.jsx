import React from "react";
import { useSelector } from "react-redux";

const RevenueCard = () => {
  const { monthlyRevenue } = useSelector((state) => state.billing);
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">Monthly revenue</p>
      <p className="text-xl font-bold">${monthlyRevenue.toLocaleString()}</p>
    </div>
  );
};

export default RevenueCard;
