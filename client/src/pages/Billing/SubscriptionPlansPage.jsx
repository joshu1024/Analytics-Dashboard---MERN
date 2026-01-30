import React from "react";
import PlanSelect from "../companies/components/PlanSelect";
import { useSelector } from "react-redux";

const SubscriptionPlansPage = () => {
  const { plans, loading, error } = useSelector((state) => state.billing);
  console.log("plans:", plans, typeof plans);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Subscription plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PlanSelect key={plan._id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
