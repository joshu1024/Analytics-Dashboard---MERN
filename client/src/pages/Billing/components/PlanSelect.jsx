import React from "react";

const PlanSelect = ({ plan }) => {
  return (
    <div className="bg-white rounded shadow p-4 ">
      <h3 className="text-lg font-semibold capitalize">{plan._id}</h3>
      <p className="text-2xl font-bold">
        ${plan.price}
        <span className="text-sm text-gray-500">/{plan.billingCycle}</span>
      </p>
      <button className="bg-black text-white w-full rounded py-2 cursor-pointer">
        Choose Plan
      </button>
    </div>
  );
};

export default PlanSelect;
