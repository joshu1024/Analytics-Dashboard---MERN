import React from "react";
const plans = ["Free", "Pro", "Enterprise"];
const PlanSelect = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <div key={plan} className="bg-white rounded shadow p-2">
          <h3 className="font-semibold">{plan}</h3>
          <button className="mt-4 bg-slate-900 px-4 py-2 text-white rounded">
            Close
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlanSelect;
