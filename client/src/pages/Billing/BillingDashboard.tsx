import { useEffect } from "react";
import FailedPaymentsList from "./components/FailedPaymentsList";
import RevenueCard from "./components/RevenueCard";
import SubscriptionChart from "./components/SubscriptionChart";
import TransactionTable from "./components/TransactionTable";
import SubscriptionPlansPage from "./SubscriptionPlansPage";
import TransactionsPage from "./TransactionsPage";
import { billingPage } from "../../store/slices/billingSlice.js";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { Rootstate } from "../../store";

const BillingDashboard = () => {
  const dispatch = useAppDispatch();
  const {user} = useSelector((state:Rootstate)=>state.auth)

  useEffect(() => {
    if(!user) return
    dispatch(billingPage());
  }, [dispatch,user]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Billing Dashboard</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="">
          <RevenueCard />
          <SubscriptionChart />
          <TransactionTable />
          <SubscriptionPlansPage />
          <TransactionsPage />
          <FailedPaymentsList />
          {/* {showUpgradeModal && <UpgradePlanModal />}
           */}
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard;
