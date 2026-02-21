import React from "react";
import PlanSelect from "./components/PlanSelect";
import { useSelector } from "react-redux";
import { Rootstate } from "../../store";

const SubscriptionPlansPage = () => {
  const { plans, loading, error } = useSelector((state:Rootstate) => state.billing);
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error</div>;

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
