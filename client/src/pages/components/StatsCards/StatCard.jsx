import React from "react";

const StatCards = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm to-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatCards;
