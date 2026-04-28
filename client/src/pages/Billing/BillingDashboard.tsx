import { useEffect } from "react";
import FailedPaymentsList from "./components/FailedPaymentsList";
import RevenueCard from "./components/RevenueCard";
import SubscriptionChart from "./components/SubscriptionChart";
import SubscriptionPlansPage from "./SubscriptionPlansPage";
import TransactionsPage from "./TransactionsPage";
import { billingPage } from "../../store/slices/billingSlice.js";
import { useAppDispatch } from "../../store/hooks";
import {  useAppSelector } from "../../store";

const BillingDashboard = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.billing);
  const {user} = useAppSelector((state)=>state.auth)
  if (loading) return <div>Loading billing data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
 

  useEffect(() => {
    if(!user) return
    dispatch(billingPage());
  }, [user]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Billing Dashboard</h2>
      <div className="bg-white p-4 rounded shadow">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RevenueCard />
          <SubscriptionChart />
          <SubscriptionPlansPage />
          <TransactionsPage />
          <FailedPaymentsList />
          </div>
      </div>
    </div>
  );
};

export default BillingDashboard;
